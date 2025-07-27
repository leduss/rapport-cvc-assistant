import React from 'react';

import { TrendingDown, TrendingUp } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MetricCard = ({
  title,
  value,
  unit = '',
  change,
  period,
  icon: Icon,
  color,
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <Icon className={`h-4 w-4 text-${color}-600`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {value}
        {unit}
      </div>
      <div className="flex items-center text-xs text-muted-foreground">
        {change > 0 ? (
          <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
        ) : (
          <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
        )}
        <span className={change > 0 ? 'text-green-600' : 'text-red-600'}>
          {change > 0 ? '+' : ''}
          {change}
        </span>
        <span className="ml-1">{period}</span>
      </div>
    </CardContent>
  </Card>
);

export default MetricCard;
