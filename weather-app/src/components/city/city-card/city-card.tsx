/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyGetWeatherByCoordsQuery } from '@/services/weather/api';
import { updateCityWeather, removeCity } from '@/slices/citiesSlice';
import { useModal } from '@/hooks/use-modal';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/button/button';
import { DeleteCityModal } from '@/components/modal/delete-city-modal';
import { getLastTimeUpdated } from '@/shared/utils/date';
import type { CityProps, CityWeatherProps } from '@/shared/types/city';
import type { AppDispatch } from '@/store/store';
import DeleteIcon from '../../../../public/icons/trash-bin.svg';
import DeleteIconWhite from '../../../../public/icons/trash-bin-white.svg';

const deleteIcons = {
  light: { src: DeleteIcon, alt: 'Delete Icon' },
  dark: { src: DeleteIconWhite, alt: 'Delete Icon' },
};

function CityCard({ city }: { city: CityProps }) {
  const { openModal, closeModal } = useModal();
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [fetchWeather, { data, isFetching }] = useLazyGetWeatherByCoordsQuery();

  useEffect(() => {
    if (!city.weather && city.lat && city.lon) {
      fetchWeather({ lat: city.lat, lon: city.lon });
    }
  }, [city.weather, city.lat, city.lon]);

  useEffect(() => {
    if (data) {
      dispatch(
        updateCityWeather({ ...city, weather: data as CityWeatherProps })
      );
    }
  }, [data]);

  const handleConfirmDeleteCity = () => {
    dispatch(removeCity(city.name));
    closeModal();
  };

  const handleDeleteCity = () => {
    openModal(
      <DeleteCityModal
        city={city.name}
        onConfirm={handleConfirmDeleteCity}
        onCancel={closeModal}
      />
    );
  };

  return (
    <div className='w-64 h-40 relative flex flex-col justify-between border-1 border-gray-500 rounded-lg p-3 bg-surface-light-3 hover:bg-gray-50 dark:hover:bg-surface-dark dark:bg-zinc-900/80 dark:text-zinc-50 cursor-pointer duration-250 ease-in-out hover:scale-101'>
      <div>
        <h2 className='font-mono text-lg font-semibold'>{city.name}</h2>
        <p className='font-mono'>
          {city.weather?.current?.temp
            ? `${city.weather.current.temp.toFixed(1)}°C`
            : isFetching
            ? 'Завантаження...'
            : 'Немає даних'}
        </p>
      </div>
      <div className='text-gray-500 ml-1 dark:text-gray-300/80'>
        <p className='text-xs font-sans italic'>
          {city.weather?.current?.dt &&
            `Last update: ${getLastTimeUpdated(city.weather.current.dt)}`}
        </p>
      </div>
      <div className='flex justify-between items-center'>
        <Link
          href={`/city/${city.name}`}
          className='font-noto p-1 rounded-md bg-blue-400/80 hover:bg-blue-500/80 dark:bg-blue-600/80 dark:hover:bg-blue-500/80'
        >
          Show details
        </Link>
        <Button
          label='Refresh'
          isRounded
          onClick={() => {
            if (city.lat && city.lon)
              fetchWeather({ lat: city.lat, lon: city.lon });
          }}
          disabled={isFetching || !city.lat || !city.lon}
        />
      </div>
      <div className='absolute top-3 right-2'>
        <Button
          mode='danger'
          icon={deleteIcons[theme]}
          isRounded
          isTransparent
          onClick={handleDeleteCity}
        />
      </div>
    </div>
  );
}

export { CityCard };
