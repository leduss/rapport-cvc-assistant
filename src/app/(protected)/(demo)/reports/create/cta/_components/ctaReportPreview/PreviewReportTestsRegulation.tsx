import React from 'react';

import { Gauge } from 'lucide-react';

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

interface PreviewReportTestsRegulationProps {
  controlTests: CTATest['controlTests'];
  getStatusBadgeClass: (status: string) => string;
}

const PreviewReportTestsRegulation = ({
  controlTests,
  getStatusBadgeClass,
}: PreviewReportTestsRegulationProps) => {
  return (
    <Card className="mb-6 p-4">
      <CardTitle className="flex items-center gap-3 pl-8 text-lg underline">
        <Gauge className="h-5 w-5" />
        Tests de régulation
      </CardTitle>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test</TableHead>
              <TableHead>Résultat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Régulation température</TableCell>
              <TableCell>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(controlTests.temperatureControl)}`}
                >
                  {controlTests.temperatureControl.replace(/_/g, ' ')}
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Régulation humidité</TableCell>
              <TableCell>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(controlTests.humidityControl)}`}
                >
                  {controlTests.humidityControl.replace(/_/g, ' ')}
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Régulation CO2</TableCell>
              <TableCell>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(controlTests.co2Control)}`}
                >
                  {controlTests.co2Control.replace(/_/g, ' ')}
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Programmation horaire</TableCell>
              <TableCell>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(controlTests.scheduleOperation)}`}
                >
                  {controlTests.scheduleOperation.replace(/_/g, ' ')}
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PreviewReportTestsRegulation;
