'use client';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { CityCard } from '../city-card/city-card';
import { setCities } from '@/slices/citiesSlice';
import type { RootState } from '@/store/store';
import type { CityProps } from '@/shared/types/city';

function CityList() {
  const dispatch = useDispatch();
  const cities = useSelector((state: RootState) => state.cities.cities);

  useEffect(() => {
    const stored = localStorage.getItem('cities');
    if (stored) {
      try {
        const parsed: CityProps[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch(setCities(parsed));
        }
      } catch (err) {
        console.error('Помилка при парсингу cities з localStorage', err);
      }
    }
  }, [dispatch]);

  return (
    <div className='w-full flex gap-4 flex-wrap'>
      {cities.map((city) => (
        <CityCard key={city.name} city={city} />
      ))}
    </div>
  );
}

export { CityList };
