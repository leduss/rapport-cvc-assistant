import React from 'react';

const PerformanceBar = ({ equipment, avgTime, unit, tests }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{equipment}</span>
      <span className="text-muted-foreground text-sm">
        {avgTime} {unit}
      </span>
    </div>
    <div className="h-2 w-full rounded-full bg-gray-200">
      <div
        className="h-2 rounded-full bg-blue-600"
        style={{ width: `${Math.min((avgTime / 5) * 100, 100)}%` }}
      ></div>
    </div>
    <div className="text-muted-foreground text-xs">{tests} tests effectués</div>
  </div>
);

export default PerformanceBar;
