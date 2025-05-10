
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import DateRangePicker from './DateRangePicker';

interface TimeRangeSelectorProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  exportAnalytics: () => void;
}

const TimeRangeSelector = ({ 
  timeRange, 
  setTimeRange, 
  dateRange, 
  onDateRangeChange, 
  exportAnalytics 
}: TimeRangeSelectorProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex flex-wrap gap-4 items-center">
        <TabsList className="bg-navy/20 border border-white/10">
          <TabsTrigger value="daily" onClick={() => onDateRangeChange(undefined)}>Daily</TabsTrigger>
          <TabsTrigger value="weekly" onClick={() => onDateRangeChange(undefined)}>Weekly</TabsTrigger>
          <TabsTrigger value="monthly" onClick={() => onDateRangeChange(undefined)}>Monthly</TabsTrigger>
        </TabsList>
        
        <DateRangePicker 
          dateRange={dateRange} 
          onDateRangeChange={onDateRangeChange} 
          className="min-w-[240px]"
        />
      </div>
      
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
