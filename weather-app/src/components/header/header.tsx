import Image from 'next/image';
import Link from 'next/link';
import { ThemeSwitcher } from '../theme-switcher/theme-swither';

function Header() {
  return (
    <header className='fixed w-full border-b-2 border-b-gray-600 p-3 max-h-15 overflow-hidden bg-gray-600 dark:bg-gray-900 border-gray-900  text-white z-1'>
      <div className='flex flex-row max-w-6xl mx-auto items-center justify-between pr-1 pl-1 sm:pr-4 sm:pl-4'>
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src='/weather-icon.svg'
            alt='Weather Icon'
            width={35}
            height={35}
          />
          <p className='text-2xl sm:text-3xl font-semibold leading-10 tracking-tight  text-zinc-50'>
            Weatherly
          </p>
        </Link>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
export { Header };
