'use client';

import { useUIStore } from '@/store/useUIStore';
import { useEffect, useRef } from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Cart() {
  const router = useRouter();
  const { cart, user, increaseQuantity, decreaseQuantity, removeFromCart } =
    useUIStore();

  const subTotal = cart.reduce(
    (acc, item) => acc + item.productPrice * (item.quantity || 1),
    0
  );
  const deliveryFee = 100;
  const totalAmount = subTotal + deliveryFee;

  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!user && !hasShownToast.current) {
      hasShownToast.current = true;
      toast.error('You have to login first!');
      router.push('/login');
    }
  }, [user, router]);

  return (
    <div className='px-6 md:px-20 py-10 text-black'>
      {/* Heading */}
      <div className='mb-6 text-white'>
        <h1 className='font-serif font-bold text-4xl'>Your Bag</h1>
        <p className='font-light'>
          Items in your bag are not reserved. Check out now to make them yours.
        </p>
      </div>

      {/* Cart Body */}
      <div className='gap-10 grid grid-cols-1 lg:grid-cols-3'>
        {/* Left: Cart items */}
        <div className='space-y-6 lg:col-span-2'>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={String(item._id)}
                className='flex gap-4 bg-white shadow p-4 rounded-xl'>
                {/* Image */}
                <img
                  src={item.productImages[0].url}
                  alt={item.productImages[0].alt}
                  className='rounded-xl w-32 h-32 object-cover'
                />

                {/* Details */}
                <div className='flex flex-col justify-between w-full'>
                  <div>
                    <h2 className='mb-1 font-semibold'>{item.productName}</h2>
                    <p className='font-bold text-orange-500 text-xl'>
                      Rs {item.productPrice}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className='flex items-center gap-4'>
                    <button
                      className='bg-gray-200 hover:bg-gray-300 p-2 rounded-md'
                      onClick={() => decreaseQuantity(item._id)}>
                      <FaMinus size={12} />
                    </button>

                    <span className='font-semibold text-lg'>
                      {item.quantity ?? 1}
                    </span>

                    <button
                      className='bg-gray-200 hover:bg-gray-300 p-2 rounded-md'
                      onClick={() => increaseQuantity(item._id)}>
                      <FaPlus size={12} />
                    </button>

                    {/* Remove */}
                    <button
                      className='bg-red-100 hover:bg-red-200 ml-auto p-2 rounded-md text-red-600'
                      onClick={() => removeFromCart(item._id)}>
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='bg-white shadow py-10 rounded-xl text-center'>
              <p className='font-semibold text-lg'>
                Your bag is currently empty.
              </p>
              <p className='mt-2 text-gray-500'>Add items to view them here.</p>
            </div>
          )}
        </div>

        {/* Right: Summary */}
        <div className='bg-white shadow p-6 rounded-xl h-fit'>
          <h2 className='mb-4 font-semibold text-xl'>Order Summary</h2>

          <div className='flex justify-between mb-2'>
            <p>Subtotal</p>
            <p className='font-semibold'>Rs {subTotal}</p>
          </div>

          <div className='flex justify-between mb-4'>
            <p>Delivery Fee</p>
            <p className='font-semibold'>Rs {deliveryFee}</p>
          </div>

          <hr className='my-4' />

          <div className='flex justify-between mb-6'>
            <p className='font-bold text-lg'>Total</p>
            <p className='font-bold text-lg'>Rs {totalAmount}</p>
          </div>

          {/* Checkout Button */}
          <button
            disabled={cart.length === 0}
            className='bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 py-3 rounded-lg w-full font-semibold text-white transition disabled:cursor-not-allowed'>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
