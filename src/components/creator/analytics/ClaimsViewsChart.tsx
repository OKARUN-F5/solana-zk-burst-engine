
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ClaimDataPoint } from '@/hooks/useAnalytics';

interface ClaimsViewsChartProps {
  data: ClaimDataPoint[];
  title: string;
  description: string;
}

const ClaimsViewsChart = ({ data, title, description }: ClaimsViewsChartProps) => {
  return (
    <Card className="border-white/10 bg-gradient-to-br from-navy-dark/80 to-navy/60 backdrop-blur-sm">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent side="left">
                <p className="max-w-xs">This chart shows the number of token views and successful claims over time.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer 
            config={{
              views: { color: '#10DABE' },
              claims: { color: '#5438DC' }
            }}
          >
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5438DC" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#5438DC" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10DABE" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10DABE" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="views" stroke="#10DABE" fillOpacity={1} fill="url(#colorViews)" />
              <Area type="monotone" dataKey="claims" stroke="#5438DC" fillOpacity={1} fill="url(#colorClaims)" />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClaimsViewsChart;
