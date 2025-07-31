import React from 'react';

import { AlertTriangle, Wind } from 'lucide-react';

import { Card } from '@/components/ui/card';

export const MissingCTAInfoCard: React.FC = () => {
  return (
    <Card className="border-dashed p-8 text-center">
      <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-orange-500" />
      <h3 className="mb-2 text-lg font-medium">Informations CTA manquantes</h3>
      <p className="text-muted-foreground mb-4">
        Veuillez remplir les informations de la CTA dans l&#39;onglet
        &quot;Informations générales&quot; avant de commencer les tests.
      </p>
      <p className="text-muted-foreground text-sm">
        Champs requis : Nom, Localisation, Marque
      </p>
    </Card>
  );
};

export const NoTestsCard: React.FC = () => {
  return (
    <Card className="p-12 text-center">
      <Wind className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
      <h3 className="mb-2 text-lg font-medium">Prêt pour les tests</h3>
      <p className="text-muted-foreground mb-4">
        Cliquez sur &quot;Commencer les tests&quot; pour débuter la mise en
        service de votre CTA
      </p>
    </Card>
  );
};
