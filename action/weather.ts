// src/app/(protected)/(demo)/dashboard/actions.ts

export async function fetchWeather(lat: number, lon: number) {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Erreur API météo');
  return res.json();
}

export async function fetchPostalCode(lat: number, lon: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=fr`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erreur API Nominatim');
  return res.json();
}
