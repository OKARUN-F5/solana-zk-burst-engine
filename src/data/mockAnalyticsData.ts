
import { ClaimDataPoint, WalletDataPoint, LocationDataPoint, ConversionStep, DeviceDataPoint } from '@/hooks/useAnalytics';

// Mock data for analytics dashboard
export const fullDataset: ClaimDataPoint[] = [
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

export const walletData: WalletDataPoint[] = [
  { name: 'First-time', value: 42 },
  { name: 'Returning', value: 25 },
];

export const conversionData: ConversionStep[] = [
  { name: 'QR Scans', value: 115 },
  { name: 'Token Views', value: 84 },
  { name: 'Claims', value: 67 },
];

export const locationData: LocationDataPoint[] = [
  { location: "San Francisco, CA", count: 24 },
  { location: "New York, NY", count: 18 },
  { location: "Austin, TX", count: 10 },
];

export const deviceData: DeviceDataPoint[] = [
  { device: 'Mobile', percentage: 82 },
  { device: 'Desktop', percentage: 18 },
];
