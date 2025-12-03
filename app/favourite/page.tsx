'use client';

import { useUIStore } from '@/store/useUIStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaCartShopping } from 'react-icons/fa6';
import { ObjectId } from 'mongoose';

interface Images {
  url: string;
  alt: string;
}

interface Product {
  _id: ObjectId;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImages: Images[];
  productCategory: string;
  quantity?: number;
}

export default function Favourite() {
  const router = useRouter();
  const { user, favourite, addToCart } = useUIStore();

  function handleAddToCart(item: Product) {
    if (!item) {
      toast.error("Couldn't find the product");
    }
    addToCart(item);
    toast.success(`${item.productName} added to cart.`);
  }

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  return (
    <div className='pb-0.5'>
      <div className='mx-auto my-12 px-4 max-w-6xl'>
        {/* Heading */}
        <h1 className='mb-4 font-bold text-3xl'>
          MY FAVOURITES{' '}
          <span className='font-normal text-[0.7rem]'>
            ({favourite.length} items)
          </span>
        </h1>

        {/* Favourites List */}
        {favourite.length > 0 ? (
          <ul className='gap-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full list-none'>
            {favourite.map((item) => (
              <li
                key={String(item._id)}
                className='group bg-white shadow-sm hover:shadow-md rounded-xl overflow-hidden transition'>
                <img
                  src={item.productImages[0].url}
                  alt={item.productImages[0].alt}
                  className='rounded-t-xl w-full h-60 object-cover overflow-hidden group-hover:scale-105 transition-all duration-500'
                />

                <div className='flex flex-col gap-2 p-3 text-black'>
                  <p className='text-black/80 text-sm'>{item.productName}</p>

                  <p className='font-bold text-orange-500 text-xl'>
                    Rs {item.productPrice}
                  </p>

                  <button
                    className='flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 py-2 rounded-md w-full font-medium text-white transition'
                    onClick={() => handleAddToCart(item)}>
                    <FaCartShopping /> Add to cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className='flex flex-col justify-center items-center bg-white shadow-sm mt-10 p-10 rounded-xl text-center'>
            <p className='font-medium text-lg'>
              You haven’t saved any items to your wishlist yet.
            </p>
            <p className='mt-2 text-gray-600'>
              Start shopping and add your favorite items to your wishlist.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Section with FIXED spacing */}
      <div className='mx-auto mt-12 mb-24 px-4 max-w-6xl'>
        <div className='bg-white shadow-sm p-6 rounded-xl text-black'>
          <h2 className='mb-3 font-semibold text-2xl'>
            Get more from your favourites through the app
          </h2>

          <ul className='space-y-2 pl-6 list-disc'>
            <li>Instant notifications on items on sale or low in stock</li>
            <li>Share your favourites with friends and family</li>
            <li>See which favourite items are eligible for a voucher</li>
            <li>Get Swipy points and unlock more rewards</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
