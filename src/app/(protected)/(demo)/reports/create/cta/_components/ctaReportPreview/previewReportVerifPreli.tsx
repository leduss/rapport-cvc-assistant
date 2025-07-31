import React from 'react';

import { Settings } from 'lucide-react';

import { Card, CardContent, CardTitle } from '@/components/ui/card';

interface PreviewReportVerifPreliProps {
  preCommissioningChecks: {
    visualInspection: boolean;
    mechanicalConnections: boolean;
    electricalConnections: boolean;
    filterInstallation: boolean;
    damperOperation: boolean;
    safetyDevices: boolean;
  };
}

const CheckItem = ({ checked, label }: { checked: boolean; label: string }) => (
  <div className="flex items-center space-x-2 rounded">
    <span
      className={`flex h-5 w-5 items-center justify-center rounded border-2 text-xs font-bold ${
        checked
          ? 'border-green-500 bg-green-500 text-white'
          : 'border-gray-300 bg-white'
      }`}
    >
      {checked ? '✓' : ''}
    </span>
    <span className="text-sm">{label}</span>
  </div>
);

const PreviewReportVerifPreli = ({
  preCommissioningChecks,
}: PreviewReportVerifPreliProps) => {
  const checks = [
    { key: 'visualInspection', label: 'Inspection visuelle générale' },
    { key: 'mechanicalConnections', label: 'Raccordements mécaniques' },
    { key: 'electricalConnections', label: 'Raccordements électriques' },
    { key: 'filterInstallation', label: 'Installation des filtres' },
    { key: 'damperOperation', label: 'Fonctionnement des registres' },
    { key: 'safetyDevices', label: 'Dispositifs de sécurité' },
  ];

  return (
    <Card className="mb-6 p-4">
      <CardTitle className="flex items-center gap-3 pl-8 text-lg underline">
        <Settings className="h-5 w-5" />
        Vérifications préliminaires
      </CardTitle>
      <CardContent className="grid grid-cols-2 gap-3 px-8">
        {checks.map((check) => (
          <CheckItem
            key={check.key}
            checked={
              preCommissioningChecks[
                check.key as keyof typeof preCommissioningChecks
              ]
            }
            label={check.label}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default PreviewReportVerifPreli;
