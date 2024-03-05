import Link from 'next/link';
import React from 'react';
import InfoBox from './InfoBox';

export default function InfoBoxes() {
  return (
    <section>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <InfoBox
            backgroundColor='bg-gray-100'
            buttonInfo={{
              textColor: 'text-white',
              text: 'Browse Properties',
              href: '/properties',
              backgroundColor: 'bg-black',
              hoverBgColor: 'hover:bg-gray-800',
            }}
            heading='For Renters'
          >
            Find your dream rental property. Bookmark properties and contact owners.
          </InfoBox>

          <InfoBox
            backgroundColor='bg-blue-100'
            buttonInfo={{
              textColor: 'text-white',
              text: 'Add Property',
              href: '/properties/add',
              backgroundColor: 'bg-blue-500',
              hoverBgColor: 'hover:bg-blue-700',
            }}
            heading='For Property Owners'
          >
            List your properties and reach potential tenants. Rent as an airbnb or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
}
