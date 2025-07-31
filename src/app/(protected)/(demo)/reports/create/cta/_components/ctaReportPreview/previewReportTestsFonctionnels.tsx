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

interface PreviewReportTestsFonctionnelsProps {
  functionalTests: CTATest['functionalTests'];
  getStatusBadgeClass: (status: string) => string;
}

const PreviewReportTestsFonctionnels = ({
  functionalTests,
  getStatusBadgeClass,
}: PreviewReportTestsFonctionnelsProps) => {
  return (
    <Card className="mb-6 p-4">
      <CardTitle className="flex items-center gap-3 pl-8 text-lg underline">
        <Gauge className="h-5 w-5" />
        Tests fonctionnels
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
              <TableCell>Démarrage/arrêt ventilateur</TableCell>
              <TableCell>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(functionalTests.fanStartStop)}`}
                >
                  {functionalTests.fanStartStop.replace(/_/g, ' ')}
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Contrôle des registres</TableCell>
              <TableCell>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(functionalTests.damperControl)}`}
                >
                  {functionalTests.damperControl.replace(/_/g, ' ')}
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Contrôle chauffage</TableCell>
              <TableCell>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(functionalTests.heatingControl)}`}
                >
                  {functionalTests.heatingControl.replace(/_/g, ' ')}
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Contrôle refroidissement</TableCell>
              <TableCell>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(functionalTests.coolingControl)}`}
                >
                  {functionalTests.coolingControl.replace(/_/g, ' ')}
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Surveillance filtres</TableCell>
              <TableCell>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(functionalTests.filterMonitoring)}`}
                >
                  {functionalTests.filterMonitoring.replace(/_/g, ' ')}
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Arrêt d&#39;urgence</TableCell>
              <TableCell>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(functionalTests.emergencyStop)}`}
                >
                  {functionalTests.emergencyStop.replace(/_/g, ' ')}
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PreviewReportTestsFonctionnels;
