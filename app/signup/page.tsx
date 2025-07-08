import Image from 'next/image';
import Link from 'next/link';

export default function Signup() {
  return (
    <div className='flex justify-center items-center '>
      {/* <div className='h-screen w-[50vw] relative'>
        <Image
          src={'/signup.jpg'}
          alt='signup page image'
          className='object-cover'
          fill
        />
      </div> */}
      <div className='flex flex-col justify-center items-center gap-6 p-7 rounded-lg min-h-[90vh] w-1/2'>
        <div className='text-4xl flex gap-2'>
          <p>Welcome to</p>
          <p className='font-bold  bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text'>
            SWIPY
          </p>{' '}
        </div>
        {/* <input
          placeholder='Name'
          className=' w-80 h-10 p-3 rounded-sm focus:outline-none text-white bg-neutral-700 placeholder-white'
          /> */}
        <input
          placeholder='Email'
          className=' w-80 h-10 p-3 rounded-sm focus:outline-none text-white bg-neutral-700 placeholder-white'
        />
        <input
          placeholder='Password'
          className=' w-80 h-10 p-3 rounded-sm focus:outline-none text-white bg-neutral-700 placeholder-white'
        />
        <button className='w-80 h-10 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg'>
          Log in
        </button>
        <div className='flex gap-1 -m-2 text-sm'>
          <p>Don't have an account?</p>
          <Link href={'/signup'}>
            <p className=' bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text'>
              Signup
            </p>
          </Link>
        </div>
        <div className='flex gap-2 justify-center items-center w-full'>
          <div className='w-1/2 h-[1px] bg-neutral-600'></div>
          <div>or</div>
          <div className='w-1/2 h-[1px] bg-neutral-600'></div>
        </div>
        <button className='w-80 bg-white text-black h-10  outline outline-1 outline-black  flex items-center justify-center gap-2 rounded-lg'>
          {/* <FcGoogle className='text-xl' /> */}
          Login with Google{' '}
        </button>
      </div>
    </div>
  );
}
