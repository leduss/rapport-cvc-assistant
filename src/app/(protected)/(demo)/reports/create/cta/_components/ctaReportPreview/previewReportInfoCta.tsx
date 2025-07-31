import React from 'react';

import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';

interface PreviewReportInfoCtaProps {
  ctaName: string;
  location: string;
  brand: string;
  model: string;
  serialNumber: string;
  technicalSpecs: string;
}

const PreviewReportInfoCta = ({
  ctaName,
  location,
  brand,
  model,
  serialNumber,
  technicalSpecs,
}: PreviewReportInfoCtaProps) => {
  return (
    <Card className="mb-6">
      <CardTitle className="px-6 text-lg">ÉQUIPEMENT CTA</CardTitle>
      <span className="mx-6 border-b-2 border-blue-600"></span>
      <CardContent className="info-grid grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded border p-4">
          <p className="space-y-2 text-sm">
            <span className="block">
              <span className="font-semibold">Nom/Référence:</span>
              <span className="ml-2 font-medium">{ctaName}</span>
            </span>
            <span className="block">
              <span className="font-semibold">Localisation:</span>
              <span className="ml-2">{location}</span>
            </span>
            <span className="block">
              <span className="font-semibold">Marque:</span>
              <span className="ml-2">{brand}</span>
            </span>
          </p>
        </div>
        <div className="rounded border p-4">
          <p className="space-y-2 text-sm">
            <span className="block">
              <span className="font-semibold">Modèle:</span>
              <span className="ml-2">{model}</span>
            </span>
            <span className="block">
              <span className="font-semibold">N° de série:</span>
              <span className="ml-2">{serialNumber}</span>
            </span>
          </p>
        </div>
      </CardContent>
      {technicalSpecs && (
        <CardFooter className="mx-6 flex items-center rounded border p-4">
          <p className="text-base font-semibold">
            Spécifications techniques:&nbsp;&nbsp;
          </p>
          <p className="text-sm whitespace-pre-wrap">{technicalSpecs}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default PreviewReportInfoCta;
