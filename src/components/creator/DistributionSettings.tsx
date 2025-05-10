
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Globe, Info, Lock, Share2, Users } from 'lucide-react';
import QRDisplay from '@/components/QRDisplay';

const TokenDistribution = () => {
  const [selectedTab, setSelectedTab] = useState("qr");
  const [qrValue, setQrValue] = useState("solana:token/cToken_example123");
  const [limitEnabled, setLimitEnabled] = useState(true);
  const [timeLimit, setTimeLimit] = useState(true);
  const [geoLimit, setGeoLimit] = useState(false);
  const [publicLink, setPublicLink] = useState(true);
  const { toast } = useToast();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + "/claim/cToken_example123");
    toast({
      title: "Claim link copied",
      description: "Link has been copied to clipboard"
    });
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Distribution settings saved",
      description: "Your token distribution settings have been updated."
    });
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold creator-gradient-text mb-2">Distribution Settings</h2>
        <p className="text-muted-foreground">Configure how participants can claim your token</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="qr">QR Code</TabsTrigger>
              <TabsTrigger value="link">Claim Link</TabsTrigger>
              <TabsTrigger value="limits">Limits</TabsTrigger>
            </TabsList>
            
            <TabsContent value="qr" className="space-y-6">
              <div className="space-y-4">
                <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Info className="h-5 w-5 text-creator-primary-light" />
                    <h3 className="font-medium">How QR Distribution Works</h3>
                  </div>
                  
                  <div className="pl-8">
                    <ol className="list-decimal space-y-2 text-muted-foreground text-sm">
                      <li>Display this QR code at your venue or include it in digital materials</li>
                      <li>Attendees scan the code using any QR scanner or the Solana wallet app</li>
                      <li>They're directed to a claim page where they connect their wallet</li>
                      <li>A ZK-compressed token is delivered directly to their wallet</li>
                    </ol>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="public-toggle" className="cursor-pointer">Make QR code public</Label>
                    <Switch 
                      id="public-toggle"
                      checked={publicLink}
                      onCheckedChange={setPublicLink}
                    />
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    When enabled, anyone who scans this QR code can claim a token. 
                    When disabled, scanners will need to verify their email or complete additional steps.
                  </p>
                </div>
                
                <div className="flex justify-between p-4 bg-creator-primary/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-creator-primary-light" />
                    <div>
                      <p className="text-sm font-medium">Batch Generate</p>
                      <p className="text-xs text-muted-foreground">Create unique QR codes for specific attendees</p>
                    </div>
                  </div>
                  
                  <Button size="sm" className="bg-creator-primary hover:bg-creator-primary-light">
                    Configure
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="link" className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="claim-link">Shareable Claim Link</Label>
                <div className="flex">
                  <Input
                    id="claim-link"
                    value={`${window.location.origin}/claim/cToken_example123`}
                    readOnly
                    className="rounded-r-none input-creator"
                  />
                  <Button 
                    onClick={handleCopy}
                    className="rounded-l-none bg-creator-primary hover:bg-creator-primary-light"
                  >
                    Copy
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2 mt-2">
                  <Switch id="enable-tracking" />
                  <Label htmlFor="enable-tracking" className="text-sm">Enable link tracking and analytics</Label>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="font-medium">Social Sharing</h3>
                <div className="grid grid-cols-3 gap-3">
                  {['Twitter', 'Telegram', 'Discord'].map((platform) => (
                    <Button
                      key={platform}
                      variant="outline"
                      className="bg-black/20 border-white/10 hover:bg-black/30"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      {platform}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="limits" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label 
                    htmlFor="limit-toggle" 
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Lock className="h-4 w-4 text-creator-primary-light" />
                    <span>Limit claims per wallet</span>
                  </Label>
                  <Switch 
                    id="limit-toggle"
                    checked={limitEnabled}
                    onCheckedChange={setLimitEnabled}
                  />
                </div>
                
                {limitEnabled && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-sm">Maximum</span>
                      <Input
                        type="number"
                        defaultValue="1"
                        min="1"
                        className="w-20 input-creator"
                      />
                      <span className="text-sm">token(s) per wallet</span>
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between space-x-2">
                  <Label 
                    htmlFor="time-toggle" 
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Clock className="h-4 w-4 text-creator-primary-light" />
                    <span>Time-limited claiming</span>
                  </Label>
                  <Switch 
                    id="time-toggle"
                    checked={timeLimit}
                    onCheckedChange={setTimeLimit}
                  />
                </div>
                
                {timeLimit && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 gap-4 mt-2"
                  >
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="datetime-local"
                        defaultValue="2025-01-01T09:00"
                        className="input-creator"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="datetime-local"
                        defaultValue="2025-01-31T18:00"
                        className="input-creator"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between space-x-2">
                  <Label 
                    htmlFor="geo-toggle" 
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Globe className="h-4 w-4 text-creator-primary-light" />
                    <span>Geo-restricted claiming</span>
                    <div className="rounded-full px-2 py-0.5 bg-creator-primary/20 text-xs text-creator-primary-light">Premium</div>
                  </Label>
                  <Switch 
                    id="geo-toggle"
                    checked={geoLimit}
                    onCheckedChange={setGeoLimit}
                  />
                </div>
                
                {geoLimit && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 mt-2"
                  >
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        placeholder="e.g., San Francisco, CA"
                        className="input-creator"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Radius (km)</Label>
                      <Input
                        type="number"
                        defaultValue="5"
                        min="1"
                        className="input-creator"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="mb-4 text-center">
            <h3 className="text-sm font-medium mb-1">Claim QR Code</h3>
            <p className="text-xs text-muted-foreground">
              Share this QR code with attendees
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-lg mb-6">
            <QRDisplay 
              value={qrValue} 
              size={180}
              downloadName="token_claim"
            />
          </div>
          
          <div className="space-y-3 w-full">
            <Button 
              className="w-full bg-gradient-to-r from-creator-primary to-creator-primary-light hover:opacity-90"
              onClick={handleSaveSettings}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Distribution
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full bg-black/20 border-white/10 hover:bg-black/30"
              onClick={handleCopy}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Claim Link
            </Button>
          </div>
          
          <div className="mt-6 p-4 rounded-lg bg-black/20 w-full">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-creator-success animate-pulse" />
              <p className="text-sm font-medium">Token Status</p>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <p className="text-muted-foreground">Created:</p>
              <p>May 10, 2025</p>
              <p className="text-muted-foreground">Claims:</p>
              <p>0 of 100</p>
              <p className="text-muted-foreground">Expires:</p>
              <p>Jan 31, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDistribution;
