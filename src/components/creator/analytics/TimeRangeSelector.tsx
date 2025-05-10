
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download } from 'lucide-react';

interface TimeRangeSelectorProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  exportAnalytics: () => void;
}

const TimeRangeSelector = ({ timeRange, setTimeRange, exportAnalytics }: TimeRangeSelectorProps) => {
  return (
    <div className="flex justify-between items-center">
      <TabsList className="bg-navy/20 border border-white/10">
        <TabsTrigger value="daily">Daily</TabsTrigger>
        <TabsTrigger value="weekly">Weekly</TabsTrigger>
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
      </TabsList>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-navy/20 border-white/10 hover:bg-navy/30"
        onClick={exportAnalytics}
      >
        <Download className="h-4 w-4 mr-2" />
        Export Data
      </Button>
    </div>
  );
};

export default TimeRangeSelector;
