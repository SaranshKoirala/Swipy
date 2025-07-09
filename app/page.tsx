'use client';

import BlurText from './components/BlurText';
import SplashCursor from './components/SplashCursor';
import Link from 'next/link';
import { useUIStore } from '@/store/useUIStore';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

export default function Home() {
  const user = useUIStore((state) => state.user);

  return (
    <div className='relative min-h-[90vh] w-full flex flex-1 flex-col justify-center items-center gap-8'>
      <SplashCursor />

      <BlurText
        text='Swipe something epic.'
        delay={150}
        animateBy='words'
        direction='top'
        className='text-9xl font-bold tracking-tight'
      />

      {!user ? (
        <Link href={'/signup'}>
          <button className='px-5 py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-3xl text-xl  hover:scale-x-110 transform transition-all duration-300'>
            Create Account
          </button>
        </Link>
      ) : (
        <div className='flex gap-1 justify-center items-center px-5 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-3xl text-xl  hover:scale-x-110 transform transition-all duration-300'>
          <p>Welcome,</p>
          <p className='font-bold'>{user.name.split(' ')[0]}</p>{' '}
        </div>
      )}
    </div>
  );
}
