import React from 'react';

import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface AlertCardProps {
  type?: 'warning' | 'info' | 'success' | undefined;
  message: string;
  project?: string;
  date?: string;
  emoji?: string;
  color?: string; // ex: 'green-800'
  bg?: string; // ex: 'green-50'
}

const AlertCard = ({
  type,
  message,
  project = '',
  date,
  emoji,
  color,
  bg,
}: AlertCardProps) => (
  <div
    className={
      bg && color
        ? `flex items-start space-x-3 rounded-lg border p-3 ${bg}`
        : 'flex items-start space-x-3 rounded-lg border p-3'
    }
  >
    {type === 'warning' && (
      <AlertTriangle className="mt-0.5 h-4 w-4 text-orange-500" />
    )}
    {type === 'info' && <Info className="mt-0.5 h-4 w-4 text-blue-500" />}
    {type === 'success' && (
      <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
    )}
    <div className="min-w-0 flex-1">
      <p className={color ? `text-sm text-${color}` : 'text-sm font-medium'}>
        {emoji && <span className="mr-1">{emoji}</span>}
        {message}
      </p>
      {project && <p className="text-muted-foreground text-xs">{project}</p>}
      {date && <p className="text-muted-foreground text-xs">{date}</p>}
    </div>
  </div>
);

export default AlertCard;
