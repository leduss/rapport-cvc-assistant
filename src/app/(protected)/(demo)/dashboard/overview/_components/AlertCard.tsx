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
        ? `flex items-start space-x-3 p-3 border rounded-lg ${bg}`
        : 'flex items-start space-x-3 p-3 border rounded-lg'
    }
  >
    {type === 'warning' && (
      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
    )}
    {type === 'info' && <Info className="h-4 w-4 text-blue-500 mt-0.5" />}
    {type === 'success' && (
      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
    )}
    <div className="flex-1 min-w-0">
      <p className={color ? `text-sm text-${color}` : 'text-sm font-medium'}>
        {emoji && <span className="mr-1">{emoji}</span>}
        {message}
      </p>
      {project && <p className="text-xs text-muted-foreground">{project}</p>}
      {date && <p className="text-xs text-muted-foreground">{date}</p>}
    </div>
  </div>
);

export default AlertCard;
