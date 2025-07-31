import React from 'react';

import { MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

const InterventionCard = ({ intervention }) => (
  <div className="flex items-center space-x-3 rounded-lg border p-3">
    <div className="flex-shrink-0">
      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
    </div>
    <div className="min-w-0 flex-1">
      <div className="flex items-center justify-between">
        <p className="truncate text-sm font-medium">{intervention.equipment}</p>
        <Badge variant="outline" className="text-xs">
          {intervention.time}
        </Badge>
      </div>
      <p className="text-muted-foreground text-xs">{intervention.project}</p>
      <div className="mt-1 flex items-center">
        <MapPin className="text-muted-foreground mr-1 h-3 w-3" />
        <span className="text-muted-foreground text-xs">
          {intervention.type}
        </span>
      </div>
    </div>
  </div>
);

export default InterventionCard;
