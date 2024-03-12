'use server';
import { currentUser, clerkClient } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import {
  PropertyFormSchema,
  contactFormDataSchema,
  contactFormInputs,
  propertyFormInputs,
} from '@/types';
import Message from '@/models/Message';
import Property from '@/models/Property';
import connectToDB from '@/db';

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
};

export async function addProperty(formData: propertyFormInputs) {
  try {
    const result = PropertyFormSchema.safeParse(formData);
    if (!result.success) {
      console.log(result.error.errors);
      return null;
    }
    await connectToDB();
    const propertyResult = await Property.create(result.data);
    console.log('[add property result]', propertyResult);
    return { message: { success: 'Property added successfully!' } };
  } catch (error) {
    console.log('[add property error]', error);
    return { message: { error: 'Error adding property' } };
  }
}
