import { fetchAllProperties } from '@/actions/propertyActions';
import PropertyCard from '@/components/PropertyCard';
import SearchForm from '../search/search-form';

export default async function PropertiesPage() {
  const properties = await fetchAllProperties();
  if (!properties || properties.length === 0)
    return (
      <div className='h-full w-full flex flex-col justify-center items-center text-3xl'>
        No Properties found
      </div>
    );

  //sort properties by date by ascending order
  properties.sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto md:px-4 py-6'>
        <div className='md:flex md:justify-end mb-5'>
          <SearchForm />
        </div>
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
      </div>
    </section>
  );
}
