
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import { BarChart, CheckCircle } from 'lucide-react';
import TokenWizard from '@/components/creator/TokenWizard';
import QRStyler from '@/components/creator/QRStyler';
import DistributionSettings from '@/components/creator/DistributionSettings';
import AnalyticsDashboard from '@/components/creator/AnalyticsDashboard';

const Creator = () => {
  const [activeTab, setActiveTab] = useState("create");
  const { toast } = useToast();
  
  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.3 }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-6 lg:py-10">
        <motion.div 
          className="max-w-6xl mx-auto space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-faktum-semibold tracking-tight mb-1">
                <span className="creator-gradient-text">Creator Dashboard</span>
              </h1>
              <p className="text-muted-foreground">
                Create, customize and track your proof-of-participation tokens
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-black/20 border-white/10 hover:bg-black/30"
                onClick={() => toast({
                  title: "Sync complete",
                  description: "Your token data has been synced with the blockchain.",
                })}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Sync Data
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="bg-black/20 border-white/10 hover:bg-black/30"
                onClick={() => setActiveTab("analytics")}
              >
                <BarChart className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
          
          <Card className="overflow-hidden border-white/10">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="border-b border-white/10">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                  <TabsTrigger
                    value="create"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-creator-primary-light data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Create Token
                  </TabsTrigger>
                  <TabsTrigger
                    value="style"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-creator-primary-light data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    QR Styling
                  </TabsTrigger>
                  <TabsTrigger
                    value="distribute"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-creator-primary-light data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Distribution
                  </TabsTrigger>
                  <TabsTrigger
                    value="analytics"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-creator-primary-light data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Analytics
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <CardContent className="p-0">
                <TabsContent value="create" className="m-0 p-6">
                  <motion.div {...fadeIn}>
                    <TokenWizard />
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="style" className="m-0 p-6">
                  <motion.div {...fadeIn}>
                    <QRStyler />
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="distribute" className="m-0 p-6">
                  <motion.div {...fadeIn}>
                    <DistributionSettings />
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="analytics" className="m-0 p-6">
                  <motion.div {...fadeIn}>
                    <AnalyticsDashboard />
                  </motion.div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Powered by Solana ZK Compression • Save up to 99.9% on gas fees
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Creator;
