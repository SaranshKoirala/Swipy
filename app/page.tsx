import Navigation from './components/page';

export default function Home() {
  return (
    <div className='bg-white h-screen w-full text-black flex flex-col justify-center items-center'>
      <Navigation />

      <div className='flex flex-1 flex-col justify-center items-center gap-8'>
        <h1 className='text-9xl font-bold'>Swipe something epic.</h1>
        <button className='px-5 py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-3xl text-xl hover:bg-gradient-to-l from-red-500 hover:to-orange-600 transition'>
          Create account
        </button>
      </div>
    </div>
  );
}
