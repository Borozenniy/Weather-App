type CityProps = {
  country: string;
  name: string;
  lat: number;
  lon: number;
  state?: string;
  weather?: CityWeatherProps | null;
};

type CityWeatherProps = {
  current?: {
    dt: number;
    sunrise?: number;
    sunset?: number;
    temp?: number;
    feels_like?: number;
    [key: string]: unknown;
  };
  daily?: object[];
  hourly?: HourlyWeather;
};

type HourlyWeather = {
  dt: number;
  temp: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

type CitiesProps = {
  cities: CityProps[];
};

export type { CityProps, CitiesProps, CityWeatherProps, HourlyWeather };
