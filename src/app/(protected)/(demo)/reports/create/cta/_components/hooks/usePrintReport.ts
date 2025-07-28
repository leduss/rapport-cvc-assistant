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
        margin: 15mm;
      }
      
      @media print {
        body {
          font-family: 'Arial', sans-serif;
          font-size: 11px;
          line-height: 1.5;
          color: #000;
          background: white;
        }
        
        .print-header {
          border-bottom: 3px solid #000;
          padding-bottom: 20px;
          margin-bottom: 30px;
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
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin: 20px 0;
        }
        
        .info-section {
          margin-bottom: 30px;
        }
        
        .info-section h3 {
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
          color: #000;
          margin-bottom: 15px;
          padding-bottom: 5px;
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
        
        .section-title {
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
          color: #000;
          margin: 30px 0 15px 0;
          border-bottom: 2px solid #000;
          padding-bottom: 5px;
          page-break-after: avoid;
        }
        
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

        .bg-blue-100 {
          background-color: #dbeafe !important;
          color: #1e40af !important;
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
        
        .bg-gray-100 {
          background-color: #e9ecef !important;
          color: #495057 !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
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
        
        .page-break-inside-avoid {
          page-break-inside: avoid;
        }
        
        /* Masquer les éléments non nécessaires */
        .no-print {
          display: none !important;
        }
        
        /* Forcer les sauts de page si nécessaire */
        .page-break-before {
          page-break-before: always;
        }
        
        .page-break-after {
          page-break-after: always;
        }
      }
    `,
  });

  return { printRef, handlePrint };
};
