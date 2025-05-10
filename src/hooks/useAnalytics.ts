
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { DateRange } from 'react-day-picker';
import { addDays, format, isWithinInterval, subDays } from 'date-fns';

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
  
  // Original full dataset - in a real app, this would come from an API
  const fullDataset: ClaimDataPoint[] = [
    { date: 'May 5', claims: 3, views: 7 },
    { date: 'May 6', claims: 5, views: 8 },
    { date: 'May 7', claims: 2, views: 5 },
    { date: 'May 8', claims: 7, views: 12 },
    { date: 'May 9', claims: 4, views: 9 },
    { date: 'May 10', claims: 0, views: 2 },
    { date: 'May 11', claims: 12, views: 18 },
    { date: 'May 12', claims: 24, views: 38 },
    { date: 'May 13', claims: 15, views: 25 },
    { date: 'May 14', claims: 8, views: 15 },
    { date: 'May 15', claims: 5, views: 10 },
    { date: 'May 16', claims: 3, views: 7 },
  ];
  
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
  
  const walletData: WalletDataPoint[] = [
    { name: 'First-time', value: 42 },
    { name: 'Returning', value: 25 },
  ];
  
  const conversionData: ConversionStep[] = [
    { name: 'QR Scans', value: 115 },
    { name: 'Token Views', value: 84 },
    { name: 'Claims', value: 67 },
  ];
  
  const locationData: LocationDataPoint[] = [
    { location: "San Francisco, CA", count: 24 },
    { location: "New York, NY", count: 18 },
    { location: "Austin, TX", count: 10 },
  ];
  
  const deviceData: DeviceDataPoint[] = [
    { device: 'Mobile', percentage: 82 },
    { device: 'Desktop', percentage: 18 },
  ];
  
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
