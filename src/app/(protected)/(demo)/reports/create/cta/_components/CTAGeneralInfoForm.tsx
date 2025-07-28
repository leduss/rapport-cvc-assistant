import React from 'react';

import { FileText } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { CTAReportData, Project } from './type/type';

interface CTAGeneralInfoFormProps {
  formData: CTAReportData;
  projects: Project[];
  onUpdate: (field: keyof CTAReportData, value: any) => void;
}

export const CTAGeneralInfoForm: React.FC<CTAGeneralInfoFormProps> = ({
  formData,
  projects,
  onUpdate,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Informations du rapport CTA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Titre du rapport</Label>
          <Input
            id="title"
            placeholder="Ex: Mise en service CTA Bloc A - Hôpital Saint-Jean"
            value={formData.title}
            onChange={(e) => onUpdate('title', e.target.value)}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="reportNumber">Numéro de rapport</Label>
            <Input
              id="reportNumber"
              value={formData.reportNumber}
              onChange={(e) => onUpdate('reportNumber', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date d&apos;intervention</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => onUpdate('date', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project">Projet associé</Label>
            <Select
              value={formData.projectId}
              onValueChange={(value) => onUpdate('projectId', value)}
            >
              <SelectTrigger className="cursor-pointer">
                <SelectValue placeholder="Sélectionnez un projet" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{project.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {project.client}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
