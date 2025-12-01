/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useState } from 'react';

function useUserGeolocation() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.log('333');
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        setError('Unable to retrieve your location');
      }
    );
  };

  return { coords, error, getLocation };
}

export { useUserGeolocation };
