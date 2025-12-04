'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  isThatDayToday,
  getLastTimeUpdated,
  dateOfLastUpdate,
  getHour,
  getMinutes,
  convertHoursInPmAndAm,
  getHoursAndMinutesInPmAndAmIncludeTimezone,
  differenceInHours,
} from '@/shared/utils/date';
import WarningIconWhite from '../../../../../public/icons/warning-white.svg';

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
    <div className='w-6xl flex flex-col items-center justify-start min-h-screen pr-8 pl-8 sm:pr-5 sm:pl-5 gap-4 '>
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
          <div className='flex flex-col max-md:mb-5'>
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
          <div className='flex flex-col gap-2 font-sans max-md:mb-5'>
            <p>
              Humidity:{' '}
              {city.weather?.current?.humidity
                ? `${city.weather.current.humidity}`
                : 'N/A'}
              %
            </p>
            <p>
              Wind | Wind gust:{' '}
              {city?.weather?.current?.wind_speed
                ? `${city.weather.current.wind_speed} km/h `
                : 'N/A |'}{' '}
              {city?.weather?.current?.wind_gust
                ? `| ${city.weather.current.wind_gust} km/h`
                : 'N/A'}
            </p>
            <p>
              Pressure:{' '}
              {city?.weather?.current?.pressure
                ? `${city.weather.current.pressure} mb`
                : 'N/A'}{' '}
            </p>
          </div>
          <div className='flex flex-col gap-2 font-sans w-50 '>
            <div className='flex justify-between'>
              <span>Day length</span>
              <span>
                {differenceInHours(
                  city.weather?.current?.sunset,
                  city.weather?.current?.sunrise
                )}{' '}
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Sunrise</span>
              <span>
                {getHoursAndMinutesInPmAndAmIncludeTimezone(
                  city.weather?.current.sunrise,
                  city.weather.timezone_offset
                )}
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Sunrset</span>
              <span>
                {getHoursAndMinutesInPmAndAmIncludeTimezone(
                  city.weather?.current.sunset,
                  city.weather.timezone_offset
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      {city.weather?.alerts && (
        <div className='w-full flex flex-row max-lg:flex-col text-black dark:text-zinc-50 bg-warning p-4 rounded-xl hover:shadow-md'>
          <div className='flex flex-row gap-3 items-center w-full min-w-80 font-sans text-zinc-50 max-lg:mb-4 max-w-80'>
            <div className='border-r-1 border-white pr-2'>
              <Image
                src={WarningIconWhite}
                alt='Warning Icon'
                width={40}
                height={40}
              />
            </div>
            <div>
              <p>
                {dateOfLastUpdate(city.weather.alerts[0].start)}{' '}
                {getDayOfMonth(city.weather.alerts[0].start) !==
                  getDayOfMonth(city.weather.alerts[0].end) &&
                  ' - ' + dateOfLastUpdate(city.weather.alerts[0].end)}
              </p>
              <p>
                From {convertHoursInPmAndAm(city.weather.alerts[0].start)} to{' '}
                {convertHoursInPmAndAm(city.weather.alerts[0].end)}
              </p>
            </div>
          </div>
          <div className='flex w-full font-sans text-zinc-50 items-center gap-2 '>
            <div className=''>
              <p>{city.weather.alerts[0].description}</p>
            </div>
          </div>
        </div>
      )}
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
