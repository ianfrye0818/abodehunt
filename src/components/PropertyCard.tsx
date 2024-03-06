import { Property } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { FaBath, FaBed, FaMoneyBill, FaRuler } from 'react-icons/fa';

type PropertCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertCardProps) {
  return (
    <div className='rounded-xl shadow-md relative'>
      <Image
        src={`/images/properties/${property.images[0]}`}
        width={0}
        height={0}
        sizes='100vw'
        alt={property.name + ' image'}
        className='w-full h-auto rounded-t-xl'
      />
      <div className='p-4'>
        <div className='text-left md:text-center lg:text-left mb-6'>
          <div className='text-gray-600'>{property.type}</div>
          <h3 className='text-xl font-bold'>{property.name}</h3>
        </div>
        <h3 className='absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          {property.rates.monthly
            ? property.rates.monthly.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }) + ' / month'
            : property.rates.weekly
            ? property.rates.weekly.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }) + ' / week'
            : property.rates.nightly
            ? property.rates.nightly.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }) + ' / night'
            : 'Contact for price'}
        </h3>

        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <FaBed />
            {property.beds}
            <span className='md:hidden lg:inline'>Beds</span>
          </p>
          <p>
            <FaBath /> {property.baths}
            <span className='md:hidden lg:inline'>Baths</span>
          </p>
          <p>
            <FaRuler /> {property.square_feet}
            <span className='md:hidden lg:inline'>sqft</span>
          </p>
        </div>

        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          {property.rates.nightly && (
            <p>
              <FaMoneyBill />{' '}
              {property.rates.nightly.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              })}{' '}
              Nightly
            </p>
          )}
          {property.rates.weekly && (
            <p>
              <FaMoneyBill />{' '}
              {property.rates.weekly.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              })}{' '}
              Weekly
            </p>
          )}
          {property.rates.monthly && (
            <p>
              <FaMoneyBill />{' '}
              {property.rates.monthly.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              })}{' '}
              Monthly
            </p>
          )}
        </div>

        <div className='border border-gray-100 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <i className='fa-solid fa-location-dot text-lg text-orange-700'></i>
            <span className='text-orange-700'> {property.location.city} </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className='h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
