import React from 'react';

import { List } from 'lucide-react';

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

interface PreviewReportEquipmentListProps {
  equipmentList: CTATest['equipmentList'];
  getEquipmentTypeLabel: (type: string) => string;
}

const PreviewReportEquipmentList = ({
  equipmentList,
  getEquipmentTypeLabel,
}: PreviewReportEquipmentListProps) => {
  if (equipmentList.length === 0) {
    return null;
  }

  const hasCharacteristics = equipmentList.some((eq) => eq.caracteristiques);

  const getTypeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      VENTILATEUR: 'bg-blue-100 text-blue-800',
      BATTERIE: 'bg-green-100 text-green-800',
      FILTRE: 'bg-yellow-100 text-yellow-800',
      REGISTRE: 'bg-purple-100 text-purple-800',
      SONDE: 'bg-pink-100 text-pink-800',
      VARIATEUR: 'bg-indigo-100 text-indigo-800',
      AUTRE: 'bg-gray-100 text-gray-800',
    };

    return colorMap[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="mb-6 p-4">
      <CardTitle className="flex items-center gap-3 pl-8 text-lg underline">
        <List className="h-5 w-5" />
        Relevé des équipements
      </CardTitle>
      <CardContent className="space-y-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Désignation</TableHead>
                <TableHead>Marque</TableHead>
                <TableHead>Modèle</TableHead>
                <TableHead>N° Série</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipmentList.map((equipment) => (
                <TableRow key={equipment.id} className='w-24'>
                  <TableCell className="w-36">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getTypeColor(equipment.type)}`}
                    >
                      {getEquipmentTypeLabel(equipment.type)}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">
                    {equipment.designation}
                  </TableCell>
                  <TableCell>{equipment.marque}</TableCell>
                  <TableCell>{equipment.modele}</TableCell>
                  <TableCell className="font-mono">
                    {equipment.numeroSerie}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {hasCharacteristics && (
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="mb-2 text-sm font-semibold text-gray-700">
              Caractéristiques techniques :
            </p>
            <div className="space-y-2">
              {equipmentList
                .filter((eq) => eq.caracteristiques)
                .map((eq) => (
                  <div
                    key={eq.id}
                    className="rounded border border-gray-200 bg-white p-3 text-sm"
                  >
                    <span className="font-medium text-gray-800">
                      {eq.designation}:
                    </span>
                    <span className="ml-2 text-gray-600">
                      {eq.caracteristiques}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PreviewReportEquipmentList;
