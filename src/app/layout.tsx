import React from 'react';
import '@/assets/styles/global.css';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
export const metadata = {
  title: 'AbodeHunt | Find the perfect rental',
  description:
    'Find your next rental property with AbodeHunt. Search for apartments, houses, and condos for rent in your area.',
  keywords: 'rental, find rentals, find properties',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        <main className='min-h-screen'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
