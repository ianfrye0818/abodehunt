'use server';
import { currentUser, clerkClient } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { PropertyFormSchema, propertyFormInputs } from '@/types';
import Property from '@/models/Property';
import connectToDB from '@/db';
import { User } from '@clerk/nextjs/server';

//updatese clerks user DB to include the property id of the favorite in their bookmarks
export const updateFavorites = async (propertyId: string) => {
  try {
    //get current user
    const user = await currentUser();
    if (!user) throw new Error('User not found');
    //get the users bookmarks if they exist
    const bookmarks = user.publicMetadata?.bookmarks as string[] | undefined;

    if (bookmarks && bookmarks.includes(propertyId)) {
      removeFavorite(propertyId, user, bookmarks);
    } else {
      addFavorite(propertyId, user, bookmarks);
    }
  } catch (error) {
    console.error(['updateFavorites', error]);
    return { message: { error: 'Error updating favorites' } };
  } finally {
    revalidatePath('/favorites');
  }
};

async function addFavorite(propertyId: string, user: User, bookmarks: string[] | undefined) {
  if (!bookmarks) {
    await clerkClient.users.updateUser(user.id, { publicMetadata: { bookmarks: [propertyId] } });
  } else {
    await clerkClient.users.updateUser(user.id, {
      publicMetadata: { bookmarks: [...bookmarks, propertyId] },
    });
  }
  return { message: { success: 'Property added to favorites' } };
}

async function removeFavorite(propertyId: string, user: User, bookmarks: string[]) {
  const updatedBookmarks = bookmarks.filter((id) => id !== propertyId);
  await clerkClient.users.updateUser(user.id, {
    publicMetadata: { bookmarks: updatedBookmarks },
  });
  return { message: { success: 'Property removed from favorites' } };
}

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

export async function deleteProperty(id: string) {
  try {
    await connectToDB();
    const deleted = await Property.findByIdAndDelete(id);
    if (!deleted) throw new Error('Error deleting property');
    return { message: { success: 'Property Deleted Successfully' } };
  } catch (error) {
    console.error(['deleteProperty', error]);
    return { message: { error: 'Error deleting property' } };
  } finally {
    revalidatePath('/properties');
  }
}
