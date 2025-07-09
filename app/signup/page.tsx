'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill out the input fields');
      return;
    }

    try {
      const response = await axios.post('/api/users/auth/signup', {
        name,
        email,
        password,
        confirmPassword,
      });

      if (response.data.status !== 201) {
        throw new Error(response.data.message);
      }

      router.push('/login');
    } catch (error) {
      console.log(error);
    } finally {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  }
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

      <form
        className='flex flex-col justify-center items-center gap-6 p-7 rounded-lg min-h-[90vh]'
        onSubmit={handleSubmit}>
        <div className=' flex flex-col justify-center items-center gap-3'>
          <h1 className='text-4xl font-extrabold'>Create an account</h1>
          <p className='text-sm text-white/80 w-72 text-center'>
            Join thousands of happy Swipers finding unique deals and products
            daily.{' '}
          </p>
        </div>
        <input
          placeholder='Name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=' w-80 h-10 p-3 rounded-sm focus:outline-none text-white bg-neutral-700 placeholder-white'
        />
        <input
          placeholder='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=' w-80 h-10 p-3 rounded-sm focus:outline-none text-white bg-neutral-700 placeholder-white'
        />
        <input
          placeholder='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=' w-80 h-10 p-3 rounded-sm focus:outline-none text-white bg-neutral-700 placeholder-white'
        />
        <input
          placeholder='Confirm Password'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
      </form>
    </div>
  );
}
