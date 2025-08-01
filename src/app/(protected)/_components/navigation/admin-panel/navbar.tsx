import React, { useEffect } from 'react';

import Image from 'next/image';

import { ModeToggle } from '@/components/ui/mode-toggle';
import { useWeatherQuery } from '@/hooks/useWeatherQuery';
import { usePositionStore } from '@/store/positionStore';
import { useWeatherStore } from '@/store/weatherStore';

import { fetchPostalCode } from '../../../../../../action/weather';
import { SidebarTrigger } from '../../../../../components/ui/sidebar';

function getTodayFr() {
  return new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function Navbar() {
  const position = usePositionStore((state) => state.position);
  const setPosition = usePositionStore((state) => state.setPosition);
  const setPostalCode = useWeatherStore((state) => state.setPostalCode);
  const fetchAll = useWeatherStore((state) => state.fetchAll);

  const {
    data: weather,
    isLoading,
    error: weatherError,
  } = useWeatherQuery(position?.lat, position?.lon);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'geolocation' in navigator &&
      !position
    ) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        },
        () => {
          // setWeatherError('Impossible de récupérer la position.'); // This line was removed
        }
      );
    }
  }, [setPosition, position]);

  useEffect(() => {
    if (position) {
      fetchAll(position.lat, position.lon);
    }
  }, [position, fetchAll]);

  useEffect(() => {
    if (position) {
      fetchPostalCode(position.lat, position.lon)
        .then((data) => {
          setPostalCode(data.address?.postcode || null);
        })
        .catch(() => setPostalCode(null));
    }
  }, [position, setPostalCode]);

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary sticky top-0 z-10 w-full shadow backdrop-blur">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <div className="flex items-center gap-8 space-x-4 lg:space-x-0">
          <SidebarTrigger />
          <span className="text-muted-foreground hidden text-sm font-medium sm:inline-block">
            {getTodayFr()}
          </span>
          {isLoading && (
            <span className="text-muted-foreground ml-2 text-xs">
              Chargement météo…
            </span>
          )}
          {weatherError && (
            <span className="ml-2 text-xs text-red-600">
              {String(weatherError)}
            </span>
          )}
          {weather && weather.main && weather.weather && !weatherError && (
            <span className="text-muted-foreground ml-2 flex items-center text-sm font-medium">
              <Image
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                width={32}
                height={32}
                className="mr-1 -ml-1 h-7 w-7"
                style={{ display: 'inline-block', verticalAlign: 'middle' }}
              />
              {Math.round(weather.main.temp)}°C
            </span>
          )}
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
