import { useState, useEffect } from 'react';
import type { Location } from '../types';

export function useLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string>('');

  const updateLocation = (latitude: number, longitude: number) => {
    setLocation({ latitude, longitude });
    setError('');
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateLocation(position.coords.latitude, position.coords.longitude);
      },
      () => {
        setError('Unable to retrieve your location');
        // Set default location to New York City
        updateLocation(40.7128, -74.0060);
      }
    );
  }, []);

  return { location, error, updateLocation };
}