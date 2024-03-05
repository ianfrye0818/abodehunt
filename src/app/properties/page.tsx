import data from '@/_data/properties.json';
import PropertyCard from '@/components/PropertyCard';
export default function PropertiesPage() {
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {data.map((property) => (
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
