
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ConversionStep } from '@/hooks/useAnalytics';

interface EngagementFunnelChartProps {
  data: ConversionStep[];
}

const EngagementFunnelChart = ({ data }: EngagementFunnelChartProps) => {
  return (
    <Card className="border-white/10 bg-gradient-to-br from-navy-dark/80 to-navy/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Engagement Funnel</CardTitle>
        <CardDescription>Visualization of user flow from scan to claim</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ChartContainer
            config={{
              scans: { color: '#FFC947' },
              views: { color: '#10DABE' },
              claims: { color: '#5438DC' }
            }}
          >
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis type="number" axisLine={false} tickLine={false} />
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                width={80} 
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="value" 
                background={{ fill: 'rgba(255, 255, 255, 0.05)' }} 
                radius={[0, 4, 4, 0]}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 0 ? '#FFC947' : index === 1 ? '#10DABE' : '#5438DC'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {data.map((step, index) => (
            <div key={index} className="text-center">
              <p className="text-sm text-muted-foreground">{step.name}</p>
              <p className="text-xl font-medium">{step.value}</p>
              {index < data.length - 1 && (
                <p className="text-xs text-muted-foreground">
                  {Math.round((data[index + 1].value / step.value) * 100)}% conversion
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementFunnelChart;
