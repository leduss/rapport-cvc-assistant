import React, { forwardRef } from 'react';

import { Project } from '@prisma/client';

import { Card, CardContent } from '@/components/ui/card';

import PreviewReportAttachments from './previewReportAttachements';
import PreviewReportEquipmentList from './PreviewReportEquipmentList';
import PreviewReportHead from './previewReportHead';
import PreviewReportHeader from './previewReportHeader';
import PreviewReportInfoCta from './previewReportInfoCta';
import PreviewReportInformationsGenerales from './previewReportInformationsGenerales';
import PreviewReportMesureAero from './previewReportMesureAero';
import PreviewReportMesuresAcoustiques from './PreviewReportMesuresAcoustiques';
import PreviewReportMesuresElec from './previewReportMesuresElec';
import PreviewReportMesureThermique from './previewReportMesureThermique';
import PreviewReportStatus from './previewReportStatus';
import PreviewReportTestsFonctionnels from './previewReportTestsFonctionnels';
import PreviewReportTestsRegulation from './PreviewReportTestsRegulation';
import PreviewReportVerifPreli from './previewReportVerifPreli';
import { SignatureSection } from './signatureSection';

import { CTAReportData, CTATest } from '../type/type';

interface CTAReportPreviewProps {
  formData: CTAReportData;
  ctaTests: CTATest[];
  projects: Project[];
  onPrint: () => void;
  onExport: () => void;
}

export const CTAReportPreview = forwardRef<
  HTMLDivElement,
  CTAReportPreviewProps
>(({ formData, ctaTests, projects, onPrint, onExport }, ref) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'CONFORME':
      case 'REUSSI':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'NON_CONFORME':
      case 'ECHEC':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'ATTENTION_REQUISE':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'NON_APPLICABLE':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'EN_ATTENTE':
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const getWeatherLabel = (weather: string) => {
    const weatherLabels: Record<string, string> = {
      ensoleille: 'Ensoleillé',
      nuageux: 'Nuageux',
      pluvieux: 'Pluvieux',
      venteux: 'Venteux',
    };
    return weatherLabels[weather] || weather;
  };

  const getEquipmentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      VENTILATEUR: 'Ventilateur',
      BATTERIE: 'Batterie',
      FILTRE: 'Filtre',
      REGISTRE: 'Registre',
      SONDE: 'Sonde',
      VARIATEUR: 'Variateur',
      AUTRE: 'Autre',
    };
    return labels[type] || type;
  };

  return (
    <Card className="p-3 shadow-lg">
      <PreviewReportHeader onPrint={onPrint} onExport={onExport} />
      <CardContent className="p-0">
        {/* Contenu pour l'impression */}
        <div ref={ref} className="">
          {/* En-tête du rapport */}
          <PreviewReportHead
            title={formData.title}
            reportNumber={formData.reportNumber}
            date={formData.date}
            formatDate={formatDate}
          />

          {/* Informations générales */}
          <PreviewReportInformationsGenerales
            projectId={formData.projectId}
            projects={projects}
            getWeatherLabel={(weatherConditions: string | null) =>
              getWeatherLabel(weatherConditions || '')
            }
            weatherConditions={formData.weatherConditions}
            ambientTemp={Number(formData.ambientTemp) || null}
            notes={formData.notes}
          />

          {/* Informations CTA */}
          <PreviewReportInfoCta
            ctaName={formData.ctaName}
            location={formData.location}
            brand={formData.brand}
            model={formData.model}
            serialNumber={formData.serialNumber}
            technicalSpecs={formData.technicalSpecs}
          />

          {/* Tests CTA détaillés */}
          {ctaTests.map((test, index) => (
            <div key={index} className="page-break-before mb-8">
              <h3 className="section-title mb-6 border-b-2 pb-2 text-xl font-bold">
                RÉSULTATS DES TESTS
              </h3>

              {/* Statut global */}
              <PreviewReportStatus
                overallStatus={test.overallStatus}
                getStatusBadgeClass={getStatusBadgeClass}
              />

              {/* Vérifications préliminaires */}
              <PreviewReportVerifPreli
                preCommissioningChecks={test.preCommissioningChecks}
              />

              {/* Mesures aérauliques */}
              <PreviewReportMesureAero
                airFlowMeasurements={test.airFlowMeasurements}
              />

              {/* Mesures thermiques */}
              <PreviewReportMesureThermique
                thermalMeasurements={test.thermalMeasurements}
              />

              {/* Mesures électriques */}
              <PreviewReportMesuresElec
                electricalMeasurements={test.typescriptelectricalMeasurements}
              />
              {/* Mesures acoustiques */}
              <PreviewReportMesuresAcoustiques
                acousticMeasurements={test.acousticMeasurements}
              />
              {/* Tests fonctionnels */}
              <PreviewReportTestsFonctionnels
                functionalTests={test.functionalTests}
                getStatusBadgeClass={getStatusBadgeClass}
              />

              {/* Tests de régulation */}
              <PreviewReportTestsRegulation
                controlTests={test.controlTests}
                getStatusBadgeClass={getStatusBadgeClass}
              />

              {/* Liste des équipements */}
              <PreviewReportEquipmentList
                equipmentList={test.equipmentList}
                getEquipmentTypeLabel={getEquipmentTypeLabel}
              />

              {/* Documents joints */}
              <PreviewReportAttachments attachments={test.attachments} />

              {/* Commentaires et recommandations */}
              {(test.comments || test.recommendations) && (
                <div className="comments-section rounded-r-lg border-l-4 border-yellow-400 bg-yellow-50 p-6">
                  {test.comments && (
                    <div className="mb-4">
                      <h4 className="mb-2 text-base font-semibold text-gray-800">
                        Commentaires
                      </h4>
                      <p className="text-sm whitespace-pre-wrap text-gray-700">
                        {test.comments}
                      </p>
                    </div>
                  )}
                  {test.recommendations && (
                    <div>
                      <h4 className="mb-2 text-base font-semibold text-gray-800">
                        Recommandations
                      </h4>
                      <p className="text-sm whitespace-pre-wrap text-gray-700">
                        {test.recommendations}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Signatures */}
          <SignatureSection 
/>

          {/* Footer */}
          <div className="print-footer mt-12 border-t border-gray-200 pt-6 text-center text-xs text-gray-500">
            <p className="font-medium">
              Document généré le {new Date().toLocaleDateString('fr-FR')}
            </p>
            <p>
              © {new Date().getFullYear()} - Rapport de mise en service CTA
            </p>
            <p className="mt-2 text-gray-400">
              Ce document est conforme aux normes DTU 68.3 et EN 12599
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

CTAReportPreview.displayName = 'CTAReportPreview';
