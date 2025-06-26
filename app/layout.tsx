import type { Metadata } from 'next';
import './globals.css';
import Navigation from './components/Navigation';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Swipy | E-commerce Site',
  description: 'Tinder but E-commerce site.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='bg-black text-white h-screen overflow-hidden'>
        <Providers>
          <header>
            <Navigation />
          </header>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
