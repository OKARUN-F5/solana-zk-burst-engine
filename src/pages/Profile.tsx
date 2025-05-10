
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import TokenCard from '@/components/TokenCard';
import EmptyState from '@/components/EmptyState';
import { QrCode, Plus, PackageOpen, Scan } from 'lucide-react';
import { Link } from 'react-router-dom';

// Define proper interfaces for our token types
interface BaseToken {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface CollectedToken extends BaseToken {
  claimed: boolean;
}

interface CreatedToken extends BaseToken {
  count: number;
}

// Mock data for demonstration
const mockTokens: CollectedToken[] = [
  {
    id: '1',
    title: 'Solana Breakout Hackathon',
    description: 'Participated in the Solana Breakout Hackathon 2025',
    date: 'May 10, 2025',
    claimed: true
  },
  {
    id: '2',
    title: 'ZK Compression Workshop',
    description: 'Attended the ZK Compression technical workshop',
    date: 'May 8, 2025',
    claimed: true
  }
];

const mockCreatedTokens: CreatedToken[] = [
  {
    id: '101',
    title: 'Solana Meetup NYC',
    description: 'Monthly Solana developer meetup in New York City',
    date: 'May 5, 2025',
    count: 42
  }
];

const Profile = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("collected");
  
  // Update the function to handle both token types
  const handleTokenClick = (token: BaseToken) => {
    toast({
      title: token.title,
      description: `Token ID: ${token.id}`,
    });
  };

  const triggerHapticFeedback = () => {
    // Check if the device can vibrate
    if ('vibrate' in navigator) {
      navigator.vibrate(50); // Short vibration of 50ms
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col dark bg-gradient-to-br from-background to-background/95">
      <Header />
      
      <main className="flex-1 container py-6 md:py-8 animate-fade-in">
        <div className="flex flex-col items-start mb-6">
          <h1 className="text-3xl font-medium tracking-tighter mb-1">My Profile</h1>
          <p className="text-muted-foreground">Manage your compressed tokens</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-4 md:p-6 frost-panel col-span-2">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex items-center justify-center h-16 w-16 rounded-full bg-glow-gradient shadow-glow-md overflow-hidden">
                <div className="absolute inset-[2px] rounded-full bg-card flex items-center justify-center">
                  <span className="text-xl font-bold text-foreground">AR</span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-medium tracking-tight">Alice Renderer</h3>
                <p className="text-sm text-muted-foreground">sol...x3fY</p>
              </div>
              <div className="ml-auto hidden md:block">
                <Button variant="outline" size="sm" className="frost-panel border-electric-blue/20 text-electric-blue hover:text-electric-blue/80">
                  Edit Profile
                </Button>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 md:p-6 frost-panel">
            <h3 className="text-lg font-medium mb-1">Collected</h3>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-semibold tracking-tighter">{mockTokens.length}</span>
              <Badge variant="outline" className="bg-mint-green/10 text-mint-green border-mint-green/20">
                Tokens
              </Badge>
            </div>
          </Card>
          
          <Card className="p-4 md:p-6 frost-panel">
            <h3 className="text-lg font-medium mb-1">Created</h3>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-semibold tracking-tighter">{mockCreatedTokens.length}</span>
              <Badge variant="outline" className="bg-coral/10 text-coral border-coral/20">
                Events
              </Badge>
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-4 md:p-6 frost-panel col-span-1 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/scan" className="block">
                <Button 
                  variant="outline" 
                  className="frost-panel w-full h-auto py-4 flex flex-col gap-2 items-center justify-center hover:shadow-glow-sm transition-all"
                  onClick={triggerHapticFeedback}
                >
                  <Scan className="h-6 w-6 text-electric-blue mb-1" />
                  <span className="text-sm font-medium">Scan Token</span>
                </Button>
              </Link>
              <Link to="/create" className="block">
                <Button 
                  variant="outline" 
                  className="frost-panel w-full h-auto py-4 flex flex-col gap-2 items-center justify-center hover:shadow-glow-sm transition-all"
                  onClick={triggerHapticFeedback}
                >
                  <Plus className="h-6 w-6 text-mint-green mb-1" />
                  <span className="text-sm font-medium">Create Token</span>
                </Button>
              </Link>
            </div>
          </Card>
          
          <Card className="p-4 md:p-6 frost-panel col-span-1 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">ZK Compression Status</h3>
              <Badge variant="outline" className="bg-deep-gradient text-white border-none">Active</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Storage Saved</span>
                <span className="font-medium">94%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div className="bg-deep-gradient h-full rounded-full w-[94%] shimmer-bg"></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                You've saved 0.34 SOL using ZK Compression technology
              </p>
            </div>
          </Card>
        </div>
        
        <Tabs 
          defaultValue="collected" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-8 grid w-full max-w-md grid-cols-2 frost-panel">
            <TabsTrigger value="collected" onClick={triggerHapticFeedback}>
              Collected Tokens
            </TabsTrigger>
            <TabsTrigger value="created" onClick={triggerHapticFeedback}>
              Created Tokens
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="collected">
            {mockTokens.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockTokens.map((token) => (
                  <div className="token-3d" key={token.id}>
                    <TokenCard
                      title={token.title}
                      description={token.description}
                      date={token.date}
                      claimed={token.claimed}
                      onClick={() => {
                        handleTokenClick(token);
                        triggerHapticFeedback();
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No tokens collected yet"
                description="Scan QR codes at events to collect compressed tokens"
                icon={<PackageOpen className="h-12 w-12 text-muted-foreground" />}
                actionLink="/scan"
                actionText="Scan a Token"
              />
            )}
          </TabsContent>
          
          <TabsContent value="created">
            {mockCreatedTokens.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockCreatedTokens.map((token) => (
                  <div className="token-3d" key={token.id}>
                    <TokenCard
                      title={token.title}
                      description={token.description}
                      date={token.date}
                      count={token.count}
                      onClick={() => {
                        handleTokenClick(token);
                        triggerHapticFeedback();
                      }}
                    />
                  </div>
                ))}
                
                <div className="flex items-center justify-center h-full">
                  <Button 
                    asChild
                    variant="outline" 
                    className="h-full w-full min-h-[220px] border-dashed frost-panel hover:shadow-glow-sm transition-all"
                    onClick={triggerHapticFeedback}
                  >
                    <Link to="/create" className="flex flex-col items-center justify-center py-8 px-4">
                      <Plus className="h-10 w-10 mb-4 text-mint-green" />
                      <span className="text-muted-foreground font-medium">Create New Token</span>
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <EmptyState
                title="Create your first token"
                description="Start by creating a compressed token for your event"
                icon={<QrCode className="h-12 w-12 text-muted-foreground" />}
                actionLink="/create"
                actionText="Create Token"
              />
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
