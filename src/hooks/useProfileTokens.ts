
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Define proper interfaces for our token types
export interface BaseToken {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface CollectedToken extends BaseToken {
  claimed: boolean;
}

export interface CreatedToken extends BaseToken {
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

export const useProfileTokens = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("collected");
  const [collectedTokens] = useState<CollectedToken[]>(mockTokens);
  const [createdTokens] = useState<CreatedToken[]>(mockCreatedTokens);
  
  // Handle token click
  const handleTokenClick = (token: BaseToken) => {
    toast({
      title: token.title,
      description: `Token ID: ${token.id}`,
    });
  };

  // Haptic feedback function
  const triggerHapticFeedback = () => {
    // Check if the device can vibrate
    if ('vibrate' in navigator) {
      navigator.vibrate(50); // Short vibration of 50ms
    }
  };
  
  return {
    activeTab,
    setActiveTab,
    collectedTokens,
    createdTokens,
    handleTokenClick,
    triggerHapticFeedback
  };
};
