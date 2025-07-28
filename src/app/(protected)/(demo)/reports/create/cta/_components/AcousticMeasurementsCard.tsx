import React from 'react';

import { Volume2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AcousticMeasurements {
  // Niveaux sonores
  soundLevelMachine: number | '';
  soundLevelAmbient: number | '';
  soundLevelSoufflage: number | '';
  soundLevelReprise: number | '';

  // Distances
  measurementDistance: number | '';

  // Par bandes d'octave (optionnel)
  octave63Hz: number | '';
  octave125Hz: number | '';
  octave250Hz: number | '';
  octave500Hz: number | '';
  octave1kHz: number | '';
  octave2kHz: number | '';
  octave4kHz: number | '';
  octave8kHz: number | '';
}

export const AcousticMeasurementsCard: React.FC<{
  measurements: AcousticMeasurements;
  onUpdate: (field: keyof AcousticMeasurements, value: number | '') => void;
}> = ({ measurements, onUpdate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-base">
          <Volume2 className="mr-2 h-4 w-4 text-purple-600" />
          Mesures acoustiques
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm">Niveau sonore machine (dB(A))</Label>
            <Input
              type="number"
              step="0.1"
              value={measurements.soundLevelMachine}
              onChange={(e) =>
                onUpdate('soundLevelMachine', parseFloat(e.target.value) || '')
              }
              placeholder="65.5"
              className="h-8"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Distance de mesure (m)</Label>
            <Input
              type="number"
              step="0.5"
              value={measurements.measurementDistance}
              onChange={(e) =>
                onUpdate(
                  'measurementDistance',
                  parseFloat(e.target.value) || ''
                )
              }
              placeholder="1.0"
              className="h-8"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Bruit ambiant (dB(A))</Label>
            <Input
              type="number"
              step="0.1"
              value={measurements.soundLevelAmbient}
              onChange={(e) =>
                onUpdate('soundLevelAmbient', parseFloat(e.target.value) || '')
              }
              placeholder="45.0"
              className="h-8"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Bouche soufflage (dB(A))</Label>
            <Input
              type="number"
              step="0.1"
              value={measurements.soundLevelSoufflage}
              onChange={(e) =>
                onUpdate(
                  'soundLevelSoufflage',
                  parseFloat(e.target.value) || ''
                )
              }
              placeholder="55.0"
              className="h-8"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
