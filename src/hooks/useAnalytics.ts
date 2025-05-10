
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

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
  
  // Mock data for demonstration
  const claimData: ClaimDataPoint[] = [
    { date: 'May 10', claims: 0, views: 2 },
    { date: 'May 11', claims: 12, views: 18 },
    { date: 'May 12', claims: 24, views: 38 },
    { date: 'May 13', claims: 15, views: 25 },
    { date: 'May 14', claims: 8, views: 15 },
    { date: 'May 15', claims: 5, views: 10 },
    { date: 'May 16', claims: 3, views: 7 },
  ];
  
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
  
  // Fetch data by time range
  // This would typically be an API call in a real application
  const fetchDataByTimeRange = (range: string) => {
    console.log(`Fetching data for ${range} time range...`);
    // In a real app, this would make an API call to get data for the selected time range
  };
  
  // Update time range
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    fetchDataByTimeRange(range);
  };
  
  return {
    timeRange,
    setTimeRange: handleTimeRangeChange,
    claimData,
    walletData,
    conversionData,
    locationData,
    deviceData,
    exportAnalytics
  };
};
