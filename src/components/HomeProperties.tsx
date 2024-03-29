import React from 'react';
import { Property } from '@/types';
import PropertyCard from './PropertyCard';
import { fetchAllProperties } from '@/actions/propertyActions';
import Link from 'next/link';

export default async function HomeProperties() {
  const properties = await fetchAllProperties();

  if (!properties || properties.length === 0) return null;
  const randomProperties = properties.sort(() => Math.random() - Math.random()).slice(0, 3);

  if (!randomProperties || randomProperties.length === 0)
    return (
      <div className='h-full w-full flex flex-col justify-center items-center text-3xl'>
        No Properties found
      </div>
    );

  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>Recent Properties</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {randomProperties.map((property: Property) => (
              <PropertyCard
                key={property._id}
                property={property}
              />
            ))}
          </div>
        </div>
      </section>
      <section className='m-auto max-w-lg my-10 px-6'>
        <Link
          href='/properties'
          className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
        >
          View All Properties
        </Link>
      </section>
    </>
  );
}
