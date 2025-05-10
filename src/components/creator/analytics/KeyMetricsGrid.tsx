
import React from 'react';
import MetricCard from './MetricCard';
import { Users, Calendar, ArrowRight } from 'lucide-react';

const KeyMetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard 
        icon={<Users className="h-4 w-4 text-mint" />}
        title="Total Claims"
        value="67"
        change="+12.5%"
        trend="up"
        description="of 100 maximum supply"
      />
      
      <MetricCard 
        icon={<Calendar className="h-4 w-4 text-mint" />}
        title="Daily Average"
        value="9.6"
        change="-3.2%"
        trend="down"
        description="claims per day"
      />
      
      <MetricCard 
        icon={<ArrowRight className="h-4 w-4 text-mint" />}
        title="Conversion"
        value="58.3%"
        change="+5.7%"
        trend="up"
        description="scan to claim ratio"
      />
    </div>
  );
};

export default KeyMetricsGrid;
