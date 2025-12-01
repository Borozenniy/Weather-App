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
  console.log(sevenDaysWeatherForecast);
  return (
    <div className=''>
      <h2 className='text-xs text-gray-500 font-bold border-b-1 border-gray-400'>
        7-Day Weather Forecast
      </h2>
      {weather.map((day, index) => (
        <div key={index} className='flex flex-row w-full items-center m-1'>
          <div className='w-20'>
            {isThatDayToday(day.dt) ? (
              <div className=''>
                <h2 className='font-bold text-md'>TODAY</h2>
                <p className='text-xs text-gray-500'>
                  {getMonthInNumbers(day.dt) + '/' + getDayOfMonth(day.dt)}
                </p>
              </div>
            ) : (
              <div className=''>
                <h2 className='text-md'>
                  {getDayOfWeek(day.dt).toUpperCase()}
                </h2>
                <p className='text-xs  text-gray-500'>
                  {getMonthInNumbers(day.dt) + '/' + getDayOfMonth(day.dt)}
                </p>
              </div>
            )}
          </div>
          <div className='w-20'>
            <p>{day.weather[0].main}</p>
          </div>
          <div className='flex flex-row w-40 items-end justify-center'>
            <p className='text-2xl font-bold'>
              {day.temp.day.toFixed(0) + '°'}
            </p>
            <p className='text-md text-gray-500'>
              {day.temp.min.toFixed(0) + '°'}
            </p>
          </div>
          <p className='text-xs max-md:hidden max-w-80'>{day.summary}</p>
        </div>
      ))}
    </div>
  );
}

export { DailyWeatherForecast };
