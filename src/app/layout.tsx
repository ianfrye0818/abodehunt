import React from 'react';
import '@/assets/styles/global.css';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { ClerkProvider } from '@clerk/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';

export const metadata = {
  title: 'AbodeHunt | Find the perfect rental',
  description:
    'Find your next rental property with AbodeHunt. Search for apartments, houses, and condos for rent in your area.',
  keywords: 'rental, find rentals, find properties',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const queryClient = new QueryClient();
  return (
    <ClerkProvider>
      {/* <QueryClientProvider client={queryClient}> */}
      <html lang='en'>
        <body className='min-h-screen grid  grid-rows-[auto,1fr,auto] '>
          <Navbar />
          <main>{children}</main>
          <Toaster />
          <Footer />
        </body>
      </html>
      {/* </QueryClientProvider> */}
    </ClerkProvider>
  );
}
