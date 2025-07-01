'use client';

import Image from 'next/image';
import swipy from '../../public/swipy.png';
import Link from 'next/link';
import { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import Modal from './Modal';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className='flex justify-between items-center w-full px-5 bg-opacity-0'>
      <div className='flex items-center gap-4'>
        <Link href={'/'}>
          <Image src={swipy} alt='swipy logo' width={'120'} height={'120'} />
        </Link>

        <ul className='flex gap-5 '>
          <Link href={'/products'} className='hover:text-red-500'>
            <li>Products</li>
          </Link>
          <Link href={'/about'} className='hover:text-orange-600'>
            <li>About</li>
          </Link>
          <Link href={'/downloads'} className='hover:text-red-500'>
            <li>Download</li>
          </Link>
        </ul>
      </div>
      <Link href={'/login'}>
        <button
          className='bg-black text-white px-5 py-2 rounded-xl font-semibold hover:bg-gray-500 hover:text-white'
          onClick={() => setIsOpen(true)}>
          Login
        </button>
      </Link>
    </nav>
  );
}
