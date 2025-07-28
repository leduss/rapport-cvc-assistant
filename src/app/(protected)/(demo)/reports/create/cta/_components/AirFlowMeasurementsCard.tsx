import React from 'react';

import { Activity } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { CTATest } from './type/type';

interface AirFlowMeasurementsCardProps {
  measurements: CTATest['airFlowMeasurements'];
  onUpdate: (
    field: keyof CTATest['airFlowMeasurements'],
    value: number | ''
  ) => void;
}

interface MeasurementField {
  key: keyof CTATest['airFlowMeasurements'];
  label: string;
  placeholder: string;
  unit: string;
}

export const AirFlowMeasurementsCard: React.FC<
  AirFlowMeasurementsCardProps
> = ({ measurements, onUpdate }) => {
  const measurementFields: MeasurementField[] = [
    {
      key: 'supplyAirFlow',
      label: 'Débit soufflage',
      placeholder: 'Ex: 5000',
      unit: 'm³/h',
    },
    {
      key: 'returnAirFlow',
      label: 'Débit reprise',
      placeholder: 'Ex: 4500',
      unit: 'm³/h',
    },
    {
      key: 'exhaustAirFlow',
      label: 'Débit extraction',
      placeholder: 'Ex: 1000',
      unit: 'm³/h',
    },
    {
      key: 'outsideAirFlow',
      label: 'Débit air neuf',
      placeholder: 'Ex: 1500',
      unit: 'm³/h',
    },
    {
      key: 'supplyPressure',
      label: 'Pression soufflage',
      placeholder: 'Ex: 150',
      unit: 'Pa',
    },
    {
      key: 'returnPressure',
      label: 'Pression reprise',
      placeholder: 'Ex: -50',
      unit: 'Pa',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-base">
          <Activity className="mr-2 h-4 w-4" />
          Mesures aérauliques
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {measurementFields.map(({ key, label, placeholder, unit }) => (
            <div key={key} className="space-y-2">
              <Label className="text-sm">
                {label} ({unit})
              </Label>
              <Input
                type="number"
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
