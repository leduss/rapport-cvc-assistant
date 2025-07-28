import React from 'react';

import { AlertTriangle, Wind } from 'lucide-react';

import { Card } from '@/components/ui/card';

export const MissingCTAInfoCard: React.FC = () => {
  return (
    <Card className="p-8 text-center border-dashed">
      <AlertTriangle className="mx-auto h-12 w-12 text-orange-500 mb-4" />
      <h3 className="text-lg font-medium mb-2">Informations CTA manquantes</h3>
      <p className="text-muted-foreground mb-4">
        Veuillez remplir les informations de la CTA dans l&#39;onglet
        &quot;Informations générales&quot; avant de commencer les tests.
      </p>
      <p className="text-sm text-muted-foreground">
        Champs requis : Nom, Localisation, Marque
      </p>
    </Card>
  );
};

export const NoTestsCard: React.FC = () => {
  return (
    <Card className="p-12 text-center">
      <Wind className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">Prêt pour les tests</h3>
      <p className="text-muted-foreground mb-4">
        Cliquez sur &quot;Commencer les tests&quot; pour débuter la mise en
        service de votre CTA
      </p>
    </Card>
  );
};
