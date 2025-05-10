
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ProgressMetric from './ProgressMetric';
import { LocationDataPoint } from '@/hooks/useAnalytics';

interface TokenMetricsCardProps {
  locationData: LocationDataPoint[];
}

const TokenMetricsCard = ({ locationData }: TokenMetricsCardProps) => {
  return (
    <Card className="border-white/10 bg-gradient-to-br from-navy-dark/80 to-navy/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Token Metrics</CardTitle>
        <CardDescription>Performance indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-white/10">
          <ProgressMetric 
            label="Claim Rate"
            value="67%"
            progress={67}
            color="bg-purple"
          />
          
          <ProgressMetric 
            label="Scan-to-Claim"
            value="58.3%"
            progress={58.3}
            color="bg-mint"
          />
          
          <div className="py-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">Mobile vs Desktop</span>
              <span className="text-sm font-medium">82% / 18%</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-1.5 flex overflow-hidden">
              <div className="bg-mint h-1.5" style={{ width: "82%" }}></div>
              <div className="bg-amber h-1.5" style={{ width: "18%" }}></div>
            </div>
          </div>
          
          <div className="pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm">Top Locations</span>
              <span className="text-sm">Claims</span>
            </div>
            <div className="space-y-2">
              {locationData.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{item.location}</span>
                  <span className="text-sm">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenMetricsCard;
