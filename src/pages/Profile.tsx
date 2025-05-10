
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import TokenCard from '@/components/TokenCard';
import EmptyState from '@/components/EmptyState';
import { QrCode, Plus, PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockTokens = [
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

const mockCreatedTokens = [
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
  
  const handleTokenClick = (token: typeof mockTokens[0]) => {
    toast({
      title: token.title,
      description: `Token ID: ${token.id}`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-1">My Profile</h1>
        <p className="text-muted-foreground mb-6">Manage your compressed tokens</p>
        
        <Tabs defaultValue="collected" className="w-full">
          <TabsList className="mb-8 grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="collected">Collected Tokens</TabsTrigger>
            <TabsTrigger value="created">Created Tokens</TabsTrigger>
          </TabsList>
          
          <TabsContent value="collected">
            {mockTokens.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockTokens.map((token) => (
                  <TokenCard
                    key={token.id}
                    title={token.title}
                    description={token.description}
                    date={token.date}
                    claimed={token.claimed}
                    onClick={() => handleTokenClick(token)}
                  />
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
                  <TokenCard
                    key={token.id}
                    title={token.title}
                    description={token.description}
                    date={token.date}
                    count={token.count}
                    onClick={() => handleTokenClick(token)}
                  />
                ))}
                
                <div className="flex items-center justify-center h-full min-h-[220px]">
                  <Button asChild variant="outline" className="h-full w-full border-dashed">
                    <Link to="/create" className="flex flex-col items-center justify-center py-8 px-4">
                      <Plus className="h-10 w-10 mb-4 text-muted-foreground" />
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
