// 📄 src/lib/sidebar-data.ts
import {
  Archive,
  BarChart3,
  Bell,
  BookOpen,
  Building,
  ClipboardList,
  Droplets,
  Edit,
  Eye,
  Fan,
  FileText,
  Gauge,
  Home,
  Map,
  Plus,
  Settings,
  Thermometer,
  Upload,
  User,
  Wind,
  Wrench,
  Zap,
} from 'lucide-react';

export interface SidebarUser {
  name: string;
  email: string;
  avatar: string;
}

export interface SidebarTeam {
  name: string;
  logo: any;
  plan: string;
}

export interface SidebarNavItem {
  title: string;
  url: string;
  icon?: any;
  isActive?: boolean;
  badge?: number;
  items?: SidebarNavItem[];
}

export interface SidebarProject {
  name: string;
  url: string;
  icon: any;
  status?: string;
}

export interface SidebarData {
  user: SidebarUser;
  teams: SidebarTeam[];
  navMain: SidebarNavItem[];
  projects: SidebarProject[];
}

// Configuration pour l'assistant CVC
export const sidebarData: SidebarData = {
  user: {
    name: 'Pierre CVC',
    email: 'pierre@cvc-expert.fr',
    avatar: '/avatars/pierre.jpg',
  },
  teams: [
    {
      name: 'CVC Expert',
      logo: Wind,
      plan: 'Pro',
    },
    {
      name: 'Thermique Solutions',
      logo: Thermometer,
      plan: 'Enterprise',
    },
  ],
  navMain: [
    {
      title: 'Tableau de bord',
      url: '/dashboard',
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Vue d'ensemble",
          url: '/dashboard/overview',
        },
        {
          title: 'Activité récente',
          url: '/dashboard/activity',
        },
        {
          title: 'Notifications',
          url: '/dashboard/notifications',
        },
      ],
    },
    {
      title: 'Projets & Chantiers',
      url: '/projects',
      icon: Building,
      items: [
        {
          title: 'Tous les projets',
          url: '/projects',
        },
        {
          title: 'Nouveau projet',
          url: '/projects/create',
          icon: Plus,
        },
        {
          title: 'Vue géographique',
          url: '/projects/map',
          icon: Map,
        },
        {
          title: 'Projets archivés',
          url: '/projects/archived',
          icon: Archive,
        },
      ],
    },
    {
      title: 'Équipements CVC',
      url: '/equipments',
      icon: Wrench,
      items: [
        {
          title: 'Tous les équipements',
          url: '/equipments',
        },
        {
          title: 'CTA',
          url: '/equipments?type=CTA',
          icon: Wind,
        },
        {
          title: 'Aérothermes',
          url: '/equipments?type=AEROTHERME',
          icon: Thermometer,
        },
        {
          title: 'Pompes',
          url: '/equipments?type=POMPE',
          icon: Droplets,
        },
        {
          title: 'Ventilateurs',
          url: '/equipments?type=VENTILATEUR',
          icon: Fan,
        },
        {
          title: 'Thermostats',
          url: '/equipments?type=THERMOSTAT',
          icon: Gauge,
        },
        {
          title: 'Autres équipements',
          url: '/equipments?type=AUTRE',
          icon: Zap,
        },
      ],
    },
    {
      title: 'Rapports de mise en service',
      url: '/reports',
      icon: FileText,
      items: [
        {
          title: 'Tous les rapports',
          url: '/reports',
        },
        {
          title: 'Nouveau rapport',
          url: '/reports/create',
          icon: Plus,
        },
        {
          title: 'Brouillons',
          url: '/reports?status=DRAFT',
          icon: Edit,
          badge: 3,
        },
        {
          title: 'En cours',
          url: '/reports?status=IN_PROGRESS',
          icon: Eye,
          badge: 5,
        },
        {
          title: 'Terminés',
          url: '/reports?status=COMPLETED',
          icon: ClipboardList,
        },
        {
          title: 'Validés',
          url: '/reports?status=VALIDATED',
          icon: Archive,
        },
      ],
    },
    {
      title: 'Templates & Modèles',
      url: '/templates',
      icon: BookOpen,
      items: [
        {
          title: 'Mes templates',
          url: '/templates',
        },
        {
          title: 'Créer un template',
          url: '/templates/create',
          icon: Plus,
        },
        {
          title: 'Templates CTA',
          url: '/templates?category=CTA',
          icon: Wind,
        },
        {
          title: 'Templates Aérothermes',
          url: '/templates?category=AEROTHERME',
          icon: Thermometer,
        },
        {
          title: 'Templates Pompes',
          url: '/templates?category=POMPE',
          icon: Droplets,
        },
      ],
    },
    {
      title: 'Références techniques',
      url: '/references',
      icon: BookOpen,
      items: [
        {
          title: 'Toutes les références',
          url: '/references',
        },
        {
          title: 'Normes (NF, EN, DTU)',
          url: '/references?category=normes',
        },
        {
          title: 'Guides techniques',
          url: '/references?category=guides',
        },
        {
          title: 'Calculateurs',
          url: '/references/calculators',
          icon: BarChart3,
        },
      ],
    },
    {
      title: 'Analyses & Statistiques',
      url: '/analytics',
      icon: BarChart3,
      items: [
        {
          title: "Vue d'ensemble",
          url: '/analytics',
        },
        {
          title: 'Performances équipements',
          url: '/analytics/performance',
          icon: Gauge,
        },
        {
          title: 'Suivi projets',
          url: '/analytics/projects',
          icon: Building,
        },
        {
          title: 'Exports de données',
          url: '/analytics/export',
          icon: Upload,
        },
      ],
    },
    {
      title: 'Paramètres',
      url: '/settings',
      icon: Settings,
      items: [
        {
          title: 'Mon profil',
          url: '/settings/profile',
          icon: User,
        },
        {
          title: 'Notifications',
          url: '/settings/notifications',
          icon: Bell,
        },
        {
          title: 'Import/Export',
          url: '/settings/import-export',
          icon: Upload,
        },
        {
          title: 'Sauvegarde',
          url: '/settings/backup',
          icon: Archive,
        },
      ],
    },
  ],
  // Projets récents pour la section projets
  projects: [
    {
      name: 'Hôpital Saint-Jean - CVC',
      url: '/projects/hopital-saint-jean',
      icon: Building,
      status: 'En cours',
    },
    {
      name: 'Centre commercial Atlantis',
      url: '/projects/centre-atlantis',
      icon: Building,
      status: 'Terminé',
    },
    {
      name: 'Bureaux TechPark - Phase 2',
      url: '/projects/techpark-phase2',
      icon: Building,
      status: 'Planifié',
    },
    {
      name: 'École primaire des Tilleuls',
      url: '/projects/ecole-tilleuls',
      icon: Building,
      status: 'En cours',
    },
  ],
};

// Hook pour récupérer les données dynamiques (optionnel)
export function useSidebarData() {
  // Ici tu pourras plus tard récupérer les données depuis l'API
  // const { data: projects } = useProjects()
  // const { data: user } = useUser()
  // const { data: reportCounts } = useReportCounts()

  return sidebarData;
}

// Helper pour mettre à jour les badges dynamiquement
export function updateBadgeCounts(
  data: SidebarData,
  reportCounts: { drafts: number; inProgress: number }
) {
  const reportsSection = data.navMain.find((item) => item.url === '/reports');
  if (reportsSection?.items) {
    const draftsItem = reportsSection.items.find(
      (item) => item.url === '/reports?status=DRAFT'
    );
    const inProgressItem = reportsSection.items.find(
      (item) => item.url === '/reports?status=IN_PROGRESS'
    );

    if (draftsItem) draftsItem.badge = reportCounts.drafts;
    if (inProgressItem) inProgressItem.badge = reportCounts.inProgress;
  }

  return data;
}
