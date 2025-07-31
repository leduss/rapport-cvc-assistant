import React from 'react';

import { Wind } from 'lucide-react';

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

interface PreviewReportMesureAeroProps {
  airFlowMeasurements: CTATest['airFlowMeasurements'];
}

const PreviewReportMesureAero = ({
  airFlowMeasurements,
}: PreviewReportMesureAeroProps) => {
  const airFlowEntries = Object.entries(airFlowMeasurements).filter(
    ([_, value]) => value !== '' && value !== null && value !== undefined
  );

  // Si aucune donnée n'est présente, ne pas afficher la section du tout
  if (airFlowEntries.length === 0) {
    return null;
  }

  // Mapping des clés aux labels et unités
  const labels: Record<string, string> = {
    supplyAirFlow: 'Débit soufflage',
    returnAirFlow: 'Débit reprise',
    exhaustAirFlow: 'Débit extraction',
    outsideAirFlow: 'Débit air neuf',
    supplyPressure: 'Pression soufflage',
    returnPressure: 'Pression reprise',
  };

  const units: Record<string, string> = {
    supplyAirFlow: 'm³/h',
    returnAirFlow: 'm³/h',
    exhaustAirFlow: 'm³/h',
    outsideAirFlow: 'm³/h',
    supplyPressure: 'Pa',
    returnPressure: 'Pa',
  };
  return (
    <Card className="mb-6 p-4">
      <CardTitle className="flex items-center gap-3 pl-8 text-lg underline">
        <Wind className="h-6 w-6 text-blue-400" />
        Mesures aérauliques
      </CardTitle>
      <CardContent className="">
        <Table className="">
          <TableHeader>
            <TableRow className="">
              <TableHead className="">Paramètre</TableHead>
              <TableHead className="">Valeur mesurée</TableHead>
              <TableHead className="">Unité</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {airFlowEntries.map(([key, value]) => (
              <TableRow key={key}>
                <TableCell className="">{labels[key]}</TableCell>
                <TableCell className="">{value}</TableCell>
                <TableCell className="">{units[key]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PreviewReportMesureAero;
