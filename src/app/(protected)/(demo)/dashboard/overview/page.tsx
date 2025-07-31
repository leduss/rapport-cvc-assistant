'use client';

import React from 'react';

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

import {
  alerts,
  interventions,
  metrics,
  performanceData,
  urgentReports,
} from './_components/data';

type Weather = {
  main: { temp: number; humidity: number; pressure: number };
  wind?: { speed: number };
  weather: { main: string; description: string }[];
};

export default function OverviewPage() {
  const position = usePositionStore((state) => state.position);
  const postalCode = useWeatherStore((state) => state.postalCode);

  const {
    data: weather,
    isLoading,
    error: weatherError,
  } = useWeatherQuery(position?.lat, position?.lon);

  // --- Ajout météo dynamique ---

  // Données mockées

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
    <div className="space-y-6 p-6">
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
                  <div className="mb-2 flex items-center justify-between">
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
