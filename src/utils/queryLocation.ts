'use server';

import Property from '@/models/Property';
import { Property as propertyType } from '@/types';

export function queryLocation(searchTerm: string, propertyType?: string) {
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
  if (propertyType) {
    query.type = propertyType;
  }

  try {
    const properties = Property.find(query) as unknown as propertyType[] | [];
    if (!properties || properties.length === 0) {
      return [];
    }
    return properties;
  } catch (error) {
    console.error('[property search query error]', error);
    return [];
  }
}
