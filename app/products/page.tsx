'use client';

import Stepper, { Step } from '@/app/components/Stepper';
import { useEffect, useState } from 'react';
import ProductList from './ProductList';
import { useQuery } from '@tanstack/react-query';
import fetchProducts from '@/lib/api';

export default function Products() {
  const [boolean, setBoolean] = useState(true);
  const [firstCategory, setFirstCategory] = useState('');
  const [secondCategory, setSecondCategory] = useState('');
  const [thirdCategory, setThirdCategory] = useState('');
  const [imageIndex, setImageIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);

  const { data, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    enabled: !boolean,
  });

  function handleImageIndex() {
    setImageIndex((cur) => cur++);
  }
  {
    console.log(data);
  }

  return (
    <div className='flex justify-center items-center h-screen'>
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
      ) : //Loading the products (one at a time)
      isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <img
            src={data.productImages[0].url}
            alt={data.productImages[imageIndex]?.alt}
            onClick={handleImageIndex}
          />
        </div>
      )}
    </div>
  );
}
