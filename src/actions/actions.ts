'use server';
import { currentUser, clerkClient } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { contactFormDataSchema, contactFormInputs, propertyFormInputs } from '@/types';
import Message from '@/models/Message';
import { User } from '@clerk/nextjs/server';

export async function handleContactFormSubmit(formdata: contactFormInputs) {
  //check that the messages are valid
  const result = contactFormDataSchema.safeParse(formdata);
  if (result.success) {
    //crerate message in the db
    const message = await Message.create(result.data);
    //get owner from clerk db and save the message id to their private metadata
    const owner = (await clerkClient.users.getUser(result.data.propertyOwnerId)) as User;
    const ownerMessages = owner.privateMetadata.messages as string[] | [] | undefined;
    //if the owner already has messages, add the new message to the array
    if (ownerMessages) {
      clerkClient.users.updateUser(owner.id, {
        privateMetadata: { messages: [...ownerMessages, message.id] },
      });
    }
    //if the owner has no messages, create a new array with the message id
    else {
      clerkClient.users.updateUser(owner.id, { privateMetadata: { messages: [message.id] } });
    }
    return { message: 'Message sent!' };
  } else {
    console.log(result.error.errors);
  }
  return { message: 'Message sent!' };
}

export const updateFavorites = async (formData: FormData) => {
  const propertyId = formData.get('propertyId');
  if (!propertyId) throw new Error('Property ID not found');
  const user = await currentUser();
  if (!user) throw new Error('User not found');
  const bookmarks = user?.publicMetadata?.bookmarks as string[] | undefined;
  const isFavorite = user && bookmarks && bookmarks.includes(propertyId as string);

  if (isFavorite) {
    const newBookmarks = bookmarks?.filter((bookmark) => bookmark !== propertyId);
    await clerkClient.users.updateUser(user.id, { publicMetadata: { bookmarks: newBookmarks } });
    revalidatePath('/properties');
  } else {
    const newBookmarks = bookmarks ? [...bookmarks, propertyId] : [propertyId];
    await clerkClient.users.updateUser(user.id, { publicMetadata: { bookmarks: newBookmarks } });
    revalidatePath('/properties');
  }
};

export async function addProperty(formData: propertyFormInputs) {
  const result = contactFormDataSchema.safeParse(formData);
  try {
    if (result.success) {
      console.log(result.data);
    } else {
      console.log(result.error.errors);
    }
  } catch (error) {
    console.log(error);
  }
}
