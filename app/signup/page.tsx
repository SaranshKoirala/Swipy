import Image from 'next/image';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function Signup() {
  return (
    <div className='flex justify-center items-center '>
      <div>
        <Image
          src={'/signup.png'}
          alt='signup page image'
          className='object-cover'
          loading={'lazy'}
          height={700}
          width={700}
        />
      </div>

      <div className='flex flex-col justify-center items-center gap-6 p-7 rounded-lg min-h-[90vh] '>
        <div className=' flex flex-col justify-center items-center gap-3'>
          <h1 className='text-4xl font-extrabold'>Create an account</h1>
          <p className='text-sm text-white/80 w-72 text-center'>
            Join thousands of happy Swipers finding unique deals and products
            daily.{' '}
          </p>
        </div>
        <input
          placeholder='Name'
          className=' w-80 h-10 p-3 rounded-sm focus:outline-none text-white bg-neutral-700 placeholder-white'
        />
        <input
          placeholder='Email'
          className=' w-80 h-10 p-3 rounded-sm focus:outline-none text-white bg-neutral-700 placeholder-white'
        />
        <input
          placeholder='Password'
          className=' w-80 h-10 p-3 rounded-sm focus:outline-none text-white bg-neutral-700 placeholder-white'
        />
        <input
          placeholder='Confirm Password'
          className=' w-80 h-10 p-3 rounded-sm focus:outline-none text-white bg-neutral-700 placeholder-white'
        />
        <button className='w-80 h-10 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg'>
          Sign in
        </button>
        <div className='flex gap-1 -m-2 text-sm'>
          <p>Already have an account?</p>
          <Link href={'/login'}>
            <p className=' bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text'>
              Login
            </p>
          </Link>
        </div>
        <div className='flex gap-2 justify-center items-center w-72'>
          <div className='w-1/2 h-[1px] bg-neutral-600'></div>
          <div>or</div>
          <div className='w-1/2 h-[1px] bg-neutral-600'></div>
        </div>
        <button className='w-80 bg-white text-black h-10  outline outline-1 outline-black  flex items-center justify-center gap-2 rounded-lg'>
          <FcGoogle className='text-xl' />
          Continue with Google{' '}
        </button>
      </div>
    </div>
  );
}
