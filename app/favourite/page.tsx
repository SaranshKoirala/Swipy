'use client';

import { useUIStore } from '@/store/useUIStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
export default function Favourite() {
  const router = useRouter();
  const { user, favourite } = useUIStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  return (
    <div className='flex flex-col justify-start items-start gap-10 mx-32 my-10'>
      <h1>
        MY FAVOURITES{' '}
        <span className='text-[0.7rem]'>({favourite.length} items)</span>
      </h1>
      {favourite.length >= 1 ? (
        <ul className='flex flex-wrap gap-10 w-full list-none'>
          {favourite.map((item) => (
            <li key={String(item._id)} className='bg-white rounded-xl w-72'>
              <img
                src={item.productImages[0].url}
                alt={item.productImages[0].alt}
                className='mb-5 rounded-t-xl w-full h-60'
              />
              <div className='flex flex-col justify-center items-start gap-0.5 p-2 text-black'>
                <p className='text-black/80 text-sm'>{item.productName}</p>
                <p className='mb-1 font-bold text-orange-500 text-xl'>
                  Rs {item.productPrice}
                </p>
                <button className='flex justify-center items-center gap-1 bg-orange-500 py-1 rounded-md w-full text-white'>
                  <span>
                    <FaCartShopping />
                  </span>{' '}
                  Add to cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          You haven't saved any items to your wishlist yet. Start shopping and
          add your favorite items to your wishlist.
        </div>
      )}
    </div>
  );
}
