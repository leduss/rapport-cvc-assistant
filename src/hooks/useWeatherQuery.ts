// src/hooks/useWeatherQuery.ts
import { useQuery } from '@tanstack/react-query';

import { fetchWeather } from '../../action/weather';

export function useWeatherQuery(lat?: number, lon?: number) {
  return useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: () => fetchWeather(lat!, lon!),
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 10, // 10 minutes de cache
  });
}
