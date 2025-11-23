'use client';

import Image from 'next/image';
import swipy from '../../public/swipy.png';
import Link from 'next/link';
import { useUIStore } from '@/store/useUIStore';
import { FaShoppingCart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';

export default function Navigation() {
  const user = useUIStore((state) => state.user);
  const cart = useUIStore((state) => state.cart);
  const favourite = useUIStore((state) => state.favourite);
  return (
    <nav className='flex justify-between items-center bg-opacity-0 px-5 w-full'>
      <div className='flex items-center gap-4'>
        <Link href={'/'}>
          <Image src={swipy} alt='swipy logo' width={'120'} height={'120'} />
        </Link>

        <ul className='flex gap-5'>
          <Link href={'/products'} className='hover:text-red-500'>
            <li>Products</li>
          </Link>
          <Link href={'/about'} className='hover:text-orange-600'>
            <li>About</li>
          </Link>
          <Link href={'/downloads'} className='hover:text-red-500'>
            <li>Download</li>
          </Link>
          {!user && (
            <Link href={'/login'} className='hover:text-red-500'>
              <li>Login</li>
            </Link>
          )}
        </ul>
      </div>
      <div className='flex gap-6 px-5 text-xl'>
        <Link href={'/favourite'} className='group relative'>
          <div
            className={`absolute font-bold text-sm text-white -right-2 -top-1 ${
              favourite?.length > 0 ? 'block' : 'hidden'
            }`}>
            {favourite?.length}
          </div>
          <button>
            <FaHeart />
          </button>
          <div className='hidden group-hover:block absolute bg-white px-2 text-black text-sm'>
            Favourite
          </div>
        </Link>

        <Link href={'/cart'} className='group relative'>
          <div
            className={`absolute font-bold text-sm text-white -right-2 -top-1 ${
              cart?.length > 0 ? 'block' : 'hidden'
            }`}>
            {cart?.length}
          </div>
          <button>
            <FaShoppingCart />
          </button>
          <div className='hidden group-hover:block -left-3 absolute bg-white px-2 text-black text-sm'>
            Cart
          </div>
        </Link>
      </div>
    </nav>
  );
}
