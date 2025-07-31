import React from 'react';

import { Card } from '@/components/ui/card';

interface PreviewReportStatusProps {
  overallStatus: string;
  getStatusBadgeClass: (status: string) => string;
}

const PreviewReportStatus = ({
  overallStatus,
  getStatusBadgeClass,
}: PreviewReportStatusProps) => {
  return (
    <Card className="mb-6 px-8">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">Statut global:</span>
        <span
          className={`rounded-full border px-4 py-2 text-sm font-bold ${getStatusBadgeClass(overallStatus)}`}
        >
          {overallStatus.replace(/_/g, ' ')}
        </span>
      </div>
    </Card>
  );
};

export default PreviewReportStatus;
