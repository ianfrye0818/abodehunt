import DeletePropertyDialog from '@/app/properties/[id]/delete-property-dialog';
import { CloudinaryImageComponent } from '@/app/properties/add/cloudinary-upload-widget';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Property } from '@/types';
import { Edit2Icon } from 'lucide-react';

import Link from 'next/link';
import React from 'react';

export default function ProfileListingCard({ property }: { property: Property }) {
  return (
    <div className='mb-10 flex flex-col justify-between'>
      <Link href={`/properties/${property._id.toString()}`}>
        <CloudinaryImageComponent
          image={property.images[0]}
          alt={property.name}
        />
      </Link>
      <div className='mt-2'>
        <p className='text-lg font-semibold'>{property.name}</p>
        <p className='text-gray-600'>
          {property.location.street} {property.location.city} {property.location.state}{' '}
          {property.location.zipcode}
        </p>
      </div>
      <div className='mt-2 flex flex-col items-center gap-3'>
        <Link
          href=''
          className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full text-center flex items-center gap-2 justify-center'
        >
          <Edit2Icon />
          Edit
        </Link>
        <div className='w-full'>
          <DeletePropertyDialog propertyId={property._id.toString()} />
        </div>
      </div>
    </div>
  );
}
