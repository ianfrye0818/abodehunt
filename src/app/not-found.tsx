'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Component() {
  const router = useRouter();

  return (
    <div className='flex flex-col min-h-[100dvh]'>
      <header className='flex flex-col h-[calc(100vh_-_1rem)] items-center justify-center gap-2 px-4 text-center md:px-6'>
        <div className='space-y-2'>
          <h1 className='text-4xl font-bold tracking-tighter sm:text-6xl'>
            404 Error - Page Not Found
          </h1>
          <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400'>
            The page you are looking for might have been removed, had its name changed, or is
            temporarily unavailable.
          </p>
        </div>
        <form className='flex max-w-sm flex-col gap-2 mx-auto'></form>
        <Button onClick={() => router.back()}>Go Back</Button>
      </header>
    </div>
  );
}
