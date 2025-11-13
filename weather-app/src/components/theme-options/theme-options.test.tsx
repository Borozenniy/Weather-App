import { render, screen } from '@testing-library/react';
import { ThemeOptions } from './theme-options';

describe('ThemeOptions component', () => {
  it('render button with icon for dark theme', () => {
    render(<ThemeOptions themeOption='light' />);
    expect(screen.getByAltText('Sun Icon')).toBeInTheDocument();
  });

  it('render button with icon for light theme', () => {
    render(<ThemeOptions themeOption='dark' />);
    expect(screen.getByAltText('Moon Icon')).toBeInTheDocument();
  });
});
