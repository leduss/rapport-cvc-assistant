export const metrics = {
  projetsActifs: {
    value: 12,
    change: 2,
    period: 'ce mois',
    icon: require('lucide-react').Building,
    color: 'blue',
  },
  rapportsEnCours: {
    value: 8,
    change: -1,
    period: 'cette semaine',
    icon: require('lucide-react').FileText,
    color: 'orange',
  },
  equipementsTestes: {
    value: 147,
    change: 23,
    period: 'ce mois',
    icon: require('lucide-react').Wrench,
    color: 'green',
  },
  tauxReussite: {
    value: 94.2,
    unit: '%',
    change: 1.2,
    period: 'vs mois dernier',
    icon: require('lucide-react').CheckCircle,
    color: 'emerald',
  },
};

export const interventions = [
  {
    date: '2024-01-15',
    time: '09:00',
    project: 'Hôpital Saint-Jean',
    equipment: 'CTA Bloc A - Mise en service',
    type: 'CTA',
  },
  {
    date: '2024-01-15',
    time: '14:30',
    project: 'Centre Atlantis',
    equipment: 'Aérothermes Zone Food Court',
    type: 'AEROTHERME',
  },
  {
    date: '2024-01-16',
    time: '08:00',
    project: 'TechPark Phase 2',
    equipment: 'Pompes circuit primaire',
    type: 'POMPE',
  },
];

export const urgentReports = [
  {
    id: 'RPT-2024-001',
    project: 'Hôpital Saint-Jean',
    title: 'Mise en service CTA Bloc A',
    dueDate: '2024-01-18',
    progress: 75,
    priority: 'high',
  },
  {
    id: 'RPT-2024-007',
    project: 'École des Tilleuls',
    title: 'Tests ventilateurs classes',
    dueDate: '2024-01-20',
    progress: 45,
    priority: 'medium',
  },
];

export const alerts = [
  {
    type: 'warning',
    message: '3 équipements nécessitent une re-vérification',
    project: 'Centre Atlantis',
    date: 'Il y a 2 heures',
  },
  {
    type: 'info',
    message: 'Nouveau template CTA disponible',
    date: 'Hier',
  },
  {
    type: 'success',
    message: 'Rapport validé par le client',
    project: 'Bureaux TechPark',
    date: 'Il y a 1 jour',
  },
];

export const performanceData = [
  { equipment: 'CTA', avgTime: 4.2, unit: 'heures', tests: 45 },
  { equipment: 'Aérothermes', avgTime: 1.8, unit: 'heures', tests: 89 },
  { equipment: 'Pompes', avgTime: 2.1, unit: 'heures', tests: 156 },
  { equipment: 'Ventilateurs', avgTime: 0.9, unit: 'heures', tests: 78 },
  { equipment: 'Thermostats', avgTime: 0.3, unit: 'heures', tests: 234 },
];
