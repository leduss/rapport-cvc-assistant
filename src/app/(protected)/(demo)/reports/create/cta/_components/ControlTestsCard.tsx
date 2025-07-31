import React from 'react';

import { Settings2 } from 'lucide-react';

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

interface ControlTestsCardProps {
  tests: CTATest['controlTests'];
  onUpdate: (
    field: keyof CTATest['controlTests'],
    value: 'REUSSI' | 'ECHEC' | 'EN_ATTENTE' | 'NON_APPLICABLE'
  ) => void;
}

type TestStatus = 'REUSSI' | 'ECHEC' | 'EN_ATTENTE' | 'NON_APPLICABLE';

interface TestItem {
  key: keyof CTATest['controlTests'];
  label: string;
  description?: string;
}

export const ControlTestsCard: React.FC<ControlTestsCardProps> = ({
  tests,
  onUpdate,
}) => {
  const testItems: TestItem[] = [
    {
      key: 'temperatureControl',
      label: 'Régulation température',
      description: 'Maintien de la consigne de température',
    },
    {
      key: 'humidityControl',
      label: 'Régulation humidité',
      description: "Contrôle du taux d'humidité relative",
    },
    {
      key: 'co2Control',
      label: 'Régulation CO2',
      description: "Gestion de la qualité d'air par sonde CO2",
    },
    {
      key: 'scheduleOperation',
      label: 'Programmation horaire',
      description: 'Fonctionnement selon planning GTB/GTC',
    },
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
    {
      value: 'EN_ATTENTE',
      label: 'En attente',
      description: 'Test non encore effectué',
    },
    {
      value: 'REUSSI',
      label: 'Réussi',
      description: 'Fonctionnement conforme',
    },
    {
      value: 'ECHEC',
      label: 'Échec',
      description: 'Dysfonctionnement constaté',
    },
    {
      value: 'NON_APPLICABLE',
      label: 'Non applicable',
      description: 'Fonction non présente sur cette CTA',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-base">
          <Settings2 className="mr-2 h-4 w-4" />
          Tests de régulation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {testItems.map(({ key, label, description }) => (
          <div key={key} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label className="text-sm font-medium">{label}</Label>
                {description && (
                  <p className="text-muted-foreground mt-0.5 text-xs">
                    {description}
                  </p>
                )}
              </div>
              <Select
                value={tests[key]}
                onValueChange={(newValue: TestStatus) =>
                  onUpdate(key, newValue)
                }
              >
                <SelectTrigger className="h-8 w-36">
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
                      <div className="py-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-semibold ${getStatusColor(value)}`}
                          >
                            {getStatusIcon(value)}
                          </span>
                          <span className={getStatusColor(value)}>{label}</span>
                        </div>
                        {description && (
                          <p className="text-muted-foreground mt-0.5 ml-6 text-xs">
                            {description}
                          </p>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}

        {/* Note d'information */}
        <div className="mt-4 rounded-md bg-blue-50 p-3">
          <p className="text-xs text-blue-700">
            <strong>Note :</strong> Marquez &quot;Non applicable&quot; pour les
            fonctions de régulation non installées ou non configurées sur cette
            CTA.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
