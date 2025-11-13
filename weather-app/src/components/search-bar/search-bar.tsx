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

  const handleSearch = async () => {
    if (!cityName) return;
    const data = await triggerGetCoords(cityName).unwrap();

    if (data) {
      openModal(<AddCityModal cities={data} addNewCity={handleAddCity} />);
    }
  };

  return (
    <div className='w-64 border-1 rounded-xl flex overflow-hidden justify-between mb-8'>
      <input
        id='search-bar'
        className='pl-2 outline-none focus:outline-none focus:ring-0 border-none'
        type='text'
        placeholder='Type city name'
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <Button icon={searchIcon} onClick={handleSearch} disabled={!cityName} />
    </div>
  );
}

export { SearchBar };
