import React from 'react';

import { Thermometer } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { CTATest } from './type/type';

interface ThermalMeasurementsCardProps {
  measurements: CTATest['thermalMeasurements'];
  onUpdate: (
    field: keyof CTATest['thermalMeasurements'],
    value: number | ''
  ) => void;
}

interface ThermalField {
  key: keyof CTATest['thermalMeasurements'];
  label: string;
  placeholder: string;
}

export const ThermalMeasurementsCard: React.FC<
  ThermalMeasurementsCardProps
> = ({ measurements, onUpdate }) => {
  const thermalFields: ThermalField[] = [
    {
      key: 'supplyAirTemp',
      label: 'Température soufflage',
      placeholder: 'Ex: 18.5',
    },
    {
      key: 'returnAirTemp',
      label: 'Température reprise',
      placeholder: 'Ex: 22.0',
    },
    {
      key: 'outsideAirTemp',
      label: 'Température extérieure',
      placeholder: 'Ex: 12.0',
    },
    {
      key: 'heatingCoilInletTemp',
      label: 'Entrée batterie chaude',
      placeholder: 'Ex: 70.0',
    },
    {
      key: 'heatingCoilOutletTemp',
      label: 'Sortie batterie chaude',
      placeholder: 'Ex: 45.0',
    },
    {
      key: 'coolingCoilInletTemp',
      label: 'Entrée batterie froide',
      placeholder: 'Ex: 7.0',
    },
    {
      key: 'coolingCoilOutletTemp',
      label: 'Sortie batterie froide',
      placeholder: 'Ex: 12.0',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-base">
          <Thermometer className="mr-2 h-4 w-4" />
          Mesures thermiques
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {thermalFields.map(({ key, label, placeholder }) => (
            <div key={key} className="space-y-2">
              <Label className="text-sm">{label} (°C)</Label>
              <Input
                type="number"
                step="0.1"
                value={measurements[key]}
                onChange={(e) =>
                  onUpdate(key, parseFloat(e.target.value) || '')
                }
                placeholder={placeholder}
                className="h-8"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
