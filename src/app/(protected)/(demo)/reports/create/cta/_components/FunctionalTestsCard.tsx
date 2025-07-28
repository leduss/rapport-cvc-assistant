import React from 'react';

import { Gauge } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { CTATest } from './type/type';

interface FunctionalTestsCardProps {
  tests: CTATest['functionalTests'];
  onUpdate: (
    field: keyof CTATest['functionalTests'],
    value: 'REUSSI' | 'ECHEC' | 'EN_ATTENTE' | 'NON_APPLICABLE'
  ) => void;
}

type TestStatus = 'REUSSI' | 'ECHEC' | 'EN_ATTENTE' | 'NON_APPLICABLE';

interface TestItem {
  key: keyof CTATest['functionalTests'];
  label: string;
}

export const FunctionalTestsCard: React.FC<FunctionalTestsCardProps> = ({
  tests,
  onUpdate,
}) => {
  const testItems: TestItem[] = [
    { key: 'fanStartStop', label: 'Démarrage/arrêt ventilateur' },
    { key: 'damperControl', label: 'Contrôle des registres' },
    { key: 'heatingControl', label: 'Contrôle chauffage' },
    { key: 'coolingControl', label: 'Contrôle refroidissement' },
    { key: 'filterMonitoring', label: 'Surveillance filtres' },
    { key: 'emergencyStop', label: "Arrêt d'urgence" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REUSSI':
        return 'text-green-600';
      case 'ECHEC':
        return 'text-red-600';
      case 'NON_APPLICABLE':
        return 'text-blue-600';
      case 'EN_ATTENTE':
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'REUSSI':
        return '✓';
      case 'ECHEC':
        return '✗';
      case 'NON_APPLICABLE':
        return '—';
      default:
        return '';
    }
  };

  const statusOptions: {
    value: TestStatus;
    label: string;
    description?: string;
  }[] = [
    { value: 'EN_ATTENTE', label: 'En attente' },
    { value: 'REUSSI', label: 'Réussi' },
    { value: 'ECHEC', label: 'Échec' },
    {
      value: 'NON_APPLICABLE',
      label: 'Non applicable',
      description: 'Test non requis pour cette configuration',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-base">
          <Gauge className="mr-2 h-4 w-4" />
          Tests fonctionnels
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {testItems.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between">
            <Label className="text-sm">{label}</Label>
            <Select
              value={tests[key]}
              onValueChange={(newValue: TestStatus) => onUpdate(key, newValue)}
            >
              <SelectTrigger className="w-36 h-8">
                <SelectValue className={getStatusColor(tests[key])}>
                  <span className="flex items-center gap-2">
                    <span className="font-semibold">
                      {getStatusIcon(tests[key])}
                    </span>
                    {
                      statusOptions.find((opt) => opt.value === tests[key])
                        ?.label
                    }
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(({ value, label, description }) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-semibold ${getStatusColor(value)}`}
                      >
                        {getStatusIcon(value)}
                      </span>
                      <span className={getStatusColor(value)}>{label}</span>
                    </div>
                    {description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {description}
                      </p>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
