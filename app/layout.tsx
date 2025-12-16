import './globals.css';
import Navigation from './components/Navigation';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import { getServerUser } from '@/lib/serverAuth';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser(); // runs on server

  return (
    <html lang='en'>
      <body className='bg-black h-screen text-white'>
        <Providers initialUser={user}>
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
