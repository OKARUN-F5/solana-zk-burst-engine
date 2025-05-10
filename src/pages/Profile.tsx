
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import ProfileHeader from '@/components/profile/ProfileHeader';
import QuickActions from '@/components/profile/QuickActions';
import CompressionStatus from '@/components/profile/CompressionStatus';
import TokensDisplay from '@/components/profile/TokensDisplay';
import { useProfileTokens } from '@/hooks/useProfileTokens';

const Profile = () => {
  const {
    activeTab,
    setActiveTab,
    collectedTokens,
    createdTokens,
    handleTokenClick,
    triggerHapticFeedback
  } = useProfileTokens();
  
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
            mockTokens={collectedTokens}
            mockCreatedTokens={createdTokens}
            handleTokenClick={handleTokenClick}
            triggerHapticFeedback={triggerHapticFeedback}
          />
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
