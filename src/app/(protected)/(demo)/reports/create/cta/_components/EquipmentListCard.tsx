import React from 'react';

import { ClipboardList, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Equipment } from '@/types';

interface EquipmentListCardProps {
  equipments: Equipment[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Equipment, value: string) => void;
  onDelete: (id: string) => void;
}

export const EquipmentListCard: React.FC<EquipmentListCardProps> = ({
  equipments,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const equipmentTypes = [
    { value: 'VENTILATEUR', label: 'Ventilateur' },
    { value: 'BATTERIE', label: 'Batterie' },
    { value: 'FILTRE', label: 'Filtre' },
    { value: 'REGISTRE', label: 'Registre' },
    { value: 'SONDE', label: 'Sonde' },
    { value: 'VARIATEUR', label: 'Variateur' },
    { value: 'AUTRE', label: 'Autre' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center">
            <ClipboardList className="mr-2 h-4 w-4" />
            Relevé des équipements
          </span>
          <Button size="sm" onClick={onAdd}>
            <Plus className="mr-1 h-3 w-3" />
            Ajouter
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {equipments.map((equipment, index) => (
          <div key={equipment.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold">Équipement {index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(equipment.id)}
                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">Type</Label>
                <Select
                  value={equipment.type}
                  onValueChange={(value) =>
                    onUpdate(equipment.id, 'type', value)
                  }
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Désignation</Label>
                <Input
                  value={equipment.designation}
                  onChange={(e) =>
                    onUpdate(equipment.id, 'designation', e.target.value)
                  }
                  placeholder="Ex: Ventilateur soufflage"
                  className="h-8"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Marque</Label>
                <Input
                  value={equipment.marque}
                  onChange={(e) =>
                    onUpdate(equipment.id, 'marque', e.target.value)
                  }
                  placeholder="Ex: NICOTRA"
                  className="h-8"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Modèle</Label>
                <Input
                  value={equipment.modele}
                  onChange={(e) =>
                    onUpdate(equipment.id, 'modele', e.target.value)
                  }
                  placeholder="Ex: RDH 560"
                  className="h-8"
                />
              </div>
            </div>
          </div>
        ))}

        {equipments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <ClipboardList className="mx-auto h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm">Aucun équipement relevé</p>
            <p className="text-xs">
              Cliquez sur &quot;Ajouter&quot; pour commencer
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
