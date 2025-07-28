import React from 'react';

import { Wind } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { CTAReportData } from './type/type';

interface CTAInfoFormProps {
  formData: CTAReportData;
  onUpdate: (field: keyof CTAReportData, value: any) => void;
}

export const CTAInfoForm: React.FC<CTAInfoFormProps> = ({
  formData,
  onUpdate,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wind className="mr-2 h-5 w-5 text-blue-600" />
          Informations CTA à tester
        </CardTitle>
        <CardDescription>
          Saisissez les informations de la CTA concernée par ce rapport
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ctaName">Nom/Référence de la CTA</Label>
          <Input
            id="ctaName"
            placeholder="Ex: CTA Bloc A, CTA-001, etc."
            value={formData.ctaName || ''}
            onChange={(e) => onUpdate('ctaName', e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Localisation</Label>
            <Input
              id="location"
              placeholder="Ex: Local technique A, Toiture Sud"
              value={formData.location || ''}
              onChange={(e) => onUpdate('location', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">Marque</Label>
            <Input
              id="brand"
              placeholder="Ex: FRANCE AIR, ALDES, SWEGON"
              value={formData.brand || ''}
              onChange={(e) => onUpdate('brand', e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="model">Modèle</Label>
            <Input
              id="model"
              placeholder="Ex: EOLIOS 15000, T.ONE AHU 12000"
              value={formData.model || ''}
              onChange={(e) => onUpdate('model', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="serialNumber">Numéro de série</Label>
            <Input
              id="serialNumber"
              placeholder="Ex: FA2024001, ALD-15-2024"
              value={formData.serialNumber || ''}
              onChange={(e) => onUpdate('serialNumber', e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="technicalSpecs">Spécifications techniques</Label>
          <Textarea
            id="technicalSpecs"
            placeholder="Débit nominal, puissance, dimensions, caractéristiques particulières..."
            value={formData.technicalSpecs || ''}
            onChange={(e) => onUpdate('technicalSpecs', e.target.value)}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
};
