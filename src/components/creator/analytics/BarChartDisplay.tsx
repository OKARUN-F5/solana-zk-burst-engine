
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ClaimDataPoint } from '@/hooks/useAnalytics';

interface BarChartDisplayProps {
  data: ClaimDataPoint[];
  title: string;
  description: string;
}

const BarChartDisplay = ({ data, title, description }: BarChartDisplayProps) => {
  return (
    <Card className="border-white/10 bg-gradient-to-br from-navy-dark/80 to-navy/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer 
            config={{
              views: { color: '#10DABE' },
              claims: { color: '#5438DC' }
            }}
          >
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="views" fill="#10DABE" radius={[4, 4, 0, 0]} />
              <Bar dataKey="claims" fill="#5438DC" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChartDisplay;
