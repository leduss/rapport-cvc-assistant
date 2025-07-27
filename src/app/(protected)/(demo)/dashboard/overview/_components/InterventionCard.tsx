import React from 'react';

import { MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

const InterventionCard = ({ intervention }) => (
  <div className="flex items-center space-x-3 p-3 border rounded-lg">
    <div className="flex-shrink-0">
      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium truncate">{intervention.equipment}</p>
        <Badge variant="outline" className="text-xs">
          {intervention.time}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground">{intervention.project}</p>
      <div className="flex items-center mt-1">
        <MapPin className="h-3 w-3 text-muted-foreground mr-1" />
        <span className="text-xs text-muted-foreground">
          {intervention.type}
        </span>
      </div>
    </div>
  </div>
);

export default InterventionCard;
