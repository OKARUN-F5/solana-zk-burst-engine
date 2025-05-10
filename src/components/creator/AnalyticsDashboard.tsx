
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, AreaChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, Area } from 'recharts';
import { ArrowRight, Calendar, Download, Users } from 'lucide-react';

const data = [
  { date: 'May 10', claims: 0, views: 2 },
  { date: 'May 11', claims: 12, views: 18 },
  { date: 'May 12', claims: 24, views: 38 },
  { date: 'May 13', claims: 15, views: 25 },
  { date: 'May 14', claims: 8, views: 15 },
  { date: 'May 15', claims: 5, views: 10 },
  { date: 'May 16', claims: 3, views: 7 },
];

const walletData = [
  { name: 'First-time', value: 42 },
  { name: 'Returning', value: 25 },
];

const COLORS = ['#5438DC', '#00D18B'];

const AnalyticsDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold creator-gradient-text mb-2">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Track performance and engagement of your token distribution</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="creator-card p-6">
          <div className="flex items-center gap-3 mb-1.5">
            <div className="bg-creator-primary/20 p-1.5 rounded-full">
              <Users className="h-4 w-4 text-creator-primary-light" />
            </div>
            <span className="text-sm text-muted-foreground">Total Claims</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-faktum-semibold">67</span>
            <span className="text-xs text-creator-success">+12.5% ↑</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            of 100 maximum supply
          </div>
        </Card>
        
        <Card className="creator-card p-6">
          <div className="flex items-center gap-3 mb-1.5">
            <div className="bg-creator-primary/20 p-1.5 rounded-full">
              <Calendar className="h-4 w-4 text-creator-primary-light" />
            </div>
            <span className="text-sm text-muted-foreground">Daily Average</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-faktum-semibold">9.6</span>
            <span className="text-xs text-creator-warning">-3.2% ↓</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            claims per day
          </div>
        </Card>
        
        <Card className="creator-card p-6">
          <div className="flex items-center gap-3 mb-1.5">
            <div className="bg-creator-primary/20 p-1.5 rounded-full">
              <ArrowRight className="h-4 w-4 text-creator-primary-light" />
            </div>
            <span className="text-sm text-muted-foreground">Conversion</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-faktum-semibold">58.3%</span>
            <span className="text-xs text-creator-success">+5.7% ↑</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            scan to claim ratio
          </div>
        </Card>
      </div>
      
      <Tabs defaultValue="daily" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm" className="bg-black/20 border-white/10 hover:bg-black/30">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
        
        <TabsContent value="daily" className="mt-0">
          <Card className="creator-card p-6">
            <h3 className="text-sm font-medium mb-4">Daily Claims & Views</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
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
                      <stop offset="5%" stopColor="#00D18B" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00D18B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: 8
                    }} 
                  />
                  <Area type="monotone" dataKey="views" stroke="#00D18B" fillOpacity={1} fill="url(#colorViews)" />
                  <Area type="monotone" dataKey="claims" stroke="#5438DC" fillOpacity={1} fill="url(#colorClaims)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-0">
          <Card className="creator-card p-6">
            <h3 className="text-sm font-medium mb-4">Weekly Data</h3>
            <div className="flex items-center justify-center h-80 text-muted-foreground">
              Weekly data visualization will appear here
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly" className="mt-0">
          <Card className="creator-card p-6">
            <h3 className="text-sm font-medium mb-4">Monthly Data</h3>
            <div className="flex items-center justify-center h-80 text-muted-foreground">
              Monthly data visualization will appear here
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="creator-card p-6">
          <h3 className="text-sm font-medium mb-4">Wallet Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={walletData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: 8
                  }} 
                />
                <Bar dataKey="value" background={{ fill: 'rgba(255, 255, 255, 0.05)' }} radius={[0, 4, 4, 0]}>
                  {walletData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[0] }}></div>
                <span className="text-sm">First-time</span>
              </div>
              <p className="text-xl font-medium">42</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[1] }}></div>
                <span className="text-sm">Returning</span>
              </div>
              <p className="text-xl font-medium">25</p>
            </div>
          </div>
        </Card>
        
        <Card className="creator-card p-6">
          <h3 className="text-sm font-medium mb-4">Token Metrics</h3>
          <div className="divide-y divide-white/10">
            <div className="pb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Claim Rate</span>
                <span className="text-sm font-medium">67%</span>
              </div>
              <div className="w-full bg-black/20 rounded-full h-1.5">
                <div className="bg-creator-primary h-1.5 rounded-full" style={{ width: "67%" }}></div>
              </div>
            </div>
            
            <div className="py-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Scan-to-Claim</span>
                <span className="text-sm font-medium">58.3%</span>
              </div>
              <div className="w-full bg-black/20 rounded-full h-1.5">
                <div className="bg-creator-primary-light h-1.5 rounded-full" style={{ width: "58.3%" }}></div>
              </div>
            </div>
            
            <div className="py-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Mobile vs Desktop</span>
                <span className="text-sm font-medium">82% / 18%</span>
              </div>
              <div className="w-full bg-black/20 rounded-full h-1.5 flex overflow-hidden">
                <div className="bg-creator-success h-1.5" style={{ width: "82%" }}></div>
                <div className="bg-creator-warning h-1.5" style={{ width: "18%" }}></div>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Top Locations</span>
                <span className="text-sm">Claims</span>
              </div>
              <div className="space-y-2">
                {[
                  { location: "San Francisco, CA", count: 24 },
                  { location: "New York, NY", count: 18 },
                  { location: "Austin, TX", count: 10 },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{item.location}</span>
                    <span className="text-sm">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
