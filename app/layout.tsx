'use client';

import './globals.css';
import Navigation from './components/Navigation';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useUIStore } from '@/store/useUIStore';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const setUser = useUIStore((state) => state.setUser);

  useEffect(() => {
    const refreshUser = async () => {
      try {
        // 1️⃣ Refresh access token
        const refreshRes = await fetch('/api/users/auth/refresh', {
          method: 'POST',
          credentials: 'include', // send cookies
        });

        if (!refreshRes.ok) return;

        // 2️⃣ Get user info
        const userRes = await fetch('/api/users/auth/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (!userRes.ok) return;

        const data = await userRes.json();
        if (data.user) {
          setUser({
            id: data.user._id,
            name: data.user.name,
            email: data.user.email,
          });
        }
      } catch (err) {
        console.error('Error refreshing user:', err);
      }
    };

    refreshUser();
  }, [setUser]);

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
