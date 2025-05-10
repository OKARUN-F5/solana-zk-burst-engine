
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TokenGalleryCard from '@/components/gallery/TokenGalleryCard';
import GalleryControls from '@/components/gallery/GalleryControls';
import GalleryAchievements from '@/components/gallery/GalleryAchievements';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Wallet } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Mock token data
const mockTokens = [
  {
    id: '1',
    title: 'Solana Breakpoint 2025',
    description: 'Official attendee token for Solana Breakpoint Conference 2025',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
    rarity: 'legendary' as const,
    date: 'May 10, 2025',
    eventName: 'Breakpoint Conference',
    claimed: true,
    value: 120,
  },
  {
    id: '2',
    title: 'Miami Hacker House',
    description: 'Exclusive access token for Solana Miami Hacker House',
    image: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28',
    rarity: 'rare' as const,
    date: 'Apr 15, 2025',
    eventName: 'Hacker House',
    claimed: true,
    value: 75,
  },
  {
    id: '3',
    title: 'Superteam NFT Summit',
    description: 'Participant in the Global NFT Summit by Superteam',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    rarity: 'uncommon' as const,
    date: 'Mar 22, 2025',
    eventName: 'NFT Summit',
    claimed: true,
    value: 45,
  },
  {
    id: '4',
    title: 'Solana DeFi Hackathon',
    description: 'Participation token for DeFi Hackathon winners',
    image: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef',
    rarity: 'rare' as const,
    date: 'Feb 28, 2025',
    eventName: 'DeFi Hackathon',
    claimed: true,
    value: 85,
  },
  {
    id: '5',
    title: 'Community Meetup - NYC',
    description: 'New York City Solana Developer Meetup',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
    rarity: 'common' as const,
    date: 'Feb 10, 2025',
    eventName: 'Community Meetup',
    claimed: false,
    value: 15,
  },
  {
    id: '6',
    title: 'Gaming Ecosystem Launch',
    description: 'Early supporter of Solana Gaming Ecosystem',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f',
    rarity: 'uncommon' as const,
    date: 'Jan 15, 2025',
    eventName: 'Gaming Launch',
    claimed: true,
    value: 35,
  },
  {
    id: '7',
    title: 'Mobile SDK Early Access',
    description: 'Early access to Mobile SDK for Solana',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    rarity: 'legendary' as const,
    date: 'Dec 20, 2024',
    eventName: 'Mobile SDK Launch',
    claimed: true,
    value: 150,
  },
];

// Mock achievements data
const mockAchievements = [
  {
    id: 'ach1',
    title: 'Early Collector',
    description: 'Collect your first 5 tokens',
    progress: 7,
    total: 5,
    completed: true,
  },
  {
    id: 'ach2',
    title: 'Legendary Hunter',
    description: 'Collect 3 legendary tokens',
    progress: 2,
    total: 3,
    completed: false,
  },
  {
    id: 'ach3',
    title: 'Completionist',
    description: 'Claim all tokens from an event series',
    progress: 1,
    total: 1,
    completed: true,
  },
  {
    id: 'ach4',
    title: 'Social Butterfly',
    description: 'Share 10 tokens with friends',
    progress: 3,
    total: 10,
    completed: false,
  },
];

const TokenGallery: React.FC = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sort, setSort] = useState('date-desc');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { toast } = useToast();

  // Filter tokens based on search and filters
  const filteredTokens = mockTokens
    .filter(token => {
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = token.title.toLowerCase().includes(query);
        const matchesDesc = token.description.toLowerCase().includes(query);
        const matchesEvent = token.eventName?.toLowerCase().includes(query);
        
        if (!matchesTitle && !matchesDesc && !matchesEvent) {
          return false;
        }
      }

      // Apply category filter
      if (filter === 'claimed' && !token.claimed) return false;
      if (filter === 'unclaimed' && token.claimed) return false;
      if (filter === 'legendary' && token.rarity !== 'legendary') return false;
      if (filter === 'rare' && token.rarity !== 'rare') return false;
      
      return true;
    })
    .sort((a, b) => {
      // Apply sort
      switch (sort) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'rarity':
          const rarityOrder = { legendary: 4, rare: 3, uncommon: 2, common: 1 };
          return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        case 'value-desc':
          return (b.value || 0) - (a.value || 0);
        case 'value-asc':
          return (a.value || 0) - (b.value || 0);
        default:
          return 0;
      }
    });

  const handleTokenClick = (token: any) => {
    setSelectedToken(token);
    setIsDetailModalOpen(true);
  };

  const totalValue = mockTokens.reduce((sum, token) => sum + (token.value || 0), 0);
  const claimedCount = mockTokens.filter(t => t.claimed).length;
  const legendaryCount = mockTokens.filter(t => t.rarity === 'legendary').length;

  // Sound effect for interactions
  const playInteractionSound = () => {
    const audio = new Audio('/path/to/click-sound.mp3'); // In a real app, you'd add this file
    audio.volume = 0.2;
    try {
      audio.play().catch(() => {}); // Catch and ignore errors for browsers that block autoplay
    } catch (e) {
      // Ignore errors
    }
  };

  // Haptic feedback
  const triggerHapticFeedback = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(30); // Short vibration
    }
  };

  return (
    <div className="min-h-screen bg-gallery-gradient text-white font-dm-sans">
      <Header />
      
      <main className="container py-8 animate-fade-in">
        {/* Gallery Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-10 gap-4">
          <div>
            <h1 className="font-bold text-4xl tracking-super-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              My Token Gallery
            </h1>
            <p className="text-lg text-slate-300 md:max-w-2xl">
              Showcase your collected Solana compressed tokens and track your achievements
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-end"
          >
            <div className="flex items-center gap-2 mb-2">
              <Wallet size={18} className="text-gallery-accent-pink" />
              <span className="text-xl font-semibold">${totalValue.toFixed(2)}</span>
              <span className="text-sm text-slate-400">Portfolio Value</span>
            </div>
            
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-black/30 border-white/10 text-white">
                {mockTokens.length} Total Tokens
              </Badge>
              <Badge variant="outline" className="bg-black/30 border-white/10 text-white">
                {claimedCount} Claimed
              </Badge>
              <Badge variant="outline" className="bg-gallery-accent-pink/20 border-gallery-accent-pink/30 text-gallery-accent-pink">
                {legendaryCount} Legendary
              </Badge>
            </div>
          </motion.div>
        </div>

        {/* Achievements Section */}
        <GalleryAchievements achievements={mockAchievements} />
        
        {/* Gallery Controls */}
        <GalleryControls
          viewMode={viewMode}
          setViewMode={setViewMode}
          sort={sort}
          setSort={setSort}
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        {/* Token Grid */}
        <AnimatePresence mode="wait">
          {filteredTokens.length > 0 ? (
            <motion.div
              key={viewMode + sort + filter + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`
                ${viewMode === 'grid' 
                  ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6' 
                  : 'flex flex-col gap-4'}
              `}>
                {filteredTokens.map((token, i) => (
                  <motion.div
                    key={token.id}
                    custom={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: i * 0.05, 
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                    className={viewMode === 'grid' ? 'mb-6 break-inside-avoid' : 'w-full'}
                    onClick={() => {
                      playInteractionSound();
                      triggerHapticFeedback();
                      handleTokenClick(token);
                    }}
                  >
                    <TokenGalleryCard 
                      token={token}
                      className={viewMode === 'list' ? 'h-auto flex-row' : ''}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <h3 className="text-xl font-semibold mb-2">No tokens found</h3>
              <p className="text-slate-300 mb-4">Try adjusting your filters or search query</p>
              <Button 
                onClick={() => {
                  setFilter('all');
                  setSearchQuery('');
                }}
                className="bg-gallery-accent-pink hover:bg-gallery-accent-pink/80 text-white"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Token Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="bg-gallery-bg-from border-white/10 text-white sm:max-w-[600px]">
          {selectedToken && (
            <>
              <DialogHeader>
                <DialogTitle className="font-bold text-2xl tracking-super-tight">
                  {selectedToken.title}
                </DialogTitle>
                <DialogDescription className="text-slate-300">
                  {selectedToken.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <img 
                    src={selectedToken.image} 
                    alt={selectedToken.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Rarity</div>
                    <div className="font-medium capitalize">{selectedToken.rarity}</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Value</div>
                    <div className="font-medium">${selectedToken.value?.toFixed(2) || '0.00'}</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Date</div>
                    <div className="font-medium">{selectedToken.date}</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Status</div>
                    <div className="font-medium">
                      {selectedToken.claimed ? 
                        <span className="text-gallery-accent-teal">Claimed</span> : 
                        <span className="text-gallery-accent-pink">Not Claimed</span>
                      }
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline"
                    className="bg-black/30 border-white/10 text-white hover:bg-black/50"
                    onClick={() => {
                      toast({
                        title: "Token shared",
                        description: "Link copied to clipboard",
                      });
                      setIsDetailModalOpen(false);
                    }}
                  >
                    Share Token
                  </Button>
                  <Button 
                    className="bg-gallery-accent-pink hover:bg-gallery-accent-pink/80 text-white"
                    onClick={() => setIsDetailModalOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TokenGallery;
