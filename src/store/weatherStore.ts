import { create } from 'zustand';

export type Weather = {
  main: { temp: number; humidity: number; pressure: number };
  wind?: { speed: number };
  weather: { main: string; description: string; icon: string }[];
  name?: string;
  sys?: { country?: string };
};

interface WeatherStore {
  weather: Weather | null;
  setWeather: (weather: Weather | null) => void;
  postalCode: string | null;
  setPostalCode: (postalCode: string | null) => void;
  loading: boolean;
  error: string | null;
  fetchAll: (lat: number, lon: number) => Promise<void>;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  weather: null,
  setWeather: (weather) => set({ weather }),
  postalCode: null,
  setPostalCode: (postalCode) => set({ postalCode }),
  loading: false,
  error: null,
  fetchAll: async (lat, lon) => {
    set({ loading: true, error: null });
    try {
      // Fetch météo
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_KEY;
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`
      );
      if (!weatherRes.ok) throw new Error('Erreur API météo');
      const weather = await weatherRes.json();

      // Fetch code postal
      const postalRes = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=fr`
      );
      if (!postalRes.ok) throw new Error('Erreur API Nominatim');
      const postalData = await postalRes.json();
      const postalCode = postalData.address?.postcode || null;

      set({ weather, postalCode, loading: false, error: null });
    } catch (e: any) {
      set({ loading: false, error: e.message || 'Erreur inconnue' });
    }
  },
}));
