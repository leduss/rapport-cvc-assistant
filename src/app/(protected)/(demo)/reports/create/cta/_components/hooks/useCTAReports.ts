import { useState } from 'react';

import { Attachment, Equipment } from '@/types';

import { CTAReportData, CTATest } from '../type/type';

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
  };
};
