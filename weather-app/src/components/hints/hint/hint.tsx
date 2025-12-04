'use client';
import { useTheme } from '@/hooks/use-theme';
import Image from 'next/image';

import InfoIconWhite from '../../../../public/icons/info-white.svg';
import InfoIcon from '../../../../public/icons/info.svg';

const hintsIcons = {
  light: { src: InfoIcon, alt: 'Info icon' },
  dark: { src: InfoIconWhite, alt: 'Info icon' },
};

function Hint() {
  const { theme } = useTheme();
  return (
    <div className='flex items-center font-sans text-xs p-2 bg-surface-light-3 dark:bg-gray-700 rounded-xl '>
      <div className='flex flex-row items-center gap-2'>
        <Image
          src={hintsIcons[theme].src}
          alt={hintsIcons[theme].alt}
          width={20}
          height={20}
        />
        <p className=''>Can be refreshed after 1 hour</p>
      </div>
    </div>
  );
}

export { Hint };
