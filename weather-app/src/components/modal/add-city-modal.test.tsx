import { render, screen, fireEvent } from '@testing-library/react';
import { AddCityModal } from './add-city-modal';
import * as modalHook from '@/hooks/use-modal';

jest.mock('@/hooks/use-modal', () => ({
  useModal: jest.fn(),
}));

describe('AddCityModal component', () => {
  const citiesMock = [
    { name: 'Kyiv', country: 'UA', state: 'Kyiv Oblast', lat: 50, lon: 30 },
    { name: 'Lviv', country: 'UA', state: 'Lviv Oblast', lat: 49, lon: 24 },
  ];

  const addNewCityMock = jest.fn();
  const closeModalMock = jest.fn();

  beforeEach(() => {
    (modalHook.useModal as jest.Mock).mockReturnValue({
      closeModal: closeModalMock,
    });
  });

  it('render all cities', () => {
    render(<AddCityModal cities={citiesMock} addNewCity={addNewCityMock} />);

    citiesMock.forEach((city) => {
      expect(
        screen.getByText(`[${city.country}] ${city.name}`)
      ).toBeInTheDocument();
      expect(screen.getByText(city.state)).toBeInTheDocument();
    });
  });

  it('call addNewCity and closeModal when "Select" button is clicked', () => {
    render(<AddCityModal cities={citiesMock} addNewCity={addNewCityMock} />);

    const firstSelectButton = screen.getAllByText('Select')[0];
    fireEvent.click(firstSelectButton);

    expect(addNewCityMock).toHaveBeenCalledWith(citiesMock[0]);
    expect(closeModalMock).toHaveBeenCalled();
  });
});
