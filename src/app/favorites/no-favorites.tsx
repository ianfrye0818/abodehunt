import Link from 'next/link';

export default function NoFavorites() {
  return (
    <div className='h-[calc(100vh-150px)] w-full flex flex-col justify-center items-center'>
      <div className='flex flex-col items-center space-y-2'>
        <h2 className='text-4xl font-medium'>No Favorites</h2>
        <p className='text-lg text-gray-500 dark:text-gray-400 flex flex-col gap-2'>
          You have no favorites yet! return to the properties page to add some.
          <Link
            className='bg-black text-white rounded-md p-3 text-center w-1/2 mx-auto hover:bg-gray-800 transition-colors duration-300 ease-in-out'
            href={'/properties'}
          >
            {' '}
            Properties{' '}
          </Link>
        </p>
      </div>
    </div>
  );
}
