
import React from 'react';
import { Card } from '@/components/ui/card';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  description: string;
}

const MetricCard = ({ icon, title, value, change, trend, description }: MetricCardProps) => (
  <Card className="border-white/10 bg-gradient-to-br from-navy-dark/80 to-navy/60 backdrop-blur-sm p-6">
    <div className="flex items-center gap-3 mb-1.5">
      <div className="bg-navy/40 p-1.5 rounded-full">
        {icon}
      </div>
      <span className="text-sm text-muted-foreground">{title}</span>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-medium">{value}</span>
      <span className={`text-xs ${trend === 'up' ? 'text-mint' : 'text-amber'}`}>
        {change} {trend === 'up' ? '↑' : '↓'}
      </span>
    </div>
    <div className="text-xs text-muted-foreground mt-1">
      {description}
    </div>
  </Card>
);

export default MetricCard;
