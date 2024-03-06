'use server';
import { z } from 'zod';

import { contactFormDataSchema } from '@/lib/schema';
import { currentUser, clerkClient } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

type contactFormInputs = z.infer<typeof contactFormDataSchema>;

export async function handleContactFormSubmit(formdata: contactFormInputs) {
  const result = contactFormDataSchema.safeParse(formdata);
  if (result.success) {
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
