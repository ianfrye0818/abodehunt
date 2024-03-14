import PropertyCard from '@/components/PropertyCard';
import { queryLocation } from '@/utils/queryLocation';
import NoPropertiesPage from '../../components/no-properties';
import Link from 'next/link';

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { location, type } = searchParams;

  const properties = await queryLocation(location, type);
  if (!properties || properties.length === 0) return <NoPropertiesPage />;

  return (
    <>
      {' '}
      <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {properties.map((property) => (
          <div
            key={property._id}
            className='text-2xl'
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
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
