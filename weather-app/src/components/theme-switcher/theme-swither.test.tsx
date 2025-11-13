import { render, screen } from '@testing-library/react';
import { ThemeSwitcher } from './theme-swither';
import { ThemeOptions } from '../theme-options/theme-options';
import { themeOptions } from '@/constants/theme-options';

jest.mock('../theme-options/theme-options.tsx', () => ({
  ThemeOptions: ({ themeOption }: { themeOption: string }) => (
    <div data-testid={`theme-option-${themeOption}`} />
  ),
}));

describe('ThemeSwitcher component', () => {
  it('renders all theme options', () => {
    render(<ThemeSwitcher />);
    themeOptions.forEach((theme) => {
      expect(screen.getByTestId(`theme-option-${theme}`)).toBeInTheDocument();
    });
  });

  it('ThemeSwitcher has correct class names', () => {
    const { container } = render(<ThemeSwitcher />);
    const div = container.querySelector('div');
    expect(div).toHaveClass('flex gap-1 border-2 border-gray-400 rounded-full');
  });
});
