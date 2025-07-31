import { useState } from 'react';

import { Attachment, Equipment } from '@/types';

import {
  AirBalancingMeasurement,
  AirBalancingScenario,
  CTAReportData,
  CTATest,
  SummaryRow,
} from '../type/type';

export const useCTAReport = () => {
  const [formData, setFormData] = useState<CTAReportData>({
    title: '',
    reportNumber: `CTA-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    projectId: '',
    date: new Date().toISOString().split('T')[0],
    weatherConditions: '',
    ambientTemp: '',
    notes: '',
    status: 'BROUILLON',
    ctaName: '',
    location: '',
    brand: '',
    model: '',
    serialNumber: '',
    technicalSpecs: '',
  });

  const [ctaTests, setCTATests] = useState<CTATest[]>([]);

  const updateFormData = (field: keyof CTAReportData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateCTATest = (id: string, updates: Partial<CTATest>) => {
    setCTATests((prev) =>
      prev.map((test) => (test.id === id ? { ...test, ...updates } : test))
    );
  };

  const deleteCTATest = (id: string) => {
    setCTATests((prev) => prev.filter((test) => test.id !== id));
  };

  // Nouvelle fonction pour mettre à jour les équipements
  const updateEquipmentList = (testId: string, equipments: Equipment[]) => {
    updateCTATest(testId, { equipmentList: equipments });
  };

  // Nouvelle fonction pour ajouter un équipement
  const addEquipment = (testId: string) => {
    const test = ctaTests.find((t) => t.id === testId);
    if (!test) return;

    const newEquipment: Equipment = {
      id: `eq-${Date.now()}`,
      type: 'VENTILATEUR',
      designation: '',
      marque: '',
      modele: '',
      numeroSerie: '',
      caracteristiques: '',
    };

    updateCTATest(testId, {
      equipmentList: [...test.equipmentList, newEquipment],
    });
  };

  // Fonction pour mettre à jour un équipement
  const updateEquipment = (
    testId: string,
    equipmentId: string,
    field: keyof Equipment,
    value: string
  ) => {
    const test = ctaTests.find((t) => t.id === testId);
    if (!test) return;

    const updatedEquipments = test.equipmentList.map((eq) =>
      eq.id === equipmentId ? { ...eq, [field]: value } : eq
    );

    updateCTATest(testId, { equipmentList: updatedEquipments });
  };

  // Fonction pour supprimer un équipement
  const deleteEquipment = (testId: string, equipmentId: string) => {
    const test = ctaTests.find((t) => t.id === testId);
    if (!test) return;

    const updatedEquipments = test.equipmentList.filter(
      (eq) => eq.id !== equipmentId
    );
    updateCTATest(testId, { equipmentList: updatedEquipments });
  };

  // Fonctions pour les pièces jointes
  const addAttachment = (
    testId: string,
    file: File,
    type: 'PHOTO' | 'DOCUMENT',
    description: string
  ) => {
    const test = ctaTests.find((t) => t.id === testId);
    if (!test) return;

    const newAttachment: Attachment = {
      id: `att-${Date.now()}`,
      type,
      name: file.name,
      description,
      file,
      uploadDate: new Date().toISOString(),
      size: file.size,
    };

    updateCTATest(testId, {
      attachments: [...test.attachments, newAttachment],
    });
  };

  const updateAttachmentDescription = (
    testId: string,
    attachmentId: string,
    description: string
  ) => {
    const test = ctaTests.find((t) => t.id === testId);
    if (!test) return;

    const updatedAttachments = test.attachments.map((att) =>
      att.id === attachmentId ? { ...att, description } : att
    );

    updateCTATest(testId, { attachments: updatedAttachments });
  };

  const deleteAttachment = (testId: string, attachmentId: string) => {
    const test = ctaTests.find((t) => t.id === testId);
    if (!test) return;

    const updatedAttachments = test.attachments.filter(
      (att) => att.id !== attachmentId
    );
    updateCTATest(testId, { attachments: updatedAttachments });
  };

  const createNewTest = (): CTATest => {
    return {
      id: `cta-test-${Date.now()}`,
      ctaId: '1',
      ctaName: formData.ctaName,
      location: formData.location,
      brand: formData.brand,
      model: formData.model,
      serialNumber: formData.serialNumber,

      preCommissioningChecks: {
        visualInspection: false,
        mechanicalConnections: false,
        electricalConnections: false,
        filterInstallation: false,
        damperOperation: false,
        safetyDevices: false,
      },

      airFlowMeasurements: {
        supplyAirFlow: '',
        returnAirFlow: '',
        exhaustAirFlow: '',
        outsideAirFlow: '',
        supplyPressure: '',
        returnPressure: '',
      },

      thermalMeasurements: {
        supplyAirTemp: '',
        returnAirTemp: '',
        outsideAirTemp: '',
        heatingCoilInletTemp: '',
        heatingCoilOutletTemp: '',
        coolingCoilInletTemp: '',
        coolingCoilOutletTemp: '',
      },

      functionalTests: {
        fanStartStop: 'EN_ATTENTE',
        damperControl: 'EN_ATTENTE',
        heatingControl: 'EN_ATTENTE',
        coolingControl: 'EN_ATTENTE',
        filterMonitoring: 'EN_ATTENTE',
        emergencyStop: 'EN_ATTENTE',
      },

      controlTests: {
        temperatureControl: 'EN_ATTENTE',
        humidityControl: 'EN_ATTENTE',
        co2Control: 'EN_ATTENTE',
        scheduleOperation: 'EN_ATTENTE',
      },

      // NOUVELLES PROPRIÉTÉS
      typescriptelectricalMeasurements: {
        voltageL1N: '',
        voltageL2N: '',
        voltageL3N: '',
        voltageL1L2: '',
        voltageL2L3: '',
        voltageL3L1: '',
        currentL1: '',
        currentL2: '',
        currentL3: '',
        totalPower: '',
        cosPhi: '',
        frequency: '',
        insulationResistance: '',
        earthResistance: '',
      },

      acousticMeasurements: {
        soundLevelMachine: '',
        soundLevelAmbient: '',
        soundLevelSoufflage: '',
        soundLevelReprise: '',
        soundLevelExtraction: '',
        measurementDistance: '',
        backgroundNoise: '',
        octave63Hz: '',
        octave125Hz: '',
        octave250Hz: '',
        octave500Hz: '',
        octave1kHz: '',
        octave2kHz: '',
        octave4kHz: '',
        octave8kHz: '',
      },

      conformityChecks: {
        debitConformeSpec: false,
        pressionConformeSpec: false,
        vitesseAirConforme: false,
        temperatureConformeSpec: false,
        deltaTemperatureConforme: false,
        niveauSonoreConforme: false,
        tensionConforme: false,
        intensiteConforme: false,
        isolementConforme: false,
        terreConforme: false,
        securiteConforme: false,
        marquageCEPresent: false,
        arretUrgenceFonctionnel: false,
        protectionsPresentes: false,
        documentationFournie: false,
        schemasAJour: false,
        noticesPresentes: false,
      },

      airBalancing: [],
      equipmentList: [],
      attachments: [],

      overallStatus: 'EN_ATTENTE',
      comments: '',
      recommendations: '',

      airBalancingMeasurements: [],
      airBalancingScenarios: [
        {
          id: 'pv',
          name: 'Petite vitesse',
          description: 'Mode occupation normale',
          color: 'bg-blue-500',
          active: true,
        },
        {
          id: 'gv',
          name: 'Grande vitesse',
          description: 'Mode surventilation',
          color: 'bg-green-500',
          active: true,
        },
      ],
    };
  };

  const handleSave = (asDraft = true) => {
    const reportData = {
      ...formData,
      status: asDraft ? 'BROUILLON' : 'EN_COURS',
      ctaTests,
    };
    console.log('Saving CTA report:', reportData);
    // TODO: Appel API
  };

  const exportToJSON = () => {
    const reportData = {
      ...formData,
      ctaTests,
      generatedDate: new Date().toISOString(),
      reportType: 'CTA',
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `Rapport_CTA_${formData.reportNumber || 'DRAFT'}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const addAirBalancingMeasurement = (testId: string) => {
    const test = ctaTests.find((t) => t.id === testId);
    if (!test) return;

    const newMeasurement: AirBalancingMeasurement = {
      id: `abm-${Date.now()}`,
      type: 'SOUFFLAGE',
      designation: '',
      dimensions: '',
      modele: '',
      scenarios: {},
      notes: '',
    };

    // Initialiser avec les scénarios existants
    if (test.airBalancingScenarios) {
      test.airBalancingScenarios.forEach((scenario) => {
        newMeasurement.scenarios[scenario.id] = {
          debitTheorique: 0,
          debitMesure: 0,
          ecart: 0,
          reglage: '',
          pression: 0,
          vitesse: 0,
          conforme: true,
        };
      });
    }
    updateCTATest(testId, {
      airBalancingMeasurements: [
        ...(test.airBalancingMeasurements || []),
        newMeasurement,
      ],
    });
  };

  const updateAirBalancingMeasurement = (
    testId: string,
    measurementId: string,
    updates: Partial<AirBalancingMeasurement>
  ) => {
    const test = ctaTests.find((t) => t.id === testId);
    if (!test) return;

    const updatedMeasurements = test.airBalancingMeasurements.map((m) =>
      m.id === measurementId ? { ...m, ...updates } : m
    );

    updateCTATest(testId, { airBalancingMeasurements: updatedMeasurements });
  };

  const deleteAirBalancingMeasurement = (
    testId: string,
    measurementId: string
  ) => {
    const test = ctaTests.find((t) => t.id === testId);
    if (!test) return;

    const updatedMeasurements = test.airBalancingMeasurements.filter(
      (m) => m.id !== measurementId
    );

    updateCTATest(testId, { airBalancingMeasurements: updatedMeasurements });
  };

  const addAirBalancingScenario = (testId: string) => {
    const test = ctaTests.find((t) => t.id === testId);
    if (!test) return;

    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-orange-500',
      'bg-pink-500',
    ];
    const scenarioCount = test.airBalancingScenarios?.length || 0;

    const newScenario: AirBalancingScenario = {
      id: `scenario-${Date.now()}`,
      name: `Scénario ${scenarioCount + 1}`,
      description: '',
      color: colors[scenarioCount % colors.length],
      active: scenarioCount === 0,
    };

    // Ajouter le scénario à toutes les mesures existantes
    const updatedMeasurements = test.airBalancingMeasurements.map(
      (measurement) => ({
        ...measurement,
        scenarios: {
          ...measurement.scenarios,
          [newScenario.id]: {
            debitTheorique: 0,
            debitMesure: 0,
            ecart: 0,
            reglage: '',
            pression: 0,
            vitesse: 0,
            conforme: true,
          },
        },
      })
    );

    updateCTATest(testId, {
      airBalancingScenarios: [
        ...(test.airBalancingScenarios || []),
        newScenario,
      ],
      airBalancingMeasurements: updatedMeasurements,
    });
  };

  const updateAirBalancingScenario = (
    testId: string,
    scenarioId: string,
    updates: Partial<AirBalancingScenario>
  ) => {
    const test = ctaTests.find((t) => t.id === testId);
    if (!test) return;

    const updatedScenarios = test.airBalancingScenarios.map((s) =>
      s.id === scenarioId ? { ...s, ...updates } : s
    );

    updateCTATest(testId, { airBalancingScenarios: updatedScenarios });
  };

  const getAirBalancingStats = (
    testId: string,
    scenarioId: string,
    typeFilter: 'ALL' | 'SOUFFLAGE' | 'REPRISE' | 'EXTRACTION' = 'ALL'
  ) => {
    const test = ctaTests.find((t) => t.id === testId);
    if (!test || !test.airBalancingMeasurements) {
      return { total: 0, conformes: 0, nonConformes: 0 };
    }

    const filtered = test.airBalancingMeasurements.filter(
      (m) =>
        (typeFilter === 'ALL' || m.type === typeFilter) &&
        m.scenarios[scenarioId]
    );

    const total = filtered.length;
    const conformes = filtered.filter(
      (m) => m.scenarios[scenarioId]?.conforme ?? true
    ).length;
    const nonConformes = total - conformes;

    return { total, conformes, nonConformes };
  };

  const deleteAirBalancingScenario = (testId: string, scenarioId: string) => {
    const test = ctaTests.find((t) => t.id === testId);
    if (!test) return;

    // Supprimer le scénario
    const updatedScenarios = test.airBalancingScenarios.filter(
      (s) => s.id !== scenarioId
    );

    // Supprimer les données du scénario dans toutes les mesures
    const updatedMeasurements = test.airBalancingMeasurements.map(
      (measurement) => {
        const { [scenarioId]: deleted, ...remainingScenarios } =
          measurement.scenarios;
        return {
          ...measurement,
          scenarios: remainingScenarios,
        };
      }
    );

    updateCTATest(testId, {
      airBalancingScenarios: updatedScenarios,
      airBalancingMeasurements: updatedMeasurements,
    });
  };

  const getAirBalancingSummary = (
    testId: string,
    scenarioId: string
  ): SummaryRow[] => {
    const test = ctaTests.find((t) => t.id === testId);
    if (!test || !test.airBalancingMeasurements) return [];

    const measurements = test.airBalancingMeasurements;

    return ['SOUFFLAGE', 'REPRISE', 'EXTRACTION']
      .map((t) => {
        const type = t as SummaryRow['type'];
        const filtered = measurements.filter((m) => m.type === type);
        const totalCount = filtered.length;

        const totalTheorique = filtered.reduce(
          (sum, m) => sum + (m.scenarios[scenarioId]?.debitTheorique || 0),
          0
        );

        const totalMesure = filtered.reduce(
          (sum, m) => sum + (m.scenarios[scenarioId]?.debitMesure || 0),
          0
        );

        const errorPct = totalTheorique
          ? Math.round(((totalMesure - totalTheorique) / totalTheorique) * 100)
          : 0;

        return { type, totalCount, totalTheorique, totalMesure, errorPct };
      })
      .filter((r) => r.totalCount > 0);
  };

  // Mise à jour de createNewTest pour inclure les scénarios par défaut

  // ... reste des propriétés ..

  // Dans createNewTest, ajouter :

  return {
    formData,
    ctaTests,
    updateFormData,
    updateCTATest,
    deleteCTATest,
    setCTATests,
    createNewTest,
    handleSave,
    exportToJSON,
    // Nouvelles fonctions exportées
    addEquipment,
    updateEquipment,
    deleteEquipment,
    addAttachment,
    updateAttachmentDescription,
    deleteAttachment,
    updateEquipmentList,
    addAirBalancingMeasurement,
    updateAirBalancingMeasurement,
    deleteAirBalancingMeasurement,
    addAirBalancingScenario,
    updateAirBalancingScenario,
    deleteAirBalancingScenario,
    getAirBalancingSummary,
    getAirBalancingStats,
  };
};
