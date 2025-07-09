'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { useUIStore } from '@/store/useUIStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const user = useUIStore((state) => state.user);
  const setUser = useUIStore((state) => state.setUser);

  useEffect(() => {
    if (user) {
      router.push('/');
      return; // redirect to homepage if logged in
    }
  }, [user]);

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
      if (response.data.status === 200) {
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
    <div className='flex justify-center items-center min-h-[90vh] gap-28'>
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
        <h1 className='text-3xl font-bold'>Login</h1>
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
          <FcGoogle className='text-xl' />
          Login with Google{' '}
        </button>
      </form>
    </div>
  );
}
