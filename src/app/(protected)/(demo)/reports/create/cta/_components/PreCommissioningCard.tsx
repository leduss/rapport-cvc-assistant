import React from 'react';

import { Settings } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import { CTATest } from './type/type';

interface PreCommissioningCardProps {
  checks: CTATest['preCommissioningChecks'];
  onUpdate: (
    field: keyof CTATest['preCommissioningChecks'],
    value: boolean
  ) => void;
}

export const PreCommissioningCard: React.FC<PreCommissioningCardProps> = ({
  checks,
  onUpdate,
}) => {
  const checkItems = [
    { key: 'visualInspection', label: 'Inspection visuelle générale' },
    { key: 'mechanicalConnections', label: 'Raccordements mécaniques' },
    { key: 'electricalConnections', label: 'Raccordements électriques' },
    { key: 'filterInstallation', label: 'Installation des filtres' },
    { key: 'damperOperation', label: 'Fonctionnement des registres' },
    { key: 'safetyDevices', label: 'Dispositifs de sécurité' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-base">
          <Settings className="mr-2 h-4 w-4" />
          Vérifications préliminaires
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {checkItems.map(({ key, label }) => (
          <div key={key} className="flex items-center space-x-2">
            <Checkbox
              id={key}
              checked={checks[key as keyof typeof checks]}
              onCheckedChange={(checked) =>
                onUpdate(key as keyof typeof checks, !!checked)
              }
            />
            <Label htmlFor={key} className="text-sm">
              {label}
            </Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
