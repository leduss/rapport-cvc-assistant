import React from 'react';

import { Download, Eye, Printer } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PreviewReportHeaderProps {
  onPrint: () => void;
  onExport: () => void;
}

const PreviewReportHeader = ({
  onPrint,
  onExport,
}: PreviewReportHeaderProps) => {
  return (
    <CardHeader className="">
      <CardTitle className="flex items-center text-2xl">
        <Eye className="mr-2 h-6 w-6 text-blue-600" />
        Aperçu du rapport
      </CardTitle>
      <CardDescription className="flex items-center justify-between">
        <span className="text-base">
          Prévisualisation avant génération du PDF final
        </span>
        <div className="no-print flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrint}
            className="hover:bg-blue-50"
          >
            <Printer className="mr-2 h-4 w-4" />
            Imprimer PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            className="hover:bg-green-50"
          >
            <Download className="mr-2 h-4 w-4" />
            Export JSON
          </Button>
        </div>
      </CardDescription>
    </CardHeader>
  );
};

export default PreviewReportHeader;
