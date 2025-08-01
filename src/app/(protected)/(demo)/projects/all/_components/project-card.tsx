import { Project, ProjectStatus } from '@prisma/client';
import {
  Activity,
  AlertCircle,
  Archive,
  ArrowDownCircle,
  ArrowUpCircle,
  Building,
  Calendar,
  CheckCircle,
  Circle,
  Clock,
  Edit,
  Eye,
  MapPin,
  MoreHorizontal,
  Trash2,
  Users,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { PriorityLevel } from '@/types';

export const getPriorityBadge = (priority: PriorityLevel) => {
  const priorityConfig = {
    [PriorityLevel.LOW]: {
      label: 'Faible',
      icon: ArrowDownCircle,
      className: 'bg-green-100 text-green-800',
    },
    [PriorityLevel.NORMAL]: {
      label: 'Normale',
      icon: Circle,
      className: 'bg-yellow-100 text-yellow-800',
    },
    [PriorityLevel.HIGH]: {
      label: 'Élevée',
      icon: ArrowUpCircle,
      className: 'bg-red-100 text-red-800',
    },
  };

  const config = priorityConfig[priority as keyof typeof priorityConfig];
  const Icon1 = config.icon;
  return (
    <Badge className={cn(config.className)}>
      <Icon1 className="mr-1 h-3 w-3" />
      {config.label}
    </Badge>
  );
};

export const getStatusBadge = (status: ProjectStatus) => {
  const statusConfig = {
    ACTIVE: { label: 'Actif', variant: 'default' as const, icon: Activity },
    COMPLETED: {
      label: 'Terminé',
      variant: 'secondary' as const,
      icon: CheckCircle,
      className: 'text-green-500',
    },
    PLANNED: { label: 'Planifié', variant: 'outline' as const, icon: Clock },
    ON_HOLD: {
      label: 'En attente',
      variant: 'destructive' as const,
      icon: AlertCircle,
    },
    ARCHIVED: {
      label: 'Archivé',
      variant: 'secondary' as const,
      icon: Archive,
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  const Icon = config.icon;

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
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between pb-2">
          {getPriorityBadge(project.priority as PriorityLevel)}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
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
        </div>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="line-clamp-1 text-lg font-semibold">
              {project.name}
            </CardTitle>
            <CardDescription className="mt-1 flex items-center">
              <Building className="mr-1 h-4 w-4" />
              {project.client}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          {getStatusBadge(project.status)}
          <div className="text-sm text-gray-500">
            {project.progress}% terminé
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all"
            style={{ width: `${project.progress}%` }}
          />
        </div>

        {/* Adresse */}
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="line-clamp-1">{project.address}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <Users className="mr-1 h-4 w-4" />
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="mr-1 h-4 w-4" />
            {project.reportsCount} rapports
          </div>
        </div>

        {/* Prochaine intervention */}
        {project.nextIntervention && (
          <div className="rounded-lg bg-blue-50 p-2">
            <div className="flex items-center text-sm text-blue-800">
              <Clock className="mr-2 h-4 w-4" />
              Prochaine intervention:{' '}
              {new Date(project.nextIntervention).toLocaleDateString('fr-FR')}
            </div>
          </div>
        )}

        {/* Date de création */}
        <div className="text-xs text-gray-500">
          Créé le {new Date(project.createdAt).toLocaleDateString('fr-FR')}
        </div>
      </CardContent>
    </Card>
  );
};
