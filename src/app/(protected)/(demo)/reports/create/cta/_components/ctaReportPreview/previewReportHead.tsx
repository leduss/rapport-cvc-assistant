import React from 'react';

interface PreviewReportHeadProps {
  title: string;
  reportNumber: string;
  date: string;
  formatDate: (date: string) => string;
}

const PreviewReportHead = ({
  title,
  reportNumber,
  date,
  formatDate,
}: PreviewReportHeadProps) => {
  return (
    <div className="print-header mb-8 border-b-4 border-blue-600 pb-6">
      <h1 className="print-title mb-4 text-center text-4xl font-bold">
        RAPPORT DE MISE EN SERVICE
      </h1>
      <h2 className="print-subtitle mb-4 text-center text-2xl font-semibold">
        {title || 'Titre du rapport'}
      </h2>
      <div className="flex justify-between text-sm font-medium text-gray-600">
        <span className="rounded bg-gray-100 px-3 py-1">
          Rapport N° {reportNumber}
        </span>
        <span className="rounded bg-gray-100 px-3 py-1">
          {formatDate(date)}
        </span>
      </div>
    </div>
  );
};

export default PreviewReportHead;
