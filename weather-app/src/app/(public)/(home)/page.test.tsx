import { render, screen } from '@testing-library/react';
import Home from './page';

jest.mock('@/components/city/city-list/city-list', () => ({
  CityList: jest.fn(() => <div>CityList Component</div>),
}));

jest.mock('@/components/search-bar/search-bar', () => ({
  SearchBar: jest.fn(() => <div>SearchBar Component</div>),
}));

describe('Home page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('render SearchBar and CityList components', () => {
    render(<Home />);
    expect(screen.getByText('SearchBar Component')).toBeInTheDocument();
    expect(screen.getByText('CityList Component')).toBeInTheDocument();
  });

  it('has correct main wrapper classes', () => {
    const { container } = render(<Home />);
    const main = container.querySelector('main');
    expect(main).toHaveClass(
      'flex items-start max-sm:items-center min-h-screen w-full flex-col py-32 px-16 bg-gray-50 dark:bg-gray-900 dark:text-zinc-50'
    );
  });

  it('has correct outer div classes', () => {
    const { container } = render(<Home />);
    const outerDiv = container.querySelector('div');
    expect(outerDiv).toHaveClass(
      'flex min-h-screen items-center justify-center'
    );
  });
});
