'use client';

import React, { useState } from 'react';

import {
  Activity,
  Building,
  CheckCircle,
  Clock,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
// Table components (add these with: pnpm dlx shadcn-ui@latest add table)
const Table = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) => (
  <table className="w-full caption-bottom text-sm" {...props}>
    {children}
  </table>
);
const TableHeader = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="[&_tr]:border-b" {...props}>
    {children}
  </thead>
);
const TableBody = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className="[&_tr:last-child]:border-0" {...props}>
    {children}
  </tbody>
);
const TableRow = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
    {...props}
  >
    {children}
  </tr>
);
const TableHead = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableCellElement>) => (
  <th
    className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
    {...props}
  >
    {children}
  </th>
);
const TableCell = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableCellElement>) => (
  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0" {...props}>
    {children}
  </td>
);
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

import { ProjectCard } from './_components/project-card';

// Types pour les projets
export interface Project {
  id: string;
  name: string;
  client: string;
  address: string;
  status: 'ACTIVE' | 'COMPLETED' | 'PLANNED' | 'ON_HOLD' | 'ARCHIVED';
  progress: number;
  createdAt: string;
  updatedAt: string;
  equipmentsCount: number;
  reportsCount: number;
  nextIntervention?: string;
  description?: string;
}

// Composant pour une carte projet (vue grille)

// Composant pour une ligne projet (vue tableau)
const ProjectRow = ({ project }: { project: Project }) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      ACTIVE: {
        label: 'Actif',
        variant: 'default' as const,
      },
      COMPLETED: { label: 'Terminé', variant: 'secondary' as const },
      PLANNED: { label: 'Planifié', variant: 'outline' as const },
      ON_HOLD: { label: 'En attente', variant: 'destructive' as const },
      ARCHIVED: { label: 'Archivé', variant: 'secondary' as const },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge
        variant={config.variant}
        className={cn(
          config.label === 'Planifié' && 'bg-orange-500',
          config.label === 'En attente' && 'bg-red-500',
          config.label === 'Actif' && 'bg-green-500',
          config.label === 'Terminé' && 'bg-blue-500',
          'flex items-center gap-1'
        )}
      >
        {config.label}
      </Badge>
    );
  };

  return (
    <TableRow>
      <TableCell>
        <div>
          <div className="font-medium">{project.name}</div>
          <div className="text-sm text-muted-foreground">{project.client}</div>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm">{project.address}</div>
      </TableCell>
      <TableCell>{getStatusBadge(project.status)}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <span className="text-sm">{project.progress}%</span>
        </div>
      </TableCell>
      <TableCell className="text-center">{project.equipmentsCount}</TableCell>
      <TableCell className="text-center">{project.reportsCount}</TableCell>
      <TableCell>{project.nextIntervention || '-'}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              Voir détails
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default function ProjectsAllPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Données mockées des projets
  const projects: Project[] = [
    {
      id: '1',
      name: 'Hôpital Saint-Jean - Rénovation CVC',
      client: 'CHU Bordeaux',
      address: '1 rue Dubernat, 33404 Talence',
      status: 'ACTIVE',
      progress: 68,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-25',
      equipmentsCount: 23,
      reportsCount: 8,
      nextIntervention: '15 Jan 2024',
      description: 'Rénovation complète du système CVC - Blocs opératoires',
    },
    {
      id: '2',
      name: 'Centre Commercial Atlantis',
      client: 'Immochan',
      address: "200 avenue de l'Europe, 33700 Mérignac",
      status: 'ACTIVE',
      progress: 94,
      createdAt: '2023-12-01',
      updatedAt: '2024-01-26',
      equipmentsCount: 45,
      reportsCount: 15,
      nextIntervention: '17 Jan 2024',
      description: 'Installation CVC zones commerciales et restaurants',
    },
    {
      id: '3',
      name: 'TechPark Phase 2 - Bureaux',
      client: 'Nexity',
      address: '15 cours Édouard Vaillant, 33300 Bordeaux',
      status: 'PLANNED',
      progress: 15,
      createdAt: '2024-01-20',
      updatedAt: '2024-01-26',
      equipmentsCount: 67,
      reportsCount: 2,
      nextIntervention: '20 Jan 2024',
      description: 'Bureaux haute performance énergétique',
    },
    {
      id: '4',
      name: 'École Primaire des Tilleuls',
      client: 'Mairie de Pessac',
      address: '5 rue des Tilleuls, 33600 Pessac',
      status: 'ACTIVE',
      progress: 82,
      createdAt: '2023-11-15',
      updatedAt: '2024-01-24',
      equipmentsCount: 12,
      reportsCount: 6,
      nextIntervention: '18 Jan 2024',
      description: 'Ventilation salles de classe et réfectoire',
    },
    {
      id: '5',
      name: 'Résidence Étudiante Campus',
      client: 'CROUS Aquitaine',
      address: '120 cours de la Libération, 33405 Talence',
      status: 'COMPLETED',
      progress: 100,
      createdAt: '2023-09-01',
      updatedAt: '2023-12-20',
      equipmentsCount: 89,
      reportsCount: 22,
      description: 'CVC 350 logements étudiants',
    },
    {
      id: '6',
      name: 'Maison de Retraite Les Jardins',
      client: 'Korian',
      address: '45 avenue Thiers, 33100 Bordeaux',
      status: 'ON_HOLD',
      progress: 35,
      createdAt: '2024-01-05',
      updatedAt: '2024-01-22',
      equipmentsCount: 28,
      reportsCount: 4,
      description: 'En attente validation client',
    },
  ];

  // Filtrage des projets
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === 'all' || project.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // Stats rapides
  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === 'ACTIVE').length,
    completed: projects.filter((p) => p.status === 'COMPLETED').length,
    planned: projects.filter((p) => p.status === 'PLANNED').length,
  };

  const router = useRouter();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projets & Chantiers</h1>
          <p className="text-muted-foreground">
            Gestion de tous vos projets CVC
          </p>
        </div>
        <Button onClick={() => router.push('/projects/create')}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau projet
        </Button>
      </div>

      {/* Stats rapides */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Actifs</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Terminés</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Planifiés</p>
                <p className="text-2xl font-bold">{stats.planned}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un projet..."
              className="pl-10 w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtrer
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedStatus('all')}>
                Tous les projets
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus('ACTIVE')}>
                Actifs
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus('COMPLETED')}>
                Terminés
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus('PLANNED')}>
                Planifiés
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus('ON_HOLD')}>
                En attente
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs
          value={viewMode}
          onValueChange={(value) => setViewMode(value as 'grid' | 'table')}
        >
          <TabsList>
            <TabsTrigger className="cursor-pointer" value="grid">
              Grille
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="table">
              Tableau
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Liste des projets */}
      {viewMode === 'grid' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Projet</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Progression</TableHead>
                <TableHead>Équipements</TableHead>
                <TableHead>Rapports</TableHead>
                <TableHead>Prochaine intervention</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <ProjectRow key={project.id} project={project} />
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Message si aucun résultat */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Building className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Aucun projet trouvé</h3>
          <p className="mt-2 text-muted-foreground">
            Essayez de modifier vos critères de recherche ou créez un nouveau
            projet.
          </p>
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Créer un projet
          </Button>
        </div>
      )}
    </div>
  );
}
