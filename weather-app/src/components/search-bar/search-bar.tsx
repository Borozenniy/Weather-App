'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyGetCoordsByCityNameQuery } from '@/lib/api';
import { useModal } from '@/hooks/use-modal';
import { addCity } from '@/slices/citiesSlice';
import { AddCityModal } from '@/components/modal/add-city-modal';
import { Button } from '@/components/button/button';
import type { AppDispatch } from '@/store/store';
import type { CityProps } from '@/shared/types/city';

import SearchIcon from '../../../public/icons/search.svg';

const searchIcon = {
  src: SearchIcon,
  alt: 'Search Icon',
};

function SearchBar() {
  const [cityName, setCityName] = useState('');

  const [triggerGetCoords] = useLazyGetCoordsByCityNameQuery();
  const dispatch = useDispatch<AppDispatch>();
  const handleAddCity = (city: CityProps) => {
    dispatch(addCity(city));
  };

  const { openModal } = useModal();

  const cleanUp = () => {
    setCityName('');
  };

  const handleSearch = async () => {
    if (!cityName) return;
    const data = await triggerGetCoords(cityName).unwrap();
    cleanUp();

    if (data) {
      openModal(<AddCityModal cities={data} addNewCity={handleAddCity} />);
    }
  };

  return (
    <div className='w-56 md:w-72 rounded-xl flex overflow-hidden mb-8 border border-gray-300'>
      <input
        id='search-bar'
        className='flex-1 px-2 py-1 outline-none border-none focus:ring-0 '
        type='text'
        size={2}
        placeholder='Type city name'
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <Button icon={searchIcon} onClick={handleSearch} disabled={!cityName} />
    </div>
  );
}

export { SearchBar };
