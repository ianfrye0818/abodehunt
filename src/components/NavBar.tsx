'use client';
import Image from 'next/image';
import logo from '@/assets/images/logo-white.png';
import profileDefault from '@/assets/images/profile.png';
import Link from 'next/link';
import { FaGoogle, FaHeart } from 'react-icons/fa';
import { Button } from './ui/button';
import { LegacyRef, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLElement | null>(null);
  const profileMenuRef = useRef<HTMLElement | null>(null);
  const { isSignedIn } = useUser();

  const pathname = usePathname();

  //useEffect to handle outside click and close the mobile and profile menu
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

  return (
    <nav className='bg-blue-700 border-b border-blue-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center md:hidden'>
            {/* <!-- Mobile menu button--> */}
            <Button
              type='button'
              id='mobile-dropdown-button'
              className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white bg-transparent'
              aria-controls='mobile-menu'
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className='absolute -inset-0.5'></span>
              <span className='sr-only'>Open main menu</span>
              <svg
                className='block h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                aria-hidden={isMobileMenuOpen}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            </Button>
          </div>

          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            {/* <!-- Logo --> */}
            <Link
              className='flex flex-shrink-0 items-center'
              href='/'
            >
              <Image
                className='h-10 w-auto'
                src={logo}
                alt='PropertyPulse'
              />

              <span className='hidden lg:block text-white text-2xl font-bold ml-2'>AbodeHunt</span>
            </Link>
            {/* <!-- Desktop Menu Hidden below md screens --> */}
            <div className='hidden md:ml-6 md:block'>
              <div className='flex space-x-2'>
                <Link
                  href='/'
                  className={`text-white ${
                    pathname === '/' && 'bg-black'
                  }  hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                >
                  Home
                </Link>
                <Link
                  href='/properties'
                  className={`text-white ${
                    pathname === '/properties' && 'bg-black'
                  } hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                >
                  Properties
                </Link>
                <Link
                  href='/properties/add'
                  className={`text-white ${
                    pathname === '/properties/add' && 'bg-black'
                  } hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                >
                  Add Property
                </Link>
              </div>
            </div>
          </div>

          {/* <!-- Right Side Menu (Logged Out) --> */}
          {!isSignedIn && (
            <div className='hidden md:block md:ml-6'>
              <div className='flex items-center'>
                <div className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'>
                  <SignInButton>Login</SignInButton>
                </div>
              </div>
            </div>
          )}

          {/* <!-- Right Side Menu (Logged In) --> */}
          {isSignedIn && (
            <div className='absolute inset-y-0 right-0 flex gap-5 items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0'>
              <Link
                href='/favorites'
                className='rounded-full p-2 bg-white w-8 h-8'
              >
                <FaHeart className='text-red-600' />
              </Link>
              <Link
                href='/messages'
                className='relative group'
              >
                <Button
                  type='button'
                  className='w-[35px] h-[35px] p-0 bg-gray-900 relative rounded-full  text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                >
                  <span className='absolute -inset-1.5'></span>
                  <span className='sr-only'>View notifications</span>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
                    />
                  </svg>
                </Button>
                <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
                  2{/* <!-- Replace with the actual number of notifications --> */}
                </span>
              </Link>
              {/* <!-- Profile dropdown button --> */}
              <UserButton afterSignOutUrl='/' />
            </div>
          )}
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div
        className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        id='mobile-menu'
        ref={mobileMenuRef as LegacyRef<HTMLDivElement>}
      >
        <div className='space-y-1 px-2 pb-3 pt-2'>
          <Link
            href='/'
            className={`${
              pathname === '/' && 'bg-gray-900'
            } text-white block rounded-md px-3 py-2 text-base font-medium`}
          >
            Home
          </Link>
          <Link
            href='/properties'
            className={`${
              pathname === '/properties' && 'bg-gray-900'
            } text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium`}
          >
            Properties
          </Link>
          <Link
            href='/properties/add'
            className={` ${
              pathname === '/properties/add' && 'bg-gray-900'
            } text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium`}
          >
            Add Property
          </Link>
          {!isSignedIn && (
            <Button className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-4'>
              <i className='fa-brands fa-google mr-2'></i>
              <span className='flex text-white items-center gap-2'>
                <FaGoogle />
                Login or Register
              </span>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
