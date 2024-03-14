import Link from 'next/link';
import { FaXmark } from 'react-icons/fa6';
import { FaBath, FaBed, FaCheck, FaRuler } from 'react-icons/fa';
import type { Property } from '@/types';
import { ImageCarousel } from '@/components/imageCarousel';
import { currentUser } from '@clerk/nextjs';
import DeletePropertyDialog from './delete-property-dialog';
import { fetchPropertyById } from '@/actions/propertyActions';
import ContactForm from './contact-form';
import ShareButton from './share-button';
import FavoritePropertyButton from './favorite-property-button';

export default async function Property({ params }: { params: { id: string } }) {
  const { id } = params;
  const property = (await fetchPropertyById(id)) as Property | undefined;
  const user = await currentUser();
  const userBookmarks = user?.publicMetadata?.bookmarks as string[] | undefined;

  if (!property)
    return (
      <div>
        Error getting property <Link href='/'>Go back</Link>
      </div>
    );
  const isFavorite = user && userBookmarks && userBookmarks.includes(property._id.toString());

  return (
    <section className='bg-blue-50'>
      <div className='md:container m-auto md:py-10 md:px-6'>
        <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
          <main>
            <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left relative'>
              {property.owner === user?.id && (
                <div className='absolute top-3 right-3'>
                  <DeletePropertyDialog propertyId={property._id.toString()} />
                </div>
              )}
              <div className='flex justify-center'>
                <ImageCarousel images={property.images} />
              </div>
              <div className='text-white mb-4 bg-blue-700 max-w-fit p-2 text-center rounded-md'>
                {property?.type}
              </div>
              <h1 className='text-3xl font-bold mb-4'>{property.name}</h1>
              <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
                <i className='fa-solid fa-location-dot text-lg text-orange-700 mr-2'></i>
                <p className='text-orange-700'>
                  {property.location.street} {property.location.city} {property.location.state}{' '}
                  {property.location.zipcode}
                </p>
              </div>

              <h3 className='text-lg font-bold my-6 bg-gray-800 text-white p-2'>Rates & Options</h3>
              <div className='flex flex-col md:flex-row justify-around'>
                <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
                  <div className='text-gray-500 mr-2 font-bold'>Nightly</div>
                  <div className='text-2xl font-bold'>
                    {property.rates.nightly ? (
                      <div className='text-2xl font-bold text-blue-500'>
                        {property.rates.nightly.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          maximumFractionDigits: 0,
                        })}
                      </div>
                    ) : (
                      <FaXmark className='text-red-700' />
                    )}
                  </div>
                </div>
                <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
                  <div className='text-gray-500 mr-2 font-bold'>Weekly</div>
                  <div className='text-2xl font-bold text-blue-500'>
                    {property.rates.weekly ? (
                      <div className='text-2xl font-bold text-blue-500'>
                        {property.rates.weekly.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          maximumFractionDigits: 0,
                        })}
                      </div>
                    ) : (
                      <FaXmark className='text-red-700' />
                    )}
                  </div>
                </div>
                <div className='flex items-center justify-center mb-4 pb-4 md:pb-0'>
                  <div className='text-gray-500 mr-2 font-bold'>Monthly</div>
                  <div className='text-2xl font-bold'>
                    {property.rates.monthly ? (
                      <div className='text-2xl font-bold text-blue-500'>
                        {property.rates.monthly.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          maximumFractionDigits: 0,
                        })}
                      </div>
                    ) : (
                      <FaXmark className='text-red-700' />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
              <h3 className='text-lg font-bold mb-6'>Description & Details</h3>
              <div className='flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9'>
                <p>
                  <FaBed />
                  {property.beds}
                  <span className='hidden sm:inline'>Beds</span>
                </p>
                <p>
                  <FaBath />
                  {property.baths}
                  <span className='hidden sm:inline'>Baths</span>
                </p>
                <p>
                  <FaRuler />
                  {property.square_feet}
                  <span className='hidden sm:inline'>sqft</span>
                </p>
              </div>
              <p className='text-gray-500 mb-4'>{property.description}</p>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
              <h3 className='text-lg font-bold mb-6'>Amenities</h3>

              <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none'>
                {property.amenities.map((amenity: string) => (
                  <li
                    key={amenity}
                    className='mb-2'
                  >
                    <FaCheck />
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </main>

          {/* <!-- Sidebar --> */}
          <aside className='space-y-4 px-4'>
            {user && (
              <FavoritePropertyButton
                propertyId={property._id.toString()}
                isFavorite={isFavorite as boolean}
              />
            )}{' '}
            <ShareButton text={property.description ?? ''} />
            {/* <!-- Contact Form --> */}
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
              <ContactForm
                propertyOwner={property.owner}
                propertyId={property._id.toString()}
                propertyName={property.name}
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
