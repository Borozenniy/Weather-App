'use client';
import { Button } from '../button/button';
import { useTheme } from '@/hooks/use-theme';
import type { ThemeOptionProps } from '@/shared/types/theme-options';

import SunIcon from '../../../public/icons/sun.png';
import MoonIcon from '../../../public/icons/moon.png';

const themeIcon = {
  light: {
    src: SunIcon,
    alt: 'Sun Icon',
  },
  dark: {
    src: MoonIcon,
    alt: 'Moon Icon',
  },
};

function ThemeOptions({ themeOption }: ThemeOptionProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className='flex items-center cursor-pointer'>
      <Button
        icon={themeIcon[themeOption as keyof typeof themeIcon]}
        isActive={themeOption === theme}
        isTransparent={true}
        onClick={() => setTheme(themeOption)}
      />
    </div>
  );
}

export { ThemeOptions };
