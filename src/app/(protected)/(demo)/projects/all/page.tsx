'use client';

import React, { useState } from 'react';

import { Project } from '@prisma/client';
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
    className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors"
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
    className="text-muted-foreground h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0"
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
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { projects } from '@/lib/data/projects';
import { PriorityLevel } from '@/types';

import {
  getPriorityBadge,
  getStatusBadge,
  ProjectCard,
} from './_components/project-card';

const ProjectRow = ({ project }: { project: Project }) => {
  return (
    <TableRow>
      <TableCell>
        <div>
          <div className="font-medium">{project.name}</div>
          <div className="text-muted-foreground text-sm">{project.client}</div>
        </div>
      </TableCell>
      <TableCell>{project.address}</TableCell>
      <TableCell>{getStatusBadge(project.status)}</TableCell>
      <TableCell>
        {getPriorityBadge(project.priority as PriorityLevel)}
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <div className="h-2 w-16 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-600"
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <span className="text-sm">{project.progress}%</span>
        </div>
      </TableCell>
      <TableCell className="text-center">{project.reportsCount}</TableCell>
      <TableCell>
        {new Date(project.nextIntervention).toLocaleDateString()}
      </TableCell>
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
  const [selectedPriority, setSelectedPriority] = useState<
    'all' | PriorityLevel
  >('all');

  // Données mockées des projets

  // Filtrage des projets
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.address?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === 'all' || project.status === selectedStatus;

    const matchesPriority =
      selectedPriority === 'all' || project.priority === selectedPriority;

    return matchesSearch && matchesStatus && matchesPriority;
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
    <div className="space-y-6 p-6">
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
                <p className="text-muted-foreground text-sm">Total</p>
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
                <p className="text-muted-foreground text-sm">Actifs</p>
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
                <p className="text-muted-foreground text-sm">Terminés</p>
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
                <p className="text-muted-foreground text-sm">Planifiés</p>
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
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Rechercher un projet..."
              className="w-80 pl-10"
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

            <DropdownMenuContent className="flex gap-6">
              {/* Filtres par statut */}
              <div>
                <DropdownMenuItem onClick={() => setSelectedStatus('all')}>
                  Par projets
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus('ACTIVE')}>
                  Actifs
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedStatus('COMPLETED')}
                >
                  Terminés
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus('PLANNED')}>
                  Planifiés
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus('ON_HOLD')}>
                  En attente
                </DropdownMenuItem>
              </div>

              {/* Séparateur */}
              <Separator orientation="vertical" className="" />

              {/* Filtres par priorité */}
              <div>
                <DropdownMenuItem onClick={() => setSelectedPriority('all')}>
                  Par priorité
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedPriority(PriorityLevel.LOW)}
                >
                  Faible
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedPriority(PriorityLevel.NORMAL)}
                >
                  Normale
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedPriority(PriorityLevel.HIGH)}
                >
                  Élevée
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedStatus('all');
              setSelectedPriority('all');
              setSearchTerm('');
            }}
          >
            Réinitialiser les filtres
          </Button>
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
                <TableHead>Client</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Priorité</TableHead>
                <TableHead>Progression</TableHead>
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
        <div className="py-12 text-center">
          <Building className="text-muted-foreground mx-auto h-12 w-12" />
          <h3 className="mt-4 text-lg font-semibold">Aucun projet trouvé</h3>
          <p className="text-muted-foreground mt-2">
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
