
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import ProfileHeader from '@/components/profile/ProfileHeader';
import QuickActions from '@/components/profile/QuickActions';
import CompressionStatus from '@/components/profile/CompressionStatus';
import TokensDisplay from '@/components/profile/TokensDisplay';

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
        
        <ProfileHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <QuickActions triggerHapticFeedback={triggerHapticFeedback} />
          <CompressionStatus />
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
          
          <TokensDisplay 
            activeTab={activeTab}
            mockTokens={mockTokens}
            mockCreatedTokens={mockCreatedTokens}
            handleTokenClick={handleTokenClick}
            triggerHapticFeedback={triggerHapticFeedback}
          />
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
