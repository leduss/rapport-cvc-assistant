import React from 'react';

import { Clock } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

const ReportCard = ({ report }) => (
  <div className="flex items-center space-x-3 rounded-lg border p-3">
    <div className="min-w-0 flex-1">
      <div className="flex items-center justify-between">
        <p className="truncate text-sm font-medium">{report.title}</p>
        <Badge
          variant={report.priority === 'high' ? 'destructive' : 'secondary'}
        >
          {report.priority}
        </Badge>
      </div>
      <p className="text-muted-foreground text-xs">{report.project}</p>
      <div className="mt-2 flex items-center justify-between">
        <div className="h-1.5 w-full rounded-full bg-gray-200">
          <div
            className="h-1.5 rounded-full bg-blue-600"
            style={{ width: `${report.progress}%` }}
          ></div>
        </div>
        <span className="text-muted-foreground ml-2 text-xs">
          {report.progress}%
        </span>
      </div>
      <div className="mt-1 flex items-center">
        <Clock className="text-muted-foreground mr-1 h-3 w-3" />
        <span className="text-muted-foreground text-xs">
          Échéance: {report.dueDate}
        </span>
      </div>
    </div>
  </div>
);

export default ReportCard;
