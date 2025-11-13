/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyGetWeatherByCoordsQuery } from '@/lib/api';
import { updateCityWeather, removeCity } from '@/slices/citiesSlice';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/button/button';
import type { CityProps, CityWeatherProps } from '@/shared/types/city';
import type { AppDispatch } from '@/store/store';
import DeleteIcon from '../../../../public/icons/trash-bin.svg';
import DeleteIconWhite from '../../../../public/icons/trash-bin-white.svg';

const deleteIcons = {
  light: { src: DeleteIcon, alt: 'Delete Icon' },
  dark: { src: DeleteIconWhite, alt: 'Delete Icon' },
};

function CityCard({ city }: { city: CityProps }) {
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

  const handleDeleteCity = () => dispatch(removeCity(city.name));

  return (
    <div className='w-64 h-40 relative flex flex-col justify-between border rounded-lg p-3 bg-white dark:bg-zinc-900 dark:text-zinc-50 cursor-pointer duration-250 ease-in-out hover:scale-101'>
      <div>
        <h2 className='text-lg font-semibold'>{city.name}</h2>
        <p>
          {city.weather?.current?.temp
            ? `${city.weather.current.temp.toFixed(1)}°C`
            : isFetching
            ? 'Завантаження...'
            : 'Немає даних'}
        </p>
      </div>
      <div className='flex justify-between items-center'>
        <Link
          href={`/city/${city.name}`}
          className='p-1 rounded-md bg-blue-400/80 hover:bg-blue-500/80 dark:bg-blue-600/80 dark:hover:bg-blue-500/80'
        >
          Show details
        </Link>
        <Button
          label='Refresh'
          isRounded
          onClick={() => {
            if (city.lat && city.lon)
              fetchWeather({ lat: city.lat, lon: city.lon });
            console.log('refetch');
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
