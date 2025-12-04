'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useLazyGetCityInfoByCityNameQuery,
  useLazyGetCityInfoByCoordsQuery,
  useLazyGetWeatherByCoordsQuery,
} from '@/services/weather/api';
import { useModal } from '@/hooks/use-modal';
import { useTheme } from '@/hooks/use-theme';
import { useUserGeolocation } from '@/hooks/use-user-geolocation';
import { addCity } from '@/slices/citiesSlice';
import { AddCityModal } from '@/components/modal/add-city-modal';
import { Button } from '@/components/button/button';
import type { AppDispatch } from '@/store/store';
import type { CityProps } from '@/shared/types/city';

import SearchIcon from '../../../public/icons/search.svg';
import SearchIconWhite from '../../../public/icons/search-white.svg';
import GeoIcon from '../../../public/icons/geo.svg';
import GeoIconWhite from '../../../public/icons/geo-white.svg';

const searchIcon = {
  light: { src: SearchIcon, alt: 'Search Icon' },
  dark: { src: SearchIconWhite, alt: 'Search Icon' },
};

const geoIcon = {
  light: { src: GeoIcon, alt: 'Geolocation Icon' },
  dark: { src: GeoIconWhite, alt: 'Geolocation Icon' },
};

function SearchBar() {
  const { openModal } = useModal();
  const [cityName, setCityName] = useState('');
  const { theme } = useTheme();
  const { coords, error, getLocation } = useUserGeolocation();
  const [triggerGetCityByName] = useLazyGetCityInfoByCityNameQuery();
  const [triggerGetCityByCoords] = useLazyGetCityInfoByCoordsQuery();

  const dispatch = useDispatch<AppDispatch>();
  const handleAddCity = (city: CityProps) => {
    dispatch(addCity(city));
  };

  const handleGetUserGeolocation = () => {
    getLocation();
    if (coords) {
      console.log(coords);
      handleSearchByCoords(coords);
    }
  };

  const cleanUp = () => {
    setCityName('');
  };

  const handleSearchByCoords = async (coords: { lat: number; lon: number }) => {
    const data = await triggerGetCityByCoords({
      lat: coords.lat,
      lon: coords.lon,
    }).unwrap();
    cleanUp();

    if (data) {
      openModal(<AddCityModal cities={data} addNewCity={handleAddCity} />);
    }
  };

  const handleSearchByName = async () => {
    if (!cityName) return;
    const data = await triggerGetCityByName(cityName).unwrap();
    cleanUp();

    if (data) {
      openModal(<AddCityModal cities={data} addNewCity={handleAddCity} />);
    }
  };

  return (
    <div className='w-56 md:w-72 rounded-xl flex overflow-hidden mb-8 border-2 border-gray-500 dark:border-gray-300 focus-within:border-blue-700 dark:focus-within:border-blue-500'>
      <Button
        icon={geoIcon[theme]}
        isTransparent
        onClick={handleGetUserGeolocation}
      />
      <input
        id='search-bar'
        className='font-sans flex-1 px-2 py-1 outline-none border-none bg-surface-light-2 dark:bg-gray-800 focus:ring-0 '
        type='text'
        size={2}
        placeholder='Type city name'
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <Button
        icon={searchIcon[theme]}
        onClick={handleSearchByName}
        disabled={!cityName}
      />
    </div>
  );
}

export { SearchBar };
