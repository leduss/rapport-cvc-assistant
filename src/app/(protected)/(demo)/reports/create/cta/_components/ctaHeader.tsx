import React from 'react';

import { Save, Send, Wind } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface CTAHeaderProps {
  onSave: (asDraft: boolean) => void;
  onBack?: () => void;
}

export const CTAHeader: React.FC<CTAHeaderProps> = ({ onSave }) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="flex items-center text-3xl font-bold">
            <Wind className="mr-3 h-8 w-8 text-blue-600" />
            Rapport de mise en service CTA
          </h1>
          <p className="text-muted-foreground mt-1">
            Centrales de Traitement d&apos;Air - Tests spécialisés aérauliques
            et thermiques
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={() => onSave(true)}>
          <Save className="mr-2 h-4 w-4" />
          Sauvegarder
        </Button>
        <Button onClick={() => onSave(false)}>
          <Send className="mr-2 h-4 w-4" />
          Finaliser
        </Button>
      </div>
    </div>
  );
};
