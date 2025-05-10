
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { WalletDataPoint } from '@/hooks/useAnalytics';

interface UserBreakdownChartProps {
  data: WalletDataPoint[];
}

const UserBreakdownChart = ({ data }: UserBreakdownChartProps) => {
  return (
    <Card className="border-white/10 bg-gradient-to-br from-navy-dark/80 to-navy/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium">User Breakdown</CardTitle>
        <CardDescription>First-time vs returning users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ChartContainer 
            config={{
              'First-time': { color: '#5438DC' },
              'Returning': { color: '#10DABE' }
            }}
          >
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
                nameKey="name"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 0 ? '#5438DC' : '#10DABE'} 
                  />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple" />
              <span className="text-sm">First-time</span>
            </div>
            <p className="text-xl font-medium">{data[0]?.value}</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-mint" />
              <span className="text-sm">Returning</span>
            </div>
            <p className="text-xl font-medium">{data[1]?.value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserBreakdownChart;
