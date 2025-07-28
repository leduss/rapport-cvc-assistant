import React from 'react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { CTATest } from './type/type';

interface TestStatusSectionProps {
  test: CTATest;
  onUpdate: (updates: Partial<CTATest>) => void;
}

export const TestStatusSection: React.FC<TestStatusSectionProps> = ({
  test,
  onUpdate,
}) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm">Statut global</Label>
          <Select
            value={test.overallStatus}
            onValueChange={(value: any) => onUpdate({ overallStatus: value })}
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EN_ATTENTE">En attente</SelectItem>
              <SelectItem value="CONFORME">Conforme</SelectItem>
              <SelectItem value="NON_CONFORME">Non conforme</SelectItem>
              <SelectItem value="ATTENTION_REQUISE">
                Attention requise
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm">Commentaires</Label>
          <Textarea
            placeholder="Observations générales, anomalies détectées..."
            className="text-sm resize-none"
            rows={2}
            value={test.comments}
            onChange={(e) => onUpdate({ comments: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Recommandations</Label>
          <Textarea
            placeholder="Actions correctives, maintenance préventive..."
            className="text-sm resize-none"
            rows={2}
            value={test.recommendations}
            onChange={(e) => onUpdate({ recommendations: e.target.value })}
          />
        </div>
      </div>
    </>
  );
};
