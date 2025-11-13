import { render, screen } from '@testing-library/react';
import { Header } from './header';

jest.mock('../theme-switcher/theme-swither', () => ({
  ThemeSwitcher: () => <div data-testid='theme-switcher' />,
}));

describe('Header component', () => {
  it('renders logo image with correct alt', () => {
    render(<Header />);
    const logo = screen.getByAltText('Weather Icon');
    expect(logo).toBeInTheDocument();
  });

  it('renders the title "Weatherly"', () => {
    render(<Header />);
    const title = screen.getByText('Weatherly');
    expect(title).toBeInTheDocument();
  });

  it('wrapper logo with a link to "/"', () => {
    render(<Header />);
    const link = screen.getByRole('link', { name: /weather icon/i });
    expect(link).toHaveAttribute('href', '/');
  });
});
