import React from 'react';

import { Thermometer } from 'lucide-react';

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
import { Textarea } from '@/components/ui/textarea';

import { CTAReportData } from './type/type';

interface CTAConditionsFormProps {
  formData: CTAReportData;
  onUpdate: (field: keyof CTAReportData, value: any) => void;
}

export const CTAConditionsForm: React.FC<CTAConditionsFormProps> = ({
  formData,
  onUpdate,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Thermometer className="mr-2 h-5 w-5" />
          Conditions d&#39;intervention
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="weather">Conditions météorologiques</Label>
          <Select
            value={formData.weatherConditions}
            onValueChange={(value) => onUpdate('weatherConditions', value)}
          >
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="Sélectionnez les conditions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ensoleille">Ensoleillé</SelectItem>
              <SelectItem value="nuageux">Nuageux</SelectItem>
              <SelectItem value="pluvieux">Pluvieux</SelectItem>
              <SelectItem value="venteux">Venteux</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="ambientTemp">Température ambiante (°C)</Label>
          <Input
            id="ambientTemp"
            type="number"
            placeholder="Ex: 20"
            value={formData.ambientTemp}
            onChange={(e) =>
              onUpdate('ambientTemp', parseFloat(e.target.value) || '')
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes générales</Label>
          <Textarea
            id="notes"
            placeholder="Observations générales, conditions particulières..."
            value={formData.notes}
            onChange={(e) => onUpdate('notes', e.target.value)}
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};
