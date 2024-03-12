import { currentUser } from '@clerk/nextjs';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fetchUserProperties } from '@/actions/propertyActions';
import NoPropertiesPage from './no-properties';
import ProfileListingCard from './profile-listing-card';
import { redirect } from 'next/navigation';

export default async function HostProfilePage() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');
  const properties = await fetchUserProperties(user.id);

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Profile</h1>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/4 mx-20 mt-10'>
              <div className='mb-4'>
                <Avatar>
                  <AvatarImage
                    src={user.imageUrl}
                    alt={
                      user.firstName && user.lastName ? user.firstName + ' ' + user.lastName : ''
                    }
                  />
                  <AvatarFallback>
                    {user.firstName && user.lastName
                      ? user.firstName[0] + ' ' + user.lastName[0]
                      : ''}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h2 className='text-2xl mb-4'>
                <span className='font-bold block'>Name: </span> {user.firstName || ''}
              </h2>
              <h2 className='text-2xl'>
                <span className='font-bold block'>Email: </span>{' '}
                {user.emailAddresses[0].emailAddress || ''}
              </h2>
            </div>

            <div className='md:w-3/4 md:pl-4'>
              <h2 className=' text-xl font-semibold mb-4'>Your Listings</h2>
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
