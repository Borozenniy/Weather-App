'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectCityByName } from '@/slices/citiesSlice';
import { CityDetailsPage } from '@/components/city/city-detail-page/city-details-page';
import { CitiesProps } from '@/shared/types/city';

function CityPage() {
  const params = useParams<{ cityname: string }>();
  const city = useSelector((state: { cities: CitiesProps }) =>
    selectCityByName(state, params.cityname)
  );

  if (!city) {
    return (
      <div className='w-full min-h-screen flex flex-col items-center  text-center px-4'>
        <h1 className='text-4xl font-bold mb-4'>City not found</h1>
        <p className='text-neutral-600 dark:text-neutral-100 mb-6'>
          This page does not exist or maybe moved to another place
        </p>
        <Link href='/'>Back to home</Link>
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col min-h-screen bg-gray-50font-sans'>
      <h2 className='font-bold text-2xl pl-10'>
        {params.cityname} {city?.state && `(${city.state})`}
      </h2>
      <CityDetailsPage city={city} />
    </div>
  );
}

export default CityPage;
