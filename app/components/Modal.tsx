import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';

const Modal: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleBackdropClick = () => setIsOpen(false);

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent click bubbling to backdrop
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  return (
    <div className='flex items-center justify-center '>
      <button
        onClick={() => setIsOpen(true)}
        className='px-5 py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-3xl text-xl  hover:scale-x-110 transform transition-all duration-300'>
        Create Account
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={backdropVariants}
            transition={{ duration: 0.3 }}
            onClick={handleBackdropClick}>
            <motion.div
              className='relative flex flex-col justify-center items-center gap-5 bg-white text-black w-[450px] h-auto px-10 py-6 rounded-lg shadow-lg '
              onClick={handleModalClick}
              initial='hidden'
              animate='visible'
              exit='exit'
              variants={modalVariants}
              transition={{ duration: 0.3 }}>
              <IoMdClose
                className='absolute top-2 right-2 font-extrabold text-2xl hover:cursor-pointer'
                onClick={() => setIsOpen(false)}
              />
              <h2 className='text-2xl font-bold text-center bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent'>
                Sign Up
              </h2>
              <input
                placeholder='First name'
                type='text'
                className='bg-gray-100 p-3 w-full focus:outline-none'
              />
              <input
                placeholder='Last Name'
                type='text'
                className='bg-gray-100 p-3 w-full focus:outline-none'
              />
              <input
                placeholder='Email'
                type='email'
                className='bg-gray-100 p-3 w-full focus:outline-none'
              />
              <input
                placeholder='Password'
                type='password'
                className='bg-gray-100 p-3 w-full focus:outline-none'
              />
              <button className='px-4 py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-2xl active:bg-red-500'>
                Create An Account
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Modal;
