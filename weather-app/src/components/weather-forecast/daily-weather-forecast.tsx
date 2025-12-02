import {
  isThatDayToday,
  dateOfLastUpdate,
  getDayOfWeek,
  getDayOfMonth,
  getMonthInNumbers,
} from '@/shared/utils/date';

type WeatherForecastProps = {
  weather: [];
};

function DailyWeatherForecast({ weather }: WeatherForecastProps) {
  const sevenDaysWeatherForecast = weather.length > 0 && weather.slice(0, 7);
  return (
    <div className=''>
      <h2 className='font-sans text-xs text-gray-500 dark:text-gray-400 font-bold border-b-1 border-gray-400'>
        7-Day Weather Forecast
      </h2>
      {sevenDaysWeatherForecast &&
        sevenDaysWeatherForecast.map((day, index) => (
          <div
            key={index}
            className='flex flex-row w-full items-center m-1 h-12 gap-1'
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
              <p>{day.weather[0].main}</p>
            </div>
            <div className='flex flex-row w-40 items-end justify-center'>
              <p className='font-mono text-2xl font-bold'>
                {day.temp.day.toFixed(0) + '°'}
              </p>
              <p className='text-gray-500'>{day.temp.min.toFixed(0) + '°'}</p>
            </div>
            <p className='font-sans text-xs max-md:hidden w-80 text-pretty'>
              {day.summary}
            </p>
            <div>
              <p>{day.humidity}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export { DailyWeatherForecast };
