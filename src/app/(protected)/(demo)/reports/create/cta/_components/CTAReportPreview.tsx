import React, { forwardRef } from 'react';

import { Project } from '@prisma/client';
import { Download, Eye, Printer } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { CTAReportData, CTATest } from './type/type';

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
        return 'bg-green-100 text-green-800';
      case 'NON_CONFORME':
      case 'ECHEC':
        return 'bg-red-100 text-red-800';
      case 'ATTENTION_REQUISE':
        return 'bg-orange-100 text-orange-800';
      case 'NON_APPLICABLE':
        return 'bg-blue-100 text-blue-800';
      case 'EN_ATTENTE':
      default:
        return 'bg-gray-100 text-gray-800';
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Eye className="mr-2 h-5 w-5" />
          Aperçu du rapport CTA
        </CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span>Prévisualisation avant génération du PDF final</span>
          <div className="flex space-x-2 no-print">
            <Button variant="outline" size="sm" onClick={onPrint}>
              <Printer className="mr-2 h-4 w-4" />
              Imprimer PDF
            </Button>
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="mr-2 h-4 w-4" />
              Export JSON
            </Button>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Contenu pour l'impression */}
        <div ref={ref} className="space-y-8 p-4">
          {/* En-tête du rapport */}
          <div className="print-header">
            <h1 className="print-title text-3xl font-bold mb-4">
              RAPPORT DE MISE EN SERVICE CTA
            </h1>
            <h2 className="print-subtitle text-xl font-semibold mb-2">
              {formData.title || 'Titre du rapport'}
            </h2>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Rapport N° {formData.reportNumber}</span>
              <span>{formatDate(formData.date)}</span>
            </div>
          </div>

          {/* Informations générales */}
          <div className="info-section">
            <h3 className="section-title">INFORMATIONS GÉNÉRALES</h3>
            <div className="info-grid">
              <div>
                <h4 className="font-semibold text-sm mb-2">Projet</h4>
                <p className="text-sm">
                  {projects.find((p) => p.id === formData.projectId)?.name ||
                    'Non spécifié'}
                </p>
                <p className="text-sm text-gray-600">
                  {projects.find((p) => p.id === formData.projectId)?.client ||
                    ''}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">
                  Conditions d&#39;intervention
                </h4>
                <p className="text-sm">
                  Météo:{' '}
                  {getWeatherLabel(formData.weatherConditions) ||
                    'Non renseignée'}
                </p>
                <p className="text-sm">
                  Température ambiante:{' '}
                  {formData.ambientTemp ? `${formData.ambientTemp}°C` : 'N/A'}
                </p>
              </div>
            </div>
            {formData.notes && (
              <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2">Notes générales</h4>
                <p className="text-sm whitespace-pre-wrap">{formData.notes}</p>
              </div>
            )}
          </div>

          {/* Informations CTA */}
          <div className="info-section">
            <h3 className="section-title">ÉQUIPEMENT CTA</h3>
            <div className="info-grid">
              <div>
                <p className="text-sm">
                  <span className="font-semibold">Nom/Référence:</span>{' '}
                  {formData.ctaName}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Localisation:</span>{' '}
                  {formData.location}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Marque:</span>{' '}
                  {formData.brand}
                </p>
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-semibold">Modèle:</span>{' '}
                  {formData.model}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">N° de série:</span>{' '}
                  {formData.serialNumber}
                </p>
              </div>
            </div>
            {formData.technicalSpecs && (
              <div className="mt-3">
                <p className="text-sm font-semibold">
                  Spécifications techniques:
                </p>
                <p className="text-sm whitespace-pre-wrap">
                  {formData.technicalSpecs}
                </p>
              </div>
            )}
          </div>

          {/* Tests CTA détaillés */}
          {ctaTests.map((test, index) => (
            <div key={index} className="page-break-before">
              <h3 className="section-title">RÉSULTATS DES TESTS</h3>

              {/* Statut global */}
              <div className="mb-4 flex items-center justify-between">
                <span className="font-semibold">Statut global:</span>
                <span
                  className={`status-badge ${getStatusBadgeClass(test.overallStatus)}`}
                >
                  {test.overallStatus.replace(/_/g, ' ')}
                </span>
              </div>

              {/* Vérifications préliminaires */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3">
                  1. Vérifications préliminaires
                </h4>
                <div className="checkbox-list">
                  <div className="checkbox-item">
                    <span
                      className={`checkbox ${test.preCommissioningChecks.visualInspection ? 'checked' : ''}`}
                    >
                      {test.preCommissioningChecks.visualInspection ? '✓' : ''}
                    </span>
                    Inspection visuelle générale
                  </div>
                  <div className="checkbox-item">
                    <span
                      className={`checkbox ${test.preCommissioningChecks.mechanicalConnections ? 'checked' : ''}`}
                    >
                      {test.preCommissioningChecks.mechanicalConnections
                        ? '✓'
                        : ''}
                    </span>
                    Raccordements mécaniques
                  </div>
                  <div className="checkbox-item">
                    <span
                      className={`checkbox ${test.preCommissioningChecks.electricalConnections ? 'checked' : ''}`}
                    >
                      {test.preCommissioningChecks.electricalConnections
                        ? '✓'
                        : ''}
                    </span>
                    Raccordements électriques
                  </div>
                  <div className="checkbox-item">
                    <span
                      className={`checkbox ${test.preCommissioningChecks.filterInstallation ? 'checked' : ''}`}
                    >
                      {test.preCommissioningChecks.filterInstallation
                        ? '✓'
                        : ''}
                    </span>
                    Installation des filtres
                  </div>
                  <div className="checkbox-item">
                    <span
                      className={`checkbox ${test.preCommissioningChecks.damperOperation ? 'checked' : ''}`}
                    >
                      {test.preCommissioningChecks.damperOperation ? '✓' : ''}
                    </span>
                    Fonctionnement des registres
                  </div>
                  <div className="checkbox-item">
                    <span
                      className={`checkbox ${test.preCommissioningChecks.safetyDevices ? 'checked' : ''}`}
                    >
                      {test.preCommissioningChecks.safetyDevices ? '✓' : ''}
                    </span>
                    Dispositifs de sécurité
                  </div>
                </div>
              </div>

              {/* Mesures aérauliques */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3">
                  2. Mesures aérauliques
                </h4>
                <table className="measurements-table">
                  <thead>
                    <tr>
                      <th>Paramètre</th>
                      <th>Valeur mesurée</th>
                      <th>Unité</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Débit soufflage</td>
                      <td>{test.airFlowMeasurements.supplyAirFlow || 'N/A'}</td>
                      <td>m³/h</td>
                    </tr>
                    <tr>
                      <td>Débit reprise</td>
                      <td>{test.airFlowMeasurements.returnAirFlow || 'N/A'}</td>
                      <td>m³/h</td>
                    </tr>
                    <tr>
                      <td>Débit extraction</td>
                      <td>
                        {test.airFlowMeasurements.exhaustAirFlow || 'N/A'}
                      </td>
                      <td>m³/h</td>
                    </tr>
                    <tr>
                      <td>Débit air neuf</td>
                      <td>
                        {test.airFlowMeasurements.outsideAirFlow || 'N/A'}
                      </td>
                      <td>m³/h</td>
                    </tr>
                    <tr>
                      <td>Pression soufflage</td>
                      <td>
                        {test.airFlowMeasurements.supplyPressure || 'N/A'}
                      </td>
                      <td>Pa</td>
                    </tr>
                    <tr>
                      <td>Pression reprise</td>
                      <td>
                        {test.airFlowMeasurements.returnPressure || 'N/A'}
                      </td>
                      <td>Pa</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mesures thermiques */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3">
                  3. Mesures thermiques
                </h4>
                <table className="measurements-table">
                  <thead>
                    <tr>
                      <th>Point de mesure</th>
                      <th>Température (°C)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Température soufflage</td>
                      <td>{test.thermalMeasurements.supplyAirTemp || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td>Température reprise</td>
                      <td>{test.thermalMeasurements.returnAirTemp || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td>Température extérieure</td>
                      <td>
                        {test.thermalMeasurements.outsideAirTemp || 'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <td>Entrée batterie chaude</td>
                      <td>
                        {test.thermalMeasurements.heatingCoilInletTemp || 'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <td>Sortie batterie chaude</td>
                      <td>
                        {test.thermalMeasurements.heatingCoilOutletTemp ||
                          'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <td>Entrée batterie froide</td>
                      <td>
                        {test.thermalMeasurements.coolingCoilInletTemp || 'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <td>Sortie batterie froide</td>
                      <td>
                        {test.thermalMeasurements.coolingCoilOutletTemp ||
                          'N/A'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* NOUVEAU - Mesures électriques */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3">
                  4. Mesures électriques
                </h4>
                <table className="measurements-table">
                  <thead>
                    <tr>
                      <th>Paramètre</th>
                      <th>Valeur</th>
                      <th>Unité</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b-2">
                      <td colSpan={3} className="font-semibold bg-gray-50">
                        Tensions
                      </td>
                    </tr>
                    <tr>
                      <td>Tension L1-N</td>
                      <td>
                        {test.typescriptelectricalMeasurements.voltageL1N ||
                          'N/A'}
                      </td>
                      <td>V</td>
                    </tr>
                    <tr>
                      <td>Tension L2-N</td>
                      <td>
                        {test.typescriptelectricalMeasurements.voltageL2N ||
                          'N/A'}
                      </td>
                      <td>V</td>
                    </tr>
                    <tr>
                      <td>Tension L3-N</td>
                      <td>
                        {test.typescriptelectricalMeasurements.voltageL3N ||
                          'N/A'}
                      </td>
                      <td>V</td>
                    </tr>
                    <tr>
                      <td>Tension L1-L2</td>
                      <td>
                        {test.typescriptelectricalMeasurements.voltageL1L2 ||
                          'N/A'}
                      </td>
                      <td>V</td>
                    </tr>
                    <tr>
                      <td>Tension L2-L3</td>
                      <td>
                        {test.typescriptelectricalMeasurements.voltageL2L3 ||
                          'N/A'}
                      </td>
                      <td>V</td>
                    </tr>
                    <tr>
                      <td>Tension L3-L1</td>
                      <td>
                        {test.typescriptelectricalMeasurements.voltageL3L1 ||
                          'N/A'}
                      </td>
                      <td>V</td>
                    </tr>
                    <tr className="border-b-2">
                      <td colSpan={3} className="font-semibold bg-gray-50">
                        Intensités
                      </td>
                    </tr>
                    <tr>
                      <td>Courant L1</td>
                      <td>
                        {test.typescriptelectricalMeasurements.currentL1 ||
                          'N/A'}
                      </td>
                      <td>A</td>
                    </tr>
                    <tr>
                      <td>Courant L2</td>
                      <td>
                        {test.typescriptelectricalMeasurements.currentL2 ||
                          'N/A'}
                      </td>
                      <td>A</td>
                    </tr>
                    <tr>
                      <td>Courant L3</td>
                      <td>
                        {test.typescriptelectricalMeasurements.currentL3 ||
                          'N/A'}
                      </td>
                      <td>A</td>
                    </tr>
                    <tr className="border-b-2">
                      <td colSpan={3} className="font-semibold bg-gray-50">
                        Puissance et Protection
                      </td>
                    </tr>
                    <tr>
                      <td>Puissance totale</td>
                      <td>
                        {test.typescriptelectricalMeasurements.totalPower ||
                          'N/A'}
                      </td>
                      <td>kW</td>
                    </tr>
                    <tr>
                      <td>Cos φ</td>
                      <td>
                        {test.typescriptelectricalMeasurements.cosPhi || 'N/A'}
                      </td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>Fréquence</td>
                      <td>
                        {test.typescriptelectricalMeasurements.frequency ||
                          'N/A'}
                      </td>
                      <td>Hz</td>
                    </tr>
                    <tr>
                      <td>Résistance d&apos;isolement</td>
                      <td>
                        {test.typescriptelectricalMeasurements
                          .insulationResistance || 'N/A'}
                      </td>
                      <td>MΩ</td>
                    </tr>
                    <tr>
                      <td>Résistance de terre</td>
                      <td>
                        {test.typescriptelectricalMeasurements
                          .earthResistance || 'N/A'}
                      </td>
                      <td>Ω</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* NOUVEAU - Mesures acoustiques */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3">
                  5. Mesures acoustiques
                </h4>
                <table className="measurements-table">
                  <thead>
                    <tr>
                      <th>Point de mesure</th>
                      <th>Niveau sonore</th>
                      <th>Unité</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Niveau sonore machine</td>
                      <td>
                        {test.acousticMeasurements.soundLevelMachine || 'N/A'}
                      </td>
                      <td>dB(A)</td>
                    </tr>
                    <tr>
                      <td>Bruit ambiant</td>
                      <td>
                        {test.acousticMeasurements.soundLevelAmbient || 'N/A'}
                      </td>
                      <td>dB(A)</td>
                    </tr>
                    <tr>
                      <td>Bouche soufflage</td>
                      <td>
                        {test.acousticMeasurements.soundLevelSoufflage || 'N/A'}
                      </td>
                      <td>dB(A)</td>
                    </tr>
                    <tr>
                      <td>Bouche reprise</td>
                      <td>
                        {test.acousticMeasurements.soundLevelReprise || 'N/A'}
                      </td>
                      <td>dB(A)</td>
                    </tr>
                    <tr>
                      <td>Distance de mesure</td>
                      <td>
                        {test.acousticMeasurements.measurementDistance || 'N/A'}
                      </td>
                      <td>m</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Tests fonctionnels */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3">
                  6. Tests fonctionnels
                </h4>
                <table className="measurements-table">
                  <thead>
                    <tr>
                      <th>Test</th>
                      <th>Résultat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Démarrage/arrêt ventilateur</td>
                      <td
                        className={getStatusBadgeClass(
                          test.functionalTests.fanStartStop
                        )}
                      >
                        {test.functionalTests.fanStartStop.replace(/_/g, ' ')}
                      </td>
                    </tr>
                    <tr>
                      <td>Contrôle des registres</td>
                      <td
                        className={getStatusBadgeClass(
                          test.functionalTests.damperControl
                        )}
                      >
                        {test.functionalTests.damperControl.replace(/_/g, ' ')}
                      </td>
                    </tr>
                    <tr>
                      <td>Contrôle chauffage</td>
                      <td
                        className={getStatusBadgeClass(
                          test.functionalTests.heatingControl
                        )}
                      >
                        {test.functionalTests.heatingControl.replace(/_/g, ' ')}
                      </td>
                    </tr>
                    <tr>
                      <td>Contrôle refroidissement</td>
                      <td
                        className={getStatusBadgeClass(
                          test.functionalTests.coolingControl
                        )}
                      >
                        {test.functionalTests.coolingControl.replace(/_/g, ' ')}
                      </td>
                    </tr>
                    <tr>
                      <td>Surveillance filtres</td>
                      <td
                        className={getStatusBadgeClass(
                          test.functionalTests.filterMonitoring
                        )}
                      >
                        {test.functionalTests.filterMonitoring.replace(
                          /_/g,
                          ' '
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Arrêt d&#39;urgence</td>
                      <td
                        className={getStatusBadgeClass(
                          test.functionalTests.emergencyStop
                        )}
                      >
                        {test.functionalTests.emergencyStop.replace(/_/g, ' ')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Tests de régulation */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3">
                  7. Tests de régulation
                </h4>
                <table className="measurements-table">
                  <thead>
                    <tr>
                      <th>Test</th>
                      <th>Résultat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Régulation température</td>
                      <td
                        className={getStatusBadgeClass(
                          test.controlTests.temperatureControl
                        )}
                      >
                        {test.controlTests.temperatureControl.replace(
                          /_/g,
                          ' '
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Régulation humidité</td>
                      <td
                        className={getStatusBadgeClass(
                          test.controlTests.humidityControl
                        )}
                      >
                        {test.controlTests.humidityControl.replace(/_/g, ' ')}
                      </td>
                    </tr>
                    <tr>
                      <td>Régulation CO2</td>
                      <td
                        className={getStatusBadgeClass(
                          test.controlTests.co2Control
                        )}
                      >
                        {test.controlTests.co2Control.replace(/_/g, ' ')}
                      </td>
                    </tr>
                    <tr>
                      <td>Programmation horaire</td>
                      <td
                        className={getStatusBadgeClass(
                          test.controlTests.scheduleOperation
                        )}
                      >
                        {test.controlTests.scheduleOperation.replace(/_/g, ' ')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* NOUVEAU - Liste des équipements */}
              {test.equipmentList.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-sm mb-3">
                    8. Relevé des équipements
                  </h4>
                  <table className="measurements-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Désignation</th>
                        <th>Marque</th>
                        <th>Modèle</th>
                        <th>N° Série</th>
                      </tr>
                    </thead>
                    <tbody>
                      {test.equipmentList.map((equipment) => (
                        <tr key={equipment.id}>
                          <td>{equipment.type}</td>
                          <td>{equipment.designation}</td>
                          <td>{equipment.marque}</td>
                          <td>{equipment.modele}</td>
                          <td>{equipment.numeroSerie}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {test.equipmentList.some((eq) => eq.caracteristiques) && (
                    <div className="mt-2">
                      <p className="text-xs font-semibold">
                        Caractéristiques techniques :
                      </p>
                      {test.equipmentList
                        .filter((eq) => eq.caracteristiques)
                        .map((eq, idx) => (
                          <p key={idx} className="text-xs mt-1">
                            <span className="font-medium">
                              {eq.designation}:
                            </span>{' '}
                            {eq.caracteristiques}
                          </p>
                        ))}
                    </div>
                  )}
                </div>
              )}

              {/* NOUVEAU - Documents joints */}
              {test.attachments.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-sm mb-3">
                    9. Documents et photos joints
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {test.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="text-xs border p-2 rounded"
                      >
                        <p className="font-medium">
                          {attachment.type === 'PHOTO' ? '📷' : '📄'}{' '}
                          {attachment.name}
                        </p>
                        {attachment.description && (
                          <p className="text-gray-600 mt-1">
                            {attachment.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Commentaires et recommandations */}
              {(test.comments || test.recommendations) && (
                <div className="comments-section">
                  {test.comments && (
                    <div className="mb-3">
                      <h4 className="font-semibold text-sm mb-1">
                        Commentaires
                      </h4>
                      <p className="text-sm whitespace-pre-wrap">
                        {test.comments}
                      </p>
                    </div>
                  )}
                  {test.recommendations && (
                    <div>
                      <h4 className="font-semibold text-sm mb-1">
                        Recommandations
                      </h4>
                      <p className="text-sm whitespace-pre-wrap">
                        {test.recommendations}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Signatures */}
          <div className="signature-section">
            <h3 className="section-title">VALIDATION</h3>
            <div className="signature-grid">
              <div className="signature-block">
                <h4>Technicien</h4>
                <div className="signature-line"></div>
                <p className="text-xs text-gray-600 mt-1">Nom et signature</p>
                <p className="text-xs text-gray-600">Date: _______________</p>
              </div>
              <div className="signature-block">
                <h4>Client</h4>
                <div className="signature-line"></div>
                <p className="text-xs text-gray-600 mt-1">Nom et signature</p>
                <p className="text-xs text-gray-600">Date: _______________</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 mt-8 pt-4 border-t">
            <p>Document généré le {new Date().toLocaleDateString('fr-FR')}</p>
            <p>
              © {new Date().getFullYear()} - Rapport de mise en service CTA
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

CTAReportPreview.displayName = 'CTAReportPreview';
