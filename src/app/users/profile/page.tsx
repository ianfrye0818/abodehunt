import { currentUser } from '@clerk/nextjs';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fetchUserProperties } from '@/actions/propertyActions';
import NoPropertiesPage from '../../../components/no-properties';
import ProfileListingCard from './profile-listing-card';
import { redirect } from 'next/navigation';

export default async function HostProfilePage() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');
  const properties = await fetchUserProperties(user.id);

  return (
    <section className='bg-blue-50 h-full'>
      <div className='md:container m-auto md:py-24'>
        <div className='bg-white px-6 py-8 mb-4 md:shadow-md rounded-md md:border m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Listings</h1>
          <div className='flex flex-col md:flex-row'>
            <div className='w-full md:pl-4'>
              {properties && properties.length > 0 ? (
                <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {properties.map((property) => (
                    <ProfileListingCard
                      property={property}
                      key={property._id}
                    />
                  ))}
                </div>
              ) : (
                <NoPropertiesPage />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
