import Image from 'next/image';
import Link from 'next/link';
import { ThemeSwitcher } from '../theme-switcher/theme-swither';

function Header() {
  return (
    <header className='fixed w-full border-b-2 border-b-gray-400 p-3 max-h-20 overflow-hidden bg-gray-50 dark:bg-gray-900 border-gray-900  text-white'>
      <div className='flex flex-row items-center justify-between'>
        <Link href='/'>
          <Image
            src='/weather-icon.svg'
            alt='Weather Icon'
            width={60}
            height={60}
          />
        </Link>
        <p className='max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50'>
          Weatherly
        </p>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
export { Header };
