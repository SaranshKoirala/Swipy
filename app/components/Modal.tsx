import React from 'react';

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black bg-opacity-50 '
        onClick={onClose}
      />

      {/* Modal content */}
      <div className='relative z-10  rounded-xl shadow-lg  max-w-md'>
        {children}
      </div>
    </div>
  );
};

export default Modal;
