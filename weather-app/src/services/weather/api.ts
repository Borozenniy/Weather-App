import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WEATHER_API_KEY } from '@/constants/weather-api';
import type { CityProps } from '@/shared/types/city';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/',
  }),
  endpoints: (builder) => ({
    getCityInfoByCityName: builder.query({
      query: (city: string) =>
        `geo/1.0/direct?q=${city}&limit=3&appid=${WEATHER_API_KEY}`,
    }),
    getCityInfoByCoords: builder.query({
      query: ({ lat, lon }) =>
        `geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=3&appid=${WEATHER_API_KEY}`,
    }),
    getWeatherByCoords: builder.query<CityProps, { lat: number; lon: number }>({
      query: ({ lat, lon }) =>
        `data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${WEATHER_API_KEY}`,
    }),
  }),
});
export const {
  useGetCityInfoByCityNameQuery,
  useLazyGetCityInfoByCityNameQuery,

  useGetWeatherByCoordsQuery,
  useLazyGetWeatherByCoordsQuery,

  useGetCityInfoByCoordsQuery,
  useLazyGetCityInfoByCoordsQuery,
} = weatherApi;
