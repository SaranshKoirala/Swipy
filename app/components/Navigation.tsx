import Image from 'next/image';
import swipy from '../../public/swipy.png';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className='flex justify-between items-center w-full px-5 '>
      <div className='flex items-center gap-4'>
        <Link href={'/'}>
          <Image src={swipy} alt='swipy logo' width={'120'} height={'120'} />
        </Link>

        <ul className='flex gap-5 '>
          <Link href={'/products'} className='hover:text-red-500'>
            <li>Products</li>
          </Link>
          <Link href={'/about'} className='hover:text-orange-600'>
            <li>About</li>
          </Link>
          <Link href={'/downloads'} className='hover:text-red-500'>
            <li>Download</li>
          </Link>
        </ul>
      </div>
      <button className='bg-black text-white px-5 py-2 rounded-xl font-semibold hover:bg-gray-500 hover:text-white'>
        Login
      </button>
    </nav>
  );
}
