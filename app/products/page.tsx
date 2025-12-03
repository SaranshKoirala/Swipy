'use client';

import { GrFormClose } from 'react-icons/gr';
import { FaCartShopping } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchProducts from '@/lib/api';
import Modal from '../components/Modal';
import { useUIStore } from '@/store/useUIStore';
import { ObjectId } from 'mongoose';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';

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

export default function Products() {
  const [boolean, setBoolean] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [tempKeyword, setTempKeyword] = useState('');
  const [imageIndex, setImageIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(
    null
  );

  const router = useRouter();

  const addToCart = useUIStore((state) => state.addToCart);
  const addToFavourite = useUIStore((state) => state.addToFavourite);
  const user = useUIStore((state) => state.user);
  const favourite = useUIStore((state) => state.favourite);

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
      e.preventDefault();
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

  function handleFavouriteBtn(product: Product) {
    if (!product) return;
    addToFavourite(product);
    toast.success('Added to favourite!');
    setSwipeDirection('right');
    setTimeout(() => {
      handleProductIndex();
      setSwipeDirection(null);
    }, 300);
  }

  function handleCartBtn(product: Product) {
    if (!product) return;
    if (!user) {
      toast.error('You need to login first!');
      router.push('/login');
      return;
    }
    addToCart(product);
    toast.success(`${product.productName} added to cart!`);
    setSwipeDirection('right');
    setTimeout(() => {
      handleProductIndex();
      setSwipeDirection(null);
    }, 300);
  }

  return (
    <div
      className='relative flex flex-col justify-center items-center min-h-[85vh] overflow-y-hidden'
      onKeyDown={listenKeys}
      tabIndex={0}>
      {boolean && (
        <div className='top-4 z-50 absolute'>
          <Modal onClose={() => setBoolean(false)}>
            <input
              autoFocus
              placeholder='Search products'
              value={tempKeyword}
              onChange={(e) => setTempKeyword(e.target.value)}
              onKeyDown={listenEnterKey}
              className='bg-neutral-900 px-4 py-2 rounded-lg focus:outline-none w-96 h-12 placeholder:text-neutral-400'
            />
          </Modal>
        </div>
      )}

      {isLoading ? (
        <ClipLoader size={40} color='#fff' />
      ) : error ? (
        <div className='text-red-500'>Something went wrong</div>
      ) : data.length === 0 ? (
        <div>No products found!</div>
      ) : (
        <div className='relative py-5'>
          <div className='px-5 py-2 font-bold text-xl text-center'>
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
            <div className='top-1 absolute flex gap-2 px-4 w-full'>
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

            <div className='w-[425px] h-[475px]'>
              <img
                src={data?.[productIndex]?.productImages[imageIndex]?.url}
                alt={data?.[productIndex]?.productImages[imageIndex]?.alt}
                onClick={handleImageIndex}
                loading='eager'
                className='rounded-lg w-full h-full object-cover cursor-pointer'
              />
            </div>

            <div className='right-0 bottom-0 left-0 absolute bg-gradient-to-t from-black to-transparent h-[200px]'></div>

            <p className='-bottom-2 left-5 absolute font-semibold text-xl'>
              Rs.{data?.[productIndex]?.productPrice}
            </p>
          </div>

          <div className='flex justify-center items-center gap-10 mt-4'>
            <button
              className={`w-10 h-10 rounded-full bg-white flex items-center justify-center text-4xl font-bold transition-all ease-in-out duration-300 text-red-500 hover:bg-red-500 hover:text-white hover:scale-125 ${
                swipeDirection === 'left' ? 'animate-ping bg-red-500' : ''
              }`}
              onClick={handleCloseBtn}>
              <GrFormClose />
            </button>
            <button
              className={`w-10 h-10 rounded-full bg-white flex items-center justify-center text-2xl font-bold text-green-500 transition-all ease-in-out duration-300 hover:bg-green-500 hover:text-white hover:scale-125 ${
                swipeDirection === 'right' ? 'animate-ping bg-green-500' : ''
              }`}
              onClick={() => handleFavouriteBtn(data?.[productIndex])}>
              <FaHeart />
            </button>
            <button
              className='flex justify-center items-center bg-white rounded-full w-10 h-10 text-neutral-900 text-2xl'
              onClick={() => handleCartBtn(data?.[productIndex])}>
              <FaCartShopping />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
