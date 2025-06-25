'use client';

import Stepper, { Step } from '@/app/components/Stepper';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductList from './ProductList';

// interface ProductImage {
//   url: string;
//   alt: string;
//   isPrimary: boolean;
// }

interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  productDescription?: string;
  productImages: any;
}

interface ProductListProps {
  products: Product[];
}

interface product {
  products: Product[] | undefined;
}

export default function Products() {
  const [boolean, setBoolean] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (err: unknown) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  {
    console.log(products);
  }
  return (
    <div className='flex justify-center items-center h-screen'>
      {!boolean ? (
        <Stepper
          initialStep={1}
          onStepChange={(step) => {
            console.log(step);
          }}
          backButtonText='Previous'
          nextButtonText='Next'
          onFinalStepCompleted={() => setBoolean(true)}>
          <Step>
            {/* text-[color:#00d8ff] */}
            <h2 className='mb-5 text-xl  font-semibold'>
              Swipe starts here, Drop at least 3 product interests!
            </h2>
            <input
              type='text'
              placeholder='eg.headphone'
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
              className='w-full h-13 p-3 rounded-sm bg-neutral-700 focus:outline-none'
            />
          </Step>

          <Step>
            <h2 className='mb-5 text-xl  font-semibold'>
              Last one! Give us your final product crush and let’s start
              swiping.
            </h2>
            <input
              type='text'
              placeholder='eg.shampoo'
              className='w-full h-13 p-3 rounded-sm bg-neutral-700 focus:outline-none'
            />
          </Step>
        </Stepper>
      ) : (
        // <ProductList product={products} />
        <div></div>
      )}
    </div>
  );
}
