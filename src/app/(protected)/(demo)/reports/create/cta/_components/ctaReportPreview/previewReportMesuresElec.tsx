import React from 'react';

import { Zap } from 'lucide-react';

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

interface PreviewReportMesuresElecProps {
  electricalMeasurements: CTATest['typescriptelectricalMeasurements'];
}

const PreviewReportMesuresElec = ({
  electricalMeasurements: typescriptelectricalMeasurements,
}: PreviewReportMesuresElecProps) => {
  const electrical = typescriptelectricalMeasurements;

  // Groupes de mesures avec leurs données
  const electricalGroups = [
    {
      title: 'Tensions',
      items: [
        { label: 'Tension L1-N', value: electrical.voltageL1N, unit: 'V' },
        { label: 'Tension L2-N', value: electrical.voltageL2N, unit: 'V' },
        { label: 'Tension L3-N', value: electrical.voltageL3N, unit: 'V' },
        { label: 'Tension L1-L2', value: electrical.voltageL1L2, unit: 'V' },
        { label: 'Tension L2-L3', value: electrical.voltageL2L3, unit: 'V' },
        { label: 'Tension L3-L1', value: electrical.voltageL3L1, unit: 'V' },
      ],
    },
    {
      title: 'Intensités',
      items: [
        { label: 'Courant L1', value: electrical.currentL1, unit: 'A' },
        { label: 'Courant L2', value: electrical.currentL2, unit: 'A' },
        { label: 'Courant L3', value: electrical.currentL3, unit: 'A' },
      ],
    },
    {
      title: 'Puissance et Protection',
      items: [
        {
          label: 'Puissance totale',
          value: electrical.totalPower,
          unit: 'kW',
        },
        { label: 'Cos φ', value: electrical.cosPhi, unit: '-' },
        { label: 'Fréquence', value: electrical.frequency, unit: 'Hz' },
        {
          label: "Résistance d'isolement",
          value: electrical.insulationResistance,
          unit: 'MΩ',
        },
        {
          label: 'Résistance de terre',
          value: electrical.earthResistance,
          unit: 'Ω',
        },
      ],
    },
  ];

  // Vérifier si toutes les valeurs sont vides
  const allEmpty = electricalGroups.every((group) =>
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
        <Zap className="mr-2 h-5 w-5 text-yellow-600" />
        Mesures électriques
      </CardTitle>
      <CardContent className="overflow-x-auto">
        <Table className="">
          <TableHeader>
            <TableRow className="">
              <TableHead>Paramètre</TableHead>
              <TableHead>Valeur</TableHead>
              <TableHead>Unité</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {electricalGroups.map((group, groupIndex) => {
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

export default PreviewReportMesuresElec;
