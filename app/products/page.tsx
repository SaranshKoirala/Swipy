'use client';

import Stepper, { Step } from '@/app/components/Stepper';
import { useState } from 'react';

export default function Products() {
  const [boolean, setBoolean] = useState(false);
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
        <div>Products</div>
      )}
    </div>
  );
}
