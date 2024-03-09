import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/types';
import { fetchUsersFavoriteProperties } from '@/utils/propertyRequests';
import { currentUser } from '@clerk/nextjs';

export default async function FavoritesPage() {
  const user = await currentUser();
  const userBookmarks = user?.publicMetadata?.bookmarks as string[] | undefined;
  const properties = await fetchUsersFavoriteProperties(userBookmarks || []);

  if (!properties || properties.length === 0) return <div>No favorite properties found</div>;
  return (
    <section className='px-4 py-6'>
      <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>Favorite Properties</h2>

      <div className='container-xl lg:container m-auto px-4 py-6'>
        <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {properties.map((property: Property) => (
            <PropertyCard
              key={property._id}
              property={property}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
