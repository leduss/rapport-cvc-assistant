export interface User {
  id: string;
  email: string;
  name?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  address?: string | null;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface Equipment {
  id: string;
  type:
    | 'VENTILATEUR'
    | 'BATTERIE'
    | 'FILTRE'
    | 'REGISTRE'
    | 'SONDE'
    | 'VARIATEUR'
    | 'AUTRE';
  designation: string;
  marque: string;
  modele: string;
  numeroSerie: string;
  caracteristiques: string;
}

export interface Attachment {
  id: string;
  type: 'PHOTO' | 'DOCUMENT';
  name: string;
  description: string;
  url?: string;
  file?: File;
  uploadDate?: string;
  size?: number;
}

export interface Report {
  id: string;
  title: string;
  reportNumber?: string | null;
  date: Date;
  weatherConditions?: string | null;
  ambientTemp?: number | null;
  notes?: string | null;
  status: ReportStatus;
  userId: string;
  projectId: string;
}

export enum EquipmentType {
  CTA = 'CTA',
  AEROTHERME = 'AEROTHERME',
  THERMOSTAT = 'THERMOSTAT',
  POMPE = 'POMPE',
  VENTILATEUR = 'VENTILATEUR',
  ECHANGEUR = 'ECHANGEUR',
  FILTRE = 'FILTRE',
  RESEAU_AERAULIQUE = 'RESEAU_AERAULIQUE',
  RESEAU_HYDRAULIQUE = 'RESEAU_HYDRAULIQUE',
  AUTRE = 'AUTRE',
}

export enum ReportStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  PLANNED = 'PLANNED',
  ON_HOLD = 'ON_HOLD',
  ARCHIVED = 'ARCHIVED',
}

export enum TestStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  PASSED = 'PASSED',
  FAILED = 'FAILED',
  REQUIRES_ATTENTION = 'REQUIRES_ATTENTION',
}

export enum PriorityLevel {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
}

export interface ElectricalMeasurements {
  // Tensions phase-neutre
  voltageL1N: number | '';
  voltageL2N: number | '';
  voltageL3N: number | '';

  // Tensions phase-phase ← AJOUTÉES
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
}

export interface AcousticMeasurements {
  // Niveaux sonores globaux
  soundLevelMachine: number | '';
  soundLevelAmbient: number | '';
  soundLevelSoufflage: number | '';
  soundLevelReprise: number | '';
  soundLevelExtraction: number | '';

  // Conditions de mesure
  measurementDistance: number | '';
  backgroundNoise: number | '';

  // Analyse fréquentielle (optionnel)
  octave63Hz: number | '';
  octave125Hz: number | '';
  octave250Hz: number | '';
  octave500Hz: number | '';
  octave1kHz: number | '';
  octave2kHz: number | '';
  octave4kHz: number | '';
  octave8kHz: number | '';
}

export interface ConformityChecks {
  // Performances aérauliques
  debitConformeSpec: boolean;
  pressionConformeSpec: boolean;
  vitesseAirConforme: boolean;

  // Performances thermiques
  temperatureConformeSpec: boolean;
  deltaTemperatureConforme: boolean;

  // Acoustique
  niveauSonoreConforme: boolean;

  // Électrique
  tensionConforme: boolean;
  intensiteConforme: boolean;
  isolementConforme: boolean;
  terreConforme: boolean;

  // Sécurité et réglementation
  securiteConforme: boolean;
  marquageCEPresent: boolean;
  arretUrgenceFonctionnel: boolean;
  protectionsPresentes: boolean;

  // Documentation
  documentationFournie: boolean;
  schemasAJour: boolean;
  noticesPresentes: boolean;
}

export interface AirBalancing {
  id: string;
  type: 'SOUFFLAGE' | 'REPRISE' | 'EXTRACTION';
  designation: string; // Ex: "Bouche bureau 101"
  debitTheorique: number | ''; // Débit prévu au CCTP
  debitMesure: number | ''; // Débit mesuré
  ecart: number | ''; // Écart en %
  reglage: string; // Position registre/bouche
}
