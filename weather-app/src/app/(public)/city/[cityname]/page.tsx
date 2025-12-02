'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectCityByName } from '@/slices/citiesSlice';
import { CityDetailsPage } from '@/components/city/city-detail-page/city-details-page';
import { DailyWeatherForecast } from '@/components/weather-forecast/daily-weather-forecast';
import { HourlyWeatherForecast } from '@/components/weather-forecast/hourly-weather-forecast';
import {
  getDayOfWeek,
  getDayOfMonth,
  getMonth,
  getUpdateTime,
  getLastTimeUpdated,
  dateOfLastUpdate,
} from '@/shared/utils/date';

import { CitiesProps } from '@/shared/types/city';

function CityPage() {
  const params = useParams<{ cityname: string }>();
  const city = useSelector((state: { cities: CitiesProps }) =>
    selectCityByName(state, params.cityname)
  );

  if (!city) {
    return (
      <div className='w-full min-h-screen flex flex-col items-center text-center px-4'>
        <h1 className='text-4xl font-bold mb-4'>City not found</h1>
        <p className='text-neutral-600 dark:text-neutral-100 mb-6'>
          This page does not exist or maybe moved to another place
        </p>
        <Link href='/'>Back to home</Link>
      </div>
    );
  }

  return (
    <div className='w-6xl flex flex-col items-center justify-start min-h-screen m-5 px-4 lg:px-10 gap-4'>
      <div className='w-full pb-4 text-black dark:text-zinc-50 bg-surface-light-3 dark:bg-gray-700 p-5 rounded-xl hover:shadow-md  '>
        <div className='flex items-center gap-5 mb-3 max-md:justify-between'>
          <p className='text-xs font-noto font-bold'>
            {city.weather?.current?.dt &&
              dateOfLastUpdate(city.weather.current.dt)}
          </p>
          <p className='text-xs font-sans italic text-gray-500 dark:text-gray-300/80'>
            {city.weather?.current?.dt &&
              `Last update: ${getLastTimeUpdated(city.weather.current.dt)}`}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between max-md:flex-col max-md:items-start'>
          <div className='flex flex-col'>
            <h2 className='font-mono font-bold text-4xl pb-3'>
              {params.cityname}{' '}
              <span className='font-medium text-xl'>
                {city?.state && `(${city.state})`}
              </span>
            </h2>
            <div className='font-mono flex flex-row gap-1 items-end'>
              <p className='text-3xl font-bold'>
                {`${
                  city?.weather?.current?.temp
                    ? city.weather.current.temp.toFixed(1)
                    : 'N/A'
                }°C`}{' '}
              </p>
              <span>
                {city?.weather?.current?.feels_like &&
                  `( feels like ${city.weather.current.feels_like.toFixed(
                    1
                  )}°C )`}
              </span>
            </div>
          </div>
          <div className='flex flex-col gap-1 font-sans'>
            <p>Humidity: {city.weather?.current?.humidity}%</p>
            <p className=''>
              {city.weather?.current?.dt &&
                `Wind / Wind gust: ${city.weather.current.wind_speed} km/h / ${city.weather.current.wind_gust} km/h`}
            </p>
            <p>Pressure: {city.weather?.current?.pressure} mb</p>
          </div>
        </div>
      </div>
      <div className='w-full flex flex-row gap-4 max-md:flex-col'>
        <HourlyWeatherForecast weather={city.weather.hourly} />
        <CityDetailsPage city={city} />
      </div>
      <div className='w-full bg-surface-light-3 dark:bg-gray-700 p-4 rounded-xl max-md:p-3'>
        <DailyWeatherForecast weather={city.weather.daily} />
      </div>
    </div>
  );
}

export default CityPage;
