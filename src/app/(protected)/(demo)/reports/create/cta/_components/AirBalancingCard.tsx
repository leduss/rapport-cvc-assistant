import React, { useState } from 'react';

import {
  AlertTriangle,
  CheckCircle,
  Download,
  Edit2,
  Plus,
  Settings,
  Trash2,
  Upload,
  Wind,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { SummaryByTypeCards } from './SummaryByTypeCards';
import {
  AirBalancingMeasurement,
  AirBalancingScenario,
  SummaryRow,
} from './type/type';

interface AirBalancingCardProps {
  testId: string;
  measurements: AirBalancingMeasurement[];
  scenarios: AirBalancingScenario[];
  onAddMeasurement: () => void;
  onUpdateMeasurement: (
    id: string,
    updates: Partial<AirBalancingMeasurement>
  ) => void;
  onDeleteMeasurement: (id: string) => void;
  onAddScenario: () => void;
  onUpdateScenario: (
    id: string,
    updates: Partial<AirBalancingScenario>
  ) => void;
  onDeleteScenario: (id: string) => void;
  onImportCSV?: (file: File) => void;
  onExportCSV?: () => void;
  getAirBalancingSummary: (testId: string, scenarioId: string) => SummaryRow[];
  getAirBalancingStats: (
    testId: string,
    scenarioId: string,
    typeFilter: 'ALL' | 'SOUFFLAGE' | 'REPRISE' | 'EXTRACTION'
  ) => {
    total: number;
    conformes: number;
    nonConformes: number;
  };
}

export const AirBalancingCard: React.FC<AirBalancingCardProps> = ({
  testId,
  measurements,
  scenarios,
  onAddMeasurement,
  onUpdateMeasurement,
  onDeleteMeasurement,
  onAddScenario,
  onUpdateScenario,
  onDeleteScenario,
  onImportCSV,
  onExportCSV,
  getAirBalancingSummary,
  getAirBalancingStats,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<string>(
    scenarios[0]?.id || ''
  );
  const [editingScenario, setEditingScenario] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [filterType, setFilterType] = useState<
    'ALL' | 'SOUFFLAGE' | 'REPRISE' | 'EXTRACTION'
  >('ALL');

  // Calcul automatique de l'écart
  const calculateEcart = (theorique: number, mesure: number): number => {
    if (!theorique || theorique === 0) return 0;
    return Math.round(((mesure - theorique) / theorique) * 100);
  };

  // Vérifier si la mesure est conforme (tolérance de ±10% par défaut)
  const isConforme = (ecart: number, tolerance: number = 10): boolean => {
    return Math.abs(ecart) <= tolerance;
  };

  // Mettre à jour une mesure pour un scénario spécifique
  const updateMeasurementScenario = (
    measurementId: string,
    scenarioId: string,
    field: string,
    value: any
  ) => {
    const measurement = measurements.find((m) => m.id === measurementId);
    if (!measurement) return;

    const updatedScenarios = { ...measurement.scenarios };
    if (!updatedScenarios[scenarioId]) {
      updatedScenarios[scenarioId] = {
        debitTheorique: 0 as number,
        debitMesure: 0,
        ecart: 0,
        reglage: '',
        pression: 0,
        vitesse: 0,
        conforme: true,
      };
    }

    updatedScenarios[scenarioId] = {
      ...updatedScenarios[scenarioId],
      [field]: value,
    };

    // Recalculer l'écart si nécessaire
    if (field === 'debitTheorique' || field === 'debitMesure') {
      const theorique = Number(updatedScenarios[scenarioId].debitTheorique);
      const mesure = Number(updatedScenarios[scenarioId].debitMesure);
      if (theorique && mesure) {
        const ecart = calculateEcart(theorique, mesure);
        updatedScenarios[scenarioId].ecart = ecart;
        updatedScenarios[scenarioId].conforme = isConforme(ecart);
      }
    }

    onUpdateMeasurement(measurementId, { scenarios: updatedScenarios });
  };

  // Couleurs par défaut pour les scénarios
  const defaultScenarioColors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
  ];

  const typeOptions = [
    { value: 'SOUFFLAGE', label: 'Soufflage', icon: '→' },
    { value: 'REPRISE', label: 'Reprise', icon: '←' },
    { value: 'EXTRACTION', label: 'Extraction', icon: '↑' },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <Wind className="mr-2 h-5 w-5 text-blue-600" />
            Équilibrage aéraulique
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Select
              value={filterType}
              onValueChange={(value) =>
                setFilterType(
                  value as 'ALL' | 'SOUFFLAGE' | 'REPRISE' | 'EXTRACTION'
                )
              }
            >
              <SelectTrigger className="h-8 w-36 text-sm">
                <SelectValue placeholder="Filtrer par type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Toutes</SelectItem>
                {typeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSettings(true)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Gérer les scénarios</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {onImportCSV && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Importer CSV</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {onExportCSV && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={onExportCSV}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Exporter CSV</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <Button size="sm" onClick={onAddMeasurement}>
              <Plus className="mr-1 h-3 w-3" />
              Ajouter bouche
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Onglets des scénarios */}
        {scenarios.length > 0 && (
          <Tabs value={selectedScenario} onValueChange={setSelectedScenario}>
            <TabsList
              className="grid w-full"
              style={{
                gridTemplateColumns: `repeat(${scenarios.length}, 1fr)`,
              }}
            >
              {scenarios.map((scenario) => (
                <TabsTrigger
                  key={scenario.id}
                  value={scenario.id}
                  className="relative"
                >
                  <span
                    className={`mr-2 h-2 w-2 rounded-full ${scenario.color || defaultScenarioColors[0]}`}
                  />
                  {scenario.name}
                  {scenario.active && (
                    <Badge
                      variant="secondary"
                      className="ml-2 px-1 py-0 text-xs"
                    >
                      Actif
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {scenarios.map((scenario) => {
              const stats = getAirBalancingStats(
                testId,
                scenario.id,
                filterType
              );

              return (
                <TabsContent
                  key={scenario.id}
                  value={scenario.id}
                  className="space-y-4"
                >
                  {/* Statistiques du scénario */}
                  <div className="mb-4 grid grid-cols-4 gap-4">
                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-600">Total bouches</p>
                      <p className="text-lg font-semibold text-gray-600">
                        {stats.total}
                      </p>
                    </div>
                    <div className="rounded-lg bg-green-50 p-3">
                      <p className="text-xs text-green-600">Conformes</p>
                      <p className="text-lg font-semibold text-green-700">
                        {stats.conformes}
                      </p>
                    </div>
                    <div className="rounded-lg bg-red-50 p-3">
                      <p className="text-xs text-red-600">Non conformes</p>
                      <p className="text-lg font-semibold text-red-700">
                        {stats.nonConformes}
                      </p>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-3">
                      <p className="text-xs text-blue-600">Taux conformité</p>
                      <p className="text-lg font-semibold text-blue-700">
                        {stats.total > 0
                          ? Math.round((stats.conformes / stats.total) * 100)
                          : 0}
                        %
                      </p>
                    </div>
                  </div>

                  {/* Description du scénario */}
                  {scenario.description && (
                    <div className="mb-4 rounded-lg bg-gray-50 p-3">
                      <p className="text-sm text-gray-600">
                        {scenario.description}
                      </p>
                    </div>
                  )}

                  {/* Tableau des mesures */}
                  <div className="w-full">
                    <Table className="rounded-xl border">
                      <TableHeader className="h-12">
                        <TableRow className="">
                          <TableHead className=" ">Type</TableHead>
                          <TableHead className="">Désignation</TableHead>
                          <TableHead className=" ">
                            Dimension <br /> (mm)
                          </TableHead>
                          <TableHead className="">
                            Débit théo. <br />
                            (m³/h)
                          </TableHead>
                          <TableHead className="">
                            Débit mes. <br />
                            (m³/h)
                          </TableHead>
                          <TableHead className="">
                            Écart <br /> (%)
                          </TableHead>
                          <TableHead className="">Réglage</TableHead>
                          <TableHead className="">
                            Pression <br /> (Pa)
                          </TableHead>
                          <TableHead className="">
                            Vitesse <br /> (m/s)
                          </TableHead>
                          <TableHead className="">Statut</TableHead>
                          <TableHead className=""></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {measurements
                          .filter(
                            (m) => filterType === 'ALL' || m.type === filterType
                          )
                          .map((measurement) => {
                            const scenarioData = measurement.scenarios[
                              scenario.id
                            ] || {
                              debitTheorique: 0,
                              debitMesure: 0,
                              ecart: '',
                              reglage: '',
                              pression: '',
                              vitesse: '',
                              conforme: true,
                            };

                            return (
                              <TableRow key={measurement.id} className="">
                                <TableCell className="px-1 py-2">
                                  <Select
                                    value={measurement.type}
                                    onValueChange={(
                                      value:
                                        | 'SOUFFLAGE'
                                        | 'REPRISE'
                                        | 'EXTRACTION'
                                    ) =>
                                      onUpdateMeasurement(measurement.id, {
                                        type: value,
                                      })
                                    }
                                  >
                                    <SelectTrigger className="h-7 text-xs">
                                      <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {typeOptions.map((opt) => (
                                        <SelectItem
                                          key={opt.value}
                                          value={opt.value}
                                        >
                                          <span className="flex items-center">
                                            <span className="mr-2">
                                              {opt.icon}
                                            </span>{' '}
                                            {opt.label}
                                          </span>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                                <TableCell className="w-1/5">
                                  <Input
                                    value={measurement.designation}
                                    onChange={(e) =>
                                      onUpdateMeasurement(measurement.id, {
                                        designation: e.target.value,
                                      })
                                    }
                                    placeholder="Bureau 101"
                                    className="h-7 text-xs"
                                  />
                                </TableCell>
                                <TableCell className="">
                                  <Input
                                    value={measurement.dimensions}
                                    onChange={(e) =>
                                      onUpdateMeasurement(measurement.id, {
                                        dimensions: e.target.value,
                                      })
                                    }
                                    placeholder="300x300"
                                    className="h-7 text-xs"
                                  />
                                </TableCell>

                                <TableCell className="">
                                  <Input
                                    type="number"
                                    value={scenarioData.debitTheorique}
                                    onChange={(e) =>
                                      updateMeasurementScenario(
                                        measurement.id,
                                        scenario.id,
                                        'debitTheorique',
                                        parseFloat(e.target.value) || ''
                                      )
                                    }
                                    placeholder="300"
                                    className="h-7 text-xs"
                                  />
                                </TableCell>
                                <TableCell className="">
                                  <Input
                                    type="number"
                                    value={scenarioData.debitMesure}
                                    onChange={(e) =>
                                      updateMeasurementScenario(
                                        measurement.id,
                                        scenario.id,
                                        'debitMesure',
                                        parseFloat(e.target.value) || ''
                                      )
                                    }
                                    placeholder="285"
                                    className="h-7 text-xs"
                                  />
                                </TableCell>
                                <TableCell className="">
                                  <span
                                    className={`text-xs font-medium ${
                                      scenarioData.conforme
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                    }`}
                                  >
                                    {scenarioData.ecart
                                      ? `${scenarioData.ecart > 0 ? '+' : ''}${scenarioData.ecart}%`
                                      : '-'}
                                  </span>
                                </TableCell>
                                <TableCell className="">
                                  <Input
                                    value={scenarioData.reglage}
                                    onChange={(e) =>
                                      updateMeasurementScenario(
                                        measurement.id,
                                        scenario.id,
                                        'reglage',
                                        e.target.value
                                      )
                                    }
                                    placeholder="3/5"
                                    className="h-7 text-xs"
                                  />
                                </TableCell>
                                <TableCell className="">
                                  <Input
                                    type="number"
                                    value={scenarioData.pression}
                                    onChange={(e) =>
                                      updateMeasurementScenario(
                                        measurement.id,
                                        scenario.id,
                                        'pression',
                                        parseFloat(e.target.value) || ''
                                      )
                                    }
                                    placeholder="25"
                                    className="h-7 text-xs"
                                  />
                                </TableCell>
                                <TableCell className="">
                                  <Input
                                    type="number"
                                    step="0.1"
                                    value={scenarioData.vitesse}
                                    onChange={(e) =>
                                      updateMeasurementScenario(
                                        measurement.id,
                                        scenario.id,
                                        'vitesse',
                                        parseFloat(e.target.value) || ''
                                      )
                                    }
                                    placeholder="2.5"
                                    className="h-7 text-xs"
                                  />
                                </TableCell>
                                <TableCell className="">
                                  {scenarioData.debitMesure &&
                                  scenarioData.debitTheorique ? (
                                    scenarioData.conforme ? (
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <AlertTriangle className="h-4 w-4 text-red-500" />
                                    )
                                  ) : (
                                    <span className="text-xs text-gray-400">
                                      -
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell className="">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      onDeleteMeasurement(measurement.id)
                                    }
                                    className="h-6 w-6 p-0"
                                  >
                                    <Trash2 className="h-3 w-3 text-red-500" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                    <SummaryByTypeCards
                      summary={getAirBalancingSummary(testId, selectedScenario)}
                    />
                  </div>

                  {measurements.length === 0 && (
                    <div className="py-8 text-center text-gray-500">
                      <Wind className="mx-auto mb-2 h-8 w-8 opacity-50" />
                      <p className="text-sm">Aucune bouche configurée</p>
                      <p className="text-xs">
                        Cliquez sur &quot;Ajouter bouche&quot; pour commencer
                      </p>
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        )}

        {/* Si aucun scénario */}
        {scenarios.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            <Settings className="mx-auto mb-2 h-8 w-8 opacity-50" />
            <p className="text-sm">Aucun scénario configuré</p>
            <Button
              variant="outline"
              size="sm"
              onClick={onAddScenario}
              className="mt-2"
            >
              <Plus className="mr-1 h-3 w-3" />
              Créer un scénario
            </Button>
          </div>
        )}

        {/* Notes globales */}
        <div className="mt-4 border-t pt-4">
          <Label className="text-sm font-medium">Notes et observations</Label>
          <Textarea
            placeholder="Difficultés d'accès, bouches non conformes, actions correctives..."
            className="mt-2 text-sm"
            rows={3}
          />
        </div>
      </CardContent>

      {/* Dialog de gestion des scénarios */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Gestion des scénarios d&#39;équilibrage</DialogTitle>
            <DialogDescription>
              Configurez les différents scénarios de fonctionnement de votre CTA
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {scenarios.map((scenario, index) => (
              <div
                key={scenario.id}
                className="flex items-center space-x-2 rounded-lg border p-3"
              >
                <div
                  className={`h-4 w-4 rounded-full ${scenario.color || defaultScenarioColors[index % defaultScenarioColors.length]}`}
                />

                {editingScenario === scenario.id ? (
                  <>
                    <Input
                      value={scenario.name}
                      onChange={(e) =>
                        onUpdateScenario(scenario.id, { name: e.target.value })
                      }
                      className="flex-1"
                      placeholder="Nom du scénario"
                    />
                    <Input
                      value={scenario.description}
                      onChange={(e) =>
                        onUpdateScenario(scenario.id, {
                          description: e.target.value,
                        })
                      }
                      className="flex-1"
                      placeholder="Description"
                    />
                    <Button size="sm" onClick={() => setEditingScenario(null)}>
                      OK
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{scenario.name}</p>
                      <p className="text-xs text-gray-600">
                        {scenario.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingScenario(scenario.id)}
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteScenario(scenario.id)}
                      disabled={scenarios.length === 1}
                    >
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                  </>
                )}
              </div>
            ))}

            <Button
              variant="outline"
              onClick={onAddScenario}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un scénario
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
