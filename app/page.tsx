import BlurText from './components/BlurText';
import Navigation from './components/Navigation';
import Modal from '@/app/components/Modal';

export default function Home() {
  return (
    <div className='relative h-screen w-full flex flex-col justify-center items-center'>
      <div className='flex flex-1 flex-col justify-center items-center gap-8'>
        <BlurText
          text='Swipe something epic.'
          delay={150}
          animateBy='words'
          direction='top'
          className='text-9xl font-bold'
        />
        <Modal />
      </div>
    </div>
  );
}
