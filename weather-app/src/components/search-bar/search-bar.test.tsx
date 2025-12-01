import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchBar } from './search-bar';
import * as api from '@/services/weather/api';
import * as modalHook from '@/hooks/use-modal';
import * as redux from 'react-redux';

jest.mock('@/lib/api');
jest.mock('@/hooks/use-modal');
jest.mock('react-redux');

describe('SearchBar component', () => {
  let triggerMock: jest.Mock;
  let openModalMock: jest.Mock;
  let dispatchMock: jest.Mock;

  beforeEach(() => {
    triggerMock = jest.fn().mockResolvedValue({ cities: ['Kyiv'] });
    const lazyQueryMock = () => ({
      trigger: (city: string) => ({ unwrap: () => triggerMock(city) }),
      data: null,
      isFetching: false,
    });

    (api.useLazyGetCoordsByCityInfoQuery as jest.Mock).mockReturnValue([
      lazyQueryMock().trigger,
      { data: null, isFetching: false },
    ]);

    openModalMock = jest.fn();
    (modalHook.useModal as jest.Mock).mockReturnValue({
      openModal: openModalMock,
    });

    dispatchMock = jest.fn();
    (redux.useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
  });

  it('renders input and button', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Type city name')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('changes input value', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      'Type city name'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Kyiv' } });
    expect(input.value).toBe('Kyiv');
  });

  it('disables button if input is empty', () => {
    render(<SearchBar />);
    const button = screen.getByRole('button') as HTMLButtonElement;
    const input = screen.getByPlaceholderText(
      'Type city name'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '' } });
    expect(button.disabled).toBe(true);
  });

  it('calls handleSearch and opens modal when input has value', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      'Type city name'
    ) as HTMLInputElement;
    const button = screen.getByRole('button') as HTMLButtonElement;

    fireEvent.change(input, { target: { value: 'Kyiv' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(triggerMock).toHaveBeenCalledWith('Kyiv');
      expect(openModalMock).toHaveBeenCalled();
    });
  });
});
