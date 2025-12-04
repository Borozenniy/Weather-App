'use client';
import Image from 'next/image';
import { useTheme } from '@/hooks/use-theme';
import {
  isThatDayToday,
  getDayOfWeek,
  getDayOfMonth,
  getMonthInNumbers,
} from '@/shared/utils/date';
import { weatherIcons } from '@/constants/weather-icons';

type WeatherForecastProps = {
  weather: [];
};

function DailyWeatherForecast({ weather }: WeatherForecastProps) {
  const { theme } = useTheme();
  const sevenDaysWeatherForecast = weather.length > 0 && weather.slice(0, 7);
  const findWeatherIcon = (weatherName: string) => {
    const currentWeatherIcon = weatherIcons[theme].find(
      (weather) => weather.name === weatherName
    );
    if (currentWeatherIcon)
      return (
        <>
          <Image
            src={currentWeatherIcon.src}
            alt={currentWeatherIcon.alt}
            width={40}
            height={40}
          />
        </>
      );
    return <p className='font-sans text-xs'>{weatherName}</p>;
  };

  return (
    <div className=''>
      <h2 className='font-sans text-xs text-gray-500 dark:text-gray-400 font-bold border-b-1 border-gray-400'>
        7-Day Weather Forecast
      </h2>
      {sevenDaysWeatherForecast &&
        sevenDaysWeatherForecast.map((day, index) => (
          <div
            key={index}
            className='flex flex-row w-full items-center justify-between m-1 h-12 gap-1'
          >
            <div className='w-20 font-sans'>
              {isThatDayToday(day.dt) ? (
                <div className=''>
                  <h2 className='font-bold text-md'>TODAY</h2>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    {getMonthInNumbers(day.dt) + '/' + getDayOfMonth(day.dt)}
                  </p>
                </div>
              ) : (
                <div className=''>
                  <h2 className='text-md'>
                    {getDayOfWeek(day.dt).toUpperCase()}
                  </h2>
                  <p className='text-xs  text-gray-500 dark:text-gray-400'>
                    {getMonthInNumbers(day.dt) + '/' + getDayOfMonth(day.dt)}
                  </p>
                </div>
              )}
            </div>
            <div className='w-20 font-sans'>
              {findWeatherIcon(day.weather[0].main)}
            </div>
            <div className='flex flex-row w-40 items-end justify-center'>
              <p className='font-mono text-2xl font-bold'>
                {day.temp.day.toFixed(0) + '°'}
              </p>
              <p className='text-gray-500'>{day.temp.min.toFixed(0) + '°'}</p>
            </div>
            <p className='font-sans max-md:hidden w-80 text-pretty'>
              {day.summary}
            </p>
          </div>
        ))}
    </div>
  );
}

export { DailyWeatherForecast };
