import { getHour } from '@/shared/utils/date';

function HourlyWeatherForecast({ weather }) {
  const tenHoursWeatherForecast = weather.length > 0 && weather.slice(0, 10);

  const convertHoursInPmAndAm = (date: number) => {
    const hour = getHour(date);

    if (hour === 0) return '12 AM';
    if (hour > 12) return hour - 12 + ' PM';
    if (hour <= 12) return hour + ' AM';
    if (hour === 12) return hour + ' PM';
  };
  return (
    <div className='flex flex-col justify-start items-start text-black dark:text-zinc-50 bg-surface-light-3 dark:bg-gray-700 rounded-xl pr-4 pl-4 pt-1.5'>
      <h2 className='font-sans text-xs text-gray-500 dark:text-gray-400 font-bold min-w-40 border-b-1 border-gray-400'>
        10-Hour Weather Forecast
      </h2>
      <div className='flex flex-col flex-wrap max-md:flex-row mt-2 gap-1 w-full justify-between'>
        {tenHoursWeatherForecast &&
          tenHoursWeatherForecast.map((hour) => (
            <div
              key={hour.dt}
              className='flex flex-wrap h-6 justify-between items-center max-md:flex-col max-md:h-20 hover:bg-gray-100 max-sm:flex-1/6 max-sm:mb-3'
            >
              <p className='font-sans text-xs'>
                {convertHoursInPmAndAm(hour.dt)}
              </p>
              <p className='font-sans text-xs'>{hour.weather[0].main}</p>
              <p className='font-mono text-xs font-bold'>
                {hour.temp.toFixed(1) + '°'}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export { HourlyWeatherForecast };
