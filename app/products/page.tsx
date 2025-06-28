'use client';
import { GrFormClose } from 'react-icons/gr';
import { FaCartShopping } from 'react-icons/fa6';
import { FaRegHeart } from 'react-icons/fa6';
import Stepper, { Step } from '@/app/components/Stepper';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchProducts from '@/lib/api';
import Image from 'next/image';

export default function Products() {
  const [boolean, setBoolean] = useState(true);
  const [firstCategory, setFirstCategory] = useState('');
  const [secondCategory, setSecondCategory] = useState('');
  const [thirdCategory, setThirdCategory] = useState('');
  const [imageIndex, setImageIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);

  const { data, error, isLoading } = useQuery({
    queryKey: ['products', [firstCategory, secondCategory, thirdCategory]],
    queryFn: fetchProducts,
    enabled: !boolean,
  });

  if (error) return <div>Error loading data!</div>;

  function handleImageIndex() {
    if (imageIndex >= 1) {
      return setImageIndex(0);
    }
    setImageIndex((cur) => cur + 1);
  }

  function handleProductIndex() {
    if (productIndex >= data.length - 1) {
      return setProductIndex(0);
    }
    setProductIndex((cur) => cur + 1);
  }

  function handleCloseBtn() {
    handleProductIndex();
  }

  {
    console.log(productIndex);
  }

  return (
    <div className='flex justify-center items-center min-h-[90vh]'>
      {boolean ? (
        <Stepper
          initialStep={1}
          backButtonText='Previous'
          nextButtonText='Next'
          onFinalStepCompleted={() => setBoolean(false)}>
          <Step>
            <h2 className='mb-5 text-xl  font-semibold'>
              Swipe starts here, Drop at least 3 product interests!
            </h2>
            <input
              type='text'
              placeholder='eg.headphone'
              value={firstCategory}
              onChange={(e) => setFirstCategory(e.target.value)}
              className='w-full h-13 p-3 rounded-sm bg-neutral-700 focus:outline-none'
            />
          </Step>

          <Step>
            <h2 className='mb-5 text-xl  font-semibold'>
              Great! Add two more to unlock your product feed.
            </h2>
            <input
              type='text'
              placeholder='eg.shirt'
              value={secondCategory}
              onChange={(e) => setSecondCategory(e.target.value)}
              className='w-full h-13 p-3 rounded-sm bg-neutral-700 focus:outline-none'
            />
          </Step>

          <Step>
            <h2 className='mb-5 text-xl  font-semibold'>
              Last one! Give us your final product and let’s start swiping.
            </h2>
            <input
              type='text'
              placeholder='eg.shampoo'
              value={thirdCategory}
              onChange={(e) => setThirdCategory(e.target.value)}
              className='w-full h-13 p-3 rounded-sm bg-neutral-700 focus:outline-none'
            />
          </Step>
        </Stepper>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        // Loading the products
        <div className='relative flex flex-col justify-center items-center'>
          <div className='text-white px-5 py-2 font-bold text-2xl text-center '>
            {data[productIndex].productName}
          </div>
          <div className=' relative h-[510px] w-[480px] '>
            <div className='flex gap-2 absolute top-1 w-full px-4'>
              <div
                className={
                  imageIndex === 1
                    ? `w-1/2 h-1 bg-neutral-400`
                    : `w-1/2 bg-neutral-900`
                }></div>
              <div
                className={
                  imageIndex === 0
                    ? `w-1/2  h-1 bg-neutral-400`
                    : `w-1/2 bg-neutral-900`
                }></div>
            </div>

            <img
              src={data[productIndex]?.productImages[imageIndex]?.url}
              alt={data[productIndex]?.productImages[imageIndex]?.alt}
              onClick={handleImageIndex}
              className=' object-cover rounded-lg h-full w-full cursor-pointer'
            />
            <div className='absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent' />
          </div>
          <p className='text-xl font-bold absolute bottom-2 left-6'>
            Rs.{data[productIndex]?.productPrice}
          </p>
          <div className='absolute -bottom-12 flex gap-10 justify-center items-center'>
            <button
              className='w-12 h-12 rounded-full bg-white   flex items-center justify-center text-4xl text-neutral-900 '
              onClick={handleCloseBtn}>
              <GrFormClose />
            </button>
            <button className=' w-12 h-12 rounded-full bg-white   flex items-center justify-center text-2xl text-neutral-900'>
              <FaRegHeart />
            </button>
            <button className=' w-12 h-12 rounded-full bg-white   flex items-center justify-center text-2xl text-neutral-900'>
              <FaCartShopping />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
