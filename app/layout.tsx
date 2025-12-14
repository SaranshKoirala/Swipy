'use client';

import type { Metadata } from 'next';
import './globals.css';
import Navigation from './components/Navigation';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

// export const metadata: Metadata = {
//   title: 'Swipy | E-commerce Site',
//   description: 'Tinder but E-commerce site.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Silent refresh on app load
    fetch('/api/users/auth/refresh', {
      method: 'POST',
      credentials: 'include', // Important: send cookies
    });
  }, []);

  return (
    <html lang='en'>
      <body className='bg-black h-screen text-white'>
        <Providers>
          <header>
            <Navigation />
          </header>
          <Toaster position='bottom-right' />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
