'use client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import type { CityProps } from '@/shared/types/city';

const CityDetailsPage = ({ city }: { city: CityProps }) => {
  console.log(city);
  const now = new Date();
  const today = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();

  const data = city?.weather?.hourly
    ?.filter((hour: { dt: number }) => {
      const date = new Date(hour.dt * 1000);
      return (
        date.getDate() === today &&
        date.getMonth() === month &&
        date.getFullYear() === year
      );
    })
    ?.map((hour: { dt: number; temp: number }) => ({
      hour: new Date(hour.dt * 1000).getHours(),
      temp: hour.temp,
    }));

  return (
    <div className='m-1'>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='hour'
              interval={0}
              angle={0}
              textAnchor='end'
              tick={{ fontSize: 12 }}
              label={{ position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              domain={[0, 40]}
              unit='°C'
              label={{
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip />
            <Line
              type='monotone'
              dataKey='temp'
              stroke='#8884d8'
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export { CityDetailsPage };
