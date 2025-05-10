
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartPie } from 'lucide-react';

const EmptyMonthlyChart = () => {
  return (
    <Card className="border-white/10 bg-gradient-to-br from-navy-dark/80 to-navy/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Monthly Trends</CardTitle>
        <CardDescription>Long-term token performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-80 text-muted-foreground">
          <div className="text-center space-y-4">
            <ChartPie className="h-16 w-16 mx-auto text-muted-foreground opacity-30" />
            <div>
              <p className="text-sm font-medium">Not enough data</p>
              <p className="text-xs text-muted-foreground">Monthly data will appear when you have at least 30 days of analytics</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyMonthlyChart;
