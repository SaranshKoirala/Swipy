import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
