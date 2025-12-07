'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { useUIStore } from '@/store/useUIStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const setUser = useUIStore((state) => state.setUser);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill out the input fields!');
      return;
    }

    try {
      const response = await axios.post('/api/users/auth/login', {
        email,
        password,
      });
      if (response.status === 200) {
        setUser(response.data.user);
        router.push('/');
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEmail('');
      setPassword('');
    }
  }
  return (
    <div className='flex justify-center items-center gap-28 min-h-[90vh]'>
      <div>
        <Image
          src={'/login.png'}
          alt='different products'
          width={600}
          height={600}
        />
      </div>
      <form
        className='flex flex-col justify-center items-center gap-6 bg-neutral-900 p-7 rounded-lg'
        onSubmit={handleSubmit}>
        <h1 className='font-bold text-3xl'>Login</h1>
        <input
          placeholder='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='bg-neutral-700 p-3 rounded-sm focus:outline-none w-80 h-10 text-white placeholder-white'
        />
        <input
          placeholder='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='bg-neutral-700 p-3 rounded-sm focus:outline-none w-80 h-10 text-white placeholder-white'
        />
        <button className='bg-gradient-to-r from-red-500 to-orange-600 rounded-lg w-80 h-10'>
          Log in
        </button>
        <div className='flex gap-1 -m-2 text-sm'>
          <p>Don't have an account?</p>
          <Link href={'/signup'}>
            <p className='bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 text-transparent'>
              Signup
            </p>
          </Link>
        </div>
        <div className='flex justify-center items-center gap-2 w-full'>
          <div className='bg-neutral-600 w-1/2 h-[1px]'></div>
          <div>or</div>
          <div className='bg-neutral-600 w-1/2 h-[1px]'></div>
        </div>
        <button className='flex justify-center items-center gap-2 bg-white rounded-lg outline outline-1 outline-black w-80 h-10 text-black'>
          <FcGoogle className='text-xl' />
          Login with Google{' '}
        </button>
      </form>
    </div>
  );
}
