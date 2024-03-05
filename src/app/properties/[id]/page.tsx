import { Link } from 'lucide-react';
import { FaXmark } from 'react-icons/fa6';
import { FaBath, FaBed, FaBookmark, FaCheck, FaPaperPlane, FaRuler, FaShare } from 'react-icons/fa';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { handleContactFormSubmit } from '@/actions/actions';
import axios from 'axios';
import type { Property } from '@/types';

// type FormData = {
//   name: string;
//   email: string;
//   phone: string;
//   message: string;
// };

async function fetchProperty(id: string): Promise<Property | undefined> {
  const property = await axios.get('http://localhost:3000/api/properties/' + id);
  return property.data;
}

export default async function Property({ params }: { params: { id: string } }) {
  const { id } = params;

  const property = await fetchProperty(id);

  if (!property)
    return (
      <div>
        Error getting property <Link href='/'>Go back</Link>
      </div>
    );

  // async function onSubmit(data: FormData) {
  //   console.log(data);
  //   reset();
  // }

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-10 px-6'>
        <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
          <main>
            <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
              <div className='text-gray-500 mb-4'>{property?.type}</div>
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
                {property.amenities.map((amenity) => (
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
            <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
              {/* TODO: bring in map api from google */}
              <div id='map'>Map Goes here</div>
            </div>
          </main>

          {/* <!-- Sidebar --> */}
          <aside className='space-y-4'>
            <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center gap-2'>
              <FaBookmark /> Bookmark Property
            </button>
            <button className='bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center gap-2'>
              <FaShare /> Share Property
            </button>

            {/* <!-- Contact Form --> */}
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
              {/* <form action={handleContactFormSubmit}>
                <div className='mb-4'>
                  <Label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='name'
                  >
                    Name:
                  </Label>
                  <Input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='name'
                    type='text'
                    placeholder='Enter your name'
                    {...register('name', { required: 'This Feild is required' })}
                  />
                  {errors.name && (
                    <span className='text-red-500 text-xs italic'>
                      {errors.name?.message?.toString()}
                    </span>
                  )}
                </div>
                <div className='mb-4'>
                  <Label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='email'
                  >
                    Email:
                  </Label>
                  <Input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='email'
                    type='email'
                    placeholder='Enter your email'
                    {...register('email', {
                      required: 'This Feild is required',
                      pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
                    })}
                  />
                  {errors.email && (
                    <span className='text-red-500 text-xs italic'>
                      {errors.email?.message?.toString()}
                    </span>
                  )}
                </div>
                <div className='mb-4'>
                  <Label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='phone'
                  >
                    Phone:
                  </Label>
                  <Input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='phone'
                    type='text'
                    placeholder='Enter your phone number'
                    {...register('phone', {
                      pattern: { value: /^\d{10}$/, message: 'Invalid phone number' },
                    })}
                  />
                  {errors.phone && (
                    <span className='text-red-500 text-xs italic'>
                      {errors.phone?.message?.toString()}
                    </span>
                  )}
                </div>
                <div className='mb-4'>
                  <Label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='message'
                  >
                    Message:
                  </Label>
                  <Textarea
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
                    id='message'
                    placeholder='Enter your message'
                    {...register('message', { required: 'This Feild is required' })}
                  />
                  {errors.message && (
                    <span className='text-red-500 text-xs italic'>
                      {errors.message?.message?.toString()}
                    </span>
                  )}
                </div>
                <div>
                  <button
                    className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center gap-2'
                    type='submit'
                  >
                    <FaPaperPlane /> Send Message
                  </button>
                </div>
              </form> */}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
