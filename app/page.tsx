'use client';

import { useState } from 'react';
import BlurText from './components/BlurText';
import Navigation from './components/Navigation';
import Modal from '@/app/components/Modal';

export default function Home() {
  return (
    <div className='relative bg-black h-screen w-full flex flex-col justify-center items-center'>
      <Navigation />

      <div className='flex flex-1 flex-col justify-center items-center gap-8'>
        <BlurText
          text='Swipe something epic.'
          delay={150}
          animateBy='words'
          direction='top'
          className='text-9xl font-bold'
        />
        {/* <h1 className='text-9xl font-bold'>Swipe something epic.</h1> */}
        {/* <button className='px-5 py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-3xl text-xl  hover:scale-x-110 transform transition-all duration-300'>
          Create account
        </button> */}
        <Modal />
      </div>
    </div>
  );
}
