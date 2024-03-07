'use client';
import React from 'react';
import Link from 'next/link';
import { FaHeart, FaMailBulk, FaMailchimp } from 'react-icons/fa';
import { SignInButton, SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

export default function MenuDrawer({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();

  const handleClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
      <div className='space-y-1 px-2 pb-3 pt-2'>
        <Link
          onClick={handleClick}
          href='/'
          className={`${
            pathname === '/' && 'bg-gray-900'
          } text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium`}
        >
          Home
        </Link>
        <Link
          onClick={handleClick}
          href='/properties'
          className={`${
            pathname === '/properties' && 'bg-gray-900'
          } text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium`}
        >
          Properties
        </Link>
        <Link
          onClick={handleClick}
          href='/properties/add'
          className={` ${
            pathname === '/properties/add' && 'bg-gray-900'
          } text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium`}
        >
          Add Property
        </Link>
        <SignedIn>
          <Link
            onClick={handleClick}
            href='/favorites'
            className={` ${
              pathname === '/favorites' && 'bg-gray-900'
            } text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium flex gap-2 items-center`}
          >
            Favorites <FaHeart className='text-red-600' />
          </Link>
          <Link
            onClick={handleClick}
            href='/messages'
            className={` ${
              pathname === '/messages' && 'bg-gray-900'
            } text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium flex gap-2 items-center`}
          >
            Messages <FaMailBulk className='text-white' />
          </Link>
          <div className='flex items-center text-white bg-black justify-center hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'>
            <SignOutButton>Sign out</SignOutButton>
          </div>
        </SignedIn>
        <SignedOut>
          <div className='flex text-center justify-center items-center max text-white bg-gray-900 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'>
            <SignInButton>Login</SignInButton>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}
