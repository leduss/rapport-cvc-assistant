import React from 'react';

import { Thermometer } from 'lucide-react';

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

interface PreviewReportMesureThermiqueProps {
  thermalMeasurements: CTATest['thermalMeasurements'];
}

const PreviewReportMesureThermique = ({
  thermalMeasurements,
}: PreviewReportMesureThermiqueProps) => {
  const thermalEntries = [
    {
      label: 'Température soufflage',
      value: thermalMeasurements.supplyAirTemp,
    },
    {
      label: 'Température reprise',
      value: thermalMeasurements.returnAirTemp,
    },
    {
      label: 'Température extérieure',
      value: thermalMeasurements.outsideAirTemp,
    },
    {
      label: 'Entrée batterie chaude',
      value: thermalMeasurements.heatingCoilInletTemp,
    },
    {
      label: 'Sortie batterie chaude',
      value: thermalMeasurements.heatingCoilOutletTemp,
    },
    {
      label: 'Entrée batterie froide',
      value: thermalMeasurements.coolingCoilInletTemp,
    },
    {
      label: 'Sortie batterie froide',
      value: thermalMeasurements.coolingCoilOutletTemp,
    },
  ];

  const allThermalEmpty = thermalEntries.every(
    (item) =>
      item.value === '' || item.value === null || item.value === undefined
  );

  if (allThermalEmpty) {
    return null;
  }

  return (
    <Card className="mb-6 p-4">
      <CardTitle className="flex items-center gap-3 pl-8 text-lg underline">
        <Thermometer className="h-6 w-6 text-red-500" /> Mesures thermiques
      </CardTitle>
      <CardContent className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Point de mesure</TableHead>
              <TableHead>Température (°C)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {thermalEntries
              .filter(
                (item) =>
                  item.value !== '' &&
                  item.value !== null &&
                  item.value !== undefined
              )
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="">{item.label}</TableCell>
                  <TableCell className="">{item.value}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PreviewReportMesureThermique;
