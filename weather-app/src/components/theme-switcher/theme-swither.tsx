'use client';
import { ThemeOptions } from '../theme-options/theme-options';
import { themeOptions } from '@/constants/theme-options';

function ThemeSwitcher() {
  return (
    <div className='flex gap-1 border-2 border-gray-400 rounded-full'>
      {themeOptions.map((theme) => (
        <ThemeOptions key={theme} themeOption={theme as 'light' | 'dark'} />
      ))}
    </div>
  );
}

export { ThemeSwitcher };
