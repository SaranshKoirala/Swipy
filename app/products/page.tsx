'use client';
import { GrFormClose } from 'react-icons/gr';
import { FaCartShopping } from 'react-icons/fa6';
import { FaRegHeart } from 'react-icons/fa6';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchProducts from '@/lib/api';

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
  const [searchKeyword, setSearchKeyword] = useState('');
  const [imageIndex, setImageIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);

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

  return (
    <div className=' flex flex-col justify-center min-h-[90vh] items-center'>
      {isLoading ? (
        <div>...Loading</div>
      ) : (
        <div className='relative'>
          <div className=' px-5 py-2 font-bold text-2xl text-center  '>
            {data?.[productIndex]?.productName}
          </div>
          <div className='relative '>
            <div className='absolute flex gap-2  top-1 w-full px-4'>
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
            <div className='h-[525px] w-[480px]'>
              <img
                src={data?.[productIndex]?.productImages[imageIndex]?.url}
                alt={data?.[productIndex]?.productImages[imageIndex]?.alt}
                onClick={handleImageIndex}
                loading='eager'
                className=' object-cover rounded-lg h-full w-full  cursor-pointer'
              />
            </div>
            <div className='absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent'></div>
            <p className='absolute left-5 -bottom-2 text-2xl font-semibold   '>
              Rs.{data?.[productIndex]?.productPrice}
            </p>
          </div>
          <div className='flex gap-10 justify-center items-center m-6'>
            <button
              className='w-12 h-12 rounded-full bg-white  flex items-center justify-center text-4xl text-neutral-900 '
              onClick={handleProductIndex}>
              <GrFormClose />
            </button>
            <button
              className=' w-12 h-12 rounded-full bg-white   flex items-center justify-center text-2xl text-neutral-900'
              onClick={handleProductIndex}>
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
