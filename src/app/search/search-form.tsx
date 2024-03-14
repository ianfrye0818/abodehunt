'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchForm() {
  const [formState, setFormState] = useState({
    location: '',
    type: 'all',
  });
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/search?location=${formState.location}&type=${formState.type}`);
      }}
      className='flex flex-col md:flex-row items-center gap-4 md:gap-1'
    >
      <div className='relative w-full'>
        <Input
          placeholder='Location (e.g. Boston)'
          className='full md:w-[250px] w-full indent-3'
          type='search'
          value={formState.location}
          onChange={(e) => setFormState({ ...formState, location: e.target.value })}
        />
        <SearchIcon className='w-4 h-4 absolute left-1 top-[50%] translate-y-[-50%] opacity-55 ' />
      </div>
      <select
        className='md:max-w-[250px] w-full py-2 px-3 border border-gray-200 rounded-md'
        value={formState.type}
        onChange={(e) => setFormState({ ...formState, type: e.target.value })}
      >
        <option value='all'>All</option>
        <option value='apartment'>Apartment</option>
        <option value='loft'>Loft</option>
        <option value='condo'>Condo</option>
        <option value='studio'>Studio</option>
        <option value='house'>House</option>
        <option value='cabin or cottage'>Cabin or Cottage</option>
        <option value='room'>Room</option>
        <option value='other'>Other</option>
      </select>
      <Button
        size='sm'
        type='submit'
        className='flex items-center text-md w-full md:w-auto p-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500'
      >
        Search
      </Button>
    </form>
  );
}
