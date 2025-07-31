import React from 'react';

import { Volume2 } from 'lucide-react';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { CTATest } from '../type/type';

interface PreviewReportMesuresAcoustiquesProps {
  acousticMeasurements: CTATest['acousticMeasurements'];
}

const PreviewReportMesuresAcoustiques = ({
  acousticMeasurements,
}: PreviewReportMesuresAcoustiquesProps) => {
  const acoustic = acousticMeasurements;

  // Groupes de mesures avec leurs données
  const acousticGroups = [
    {
      title: 'Niveaux sonores globaux',
      items: [
        {
          label: 'Niveau sonore machine',
          value: acoustic.soundLevelMachine,
          unit: 'dB(A)',
        },
        {
          label: 'Bruit ambiant',
          value: acoustic.soundLevelAmbient,
          unit: 'dB(A)',
        },
        {
          label: 'Bouche soufflage',
          value: acoustic.soundLevelSoufflage,
          unit: 'dB(A)',
        },
        {
          label: 'Bouche reprise',
          value: acoustic.soundLevelReprise,
          unit: 'dB(A)',
        },
        {
          label: 'Bouche extraction',
          value: acoustic.soundLevelExtraction,
          unit: 'dB(A)',
        },
      ],
    },
    {
      title: 'Conditions de mesure',
      items: [
        {
          label: 'Distance de mesure',
          value: acoustic.measurementDistance,
          unit: 'm',
        },
        {
          label: 'Bruit de fond',
          value: acoustic.backgroundNoise,
          unit: 'dB(A)',
        },
      ],
    },
    {
      title: 'Analyse fréquentielle',
      items: [
        { label: '63 Hz', value: acoustic.octave63Hz, unit: 'dB' },
        { label: '125 Hz', value: acoustic.octave125Hz, unit: 'dB' },
        { label: '250 Hz', value: acoustic.octave250Hz, unit: 'dB' },
        { label: '500 Hz', value: acoustic.octave500Hz, unit: 'dB' },
        { label: '1 kHz', value: acoustic.octave1kHz, unit: 'dB' },
        { label: '2 kHz', value: acoustic.octave2kHz, unit: 'dB' },
        { label: '4 kHz', value: acoustic.octave4kHz, unit: 'dB' },
        { label: '8 kHz', value: acoustic.octave8kHz, unit: 'dB' },
      ],
    },
  ];

  // Vérifier si toutes les valeurs sont vides
  const allEmpty = acousticGroups.every((group) =>
    group.items.every(
      (item) =>
        item.value === '' || item.value === null || item.value === undefined
    )
  );

  if (allEmpty) {
    return null;
  }

  return (
    <Card className="mb-6 p-4">
      <CardTitle className="flex items-center gap-3 pl-8 text-lg underline">
        <Volume2 className="mr-2 h-5 w-5 text-purple-600" />
        Mesures acoustiques
      </CardTitle>
      <CardContent className="overflow-x-auto">
        <Table className="">
          <TableHeader>
            <TableRow className="">
              <TableHead>Point de mesure</TableHead>
              <TableHead>Niveau sonore</TableHead>
              <TableHead>Unité</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {acousticGroups.map((group, groupIndex) => {
              // Vérifier si le groupe contient des données
              const hasGroupData = group.items.some(
                (item) =>
                  item.value !== '' &&
                  item.value !== null &&
                  item.value !== undefined
              );

              if (!hasGroupData) return null;

              return (
                <React.Fragment key={groupIndex}>
                  <TableRow>
                    <TableCell colSpan={3} className="underline">
                      {group.title}
                    </TableCell>
                  </TableRow>
                  {group.items.map(
                    (item, itemIndex) =>
                      item.value !== '' &&
                      item.value !== null &&
                      item.value !== undefined && (
                        <TableRow key={itemIndex}>
                          <TableCell>{item.label}</TableCell>
                          <TableCell>{item.value}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                        </TableRow>
                      )
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PreviewReportMesuresAcoustiques;
