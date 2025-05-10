
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { DateRange } from 'react-day-picker';
import { isWithinInterval } from 'date-fns';
import { 
  fullDataset,
  walletData,
  conversionData,
  locationData,
  deviceData
} from '@/data/mockAnalyticsData';

// Define data types for analytics
export interface ClaimDataPoint {
  date: string;
  claims: number;
  views: number;
  projected?: boolean;
}

export interface WalletDataPoint {
  name: string;
  value: number;
}

export interface LocationDataPoint {
  location: string;
  count: number;
}

export interface ConversionStep {
  name: string;
  value: number;
}

export interface DeviceDataPoint {
  device: string;
  percentage: number;
}

export const useAnalytics = () => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState<string>("daily");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  
  // Filter data based on date range if set
  const claimData: ClaimDataPoint[] = dateRange?.from 
    ? fullDataset.filter(item => {
        const itemDate = new Date(`2025 ${item.date}`);
        if (dateRange.from && dateRange.to) {
          return isWithinInterval(itemDate, {
            start: dateRange.from,
            end: dateRange.to
          });
        } else if (dateRange.from) {
          return itemDate >= dateRange.from;
        }
        return true;
      })
    : fullDataset.slice(-7); // Default to last 7 days if no date range
  
  // Export analytics data
  const exportAnalytics = () => {
    toast({
      title: "Analytics exported",
      description: "Your analytics data has been exported as a CSV file.",
      duration: 3000,
    });
    
    // In a real app, this would generate and download a CSV file
    console.log("Exporting analytics data...");
  };
  
  // Update time range
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    // Reset date range when switching to predefined timeframe
    setDateRange(undefined);
  };
  
  // Update date range
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    // When a custom date range is selected, set timeRange to "custom"
    if (range?.from) {
      setTimeRange("custom");
    }
  };
  
  return {
    timeRange,
    setTimeRange: handleTimeRangeChange,
    dateRange,
    setDateRange: handleDateRangeChange,
    claimData,
    walletData,
    conversionData,
    locationData,
    deviceData,
    exportAnalytics
  };
};
