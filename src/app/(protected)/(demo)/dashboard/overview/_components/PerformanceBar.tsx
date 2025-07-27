import React from 'react';

const PerformanceBar = ({ equipment, avgTime, unit, tests }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{equipment}</span>
      <span className="text-sm text-muted-foreground">
        {avgTime} {unit}
      </span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-600 h-2 rounded-full"
        style={{ width: `${Math.min((avgTime / 5) * 100, 100)}%` }}
      ></div>
    </div>
    <div className="text-xs text-muted-foreground">{tests} tests effectués</div>
  </div>
);

export default PerformanceBar;
