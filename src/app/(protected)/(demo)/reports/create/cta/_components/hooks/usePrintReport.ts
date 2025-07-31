import { useRef } from 'react';

import { useReactToPrint } from 'react-to-print';

export const usePrintReport = (reportNumber?: string) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Rapport_CTA_${reportNumber || 'DRAFT'}_${new Date().toISOString().split('T')[0]}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 10mm;
      }
      
      @media print {
        body {
          font-family: 'Arial', sans-serif;
          font-size: 9px;
          line-height: 1;
          color: #000;
          background: white;
        }
        
        /* En-tête du rapport */
        .print-header {
          border-bottom: 3px solid blue;
          padding-bottom: 20px;
          margin-bottom: 30px;
          page-break-after: avoid;
        }
        
        .print-title {
          font-size: 24px;
          font-weight: bold;
          color: #000;
          margin-bottom: 10px;
          text-align: center;
        }
        
        .print-subtitle {
          font-size: 18px;
          color: #333;
          margin-bottom: 15px;
          text-align: center;
        }
        
        /* Grilles d'information */
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }
        
        .info-section {
          page-break-inside: avoid;
        }
        
        .info-section h3 {
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
          color: #000;
          border-bottom: 2px solid #000;
        }
        
        .info-section h4 {
          font-size: 12px;
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }
        
        .info-section p {
          margin: 3px 0;
          font-size: 11px;
          color: #333;
        }
        
        /* Titres de sections */
        .section-title {
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
          color: #000;
          border-bottom: 2px solid #000;
          padding-bottom: 5px;
          page-break-after: avoid;
        }
        
        /* Tableaux de mesures */
        .measurements-table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
          font-size: 10px;
          page-break-inside: avoid;
        }
        
        .measurements-table th,
        .measurements-table td {
          border: 1px solid #333;
          padding: 6px 8px;
          text-align: left;
        }
        
        .measurements-table th {
          background-color: #f0f0f0 !important;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 9px;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        .measurements-table td {
          background-color: white;
        }
        
        .measurements-table tr:nth-child(even) td {
          background-color: #f9f9f9 !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        /* Sous-sections dans les tableaux */
        .measurements-table td[colspan] {
          background-color: #e0e0e0 !important;
          font-weight: bold;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        /* Badges de statut */
        .status-badge {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 3px;
          font-size: 10px;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .bg-green-100 {
          background-color: #d4edda !important;
          color: #155724 !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        .bg-red-100 {
          background-color: #f8d7da !important;
          color: #721c24 !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        .bg-orange-100 {
          background-color: #fff3cd !important;
          color: #856404 !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        .bg-blue-100 {
          background-color: #dbeafe !important;
          color: #1e40af !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        .bg-gray-100 {
          background-color: #e9ecef !important;
          color: #495057 !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        .bg-gray-50 {
          background-color: #f8f9fa !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        /* Cases à cocher */
        .checkbox-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin: 10px 0;
        }
        
        .checkbox-item {
          display: flex;
          align-items: center;
          font-size: 10px;
          page-break-inside: avoid;
        }
        
        .checkbox {
          width: 14px;
          height: 14px;
          border: 1px solid #333;
          margin-right: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          background-color: white;
        }
        
        .checkbox.checked {
          background-color: #28a745 !important;
          color: white;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        /* Section commentaires */
        .comments-section {
          background-color: #f8f9fa !important;
          padding: 12px;
          border-left: 4px solid #333;
          margin: 20px 0;
          page-break-inside: avoid;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        .comments-section h4 {
          font-size: 11px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .comments-section p {
          font-size: 10px;
          white-space: pre-wrap;
        }
        
        /* Section signatures */
        .signature-section {
          margin-top: 50px;
          border-top: 2px solid #333;
          padding-top: 30px;
          page-break-inside: avoid;
        }
        
        .signature-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
        }
        
        .signature-block h4 {
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 40px;
        }
        
        .signature-line {
          border-bottom: 1px solid #333;
          margin: 10px 0;
          min-height: 30px;
        }
        
        /* Documents joints */
        .attachments-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 10px;
        }
        
        .attachment-item {
          border: 1px solid #ddd;
          padding: 6px;
          border-radius: 4px;
          font-size: 9px;
          page-break-inside: avoid;
        }
        
        .attachment-item p {
          margin: 2px 0;
        }
        
        /* Gestion des sauts de page */
        .page-break-inside-avoid {
          page-break-inside: avoid;
        }
        
        .page-break-before {
          page-break-before: always;
        }
        
        .page-break-after {
          page-break-after: always;
        }
        
        /* Masquer les éléments non nécessaires */
        .no-print {
          display: none !important;
        }
        
        /* Footer */
        .print-footer {
          text-align: center;
          font-size: 9px;
          color: #666;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ccc;
        }
        
        /* Optimisations pour l'impression */
        * {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        /* Éviter les lignes orphelines */
        p, li, h1, h2, h3, h4, h5, h6 {
          orphans: 3;
          widows: 3;
        }
        
        /* Garder les titres avec leur contenu */
        h1, h2, h3, h4, h5, h6 {
          page-break-after: avoid;
        }
        
        /* Images et graphiques */
        img {
          max-width: 100%;
          page-break-inside: avoid;
        }
        
        /* Bordures et marges */
        .border {
          border-color: #333 !important;
        }
        
        .border-b-2 {
          border-bottom: 2px solid #333 !important;
        }
        
        /* Texte */
        .text-xs {
          font-size: 9px;
        }
        
        .text-sm {
          font-size: 10px;
        }
        
        .text-base {
          font-size: 11px;
        }
        
        .font-semibold {
          font-weight: 600;
        }
        
        .font-bold {
          font-weight: bold;
        }
        
        .font-medium {
          font-weight: 500;
        }
        
        /* Espacement */
        .mt-1 { margin-top: 0.25rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mt-3 { margin-top: 0.75rem; }
        .mt-4 { margin-top: 1rem; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-3 { margin-bottom: 0.75rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        
        /* Colonnes spécifiques */
        .grid-cols-2 {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        
        .gap-2 {
          gap: 0.5rem;
        }
        
        /* Alignement */
        .text-center {
          text-align: center;
        }
        
        .text-gray-600 {
          color: #4b5563;
        }
        
        .text-gray-500 {
          color: #6b7280;
        }
        
        /* Bordures arrondies (pas d'effet en impression mais garde la cohérence) */
        .rounded {
          border-radius: 0.25rem;
        }
        
        /* Styles spécifiques pour les équipements */
        .equipment-table {
          font-size: 9px;
        }
        
        .equipment-table td {
          padding: 4px 6px;
        }
        
        /* Caractéristiques techniques */
        .tech-specs {
          font-size: 9px;
          margin-top: 8px;
          padding: 8px;
          background-color: #f9f9f9 !important;
          border: 1px solid #ddd;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        /* Numérotation automatique des pages */
        @page {
          @bottom-right {
            content: "Page " counter(page) " / " counter(pages);
            font-size: 9px;
            color: #666;
          }
        }
      }
    `,

    onBeforePrint: () => {
      // Optionnel : traitement avant impression
      console.log("Préparation de l'impression du rapport CTA...");
      return Promise.resolve();
    },
    onAfterPrint: () => {
      console.log('Impression du rapport CTA terminée');
    },
  });

  return { printRef, handlePrint };
};
