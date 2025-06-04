'use client';

import BlurText from './components/BlurText';
import Modal from '@/app/components/Modal';
import SplashCursor from './components/SplashCursor';
import { IoIosClose } from 'react-icons/io';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/auth/signup', {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
      console.log(res);
      setIsOpen(false);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <div className='relative h-screen w-full flex flex-1 flex-col justify-center items-center gap-8'>
      <BlurText
        text='Swipe something epic.'
        delay={150}
        animateBy='words'
        direction='top'
        className='text-9xl font-bold'
      />
      {/* <Modal /> */}

      <button
        onClick={() => setIsOpen(true)}
        className='px-5 py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-3xl text-xl  hover:scale-x-110 transform transition-all duration-300'>
        Create Account
      </button>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <form
            className='relative flex flex-col justify-center items-center gap-5 p-3 text-black'
            onSubmit={handleSubmit}>
            <IoIosClose
              className='absolute -top-5 -right-5 text-black text-4xl cursor-pointer'
              onClick={() => setIsOpen(false)}
            />
            <h2 className='text-black font-bold text-2xl'>Create Account</h2>
            <input
              placeholder='First name'
              type='text'
              className='w-full p-3 bg-gray-200 focus:outline-none rounded-md focus:text-black'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              placeholder='Last name'
              type='text'
              className='w-full p-3 bg-gray-200 focus:outline-none rounded-md focus:text-black'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              placeholder='Email'
              type='email'
              className='w-full p-3 bg-gray-200 focus:outline-none rounded-md focus:text-black'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder='Password'
              type='password'
              className='w-full p-3 bg-gray-200 focus:outline-none rounded-md focus:text-black'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder='Confirm password'
              type='password'
              className='w-full p-3 bg-gray-200 focus:outline-none rounded-md focus:text-black'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className='bg-gradient-to-r from-red-500 to-orange-600 w-32 px-2 py-1 rounded-2xl mt-2 text-lg'>
              Sign In
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
