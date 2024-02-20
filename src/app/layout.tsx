import React from 'react';
import '@/assets/styles/global.css';
export const metadata = {
  title: 'Property Pulse | Find the perfect rental',
  description:
    'Find your next rental property with Property Pulse. Search for apartments, houses, and condos for rent in your area.',
  keywords: 'rental, find rentals, find properties',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
