'use client';

import React, { useState } from 'react';

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
  CloudSun,
  Eye,
  FileText,
  Gauge,
  Plus,
  Save,
  Send,
  Trash2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

// Types pour le formulaire
interface ReportFormData {
  title: string;
  reportNumber: string;
  projectId: string;
  date: string;
  weatherConditions: string;
  ambientTemp: number | '';
  notes: string;
  status: 'DRAFT' | 'IN_PROGRESS' | 'COMPLETED';
}

interface EquipmentTest {
  id: string;
  equipmentId: string;
  equipmentName: string;
  equipmentType: string;
  testType: string;
  status:
    | 'PENDING'
    | 'IN_PROGRESS'
    | 'PASSED'
    | 'FAILED'
    | 'REQUIRES_ATTENTION';
  results: Record<string, any>;
  comments: string;
}

// Composant pour un test d'équipement
const EquipmentTestCard = ({
  test,
  onUpdate,
  onDelete,
}: {
  test: EquipmentTest;
  onUpdate: (id: string, updates: Partial<EquipmentTest>) => void;
  onDelete: (id: string) => void;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PASSED':
        return 'bg-green-100 text-green-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'REQUIRES_ATTENTION':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PASSED':
        return <CheckCircle className="h-4 w-4" />;
      case 'FAILED':
        return <AlertCircle className="h-4 w-4" />;
      case 'IN_PROGRESS':
        return <Clock className="h-4 w-4" />;
      case 'REQUIRES_ATTENTION':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Card className="relative">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gauge className="text-muted-foreground h-4 w-4" />
            <CardTitle className="text-base">{test.equipmentName}</CardTitle>
            <Badge variant="outline" className="text-xs">
              {test.equipmentType}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={`text-xs ${getStatusColor(test.status)}`}>
              {getStatusIcon(test.status)}
              <span className="ml-1">{test.status}</span>
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
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Type de test */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm">Type de test</Label>
            <Select
              value={test.testType}
              onValueChange={(value) => onUpdate(test.id, { testType: value })}
            >
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="demarrage">Démarrage</SelectItem>
                <SelectItem value="fonctionnement">Fonctionnement</SelectItem>
                <SelectItem value="arret">Arrêt</SelectItem>
                <SelectItem value="regulation">Régulation</SelectItem>
                <SelectItem value="securite">Sécurité</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Statut</Label>
            <Select
              value={test.status}
              onValueChange={(value: any) =>
                onUpdate(test.id, { status: value })
              }
            >
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">En attente</SelectItem>
                <SelectItem value="IN_PROGRESS">En cours</SelectItem>
                <SelectItem value="PASSED">Réussi</SelectItem>
                <SelectItem value="FAILED">Échec</SelectItem>
                <SelectItem value="REQUIRES_ATTENTION">
                  Attention requise
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Résultats de mesures */}
        <div className="space-y-2">
          <Label className="text-sm">Mesures et résultats</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Débit (m³/h)"
              className="h-8 text-sm"
              onChange={(e) => {
                onUpdate(test.id, {
                  results: { ...test.results, debit: e.target.value },
                });
              }}
            />
            <Input
              placeholder="Pression (Pa)"
              className="h-8 text-sm"
              onChange={(e) => {
                onUpdate(test.id, {
                  results: { ...test.results, pression: e.target.value },
                });
              }}
            />
            <Input
              placeholder="Température (°C)"
              className="h-8 text-sm"
              onChange={(e) => {
                onUpdate(test.id, {
                  results: { ...test.results, temperature: e.target.value },
                });
              }}
            />
            <Input
              placeholder="Puissance (kW)"
              className="h-8 text-sm"
              onChange={(e) => {
                onUpdate(test.id, {
                  results: { ...test.results, puissance: e.target.value },
                });
              }}
            />
          </div>
        </div>

        {/* Commentaires */}
        <div className="space-y-2">
          <Label className="text-sm">Commentaires</Label>
          <Textarea
            placeholder="Observations, anomalies détectées, recommandations..."
            className="resize-none text-sm"
            rows={2}
            value={test.comments}
            onChange={(e) => onUpdate(test.id, { comments: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default function NewReportPage() {
  // État du formulaire
  const [formData, setFormData] = useState<ReportFormData>({
    title: '',
    reportNumber: `RPT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    projectId: '',
    date: new Date().toISOString().split('T')[0],
    weatherConditions: '',
    ambientTemp: '',
    notes: '',
    status: 'DRAFT',
  });

  // État des tests d'équipements
  const [equipmentTests, setEquipmentTests] = useState<EquipmentTest[]>([]);

  // État pour la sélection d'équipements
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string>('');
  const [showAddEquipmentDialog, setShowAddEquipmentDialog] = useState(false);

  // Données mockées pour les projets
  const projects = [
    { id: '1', name: 'Hôpital Saint-Jean - CVC', client: 'CHU Bordeaux' },
    { id: '2', name: 'Centre commercial Atlantis', client: 'Immochan' },
    { id: '3', name: 'Bureaux TechPark - Phase 2', client: 'TechPark SAS' },
    {
      id: '4',
      name: 'École primaire des Tilleuls',
      client: 'Mairie de Bordeaux',
    },
  ];

  // Équipements disponibles pour le projet sélectionné
  const availableEquipments = [
    { id: '1', name: 'CTA Bloc A', type: 'CTA' },
    { id: '2', name: 'CTA Bloc B', type: 'CTA' },
    { id: '3', name: 'Aérotherme Zone 1', type: 'AEROTHERME' },
    { id: '4', name: 'Aérotherme Zone 2', type: 'AEROTHERME' },
    { id: '5', name: 'Pompe circulation P1', type: 'POMPE' },
    { id: '6', name: 'Pompe circulation P2', type: 'POMPE' },
    { id: '7', name: 'Ventilateur extraction V1', type: 'VENTILATEUR' },
    { id: '8', name: 'Thermostat zone bureau', type: 'THERMOSTAT' },
  ];

  // Handlers
  const updateFormData = (field: keyof ReportFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addEquipmentTest = (equipmentId: string) => {
    const equipment = availableEquipments.find((eq) => eq.id === equipmentId);
    if (!equipment) return;

    const newTest: EquipmentTest = {
      id: `test-${Date.now()}`,
      equipmentId: equipment.id,
      equipmentName: equipment.name,
      equipmentType: equipment.type,
      testType: 'fonctionnement',
      status: 'PENDING',
      results: {},
      comments: '',
    };

    setEquipmentTests((prev) => [...prev, newTest]);

    // Reset du select après ajout
    setSelectedEquipmentId('');

    // Message de confirmation (optionnel)
    console.log(`Équipement "${equipment.name}" ajouté avec succès`);
  };

  const addMultipleEquipments = () => {
    // Ajouter tous les équipements disponibles d'un coup
    const availableIds = availableEquipments
      .filter(
        (eq) => !equipmentTests.some((test) => test.equipmentId === eq.id)
      )
      .map((eq) => eq.id);

    availableIds.forEach((id) => addEquipmentTest(id));
  };

  const addEquipmentsByType = (type: string) => {
    // Ajouter tous les équipements d'un type spécifique
    const equipmentsByType = availableEquipments.filter(
      (eq) =>
        eq.type === type &&
        !equipmentTests.some((test) => test.equipmentId === eq.id)
    );

    equipmentsByType.forEach((equipment) => addEquipmentTest(equipment.id));
  };

  const updateEquipmentTest = (id: string, updates: Partial<EquipmentTest>) => {
    setEquipmentTests((prev) =>
      prev.map((test) => (test.id === id ? { ...test, ...updates } : test))
    );
  };

  const deleteEquipmentTest = (id: string) => {
    setEquipmentTests((prev) => prev.filter((test) => test.id !== id));
  };

  const handleSave = (asDraft = true) => {
    const reportData = {
      ...formData,
      status: asDraft ? 'DRAFT' : 'IN_PROGRESS',
      equipmentTests,
    };

    console.log('Saving report:', reportData);
    // TODO: Appel API pour sauvegarder
  };

  const handleSubmit = () => {
    const reportData = {
      ...formData,
      status: 'COMPLETED',
      equipmentTests,
    };

    console.log('Submitting report:', reportData);
    // TODO: Appel API pour soumettre
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <div>
            <h1 className="flex items-center text-3xl font-bold">
              <FileText className="mr-3 h-8 w-8" />
              Nouveau rapport de mise en service
            </h1>
            <p className="text-muted-foreground mt-1">
              Créez un rapport complet pour vos équipements CVC
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleSave(true)}>
            <Save className="mr-2 h-4 w-4" />
            Sauvegarder
          </Button>
          <Button onClick={handleSubmit}>
            <Send className="mr-2 h-4 w-4" />
            Finaliser
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Informations générales</TabsTrigger>
          <TabsTrigger value="tests">Tests d&#39;équipements</TabsTrigger>
          <TabsTrigger value="preview">Aperçu</TabsTrigger>
        </TabsList>

        {/* Onglet Informations générales */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Informations du rapport */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Informations du rapport
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre du rapport</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Mise en service CTA Bloc A"
                    value={formData.title}
                    onChange={(e) => updateFormData('title', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reportNumber">Numéro de rapport</Label>
                    <Input
                      id="reportNumber"
                      value={formData.reportNumber}
                      onChange={(e) =>
                        updateFormData('reportNumber', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date d&#39;intervention</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => updateFormData('date', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project">Projet associé</Label>
                  <Select
                    value={formData.projectId}
                    onValueChange={(value) =>
                      updateFormData('projectId', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un projet" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{project.name}</span>
                            <span className="text-muted-foreground text-xs">
                              {project.client}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Conditions d'intervention */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CloudSun className="mr-2 h-5 w-5" />
                  Conditions d&#39;intervention
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="weather">Conditions météorologiques</Label>
                  <Select
                    value={formData.weatherConditions}
                    onValueChange={(value) =>
                      updateFormData('weatherConditions', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez les conditions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ensoleille">Ensoleillé</SelectItem>
                      <SelectItem value="nuageux">Nuageux</SelectItem>
                      <SelectItem value="pluvieux">Pluvieux</SelectItem>
                      <SelectItem value="venteux">Venteux</SelectItem>
                      <SelectItem value="neigeux">Neigeux</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ambientTemp">Température ambiante (°C)</Label>
                  <Input
                    id="ambientTemp"
                    type="number"
                    placeholder="Ex: 20"
                    value={formData.ambientTemp}
                    onChange={(e) =>
                      updateFormData(
                        'ambientTemp',
                        parseFloat(e.target.value) || ''
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes générales</Label>
                  <Textarea
                    id="notes"
                    placeholder="Observations générales, conditions particulières, remarques..."
                    value={formData.notes}
                    onChange={(e) => updateFormData('notes', e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onglet Tests d'équipements */}
        <TabsContent value="tests" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Tests d&#39;équipements</h3>
              <p className="text-muted-foreground text-sm">
                Ajoutez et configurez les tests pour chaque équipement
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Select
                value={selectedEquipmentId}
                onValueChange={(value) => {
                  setSelectedEquipmentId(value);
                  if (value) {
                    addEquipmentTest(value);
                  }
                }}
              >
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Ajouter un équipement" />
                </SelectTrigger>
                <SelectContent>
                  {availableEquipments
                    .filter(
                      (eq) =>
                        !equipmentTests.some(
                          (test) => test.equipmentId === eq.id
                        )
                    )
                    .map((equipment) => (
                      <SelectItem key={equipment.id} value={equipment.id}>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {equipment.type}
                          </Badge>
                          <span>{equipment.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              {/* Bouton pour ajouter tous les équipements */}
              {availableEquipments.filter(
                (eq) =>
                  !equipmentTests.some((test) => test.equipmentId === eq.id)
              ).length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addMultipleEquipments}
                  className="whitespace-nowrap"
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Tout ajouter
                </Button>
              )}

              {/* Boutons par type d'équipement */}
              <div className="flex space-x-1">
                {['CTA', 'AEROTHERME', 'POMPE'].map((type) => {
                  const count = availableEquipments.filter(
                    (eq) =>
                      eq.type === type &&
                      !equipmentTests.some((test) => test.equipmentId === eq.id)
                  ).length;

                  if (count === 0) return null;

                  return (
                    <Button
                      key={type}
                      variant="ghost"
                      size="sm"
                      onClick={() => addEquipmentsByType(type)}
                      className="px-2 text-xs"
                    >
                      +{count} {type}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {equipmentTests.length === 0 ? (
              <Card className="p-12 text-center">
                <Gauge className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                <h3 className="mb-2 text-lg font-medium">
                  Aucun équipement ajouté
                </h3>
                <p className="text-muted-foreground mb-4">
                  Ajoutez des équipements pour commencer les tests de mise en
                  service
                </p>
                <Select
                  value={selectedEquipmentId}
                  onValueChange={(value) => {
                    setSelectedEquipmentId(value);
                    if (value) {
                      addEquipmentTest(value);
                    }
                  }}
                >
                  <SelectTrigger className="mx-auto w-64">
                    <SelectValue placeholder="Ajouter un équipement" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableEquipments.map((equipment) => (
                      <SelectItem key={equipment.id} value={equipment.id}>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {equipment.type}
                          </Badge>
                          <span>{equipment.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Card>
            ) : (
              equipmentTests.map((test) => (
                <EquipmentTestCard
                  key={test.id}
                  test={test}
                  onUpdate={updateEquipmentTest}
                  onDelete={deleteEquipmentTest}
                />
              ))
            )}
          </div>
        </TabsContent>

        {/* Onglet Aperçu */}
        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Aperçu du rapport
              </CardTitle>
              <CardDescription>
                Prévisualisation avant génération du PDF final
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* En-tête du rapport */}
                <div className="border-b pb-4">
                  <h2 className="text-2xl font-bold">
                    {formData.title || 'Titre du rapport'}
                  </h2>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Numéro:</span>{' '}
                      {formData.reportNumber}
                    </div>
                    <div>
                      <span className="font-medium">Date:</span> {formData.date}
                    </div>
                    <div>
                      <span className="font-medium">Projet:</span>{' '}
                      {projects.find((p) => p.id === formData.projectId)
                        ?.name || 'Non sélectionné'}
                    </div>
                    <div>
                      <span className="font-medium">Conditions:</span>{' '}
                      {formData.weatherConditions || 'Non renseignées'}
                    </div>
                  </div>
                </div>

                {/* Résumé des tests */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold">
                    Résumé des tests
                  </h3>
                  {equipmentTests.length === 0 ? (
                    <p className="text-muted-foreground">
                      Aucun test configuré
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {equipmentTests.map((test) => (
                        <div
                          key={test.id}
                          className="flex items-center justify-between rounded border p-3"
                        >
                          <div>
                            <span className="font-medium">
                              {test.equipmentName}
                            </span>
                            <span className="text-muted-foreground ml-2 text-sm">
                              ({test.testType})
                            </span>
                          </div>
                          <Badge
                            className={`text-xs ${
                              test.status === 'PASSED'
                                ? 'bg-green-100 text-green-800'
                                : test.status === 'FAILED'
                                  ? 'bg-red-100 text-red-800'
                                  : test.status === 'IN_PROGRESS'
                                    ? 'bg-blue-100 text-blue-800'
                                    : test.status === 'REQUIRES_ATTENTION'
                                      ? 'bg-orange-100 text-orange-800'
                                      : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {test.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
