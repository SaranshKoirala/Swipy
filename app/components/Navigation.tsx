'use client';

import Image from 'next/image';
import swipy from '../../public/swipy.png';
import Link from 'next/link';
import { useUIStore } from '@/store/useUIStore';
import { IoMdHeartEmpty } from 'react-icons/io';
import { FiShoppingCart } from 'react-icons/fi';
import { FaShoppingCart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';

export default function Navigation() {
  const user = useUIStore((state) => state.user);
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
          {!user && (
            <Link href={'/login'} className='hover:text-red-500'>
              <li>Login</li>
            </Link>
          )}
        </ul>
      </div>
      <div className='flex gap-6 text-xl px-5'>
        <Link href={'/favourite'} className='group relative'>
          <button>
            <FaHeart />
          </button>
          <div className='absolute bg-white text-black text-sm px-2 hidden group-hover:block'>
            Favourite
          </div>
        </Link>
        <Link href={'/cart'} className='group relative'>
          <button>
            <FaShoppingCart />
          </button>
          <div className='absolute bg-white text-black text-sm px-2 hidden group-hover:block -left-3'>
            Cart:0
          </div>
        </Link>
      </div>
    </nav>
  );
}
