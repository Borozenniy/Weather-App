import { useContext } from 'react';
import { ThemeContext } from '@/providers/theme-provider/theme-context';

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export { useTheme };
