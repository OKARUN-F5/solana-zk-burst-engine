
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ClaimDataPoint } from '@/hooks/useAnalytics';

interface PredictiveAnalyticsChartProps {
  data: ClaimDataPoint[];
}

const PredictiveAnalyticsChart = ({ data }: PredictiveAnalyticsChartProps) => {
  const combinedData = [
    ...data, 
    { date: 'May 17', claims: 2, views: 5, projected: true },
    { date: 'May 18', claims: 1, views: 3, projected: true },
    { date: 'May 19', claims: 0, views: 2, projected: true }
  ];
  
  const projectedData = [
    ...data.map(() => ({ claims: null as any })),
    { claims: 2 },
    { claims: 1 },
    { claims: 0 }
  ];

  return (
    <Card className="border-white/10 bg-gradient-to-br from-navy-dark/80 to-navy/60 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium">Predictive Analytics</CardTitle>
            <CardDescription>Projected engagement based on historical data</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent side="left">
                <p className="max-w-xs">Predictions are based on historical engagement patterns and may vary based on marketing efforts.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer 
            config={{
              actual: { color: '#5438DC' },
              projected: { color: '#FFC947' }
            }}
          >
            <AreaChart
              data={combinedData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5438DC" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#5438DC" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFC947" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#FFC947" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="claims" 
                stroke="#5438DC" 
                fillOpacity={1} 
                fill="url(#colorActual)" 
                name="Actual Claims"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="claims" 
                stroke="#FFC947" 
                fillOpacity={0.5} 
                fill="url(#colorProjected)" 
                strokeDasharray="5 5"
                name="Projected Claims"
                strokeWidth={2}
                connectNulls
                data={projectedData}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictiveAnalyticsChart;
