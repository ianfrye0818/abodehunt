import { Property } from '@/types';
import { fetchFeaturedProperties } from '@/utils/requests';
import PropertyCard from './PropertyCard';

export default async function FeaturedProperties() {
  const featuredProperties = await fetchFeaturedProperties();

  if (!featuredProperties || featuredProperties.length === 0) return null;

  return (
    <section className='bg-blue-50 px-4 pt-6 pb-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>Featured Properties</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {featuredProperties.map((property: Property) => (
            <PropertyCard
              property={property}
              key={property._id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
