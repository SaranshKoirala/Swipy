'use client';

import type { Metadata } from 'next';
import './globals.css';
import Navigation from './components/Navigation';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUIStore } from '@/store/useUIStore';
import { useRouter } from 'next/navigation';

// export const metadata: Metadata = {
//   title: 'Swipy | E-commerce Site',
//   description: 'Tinder but E-commerce site.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setUser = useUIStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkToken() {
      try {
        const res = await axios.get('/api/users/auth/me', {
          withCredentials: true, // ensures httpOnly cookie is sent
        });

        if (res.status === 200 && res.data.user) {
          setUser(res.data.user);
        }
      } catch (err: any) {
        if (err.response?.status === 401) {
          // token expired or invalid
          setUser(null);
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    }

    checkToken();
  }, [setUser]);

  if (loading) {
    return (
      <html lang='en'>
        <body className='flex justify-center items-center bg-black h-screen text-white'>
          <p>Loading...</p>
        </body>
      </html>
    );
  }

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
