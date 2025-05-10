
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie
} from 'recharts';
import {
  ArrowRight,
  Calendar,
  Download,
  Users,
  TrendingUp,
  MapPin,
  BarChart as BarChartIcon,
  ChartPie,
  ChartLine,
  InfoIcon
} from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

const AnalyticsDashboard = () => {
  const {
    timeRange,
    setTimeRange,
    claimData,
    walletData,
    conversionData,
    locationData,
    deviceData,
    exportAnalytics
  } = useAnalytics();
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-medium text-gradient-blue-purple mb-2">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Track performance and engagement of your token distribution</p>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          icon={<Users className="h-4 w-4 text-mint" />}
          title="Total Claims"
          value="67"
          change="+12.5%"
          trend="up"
          description="of 100 maximum supply"
        />
        
        <MetricCard 
          icon={<Calendar className="h-4 w-4 text-mint" />}
          title="Daily Average"
          value="9.6"
          change="-3.2%"
          trend="down"
          description="claims per day"
        />
        
        <MetricCard 
          icon={<ArrowRight className="h-4 w-4 text-mint" />}
          title="Conversion"
          value="58.3%"
          change="+5.7%"
          trend="up"
          description="scan to claim ratio"
        />
      </div>
      
      {/* Time Range Selector */}
      <Tabs defaultValue={timeRange} onValueChange={setTimeRange} className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList className="bg-navy/20 border border-white/10">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-navy/20 border-white/10 hover:bg-navy/30"
            onClick={exportAnalytics}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
        
        {/* Claims & Views Chart */}
        <TabsContent value="daily" className="mt-0">
          <Card className="border-white/10 bg-gradient-to-br from-navy-dark/80 to-navy/60 backdrop-blur-sm">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-medium">Daily Claims & Views</CardTitle>
                  <CardDescription>Token engagement over time</CardDescription>
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
                    data={claimData}
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
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-0">
          <Card className="border-white/10 bg-gradient-to-br from-navy-dark/80 to-navy/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Weekly Overview</CardTitle>
              <CardDescription>Aggregate data by week</CardDescription>
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
                    data={claimData.filter((_, i) => i % 3 === 0)}
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
        </TabsContent>
        
        <TabsContent value="monthly" className="mt-0">
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
        </TabsContent>
      </Tabs>
      
      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Breakdown */}
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
                    data={walletData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    dataKey="value"
                    nameKey="name"
                  >
                    {walletData.map((entry, index) => (
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
                <p className="text-xl font-medium">42</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-mint" />
                  <span className="text-sm">Returning</span>
                </div>
                <p className="text-xl font-medium">25</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Token Metrics */}
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
      </div>
      
      {/* Engagement Funnel */}
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
                data={conversionData}
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
                  {conversionData.map((entry, index) => (
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
            {conversionData.map((step, index) => (
              <div key={index} className="text-center">
                <p className="text-sm text-muted-foreground">{step.name}</p>
                <p className="text-xl font-medium">{step.value}</p>
                {index < conversionData.length - 1 && (
                  <p className="text-xs text-muted-foreground">
                    {Math.round((conversionData[index + 1].value / step.value) * 100)}% conversion
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Predictive Analytics */}
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
                data={[...claimData, 
                  { date: 'May 17', claims: 2, views: 5, projected: true },
                  { date: 'May 18', claims: 1, views: 3, projected: true },
                  { date: 'May 19', claims: 0, views: 2, projected: true }
                ]}
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
                  data={[...claimData.map(() => ({ claims: null })), 
                    { claims: 2 },
                    { claims: 1 },
                    { claims: 0 }
                  ]}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ icon, title, value, change, trend, description }) => (
  <Card className="border-white/10 bg-gradient-to-br from-navy-dark/80 to-navy/60 backdrop-blur-sm p-6">
    <div className="flex items-center gap-3 mb-1.5">
      <div className="bg-navy/40 p-1.5 rounded-full">
        {icon}
      </div>
      <span className="text-sm text-muted-foreground">{title}</span>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-medium">{value}</span>
      <span className={`text-xs ${trend === 'up' ? 'text-mint' : 'text-amber'}`}>
        {change} {trend === 'up' ? '↑' : '↓'}
      </span>
    </div>
    <div className="text-xs text-muted-foreground mt-1">
      {description}
    </div>
  </Card>
);

// Progress Metric Component
const ProgressMetric = ({ label, value, progress, color }) => (
  <div className="pb-4">
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
    <div className="w-full bg-black/20 rounded-full h-1.5">
      <div className={`${color} h-1.5 rounded-full`} style={{ width: `${progress}%` }}></div>
    </div>
  </div>
);

export default AnalyticsDashboard;
