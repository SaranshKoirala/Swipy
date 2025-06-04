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
    <nav className='flex justify-between items-center w-full px-5 '>
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
      <button
        className='bg-black text-white px-5 py-2 rounded-xl font-semibold hover:bg-gray-500 hover:text-white'
        onClick={() => setIsOpen(true)}>
        Login
      </button>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <form className='relative flex flex-col justify-center items-center gap-5 p-3 text-black'>
            <IoIosClose
              className='absolute -top-5 -right-5 text-black text-4xl cursor-pointer'
              onClick={() => setIsOpen(false)}
            />
            <h2 className='text-black font-bold text-2xl'>Get Started</h2>

            <input
              placeholder='Email'
              type='email'
              className='w-full p-3 bg-gray-200 focus:outline-none rounded-md'
            />

            <input
              placeholder='Password'
              type='password'
              className='w-full p-3 bg-gray-200 focus:outline-none rounded-md'
            />

            <button className='bg-gradient-to-r from-red-500 to-orange-600 w-32 px-2 py-1 rounded-2xl mt-2 text-lg'>
              Log In
            </button>
          </form>
        </Modal>
      )}
    </nav>
  );
}
