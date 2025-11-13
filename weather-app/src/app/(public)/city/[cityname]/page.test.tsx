import { render, screen } from '@testing-library/react';
import CityPage from './page';
import * as reactRedux from 'react-redux';
import * as nextRouter from 'next/navigation';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

jest.mock('@/components/city/city-detail-page/city-details-page', () => ({
  CityDetailsPage: jest.fn(() => <div>CityDetailsPage Mock</div>),
}));

describe('CityPage', () => {
  const useSelectorMock = reactRedux.useSelector as unknown as jest.Mock;
  const useParamsMock = nextRouter.useParams as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders CityDetailsPage when city exists', () => {
    const cityMock = { name: 'Kyiv', state: 'Kyiv Oblast' };
    useParamsMock.mockReturnValue({ cityname: 'Kyiv' });
    useSelectorMock.mockReturnValue(cityMock);
    render(<CityPage />);
    expect(screen.getByText('Kyiv (Kyiv Oblast)')).toBeInTheDocument();
    expect(screen.getByText('CityDetailsPage Mock')).toBeInTheDocument();
  });

  it('renders not found message when city does not exist', () => {
    useParamsMock.mockReturnValue({ cityname: 'UnknownCity' });
    useSelectorMock.mockReturnValue(undefined);
    render(<CityPage />);
    expect(screen.getByText('City not found')).toBeInTheDocument();
    expect(screen.getByText('Back to home')).toBeInTheDocument();
  });
});
