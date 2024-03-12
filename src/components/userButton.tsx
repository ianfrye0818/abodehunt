'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
// Import useUser() and useClerk()
import { useUser, useClerk } from '@clerk/nextjs';
// Import Next's router
import { useRouter } from 'next/navigation';
// Import the Image element
import Image from 'next/image';
// Import Link to add more buttons to the menu
import Link from 'next/link';
import { Avatar, AvatarImage } from './ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';

export const UserButton = () => {
  // Grab the `isLoaded` and `user` from useUser()
  const { isLoaded, user } = useUser();
  // Grab the signOut and openUserProfile methods
  const { signOut, openUserProfile } = useClerk();
  // Get access to Next's router
  const router = useRouter();

  // Make sure that the useUser() hook has loaded
  if (!isLoaded) return null;
  // Make sure there is valid user data
  if (!user?.id) return null;
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {/* Render a button using the image and email from `user` */}
        <button className='flex flex-row rounded-xl p-1 text-black drop-shadow-md'>
          <Avatar>
            <AvatarImage
              width={30}
              src={user.imageUrl}
            />

            <AvatarFallback>
              {user.firstName && user.lastName
                ? user.firstName[0] + ' ' + user.lastName[0]
                : user.emailAddresses[0].emailAddress[0]}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className='mt-4 w-52 rounded-xl border border-gray-200 bg-white px-6 py-4 text-black drop-shadow-2xl'>
          <DropdownMenu.Label />
          <DropdownMenu.Group className='py-3 flex flex-col gap-3'>
            <DropdownMenu.Item asChild>
              {/* Create a button with an onClick to open the User Profile modal */}
              <button
                onClick={() => openUserProfile()}
                className='p-3 hover:bg-gray-100 rounded-xl w-full text-center'
              >
                Profile
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <Link
                href='/users/profile'
                passHref
                className='py-3 text-center hover:bg-gray-100 rounded-xl w-full'
              >
                Your Listings
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Item asChild>
            <button
              onClick={() => signOut(() => router.push('/'))}
              className='py-3 text-center bg-black text-white rounded-xl w-full hover:bg-gray-900 hover:text-white'
            >
              Sign Out{' '}
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
