'use server';

import connectToDB from '@/db';
import Property from '@/models/Property';
import { Property as propertyType } from '@/types';

export async function queryLocation(searchTerm: string | undefined, propertyType?: string) {
  (!searchTerm || searchTerm === '') && (searchTerm = '');

  const isZipCode = /^\d{5}(?:[-\s]\d{4})?$/.test(searchTerm);

  let query: any = {};

  if (isZipCode) {
    query['location.zipcode'] = { $regex: '.*' + searchTerm + '.*', $options: 'i' };
  } else {
    const [cityState] = searchTerm.split(',').map((item) => item.trim());
    query = {
      $or: [
        { 'location.city': { $regex: '.*' + cityState + '.*', $options: 'i' } },
        { 'location.state': { $regex: '.*' + cityState + '.*', $options: 'i' } },
      ],
    };
  }

  try {
    await connectToDB();
    if (propertyType !== 'all') {
      query.type = { $regex: '.*' + propertyType + '.*', $options: 'i' };
    }

    const properties = await Property.find(query);
    if (!properties || properties.length === 0) {
      return [];
    }
    return properties;
  } catch (error) {
    console.error('[property search query error]', error);
    return [];
  }
}
