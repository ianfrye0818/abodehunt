import SearchForm from './search-form';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className='px-4 py-6 h-full'>
      <div className='container-xl lg:container m-auto md:px-4 py-6 h-full'>
        <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-5'>
          <h1 className='text-3xl mb-4 font-bold'>Search Results</h1>
          <SearchForm />
        </div>
        {children}
      </div>
    </section>
  );
}
