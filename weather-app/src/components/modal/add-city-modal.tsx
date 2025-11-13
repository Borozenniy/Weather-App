'use client';
import { useModal } from '@/hooks/use-modal';
import { Button } from '../button/button';
import type { CityProps } from '@/shared/types/city';

function AddCityModal({
  cities,
  addNewCity,
}: {
  cities: CityProps[];
  addNewCity: (city: CityProps) => void;
}) {
  const { closeModal } = useModal();
  const handleAddNewCity = (city: CityProps) => {
    addNewCity(city);
    closeModal();
  };
  return (
    <div>
      {cities.map((city) => (
        <div
          className='min-h-18 flex flex-row justify-between m-5 border-1 rounded-xl cursor-pointer overflow-hidden hover:transition duration-250 ease-in-out hover:scale-101 dark:hover:bg-green-400/40  bg-white dark:bg-zinc-900 dark:text-zinc-50'
          key={city.name + city.lat + city.lon}
        >
          <div className='flex flex-col p-2 '>
            <p className='pb-2'>
              [{city.country}] {city.name}
            </p>
            <p>{city.state}</p>
          </div>
          <Button
            label='Select'
            isRounded={false}
            onClick={() => handleAddNewCity(city)}
          />
        </div>
      ))}
    </div>
  );
}

export { AddCityModal };
