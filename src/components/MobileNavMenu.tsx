'use client';
import React, { useEffect, useRef, useState } from 'react';
import MenuDrawer from './MenuDrawer';
import { Button } from './ui/button';
import { FaHeart, FaMailBulk } from 'react-icons/fa';
import { SignInButton, SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNavMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLElement | null>(null);
  const profileMenuRef = useRef<HTMLElement | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !(mobileMenuRef.current as HTMLElement).contains(e.target as Node) &&
        !(e.target as HTMLElement)?.matches?.('#mobile-dropdown-button') &&
        isMobileMenuOpen
      ) {
        setIsMobileMenuOpen(false);
      }
      if (
        profileMenuRef.current &&
        !(profileMenuRef.current as HTMLElement).contains(e.target as Node) &&
        !(e.target as HTMLElement)?.matches?.('#user-menu-button') &&
        isProfileMenuOpen
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMobileMenuOpen, isProfileMenuOpen]);

  const handleClick = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <div className='space-y-1 px-2 pb-3 pt-2'>
      <Button
        type='button'
        id=''
        className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white bg-transparent'
        aria-controls='mobile-menu'
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        Open
      </Button>
      <div
        className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        id='mobile-menu'
      >
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
    </div>
  );
}
