import React from 'react';

import { Clock } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

const ReportCard = ({ report }) => (
  <div className="flex items-center space-x-3 p-3 border rounded-lg">
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium truncate">{report.title}</p>
        <Badge
          variant={report.priority === 'high' ? 'destructive' : 'secondary'}
        >
          {report.priority}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground">{report.project}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-blue-600 h-1.5 rounded-full"
            style={{ width: `${report.progress}%` }}
          ></div>
        </div>
        <span className="text-xs text-muted-foreground ml-2">
          {report.progress}%
        </span>
      </div>
      <div className="flex items-center mt-1">
        <Clock className="h-3 w-3 text-muted-foreground mr-1" />
        <span className="text-xs text-muted-foreground">
          Échéance: {report.dueDate}
        </span>
      </div>
    </div>
  </div>
);

export default ReportCard;
