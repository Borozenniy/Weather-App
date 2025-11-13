import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CitiesProps, CityProps } from '@/shared/types/city';

export const defaultCities: CityProps[] = [
  {
    name: 'Kyiv',
    lat: 50.4500336,
    lon: 30.5241361,
    country: 'UA',
  },
];

//const initialState: CitiesProps = {
//  cities: JSON.parse(
//    localStorage.getItem('cities') || JSON.stringify(defaultCities)
//  ),
//};

const initialState: CitiesProps = {
  cities: defaultCities,
};
const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setCities: (state, action: PayloadAction<CityProps[]>) => {
      state.cities = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('cities', JSON.stringify(state.cities));
      }
    },
    addCity: (state, action: PayloadAction<CityProps>) => {
      //if (!state.cities.includes(action.payload)) {
      if (!state.cities.some((city) => city.name === action.payload.name)) {
        state.cities.push(action.payload);
        localStorage.setItem('cities', JSON.stringify(state.cities));
      }
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter(
        (city) => city.name !== action.payload
      );
      localStorage.setItem('cities', JSON.stringify(state.cities));
    },
    updateCityWeather: (state, action: PayloadAction<CityProps>) => {
      const cityIndex = state.cities.findIndex(
        (city) => city.name === action.payload.name
      );
      if (cityIndex !== -1) {
        state.cities[cityIndex] = {
          ...state.cities[cityIndex],
          ...action.payload,
        };
        localStorage.setItem('cities', JSON.stringify(state.cities));
      }
    },
  },
});

export const selectCityByName = (
  state: { cities: CitiesProps },
  cityName: string
) => {
  return state.cities.cities.find((city) => city.name === cityName);
};

export const { setCities, addCity, removeCity, updateCityWeather } =
  citiesSlice.actions;
export default citiesSlice.reducer;

//import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
//import type { CitiesProps, CityProps } from '@/shared/types/city';

//const defaultCities: CityProps[] = [
//  {
//    name: 'Kyiv',
//    lat: 50.4500336,
//    lon: 30.5241361,
//    country: 'UA',
//  },
//];

//const initialState: CitiesProps = {
//  cities: defaultCities,
//};

//const citiesSlice = createSlice({
//  name: 'cities',
//  initialState,
//  reducers: {
//    addCity: (state, action: PayloadAction<CityProps>) => {
//      if (!state.cities.some((city) => city.name === action.payload.name)) {
//        state.cities.push(action.payload);
//        localStorage.setItem('cities', JSON.stringify(state.cities));
//      }
//    },
//    removeCity: (state, action: PayloadAction<string>) => {
//      state.cities = state.cities.filter(
//        (city) => city.name !== action.payload
//      );
//      localStorage.setItem('cities', JSON.stringify(state.cities));
//    },
//    updateCityWeather: (state, action: PayloadAction<CityProps>) => {
//      const index = state.cities.findIndex(
//        (c) => c.name === action.payload.name
//      );
//      if (index !== -1) {
//        state.cities[index] = { ...state.cities[index], ...action.payload };
//        localStorage.setItem('cities', JSON.stringify(state.cities));
//      }
//    },
//    replaceAllCities: (state, action: PayloadAction<CityProps[]>) => {
//      state.cities = action.payload;
//      localStorage.setItem('cities', JSON.stringify(action.payload));
//    },
//  },
//});

//export const { addCity, removeCity, updateCityWeather, replaceAllCities } =
//  citiesSlice.actions;
//export default citiesSlice.reducer;
