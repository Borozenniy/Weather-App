import Image from 'next/image';
import Link from 'next/link';
import { ThemeSwitcher } from '../theme-switcher/theme-swither';

function Header() {
  return (
    <header className='fixed w-full  p-3 max-h-15 overflow-hidden bg-surface-light dark:bg-gray-900 z-1'>
      <div className='flex flex-row max-w-6xl mx-auto items-center justify-between pr-1 pl-1 sm:pr-4 sm:pl-4'>
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src='/weather-icon.svg'
            alt='Weather Icon'
            width={35}
            height={35}
          />
          <p className='font-sans text-3xl sm:text-3xl font-semibold leading-10 tracking-tight  text-white'>
            Weatherly
          </p>
        </Link>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
export { Header };
