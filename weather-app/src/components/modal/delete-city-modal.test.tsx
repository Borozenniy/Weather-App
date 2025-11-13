import { render, screen, fireEvent } from '@testing-library/react';
import { DeleteCityModal } from './delete-city-modal';

jest.mock('../button/button', () => ({
  Button: ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button onClick={onClick}>{label}</button>
  ),
}));

describe('DeleteCityModal', () => {
  const mockConfirm = jest.fn();
  const mockCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render correctly with city name', () => {
    render(
      <DeleteCityModal
        city='Paris'
        onConfirm={mockConfirm}
        onCancel={mockCancel}
      />
    );
    expect(
      screen.getByText('Are you sure you want to delete Paris?')
    ).toBeInTheDocument();
  });

  it('call onConfirm when Delete is clicked', () => {
    render(
      <DeleteCityModal
        city='Paris'
        onConfirm={mockConfirm}
        onCancel={mockCancel}
      />
    );
    fireEvent.click(screen.getByText('Delete'));
    expect(mockConfirm).toHaveBeenCalledTimes(1);
  });

  it('call onCancel when Cancel is clicked', () => {
    render(
      <DeleteCityModal
        city='Paris'
        onConfirm={mockConfirm}
        onCancel={mockCancel}
      />
    );
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockCancel).toHaveBeenCalledTimes(1);
  });
});
