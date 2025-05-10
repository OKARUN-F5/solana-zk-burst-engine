
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useAnalytics } from '@/hooks/useAnalytics';
import { format } from 'date-fns';

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
    dateRange,
    setDateRange,
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
      
      {/* Time Range Selector with Date Range Picker */}
      <Tabs defaultValue={timeRange} value={timeRange} onValueChange={setTimeRange} className="space-y-6">
        <TimeRangeSelector 
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
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
        
        {/* Custom Date Range Content */}
        <TabsContent value="custom" className="mt-0">
          <ClaimsViewsChart 
            data={claimData}
            title="Custom Date Range"
            description={`Data from ${dateRange?.from ? format(dateRange.from, "MMM d, y") : ""} to ${dateRange?.to ? format(dateRange.to, "MMM d, y") : "present"}`}
          />
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
