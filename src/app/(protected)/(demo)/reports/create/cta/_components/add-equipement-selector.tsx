'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Liste d'équipements
const availableEquipments = [
  { id: '1', name: 'Moteur 1', type: 'MOTEUR' },
  { id: '2', name: 'Moteur 2', type: 'MOTEUR' },
  { id: '3', name: 'Filtre 1', type: 'FILTRE' },
  { id: '4', name: 'Filtre 2', type: 'FILTRE' },
  { id: '5', name: 'Appareil de régulation 1', type: 'REGULATION' },
  { id: '6', name: 'Appareil de régulation 2', type: 'REGULATION' },
];

export default function AddEquipmentSelector({
  addEquipmentTest,
}: {
  addEquipmentTest: (equipmentId: string) => void;
}) {
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('');

  return (
    <div className="flex gap-4 items-center">
      {/* Sélection du type d’équipement */}
      <Select
        value={selectedType}
        onValueChange={(value) => {
          setSelectedType(value);
          setSelectedEquipment('');
        }}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Type d’équipement" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="MOTEUR">Moteur</SelectItem>
          <SelectItem value="FILTRE">Filtre</SelectItem>
          <SelectItem value="REGULATION">Appareil de régulation</SelectItem>
        </SelectContent>
      </Select>

      {/* Sélection d’un équipement filtré par type */}
      <Select
        value={selectedEquipment}
        onValueChange={(value) => {
          setSelectedEquipment(value);
          addEquipmentTest(value);
        }}
        disabled={!selectedType}
      >
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Choisir un équipement" />
        </SelectTrigger>
        <SelectContent>
          {availableEquipments
            .filter((eq) => eq.type === selectedType)
            .map((equipment) => (
              <SelectItem key={equipment.id} value={equipment.id}>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {equipment.type}
                  </Badge>
                  <span>{equipment.name}</span>
                </div>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
