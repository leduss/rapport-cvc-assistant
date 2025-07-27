import {
  Activity,
  AlertCircle,
  Archive,
  Building,
  Calendar,
  CheckCircle,
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

import { Project } from '../page';

export const ProjectCard = ({ project }: { project: Project }) => {
  const getStatusBadge = (status: string) => {
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

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1">
              {project.name}
            </CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Building className="h-4 w-4 mr-1" />
              {project.client}
            </CardDescription>
          </div>
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
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          {getStatusBadge(project.status)}
          <div className="text-sm text-gray-500">
            {project.progress}% terminé
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${project.progress}%` }}
          />
        </div>

        {/* Adresse */}
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="line-clamp-1">{project.address}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            {project.equipmentsCount} équipements
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            {project.reportsCount} rapports
          </div>
        </div>

        {/* Prochaine intervention */}
        {project.nextIntervention && (
          <div className="p-2 bg-blue-50 rounded-lg">
            <div className="flex items-center text-sm text-blue-800">
              <Clock className="h-4 w-4 mr-2" />
              Prochaine intervention: {project.nextIntervention}
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
