'use client';
import { useTheme } from '@/hooks/use-theme';
import Image from 'next/image';

import InfoIconWhite from '../../../public/icons/info-white.svg';
import InfoIcon from '../../../public/icons/info.svg';

const hintsIcons = {
  light: { src: InfoIcon, alt: 'Info icon' },
  dark: { src: InfoIconWhite, alt: 'Info icon' },
};

function Hints() {
  const { theme } = useTheme();
  return (
    <div className='font-sans mb-5 p-2 bg-white dark:bg-gray-700 rounded-xl border-1 border-gray-500 '>
      <div className='flex flex-row items-end pb-3 gap-2'>
        <Image
          src={hintsIcons[theme].src}
          alt={hintsIcons[theme].alt}
          width={30}
          height={30}
        />
        <p className='text-xl'>Hints</p>
      </div>
      <ul>
        <li>1. Limits of Cities 4</li>
        <li>2. Can only be refreshed after 1 hour </li>
      </ul>
    </div>
  );
}

export { Hints };
