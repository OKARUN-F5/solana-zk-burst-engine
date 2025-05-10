import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import TokenCard from '@/components/TokenCard';
import EmptyState from '@/components/EmptyState';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PackageOpen, QrCode, Plus } from 'lucide-react';
import { BaseToken, CollectedToken, CreatedToken } from '@/hooks/useProfileTokens';

interface TokensDisplayProps {
  activeTab: string;
  mockTokens: CollectedToken[];
  mockCreatedTokens: CreatedToken[];
  handleTokenClick: (token: BaseToken) => void;
  triggerHapticFeedback: () => void;
}

const TokensDisplay: React.FC<TokensDisplayProps> = ({
  activeTab,
  mockTokens,
  mockCreatedTokens,
  handleTokenClick,
  triggerHapticFeedback
}) => {
  return (
    <>
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
    </>
  );
};

export default TokensDisplay;
