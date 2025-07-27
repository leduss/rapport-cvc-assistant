import React from 'react';

import Image from 'next/image';

import { ModeToggle } from '@/components/ui/mode-toggle';
import { useWeatherQuery } from '@/hooks/useWeatherQuery';
import { usePositionStore } from '@/store/positionStore';

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

  const {
    data: weather,
    isLoading,
    error: weatherError,
  } = useWeatherQuery(position?.lat, position?.lon);

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <div className="flex items-center gap-8 space-x-4 lg:space-x-0">
          <SidebarTrigger />
          <span className="text-sm text-muted-foreground font-medium hidden sm:inline-block">
            {getTodayFr()}
          </span>
          {isLoading && (
            <span className="text-xs text-muted-foreground ml-2">
              Chargement météo…
            </span>
          )}
          {weatherError && (
            <span className="text-xs text-red-600 ml-2">
              {String(weatherError)}
            </span>
          )}
          {weather && weather.main && weather.weather && !weatherError && (
            <span className="flex items-center text-sm font-medium text-muted-foreground ml-2">
              <Image
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                width={32}
                height={32}
                className="w-7 h-7 -ml-1 mr-1"
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
