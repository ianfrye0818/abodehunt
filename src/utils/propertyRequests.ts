import { Property } from '@/types';
import axios from 'axios';

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
apiDomain;

export async function fetchAllProperties(): Promise<Property[] | undefined | null> {
  try {
    //handle case where domain is not available yet
    if (!apiDomain) return [];
    const response = await axios.get(`${apiDomain}/properties`);
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
  }
}

export async function fetchPropertyById(id: string): Promise<Property | undefined | null> {
  try {
    if (!apiDomain) return null;
    const response = await axios.get(`${apiDomain}/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property:', error);
  }
}

export async function fetchFeaturedProperties(): Promise<Property[] | undefined | null> {
  try {
    if (!apiDomain) return null;
    const response = await axios.get(`${apiDomain}/properties/featured`);
    return response.data;
  } catch (error) {
    console.error('Error fetching featured properties:', error);
  }
}

export async function fetchUsersFavoriteProperties(
  bookmarks: string[]
): Promise<Property[] | undefined | null> {
  try {
    if (!apiDomain) return null;
    const response = await axios.get(`${apiDomain}/properties/favorites`, {
      params: {
        bookmarks: bookmarks.join(','),
      },
    });
    const filteredResponse = response.data.filter(
      (property: Property) => property !== undefined
    ) as Property[];
    return filteredResponse;
  } catch (error) {
    console.error('Error fetching user favorites:', error);
  }
}
