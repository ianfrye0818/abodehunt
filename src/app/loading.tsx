export default function Loading() {
  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
      <div className='fixed inset-0 backdrop-blur-sm' />
      <div className='absolute flex items-center flex-col space-y-2'>
        <div />
        <span className='text sm font-medium text-gray-500'>Loading...</span>
      </div>
    </div>
  );
}
