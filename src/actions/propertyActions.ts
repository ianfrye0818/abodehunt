'use server';
import { currentUser, clerkClient } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { PropertyFormSchema, propertyFormInputs } from '@/types';
import Property from '@/models/Property';
import type { Property as PropertyType } from '@/types';
import connectToDB from '@/db';
import { deleteImages } from '@/utils/cloudinary';

//updatese clerks user DB to include the property id of the favorite in their bookmarks
export const updateFavorites = async (propertyId: string) => {
  try {
    //get current user
    const user = await currentUser();
    if (!user) throw new Error('User not found');
    //get the users bookmarks if they exist
    const bookmarks = user?.publicMetadata?.bookmarks as string[] | undefined;
    //if the user has no bookmarks, create an array and add the propertyId
    if (!bookmarks)
      await clerkClient.users.updateUser(user.id, { publicMetadata: { bookmarks: [propertyId] } });
    //remove the propertyId from the array if it exists
    if (bookmarks?.includes(propertyId)) {
      const newBookmarks = bookmarks?.filter((bookmark) => bookmark !== propertyId);
      await clerkClient.users.updateUser(user.id, { publicMetadata: { bookmarks: newBookmarks } });
    }
    //if the propertyId is not in the array, add it
    else {
      const newBookmarks = bookmarks ? [...bookmarks, propertyId] : [propertyId];
      await clerkClient.users.updateUser(user.id, { publicMetadata: { bookmarks: newBookmarks } });
    }
    return { message: { success: 'Favorites updated successfully' } };
  } catch (error) {
    console.error(['updateFavorites', error]);
    return { message: { error: 'Error updating favorites' } };
  } finally {
    revalidatePath('/favorites');
  }
};
export async function addProperty(formData: propertyFormInputs) {
  try {
    const result = PropertyFormSchema.safeParse(formData);
    if (!result.success) {
      console.error(result.error.errors);
      return null;
    }
    await connectToDB();
    const propertyResult = await Property.create(result.data);
    console.error('[add property result]', propertyResult);
    return { message: { success: 'Property added successfully!' } };
  } catch (error) {
    console.error('[add property error]', error);
    return { message: { error: 'Error adding property' } };
  } finally {
    revalidatePath('/properties');
  }
}

export async function deleteProperty(id: string) {
  try {
    await connectToDB();
    const property = (await Property.findOne({ _id: id })) as PropertyType;
    if (!property) throw new Error('Property not found');
    const isImgDeleted = await deleteImages(property.images);
    if (isImgDeleted.message.error) throw new Error('Error deleting images');
    const deleted = await Property.deleteOne({ _id: id });
    if (!deleted) throw new Error('Error deleting property');
    return { message: { success: 'Property Deleted Successfully' } };
  } catch (error) {
    console.error(['deleteProperty', error]);
    return { message: { error: 'Error deleting property' } };
  } finally {
    revalidatePath('/properties');
  }
}

export async function fetchAllProperties() {
  try {
    await connectToDB();
    const properties = await Property.find();
    if (!properties) return [];
    return properties;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return null;
  }
}

export async function fetchUserProperties(userId: string) {
  try {
    await connectToDB();
    const properties = await Property.find({ owner: userId });
    if (!properties) return [];
    return properties;
  } catch (error) {
    console.error('[fetchUserProperties error]', error);
    return null;
  }
}

export async function fetchPropertyById(id: string) {
  try {
    await connectToDB();
    const property = await Property.findById(id);
    if (!property) [];
    return property;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}

export async function fetchFeaturedProperties() {
  try {
    await connectToDB();
    const properties = await Property.find({ is_featured: true });
    if (!properties) return [];
    return properties;
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    return null;
  }
}

export async function fetchUsersFavoriteProperties(bookmarks: string[]) {
  if (bookmarks.length === 0) return [];
  try {
    await connectToDB();
    const properties = await Property.find({ _id: { $in: bookmarks } });
    if (!properties) return [];
    return properties;
  } catch (error) {
    console.error('[fetching Properties error]', error);
    return null;
  }
}
