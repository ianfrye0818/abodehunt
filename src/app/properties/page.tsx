import PropertyCard from '@/components/PropertyCard';
import axios from 'axios';
import { Property } from '@/types';

async function fetchProperties(): Promise<Property[] | undefined | null> {
  try {
    const response = await axios.get('http://localhost:3000/api/properties');
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
  }
}

export default async function PropertiesPage() {
  const properties = await fetchProperties();
  if (!properties) return null;
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
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
