
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useAnalytics } from '@/hooks/useAnalytics';

// Import refactored components
import KeyMetricsGrid from './analytics/KeyMetricsGrid';
import TimeRangeSelector from './analytics/TimeRangeSelector';
import ClaimsViewsChart from './analytics/ClaimsViewsChart';
import BarChartDisplay from './analytics/BarChartDisplay';
import EmptyMonthlyChart from './analytics/EmptyMonthlyChart';
import UserBreakdownChart from './analytics/UserBreakdownChart';
import TokenMetricsCard from './analytics/TokenMetricsCard';
import EngagementFunnelChart from './analytics/EngagementFunnelChart';
import PredictiveAnalyticsChart from './analytics/PredictiveAnalyticsChart';

const AnalyticsDashboard = () => {
  const {
    timeRange,
    setTimeRange,
    claimData,
    walletData,
    conversionData,
    locationData,
    exportAnalytics
  } = useAnalytics();
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-medium text-gradient-blue-purple mb-2">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Track performance and engagement of your token distribution</p>
      </div>
      
      {/* Key Metrics */}
      <KeyMetricsGrid />
      
      {/* Time Range Selector */}
      <Tabs defaultValue={timeRange} onValueChange={setTimeRange} className="space-y-6">
        <TimeRangeSelector 
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          exportAnalytics={exportAnalytics}
        />
        
        {/* Claims & Views Chart */}
        <TabsContent value="daily" className="mt-0">
          <ClaimsViewsChart 
            data={claimData}
            title="Daily Claims & Views"
            description="Token engagement over time"
          />
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-0">
          <BarChartDisplay 
            data={claimData.filter((_, i) => i % 3 === 0)}
            title="Weekly Overview"
            description="Aggregate data by week"
          />
        </TabsContent>
        
        <TabsContent value="monthly" className="mt-0">
          <EmptyMonthlyChart />
        </TabsContent>
      </Tabs>
      
      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Breakdown */}
        <UserBreakdownChart data={walletData} />
        
        {/* Token Metrics */}
        <TokenMetricsCard locationData={locationData} />
      </div>
      
      {/* Engagement Funnel */}
      <EngagementFunnelChart data={conversionData} />
      
      {/* Predictive Analytics */}
      <PredictiveAnalyticsChart data={claimData} />
    </div>
  );
};

export default AnalyticsDashboard;
