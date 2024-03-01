import React from 'react';
import '@/assets/styles/global.css';
import Navbar from '@/components/NavBar';
export const metadata = {
  title: 'Property Pulse | Find the perfect rental',
  description:
    'Find your next rental property with Property Pulse. Search for apartments, houses, and condos for rent in your area.',
  keywords: 'rental, find rentals, find properties',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
