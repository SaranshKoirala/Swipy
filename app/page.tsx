'use client';

import BlurText from './components/BlurText';
import SplashCursor from './components/SplashCursor';
import Link from 'next/link';
import { useUIStore } from '@/store/useUIStore';

export default function Home() {
  const user = useUIStore((state) => state.user);

  return (
    <div className='relative flex flex-col justify-center items-center gap-8 w-full min-h-[85vh]'>
      <SplashCursor />

      <BlurText
        text='Swipe something epic.'
        delay={150}
        animateBy='words'
        direction='top'
        className='font-extrabold text-8xl tracking-tight'
      />

      {!user ? (
        <Link href={'/products'}>
          <button className='bg-gradient-to-r from-red-500 to-orange-600 px-5 py-2 rounded-3xl text-white text-xl hover:scale-x-110 transition-all duration-300 transform'>
            Start Swipping
          </button>
        </Link>
      ) : (
        <div className='flex justify-center items-center gap-1 bg-gradient-to-r from-orange-500 to-red-600 px-5 py-2 rounded-3xl text-white text-xl hover:scale-x-110 transition-all duration-300 transform'>
          <p>Welcome,</p>
          <p className='font-bold'>{user.name.split(' ')[0]}</p>{' '}
        </div>
      )}
    </div>
  );
}
