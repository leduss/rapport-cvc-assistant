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
  name: string;
  type: EquipmentType;
  brand?: string | null;
  model?: string | null;
  serialNumber?: string | null;
  location?: string | null;
  description?: string | null;
  projectId: string;
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
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  VALIDATED = 'VALIDATED',
  ARCHIVED = 'ARCHIVED',
}

export enum TestStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  PASSED = 'PASSED',
  FAILED = 'FAILED',
  REQUIRES_ATTENTION = 'REQUIRES_ATTENTION',
}
