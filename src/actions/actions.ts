'use server';
import { currentUser, clerkClient } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { contactFormDataSchema, contactFormInputs, propertyFormInputs } from '@/types';
import Message from '@/models/Message';

export async function handleContactFormSubmit(formdata: contactFormInputs) {
  //check that the messages are valid
  const result = contactFormDataSchema.safeParse(formdata);
  if (result.success) {
    //crerate message in the db
    await Message.create(result.data);
    return { message: 'Message sent!' };
  } else {
    console.log(result.error.errors);
  }
  return { message: 'Message sent!' };
}

export const updateFavorites = async (propertyId: string) => {
  const user = await currentUser();
  if (!user) throw new Error('User not found');
  const bookmarks = user?.publicMetadata?.bookmarks as string[] | undefined;
  if (!bookmarks)
    await clerkClient.users.updateUser(user.id, { publicMetadata: { bookmarks: [propertyId] } });

  if (bookmarks?.includes(propertyId)) {
    const newBookmarks = bookmarks?.filter((bookmark) => bookmark !== propertyId);
    await clerkClient.users.updateUser(user.id, { publicMetadata: { bookmarks: newBookmarks } });
    revalidatePath('/properties');
  } else {
    const newBookmarks = bookmarks ? [...bookmarks, propertyId] : [propertyId];
    await clerkClient.users.updateUser(user.id, { publicMetadata: { bookmarks: newBookmarks } });
    revalidatePath('/properties');
  }

  // const propertyId = formData.get('propertyId');
  // if (!propertyId) throw new Error('Property ID not found');
  // const user = await currentUser();
  // if (!user) throw new Error('User not found');
  // const bookmarks = user?.publicMetadata?.bookmarks as string[] | undefined;
  // const isFavorite = user && bookmarks && bookmarks.includes(propertyId as string);

  // if (isFavorite) {
  //   const newBookmarks = bookmarks?.filter((bookmark) => bookmark !== propertyId);
  //   await clerkClient.users.updateUser(user.id, { publicMetadata: { bookmarks: newBookmarks } });
  //   revalidatePath('/properties');
  // } else {
  //   const newBookmarks = bookmarks ? [...bookmarks, propertyId] : [propertyId];
  //   await clerkClient.users.updateUser(user.id, { publicMetadata: { bookmarks: newBookmarks } });
  //   revalidatePath('/properties');
  // }
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
