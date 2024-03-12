import React from 'react';
import '@/assets/styles/global.css';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/toaster';
import MessageContextProvider from '@/context/messageContext';

export const metadata = {
  title: 'AbodeHunt | Find the perfect rental',
  description:
    'Find your next rental property with AbodeHunt. Search for apartments, houses, and condos for rent in your area.',
  keywords: 'rental, find rentals, find properties',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <MessageContextProvider>
        <html lang='en'>
          <body className='min-h-screen grid  grid-rows-[auto,1fr,auto] '>
            <Navbar />
            <main>{children}</main>
            <Toaster />
            <Footer />
          </body>
        </html>
      </MessageContextProvider>
    </ClerkProvider>
  );
}
