import { CiHeart } from 'react-icons/ci';
import { BsLightningCharge } from 'react-icons/bs';
import { LuShield } from 'react-icons/lu';
import { IoTrendingUpSharp } from 'react-icons/io5';
export default function About() {
  return (
    <div className='bg-orange-50 overflow-auto text-black'>
      {/* Hero section */}
      <div className='flex flex-col justify-center items-center gap-9 bg-black h-[30rem] text-white text-center'>
        <h1 className='font-extrabold text-7xl'>
          Shopping Meets{' '}
          <span className='inline-block animate-bounce'>Swipping</span>
        </h1>
        <p className='w-[35rem]'>
          We're revolutionizing online shopping by making it as addictive and
          fun as your favorite dating app. Swipe through curated products and
          fall in love with your next purchase.
        </p>
        <button className='bg-white hover:bg-amber-600 px-3 py-2 rounded-xl text-black hover:text-white text-xl transition-all duration-500'>
          Start Swipping
        </button>
      </div>

      {/* how it works */}
      <div className='flex flex-col justify-center items-center gap-16 mb-20 py-20 text-black text-center'>
        <div className='mb-4 text-center'>
          <h1 className='mb-4 font-bold text-5xl'>How It Works</h1>
          <p className='text-gray-400'>
            Three simple steps to a whole new shopping experience
          </p>
        </div>
        <div className='flex gap-10'>
          <div className='flex flex-col justify-center items-center gap-5 bg-white px-4 border border-gray-300 rounded-2xl w-72 h-64 text-black hover:scale-105 transition-all duration-300'>
            <p className='font-bold text-black/20 text-5xl'>01</p>
            <p className='text-2xl'>Browse</p>
            <p className='text-gray-500 text-sm'>
              Products appear one at a time, beautifully displayed for you to
              consider.
            </p>
          </div>
          <div className='flex flex-col justify-center items-center gap-5 bg-white px-4 border border-gray-300 rounded-2xl w-72 h-64 text-black hover:scale-105 transition-all duration-300'>
            {' '}
            <p className='font-bold text-black/20 text-5xl'>02</p>
            <p className='text-2xl'>Swipe</p>
            <p className='text-gray-500 text-sm'>
              Right for love, left to pass. It's that simple and addictively
              fun.
            </p>
          </div>
          <div className='flex flex-col justify-center items-center gap-5 bg-white px-4 border border-gray-300 rounded-2xl w-72 h-64 text-black hover:scale-105 transition-all duration-300'>
            {' '}
            <p className='font-bold text-black/20 text-5xl'>03</p>
            <p className='text-2xl'>Shop</p>
            <p className='text-gray-500 text-sm'>
              Your likes are saved. When you're ready, checkout with just a few
              taps.
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-16 px-20 py-20 min-h-screen'>
        <div className='mb-4 text-center'>
          <h1 className='mb-4 font-bold text-5xl'>Why You'll Love It</h1>
          <p className='text-gray-400'>Shopping has never been this engaging</p>
        </div>

        <div className='gap-8 grid grid-cols-2 grid-rows-2'>
          {/* Card 1 */}
          <div className='flex justify-start items-center gap-5 bg-white shadow-2xl p-6 rounded-xl h-40'>
            <div className='bg-gradient-to-br from-orange-400 to-pink-500 p-4 rounded-xl text-white'>
              <CiHeart className='text-2xl' />
            </div>
            <div>
              <p className='mb-1 font-bold text-xl'>Swipe to Love</p>
              <p>
                Just like finding your perfect match, swipe right on products
                you love and left on what you don't.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className='flex justify-start items-center gap-5 bg-white shadow-2xl p-6 rounded-xl h-40'>
            <div className='bg-gradient-to-br from-yellow-400 to-red-500 p-4 rounded-xl text-white'>
              <BsLightningCharge className='text-2xl' />
            </div>
            <div>
              <p className='mb-1 font-bold text-xl'>Instant Gratification</p>
              <p>
                No endless scrolling. Get personalized product recommendations
                that match your style in seconds.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className='flex justify-start items-center gap-5 bg-white shadow-2xl p-6 rounded-xl h-40'>
            <div className='bg-gradient-to-br from-green-400 to-emerald-600 p-4 rounded-xl text-white'>
              <LuShield className='text-2xl' />
            </div>
            <div>
              <p className='mb-1 font-bold text-xl'>Curated Selection</p>
              <p>
                Every product is handpicked and verified. Only the best makes it
                to your feed.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className='flex justify-start items-center gap-5 bg-white shadow-2xl p-6 rounded-xl h-40'>
            <div className='bg-gradient-to-br from-blue-500 to-indigo-700 p-4 rounded-xl text-white'>
              <IoTrendingUpSharp className='text-2xl' />
            </div>
            <div>
              <p className='mb-1 font-bold text-xl'>Learn Your Style</p>
              <p>
                Our AI learns from your swipes to show you more of what you
                love.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
