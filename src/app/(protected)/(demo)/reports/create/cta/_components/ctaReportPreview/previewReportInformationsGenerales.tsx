import React from 'react';

import { Project } from '@prisma/client';

import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';

interface PreviewReportInformationsGeneralesProps {
  projectId: string;
  projects: Project[];
  getWeatherLabel: (weatherConditions: string | null) => string;
  weatherConditions: string | null;
  ambientTemp: number | null;
  notes: string | null;
}

const PreviewReportInformationsGenerales = ({
  projectId,
  projects,
  getWeatherLabel,
  weatherConditions,
  ambientTemp,
  notes,
}: PreviewReportInformationsGeneralesProps) => {
  return (
    <Card className="mb-6">
      <CardTitle className="px-6 text-lg">INFORMATIONS GÉNÉRALES</CardTitle>
      <span className="mx-6 border-b-2 border-blue-600"></span>
      <CardContent className="info-grid grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded border p-4 text-sm">
          <p className="mb-3 font-semibold">Projet</p>
          <p className="font-medium">
            {projects.find((p) => p.id === projectId)?.name || 'Non spécifié'}
          </p>
          <p className="mt-1 text-sm">
            {projects.find((p) => p.id === projectId)?.client || ''}
          </p>
        </div>
        <div className="rounded border p-4">
          <h4 className="mb-3 text-sm font-semibold">
            Conditions d&#39;intervention
          </h4>
          <p className="space-y-1 text-sm">
            <span className="block">
              <span className="font-medium">Météo:</span>{' '}
              {getWeatherLabel(weatherConditions) || 'Non renseignée'}
            </span>
            <span className="block">
              <span className="font-medium">Température ambiante:</span>{' '}
              {ambientTemp ? `${ambientTemp}°C` : 'N/A'}
            </span>
          </p>
        </div>
      </CardContent>
      {notes && (
        <CardFooter className="mx-6 flex items-center rounded border p-4">
          <p className="text-base font-semibold">Notes générales&nbsp;&nbsp;</p>
          <p className="text-sm whitespace-pre-wrap">{notes}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default PreviewReportInformationsGenerales;
