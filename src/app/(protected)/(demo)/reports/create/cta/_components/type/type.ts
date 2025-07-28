import { AirBalancing, Attachment, Equipment } from '@/types';

// Types spécifiques CTA
export interface CTAReportData {
  title: string;
  reportNumber: string;
  projectId: string;
  date: string;
  weatherConditions: string;
  ambientTemp: number | '';
  notes: string;
  status: 'BROUILLON' | 'EN_COURS' | 'TERMINE';

  // Informations CTA
  ctaName: string;
  location: string;
  brand: string;
  model: string;
  serialNumber: string;
  technicalSpecs: string;
}

export interface CTATest {
  id: string;
  ctaId: string;
  ctaName: string;
  location: string;
  brand: string;
  model: string;
  serialNumber: string;

  // Tests spécifiques CTA
  preCommissioningChecks: {
    visualInspection: boolean;
    mechanicalConnections: boolean;
    electricalConnections: boolean;
    filterInstallation: boolean;
    damperOperation: boolean;
    safetyDevices: boolean;
  };

  // Mesures aérauliques
  airFlowMeasurements: {
    supplyAirFlow: number | '';
    returnAirFlow: number | '';
    exhaustAirFlow: number | '';
    outsideAirFlow: number | '';
    supplyPressure: number | '';
    returnPressure: number | '';
  };

  // Mesures thermiques
  thermalMeasurements: {
    supplyAirTemp: number | '';
    returnAirTemp: number | '';
    outsideAirTemp: number | '';
    heatingCoilInletTemp: number | '';
    heatingCoilOutletTemp: number | '';
    coolingCoilInletTemp: number | '';
    coolingCoilOutletTemp: number | '';
  };

  // Tests fonctionnels
  functionalTests: {
    fanStartStop: 'REUSSI' | 'ECHEC' | 'EN_ATTENTE' | 'NON_APPLICABLE';
    damperControl: 'REUSSI' | 'ECHEC' | 'EN_ATTENTE' | 'NON_APPLICABLE';
    heatingControl: 'REUSSI' | 'ECHEC' | 'EN_ATTENTE' | 'NON_APPLICABLE';
    coolingControl: 'REUSSI' | 'ECHEC' | 'EN_ATTENTE' | 'NON_APPLICABLE';
    filterMonitoring: 'REUSSI' | 'ECHEC' | 'EN_ATTENTE' | 'NON_APPLICABLE';
    emergencyStop: 'REUSSI' | 'ECHEC' | 'EN_ATTENTE' | 'NON_APPLICABLE';
  };

  typescriptelectricalMeasurements: {
    // Tensions phase-neutre
    voltageL1N: number | '';
    voltageL2N: number | '';
    voltageL3N: number | '';

    // Tensions phase-phase ← MANQUANTES
    voltageL1L2: number | '';
    voltageL2L3: number | '';
    voltageL3L1: number | '';

    // Courants
    currentL1: number | '';
    currentL2: number | '';
    currentL3: number | '';

    // Puissances
    totalPower: number | '';
    cosPhi: number | '';
    frequency: number | '';

    // Protection
    insulationResistance: number | '';
    earthResistance: number | '';
  };

  acousticMeasurements: {
    soundLevelMachine: '';
    soundLevelAmbient: '';
    soundLevelSoufflage: '';
    soundLevelReprise: '';
    soundLevelExtraction: '';
    measurementDistance: '';
    backgroundNoise: '';
    octave63Hz: '';
    octave125Hz: '';
    octave250Hz: '';
    octave500Hz: '';
    octave1kHz: '';
    octave2kHz: '';
    octave4kHz: '';
    octave8kHz: '';
  };

  // Conformité
  conformityChecks: {
    debitConformeSpec: false;
    pressionConformeSpec: false;
    vitesseAirConforme: false;
    temperatureConformeSpec: false;
    deltaTemperatureConforme: false;
    niveauSonoreConforme: false;
    tensionConforme: false;
    intensiteConforme: false;
    isolementConforme: false;
    terreConforme: false;
    securiteConforme: false;
    marquageCEPresent: false;
    arretUrgenceFonctionnel: false;
    protectionsPresentes: false;
    documentationFournie: false;
    schemasAJour: false;
    noticesPresentes: false;
  };
  // Régulation
  controlTests: {
    temperatureControl: 'REUSSI' | 'ECHEC' | 'EN_ATTENTE' | 'NON_APPLICABLE';
    humidityControl: 'REUSSI' | 'ECHEC' | 'EN_ATTENTE' | 'NON_APPLICABLE';
    co2Control: 'REUSSI' | 'ECHEC' | 'EN_ATTENTE' | 'NON_APPLICABLE';
    scheduleOperation: 'REUSSI' | 'ECHEC' | 'EN_ATTENTE' | 'NON_APPLICABLE';
  };

  airBalancing: AirBalancing[];
  equipmentList: Equipment[]; // ← Cette propriété doit être présente
  attachments: Attachment[];

  overallStatus:
    | 'CONFORME'
    | 'NON_CONFORME'
    | 'ATTENTION_REQUISE'
    | 'EN_ATTENTE';
  comments: string;
  recommendations: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
}
