import React from 'react';

import { AlertTriangle, CheckCircle, Clock, Trash2, Wind } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import des composants existants
import { AcousticMeasurementsCard } from './AcousticMeasurementsCard';
import { AirBalancingCard } from './AirBalancingCard';
import { AirFlowMeasurementsCard } from './AirFlowMeasurementsCard';
import { AttachmentsCard } from './AttachmentsCard';
import { ControlTestsCard } from './ControlTestsCard';
import { ElectricalMeasurementsCard } from './ElectricalMeasurementsCard';
import { EquipmentListCard } from './EquipmentListCard';
import { FunctionalTestsCard } from './FunctionalTestsCard';
import { PreCommissioningCard } from './PreCommissioningCard';
import { TestStatusSection } from './TestStatusSection';
import { ThermalMeasurementsCard } from './ThermalMeasurementsCard';
import { CTATest, SummaryRow } from './type/type';

// NOUVEAUX IMPORTS

interface CTATestCardProps {
  test: CTATest;
  onUpdate: (id: string, updates: Partial<CTATest>) => void;
  onDelete: (id: string) => void;
  // Nouvelles props pour les équipements et pièces jointes
  onAddEquipment: (testId: string) => void;
  onUpdateEquipment: (
    testId: string,
    equipmentId: string,
    field: any,
    value: string
  ) => void;
  onDeleteEquipment: (testId: string, equipmentId: string) => void;
  onAddAttachment: (
    testId: string,
    file: File,
    type: 'PHOTO' | 'DOCUMENT',
    description: string
  ) => void;
  onUpdateAttachmentDescription: (
    testId: string,
    attachmentId: string,
    description: string
  ) => void;
  onDeleteAttachment: (testId: string, attachmentId: string) => void;
  onAddAirBalancingMeasurement: (testId: string) => void;
  onUpdateAirBalancingMeasurement: (
    testId: string,
    measurementId: string,
    updates: any
  ) => void;
  onDeleteAirBalancingMeasurement: (
    testId: string,
    measurementId: string
  ) => void;
  onAddAirBalancingScenario: (testId: string) => void;
  onUpdateAirBalancingScenario: (
    testId: string,
    scenarioId: string,
    updates: any
  ) => void;
  onDeleteAirBalancingScenario: (testId: string, scenarioId: string) => void;
  getAirBalancingSummary: (testId: string, scenarioId: string) => SummaryRow[];
  getAirBalancingStats: (
    testId: string,
    scenarioId: string,
    typeFilter: any
  ) => any;
}

export const CTATestCard: React.FC<CTATestCardProps> = ({
  test,
  onUpdate,
  onDelete,
  onAddEquipment,
  onUpdateEquipment,
  onDeleteEquipment,
  onAddAttachment,
  onUpdateAttachmentDescription,
  onDeleteAttachment,
  onAddAirBalancingMeasurement,
  onUpdateAirBalancingMeasurement,
  onDeleteAirBalancingMeasurement,
  onAddAirBalancingScenario,
  onUpdateAirBalancingScenario,
  onDeleteAirBalancingScenario,
  getAirBalancingSummary,
  getAirBalancingStats,
}) => {
  return (
    <Card className="relative">
      <CardHeader className="pb-3">
        {/* En-tête existant */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wind className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">{test.ctaName}</CardTitle>
            <Badge variant="outline" className="text-xs">
              CTA
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              className={`text-xs ${
                test.overallStatus === 'CONFORME'
                  ? 'bg-green-100 text-green-800'
                  : test.overallStatus === 'NON_CONFORME'
                    ? 'bg-red-100 text-red-800'
                    : test.overallStatus === 'ATTENTION_REQUISE'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-gray-100 text-gray-800'
              }`}
            >
              {test.overallStatus === 'CONFORME' && (
                <CheckCircle className="mr-1 h-3 w-3" />
              )}
              {test.overallStatus === 'NON_CONFORME' && (
                <AlertTriangle className="mr-1 h-3 w-3" />
              )}
              {test.overallStatus === 'ATTENTION_REQUISE' && (
                <AlertTriangle className="mr-1 h-3 w-3" />
              )}
              {test.overallStatus === 'EN_ATTENTE' && (
                <Clock className="mr-1 h-3 w-3" />
              )}
              {test.overallStatus.replace(/_/g, ' ')}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(test.id)}
              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="text-muted-foreground grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium">Localisation:</span> {test.location}
          </div>
          <div>
            <span className="font-medium">Marque:</span> {test.brand}
          </div>
          <div>
            <span className="font-medium">Modèle:</span> {test.model}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs defaultValue="preliminary" className="w-full">
          <TabsList className="mb-2 grid w-full grid-cols-3">
            <TabsTrigger value="preliminary" className="text-xs">
              Préliminaire
            </TabsTrigger>
            <TabsTrigger value="measurements" className="text-xs">
              Mesures
            </TabsTrigger>
            <TabsTrigger value="tests" className="text-xs">
              Tests
            </TabsTrigger>
          </TabsList>

          {/* Deuxième ligne d'onglets pour les nouveaux composants */}
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="airbalancing" className="text-xs">
              Équilibrage
            </TabsTrigger>

            <TabsTrigger value="equipment" className="text-xs">
              Équipements
            </TabsTrigger>
            <TabsTrigger value="attachments" className="text-xs">
              Documents
            </TabsTrigger>
          </TabsList>

          {/* Onglet Préliminaire */}
          <TabsContent value="preliminary" className="mt-4">
            <PreCommissioningCard
              checks={test.preCommissioningChecks}
              onUpdate={(field, value) =>
                onUpdate(test.id, {
                  preCommissioningChecks: {
                    ...test.preCommissioningChecks,
                    [field]: value,
                  },
                })
              }
            />
          </TabsContent>

          {/* Onglet Mesures (regroupe aéraulique, thermique, électrique, acoustique) */}
          <TabsContent value="measurements" className="mt-4 space-y-4">
            <AirFlowMeasurementsCard
              measurements={test.airFlowMeasurements}
              onUpdate={(field, value) =>
                onUpdate(test.id, {
                  airFlowMeasurements: {
                    ...test.airFlowMeasurements,
                    [field]: value,
                  },
                })
              }
            />

            <ThermalMeasurementsCard
              measurements={test.thermalMeasurements}
              onUpdate={(field, value) =>
                onUpdate(test.id, {
                  thermalMeasurements: {
                    ...test.thermalMeasurements,
                    [field]: value,
                  },
                })
              }
            />

            {/* NOUVEAU */}
            <ElectricalMeasurementsCard
              measurements={test.typescriptelectricalMeasurements}
              onUpdate={(field, value) =>
                onUpdate(test.id, {
                  typescriptelectricalMeasurements: {
                    ...test.typescriptelectricalMeasurements,
                    [field]: value,
                  },
                })
              }
            />

            {/* NOUVEAU */}
            <AcousticMeasurementsCard
              measurements={test.acousticMeasurements}
              onUpdate={(field, value) =>
                onUpdate(test.id, {
                  acousticMeasurements: {
                    ...test.acousticMeasurements,
                    [field]: value,
                  },
                })
              }
            />
          </TabsContent>

          {/* Onglet Tests (fonctionnels et régulation) */}
          <TabsContent value="tests" className="mt-4 space-y-4">
            <FunctionalTestsCard
              tests={test.functionalTests}
              onUpdate={(field, value) =>
                onUpdate(test.id, {
                  functionalTests: { ...test.functionalTests, [field]: value },
                })
              }
            />

            <ControlTestsCard
              tests={test.controlTests}
              onUpdate={(field, value) =>
                onUpdate(test.id, {
                  controlTests: { ...test.controlTests, [field]: value },
                })
              }
            />
          </TabsContent>
          <TabsContent value="airbalancing" className="mt-4">
            <AirBalancingCard
              testId={test.id}
              measurements={test.airBalancingMeasurements || []}
              scenarios={test.airBalancingScenarios || []}
              onAddMeasurement={() => onAddAirBalancingMeasurement(test.id)}
              onUpdateMeasurement={(measurementId, updates) =>
                onUpdateAirBalancingMeasurement(test.id, measurementId, updates)
              }
              onDeleteMeasurement={(measurementId) =>
                onDeleteAirBalancingMeasurement(test.id, measurementId)
              }
              onAddScenario={() => onAddAirBalancingScenario(test.id)}
              onUpdateScenario={(scenarioId, updates) =>
                onUpdateAirBalancingScenario(test.id, scenarioId, updates)
              }
              onDeleteScenario={(scenarioId) =>
                onDeleteAirBalancingScenario(test.id, scenarioId)
              }
              getAirBalancingSummary={getAirBalancingSummary}
              getAirBalancingStats={getAirBalancingStats}
            />
          </TabsContent>

          {/* NOUVEAU - Onglet Équipements */}
          <TabsContent value="equipment" className="mt-4">
            <EquipmentListCard
              equipments={test.equipmentList}
              onAdd={() => onAddEquipment(test.id)}
              onUpdate={(equipmentId, field, value) =>
                onUpdateEquipment(test.id, equipmentId, field, value)
              }
              onDelete={(equipmentId) =>
                onDeleteEquipment(test.id, equipmentId)
              }
            />
          </TabsContent>

          {/* NOUVEAU - Onglet Documents */}
          <TabsContent value="attachments" className="mt-4">
            <AttachmentsCard
              attachments={test.attachments}
              onAdd={(file, type, description) =>
                onAddAttachment(test.id, file, type, description)
              }
              onDelete={(attachmentId) =>
                onDeleteAttachment(test.id, attachmentId)
              }
              onUpdateDescription={(attachmentId, description) =>
                onUpdateAttachmentDescription(
                  test.id,
                  attachmentId,
                  description
                )
              }
            />
          </TabsContent>
        </Tabs>

        <TestStatusSection
          test={test}
          onUpdate={(updates) => onUpdate(test.id, updates)}
        />
      </CardContent>
    </Card>
  );
};
