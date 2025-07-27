'use client';

import React, { useEffect } from 'react';

import { Calendar, Plus, Search, Thermometer } from 'lucide-react';

import AlertCard from '@/app/(protected)/(demo)/dashboard/overview/_components/AlertCard';
import InterventionCard from '@/app/(protected)/(demo)/dashboard/overview/_components/InterventionCard';
import MetricCard from '@/app/(protected)/(demo)/dashboard/overview/_components/MetricCard';
import PerformanceBar from '@/app/(protected)/(demo)/dashboard/overview/_components/PerformanceBar';
import ReportCard from '@/app/(protected)/(demo)/dashboard/overview/_components/ReportCard';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useWeatherQuery } from '@/hooks/useWeatherQuery';
import { usePositionStore } from '@/store/positionStore';
import { useWeatherStore } from '@/store/weatherStore';

import { fetchPostalCode } from '../../../../../../action/weather';

type Weather = {
  main: { temp: number; humidity: number; pressure: number };
  wind?: { speed: number };
  weather: { main: string; description: string }[];
};

export default function OverviewPage() {
  const position = usePositionStore((state) => state.position);
  const setPosition = usePositionStore((state) => state.setPosition);
  const postalCode = useWeatherStore((state) => state.postalCode);
  const setPostalCode = useWeatherStore((state) => state.setPostalCode);
  const fetchAll = useWeatherStore((state) => state.fetchAll);

  const {
    data: weather,
    isLoading,
    error: weatherError,
  } = useWeatherQuery(position?.lat, position?.lon);

  // --- Ajout météo dynamique ---

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

  // Données mockées
  const metrics = {
    projetsActifs: {
      value: 12,
      change: 2,
      period: 'ce mois',
      icon: require('lucide-react').Building,
      color: 'blue',
    },
    rapportsEnCours: {
      value: 8,
      change: -1,
      period: 'cette semaine',
      icon: require('lucide-react').FileText,
      color: 'orange',
    },
    equipementsTestes: {
      value: 147,
      change: 23,
      period: 'ce mois',
      icon: require('lucide-react').Wrench,
      color: 'green',
    },
    tauxReussite: {
      value: 94.2,
      unit: '%',
      change: 1.2,
      period: 'vs mois dernier',
      icon: require('lucide-react').CheckCircle,
      color: 'emerald',
    },
  };

  const interventions = [
    {
      date: '2024-01-15',
      time: '09:00',
      project: 'Hôpital Saint-Jean',
      equipment: 'CTA Bloc A - Mise en service',
      type: 'CTA',
    },
    {
      date: '2024-01-15',
      time: '14:30',
      project: 'Centre Atlantis',
      equipment: 'Aérothermes Zone Food Court',
      type: 'AEROTHERME',
    },
    {
      date: '2024-01-16',
      time: '08:00',
      project: 'TechPark Phase 2',
      equipment: 'Pompes circuit primaire',
      type: 'POMPE',
    },
  ];

  const urgentReports = [
    {
      id: 'RPT-2024-001',
      project: 'Hôpital Saint-Jean',
      title: 'Mise en service CTA Bloc A',
      dueDate: '2024-01-18',
      progress: 75,
      priority: 'high',
    },
    {
      id: 'RPT-2024-007',
      project: 'École des Tilleuls',
      title: 'Tests ventilateurs classes',
      dueDate: '2024-01-20',
      progress: 45,
      priority: 'medium',
    },
  ];

  const alerts = [
    {
      type: 'warning',
      message: '3 équipements nécessitent une re-vérification',
      project: 'Centre Atlantis',
      date: 'Il y a 2 heures',
    },
    {
      type: 'info',
      message: 'Nouveau template CTA disponible',
      date: 'Hier',
    },
    {
      type: 'success',
      message: 'Rapport validé par le client',
      project: 'Bureaux TechPark',
      date: 'Il y a 1 jour',
    },
  ];

  const performanceData = [
    { equipment: 'CTA', avgTime: 4.2, unit: 'heures', tests: 45 },
    { equipment: 'Aérothermes', avgTime: 1.8, unit: 'heures', tests: 89 },
    { equipment: 'Pompes', avgTime: 2.1, unit: 'heures', tests: 156 },
    { equipment: 'Ventilateurs', avgTime: 0.9, unit: 'heures', tests: 78 },
    { equipment: 'Thermostats', avgTime: 0.3, unit: 'heures', tests: 234 },
  ];

  function getTestConditions(weather: Weather) {
    if (!weather || !weather.main || !weather.weather) return null;

    const temp = weather.main.temp;
    const humidity = weather.main.humidity;
    const wind = weather.wind?.speed || 0;
    const description = weather.weather[0].main.toLowerCase();

    if (
      temp >= 15 &&
      temp <= 28 &&
      humidity < 80 &&
      !['rain', 'thunderstorm', 'snow'].includes(description) &&
      wind < 12 // ~43 km/h
    ) {
      return {
        emoji: '✅',
        message: 'Conditions optimales pour tests aérauliques',
        color: 'white',
        bg: 'bg-green-500/80',
      };
    }

    if (['rain', 'thunderstorm', 'snow'].includes(description) || wind >= 12) {
      return {
        emoji: '⚠️',
        message: 'Conditions défavorables (pluie, orage ou vent fort)',
        color: 'orange-800',
        bg: 'bg-orange-500',
      };
    }

    if (temp < 10 || temp > 32) {
      return {
        emoji: '⚠️',
        message: 'Température peu adaptée aux tests',
        color: 'orange-800',
        bg: 'bg-orange-500',
      };
    }

    return {
      emoji: 'ℹ️',
      message: 'Conditions acceptables, vigilance recommandée',
      color: 'blue-800',
      bg: 'bg-blue-500',
    };
  }

  return (
    <div className="p-6 space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Overview</h1>
          <p className="text-muted-foreground">
            Vue d&apos;ensemble de votre activité CVC
          </p>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Rechercher
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau rapport
          </Button>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Projets actifs" {...metrics.projetsActifs} />
        <MetricCard title="Rapports en cours" {...metrics.rapportsEnCours} />
        <MetricCard title="Équipements testés" {...metrics.equipementsTestes} />
        <MetricCard title="Taux de réussite" {...metrics.tauxReussite} />
      </div>

      {/* Section principale */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Planning de la semaine */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Planning de la semaine
            </CardTitle>
            <CardDescription>Interventions prévues</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {interventions.map((intervention, index) => (
              <InterventionCard key={index} intervention={intervention} />
            ))}
          </CardContent>
        </Card>

        {/* Conditions météo dynamiques */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Thermometer className="mr-2 h-5 w-5" />
              Conditions actuelles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {isLoading && <div>Chargement de la météo…</div>}
              
              {weather && !weatherError && weather.main && weather.weather && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">
                      {postalCode && postalCode} {weather.name}
                      {weather.sys && weather.sys.country
                        ? `, ${weather.sys.country}`
                        : ''}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Température</span>
                    <span className="font-medium">
                      {Math.round(weather.main.temp)}°C
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Humidité</span>
                    <span className="font-medium">
                      {weather.main.humidity}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Vent</span>
                    <span className="font-medium">
                      {weather.wind && weather.wind.speed
                        ? (weather.wind.speed * 3.6).toFixed(1)
                        : '—'}{' '}
                      km/h
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pression</span>
                    <span className="font-medium">
                      {weather.main.pressure} hPa
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ciel</span>
                    <span className="font-medium capitalize">
                      {weather.weather[0].description}
                    </span>
                  </div>
                  {(() => {
                    const cond = getTestConditions(weather);
                    return cond ? (
                      <AlertCard
                        message={cond.message}
                        emoji={cond.emoji}
                        color={cond.color}
                        bg={cond.bg}
                      />
                    ) : null;
                  })()}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section rapports et alertes */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Rapports urgents */}
        <Card>
          <CardHeader>
            <CardTitle>Rapports à finaliser</CardTitle>
            <CardDescription>Échéances prioritaires</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {urgentReports.map((report, index) => (
              <ReportCard key={index} report={report} />
            ))}
          </CardContent>
        </Card>

        {/* Alertes */}
        <Card>
          <CardHeader>
            <CardTitle>Alertes & Notifications</CardTitle>
            <CardDescription>Dernières activités</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, index) => (
              <AlertCard
                key={index}
                {...alert}
                type={alert.type as 'warning' | 'info' | 'success'}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Performances */}
      <Card>
        <CardHeader>
          <CardTitle>Performances par type déquipement</CardTitle>
          <CardDescription>Temps moyen de mise en service</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {performanceData.map((item, index) => (
              <PerformanceBar key={index} {...item} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
