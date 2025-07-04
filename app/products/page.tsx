'use client';
import { GrFormClose } from 'react-icons/gr';
import { FaCartShopping } from 'react-icons/fa6';
import { FaRegHeart } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchProducts from '@/lib/api';
import Modal from '../components/Modal';

// interface ProductImage {
//   url: string;
//   alt: string;
// }

// interface Product {
//   productName: string;
//   productDescription: string;
//   productPrice: string;
//   productImages: ProductImage[];
//   productCategory: string;
// }

export default function Products() {
  const [boolean, setBoolean] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [tempKeyword, setTempKeyword] = useState('');
  const [imageIndex, setImageIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(
    null
  );

  const { data, error, isLoading } = useQuery({
    queryKey: ['products', searchKeyword],
    queryFn: () => fetchProducts(searchKeyword),
  });

  function handleImageIndex() {
    if (imageIndex >= 1) {
      return setImageIndex(0);
    }
    setImageIndex((cur) => cur + 1);
  }

  function handleProductIndex() {
    setProductIndex((cur) => {
      const length = data?.length || 0;
      if (cur >= length - 1) {
        return 0;
      }
      return cur + 1;
    });
  }

  function listenKeys(e: React.KeyboardEvent<HTMLElement>) {
    if (e.ctrlKey && e.key === 'k') {
      setBoolean(true);
    }
  }

  function listenEnterKey(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === 'Enter') {
      setBoolean(false);
      setSearchKeyword(tempKeyword);
      setTempKeyword('');
    }
  }

  function handleCloseBtn() {
    setSwipeDirection('left');
    setTimeout(() => {
      handleProductIndex();
      setSwipeDirection(null);
    }, 300);
  }

  function handleFavouriteBtn() {
    setSwipeDirection('right');
    setTimeout(() => {
      handleProductIndex();
      setSwipeDirection(null);
    }, 300);
  }

  return (
    <div
      className='relative flex flex-col justify-center min-h-[90vh] items-center'
      onKeyDown={listenKeys}
      tabIndex={0}>
      {boolean && (
        <div className='absolute top-4 z-50'>
          <Modal onClose={() => setBoolean(false)}>
            <input
              autoFocus
              placeholder='Search products'
              value={tempKeyword}
              onChange={(e) => setTempKeyword(e.target.value)}
              onKeyDown={listenEnterKey}
              className='w-96 h-12 rounded-lg bg-neutral-900 py-2 px-4 placeholder:text-neutral-400 focus:outline-none'
            />
          </Modal>
        </div>
      )}

      {isLoading ? (
        <div>...Loading</div>
      ) : error ? (
        <div className='text-red-500'>Something went wrong</div>
      ) : (
        <div className='relative '>
          <div className='px-5 py-2 font-bold text-2xl text-center'>
            {data?.[productIndex]?.productName}
          </div>

          <div
            className={`relative transition-all duration-300 ease-in-out ${
              swipeDirection === 'left'
                ? '-translate-x-[400px] rotate-[-20deg] opacity-0'
                : swipeDirection === 'right'
                ? 'translate-x-[400px] rotate-[20deg] opacity-0'
                : ''
            }`}>
            <div className='absolute flex gap-2 top-1 w-full px-4'>
              <div
                className={
                  imageIndex === 1
                    ? 'w-1/2 h-1 bg-neutral-400'
                    : 'w-1/2 bg-neutral-900'
                }></div>
              <div
                className={
                  imageIndex === 0
                    ? 'w-1/2 h-1 bg-neutral-400'
                    : 'w-1/2 bg-neutral-900'
                }></div>
            </div>

            <div className='h-[525px] w-[480px]'>
              <img
                src={data?.[productIndex]?.productImages[imageIndex]?.url}
                alt={data?.[productIndex]?.productImages[imageIndex]?.alt}
                onClick={handleImageIndex}
                loading='eager'
                className='object-cover rounded-lg h-full w-full cursor-pointer'
              />
            </div>

            <div className='absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent'></div>

            <p className='absolute left-5 -bottom-2 text-2xl font-semibold'>
              Rs.{data?.[productIndex]?.productPrice}
            </p>
          </div>

          <div className='flex gap-10 justify-center items-center m-6 '>
            <button
              className={`w-12 h-12 rounded-full bg-white flex items-center justify-center text-4xl font-bold transition-all ease-in-out duration-300 text-red-500 hover:bg-red-500 hover:text-white hover:scale-125 ${
                swipeDirection === 'left' ? 'animate-ping bg-red-500' : ''
              }`}
              onClick={handleCloseBtn}>
              <GrFormClose />
            </button>
            <button
              className={`w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-bold text-green-500 transition-all ease-in-out duration-300 hover:bg-green-500 hover:text-white hover:scale-125 ${
                swipeDirection === 'right' ? 'animate-ping bg-green-500' : ''
              }`}
              onClick={handleFavouriteBtn}>
              <FaHeart />
            </button>
            <button className='w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl text-neutral-900'>
              <FaCartShopping />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
