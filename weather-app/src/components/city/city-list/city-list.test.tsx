import { render, screen } from '@testing-library/react';
import { CityList } from './city-list';
import { CityCard } from '../city-card/city-card';
import * as reactRedux from 'react-redux';
import { setCities } from '@/slices/citiesSlice';

jest.mock('../city-card/city-card', () => ({
  CityCard: jest.fn(({ city }) => <div>{city.name}</div>),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('@/slices/citiesSlice', () => ({
  setCities: jest.fn(),
}));

describe('CityList component', () => {
  const useSelectorMock = reactRedux.useSelector as unknown as jest.Mock;
  const useDispatchMock = reactRedux.useDispatch as unknown as jest.Mock;
  const dispatchMock = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('render all cities from Redux store', () => {
    const citiesMock = [
      { name: 'Kyiv', country: 'UA' },
      { name: 'Lviv', country: 'UA' },
    ];
    useSelectorMock.mockReturnValue(citiesMock);
    render(<CityList />);
    expect(screen.getByText('Kyiv')).toBeInTheDocument();
    expect(screen.getByText('Lviv')).toBeInTheDocument();
    expect(CityCard).toHaveBeenCalledTimes(2);
  });

  it('has correct class names', () => {
    useSelectorMock.mockReturnValue([]);
    const { container } = render(<CityList />);
    const div = container.querySelector('div');
    expect(div).toHaveClass('w-full flex gap-4 flex-wrap');
  });

  it('dispatches setCities if localStorage contains valid data', () => {
    const storedCities = [
      { name: 'Kyiv', lat: 50.4500336, lon: 30.5241361, country: 'UA' },
      { name: 'Kyiv', lat: 50.4500336, lon: 30.5241361, country: 'UA' },
    ];
    localStorage.setItem('cities', JSON.stringify(storedCities));
    useSelectorMock.mockReturnValue([]);
    render(<CityList />);
    expect(dispatchMock).toHaveBeenCalledWith(setCities(storedCities));
  });

  it('does not dispatch if localStorage has invalid JSON', () => {
    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    localStorage.setItem('cities', 'INVALID_JSON');
    useSelectorMock.mockReturnValue([]);
    render(<CityList />);
    expect(dispatchMock).not.toHaveBeenCalled();
    consoleErrorMock.mockRestore();
  });

  it('does not dispatch if localStorage cities array is empty', () => {
    localStorage.setItem('cities', JSON.stringify([]));
    useSelectorMock.mockReturnValue([]);
    render(<CityList />);
    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
