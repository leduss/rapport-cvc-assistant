import React from 'react';

import { Zap } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ElectricalMeasurements } from '@/types';

interface ElectricalMeasurementsCardProps {
  measurements: ElectricalMeasurements;
  onUpdate: (field: keyof ElectricalMeasurements, value: number | '') => void;
}

export const ElectricalMeasurementsCard: React.FC<
  ElectricalMeasurementsCardProps
> = ({ measurements, onUpdate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-base">
          <Zap className="mr-2 h-4 w-4 text-yellow-600" />
          Mesures électriques
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tensions */}
        <div>
          <h4 className="mb-2 text-sm font-semibold">Tensions (V)</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label className="text-xs">L1-N</Label>
              <Input
                type="number"
                value={measurements.voltageL1N}
                onChange={(e) =>
                  onUpdate('voltageL1N', parseFloat(e.target.value) || '')
                }
                placeholder="230"
                className="h-8"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">L2-N</Label>
              <Input
                type="number"
                value={measurements.voltageL2N}
                onChange={(e) =>
                  onUpdate('voltageL2N', parseFloat(e.target.value) || '')
                }
                placeholder="230"
                className="h-8"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">L3-N</Label>
              <Input
                type="number"
                value={measurements.voltageL3N}
                onChange={(e) =>
                  onUpdate('voltageL3N', parseFloat(e.target.value) || '')
                }
                placeholder="230"
                className="h-8"
              />
            </div>
          </div>
        </div>

        {/* Courants */}
        <div>
          <h4 className="mb-2 text-sm font-semibold">Intensités (A)</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label className="text-xs">L1</Label>
              <Input
                type="number"
                step="0.1"
                value={measurements.currentL1}
                onChange={(e) =>
                  onUpdate('currentL1', parseFloat(e.target.value) || '')
                }
                placeholder="15.5"
                className="h-8"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">L2</Label>
              <Input
                type="number"
                step="0.1"
                value={measurements.currentL2}
                onChange={(e) =>
                  onUpdate('currentL2', parseFloat(e.target.value) || '')
                }
                placeholder="15.2"
                className="h-8"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">L3</Label>
              <Input
                type="number"
                step="0.1"
                value={measurements.currentL3}
                onChange={(e) =>
                  onUpdate('currentL3', parseFloat(e.target.value) || '')
                }
                placeholder="15.8"
                className="h-8"
              />
            </div>
          </div>
        </div>

        {/* Puissance et protection */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm">Puissance totale (kW)</Label>
            <Input
              type="number"
              step="0.1"
              value={measurements.totalPower}
              onChange={(e) =>
                onUpdate('totalPower', parseFloat(e.target.value) || '')
              }
              placeholder="10.5"
              className="h-8"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Cos φ</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={measurements.cosPhi}
              onChange={(e) =>
                onUpdate('cosPhi', parseFloat(e.target.value) || '')
              }
              placeholder="0.85"
              className="h-8"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Isolement (MΩ)</Label>
            <Input
              type="number"
              value={measurements.insulationResistance}
              onChange={(e) =>
                onUpdate(
                  'insulationResistance',
                  parseFloat(e.target.value) || ''
                )
              }
              placeholder="10"
              className="h-8"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Terre (Ω)</Label>
            <Input
              type="number"
              step="0.1"
              value={measurements.earthResistance}
              onChange={(e) =>
                onUpdate('earthResistance', parseFloat(e.target.value) || '')
              }
              placeholder="2.5"
              className="h-8"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
