
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import QRScanner from '@/components/QRScanner';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Check, QrCode, AlertCircle, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

enum ScanStatus {
  READY,
  SCANNING,
  PROCESSING,
  SUCCESS,
  ERROR
}

const Scan = () => {
  const [status, setStatus] = useState<ScanStatus>(ScanStatus.READY);
  const [tokenInfo, setTokenInfo] = useState<{title: string, id: string} | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleStartScan = () => {
    setStatus(ScanStatus.SCANNING);
    // Trigger haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };
  
  const handleScanResult = (data: string) => {
    console.log('QR code scanned:', data);
    setStatus(ScanStatus.PROCESSING);
    
    // Simulate processing delay
    setTimeout(() => {
      // Check if the QR code is valid
      if (!data.startsWith('solana:')) {
        setStatus(ScanStatus.ERROR);
        // Trigger error haptic feedback - sharp double pulse
        if ('vibrate' in navigator) {
          navigator.vibrate([100, 30, 100]);
        }
        
        toast({
          title: "Invalid QR code",
          description: "This doesn't appear to be a valid cToken QR code",
          variant: "destructive"
        });
        return;
      }
      
      // Simulate successful token claim
      setTokenInfo({
        title: "Solana Breakout Hackathon",
        id: data.split('/').pop() || "unknown"
      });
      setStatus(ScanStatus.SUCCESS);
      
      // Trigger success haptic feedback - gentle triple pulse
      if ('vibrate' in navigator) {
        navigator.vibrate([50, 30, 50, 30, 100]);
      }
      
      toast({
        title: "Token claimed successfully",
        description: "The compressed token has been added to your collection",
      });
    }, 2000);
  };
  
  const resetScan = () => {
    setStatus(ScanStatus.READY);
    setTokenInfo(null);
    
    // Trigger haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col dark bg-gradient-to-br from-background to-background/95">
      <Header />
      
      <main className="flex-1 container py-6 md:py-8 px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-1">Scan & Claim</h1>
          <p className="text-muted-foreground mb-6">Scan a QR code to claim a compressed token</p>
          
          <Card className="overflow-hidden frost-panel border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-electric-blue" />
                QR Scanner
              </CardTitle>
              <CardDescription>
                Point your camera at a cToken QR code to claim it
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-0 md:p-6">
              <AnimatePresence mode="wait">
                {status === ScanStatus.READY && (
                  <motion.div 
                    key="ready"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center py-12 gap-6"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="p-6 rounded-full bg-deep-gradient/20 shadow-glow-sm"
                    >
                      <QrCode className="h-10 w-10 text-electric-blue" />
                    </motion.div>
                    <motion.div 
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="lg" 
                        className="bg-deep-gradient text-white font-medium shadow-glow-sm px-8"
                        onClick={handleStartScan}
                      >
                        Start Scanning
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
                
                {status === ScanStatus.SCANNING && (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <QRScanner onScan={handleScanResult} />
                  </motion.div>
                )}
                
                {status === ScanStatus.PROCESSING && (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center py-16 gap-8"
                  >
                    <div className="relative">
                      <LoadingSpinner size="lg" />
                      <motion.div 
                        className="absolute inset-0"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2
                        }}
                      >
                        <LoadingSpinner size="lg" />
                      </motion.div>
                    </div>
                    <p className="text-lg text-electric-blue animate-pulse">Verifying your token...</p>
                  </motion.div>
                )}
                
                {status === ScanStatus.SUCCESS && tokenInfo && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5,
                      type: "spring",
                      stiffness: 150
                    }}
                    className="flex flex-col items-center py-12 gap-6"
                  >
                    <div className="relative">
                      {/* Success burst animation */}
                      <motion.div 
                        className="absolute inset-0 rounded-full bg-teal-400"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 0.8, 0],
                          scale: [0.5, 1.5, 2]
                        }}
                        transition={{ duration: 1.5 }}
                      />
                      
                      {/* Success checkmark container */}
                      <motion.div 
                        className="relative z-10 h-24 w-24 rounded-full bg-deep-gradient flex items-center justify-center shadow-glow-md"
                        initial={{ rotate: -180, scale: 0.5 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 200, 
                          damping: 15 
                        }}
                      >
                        <Check className="h-12 w-12 text-white" />
                      </motion.div>
                    </div>
                    
                    <div className="text-center px-4">
                      <motion.h3 
                        className="text-xl font-medium mb-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        Token Claimed!
                      </motion.h3>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <p className="text-muted-foreground mb-2">
                          "{tokenInfo.title}" has been added to your collection
                        </p>
                        <div className="flex items-center justify-center gap-1 text-yellow-400">
                          <Star className="h-4 w-4 fill-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400" />
                          <span className="text-sm font-medium ml-1">+3 points</span>
                        </div>
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      className="flex gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Button 
                        variant="outline" 
                        onClick={resetScan}
                        className="frost-panel"
                      >
                        Scan Another
                      </Button>
                      <Button 
                        onClick={() => {
                          navigate('/profile');
                          if ('vibrate' in navigator) {
                            navigator.vibrate(50);
                          }
                        }}
                        className="bg-deep-gradient shadow-glow-sm"
                      >
                        View Collection
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
                
                {status === ScanStatus.ERROR && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-8 px-4"
                  >
                    <Alert variant="destructive" className="mb-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error scanning QR code</AlertTitle>
                      <AlertDescription>
                        The QR code couldn't be processed. Please try again with a valid cToken QR code.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="flex justify-center mt-6">
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Button onClick={resetScan}>Try Again</Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
            
            <CardFooter className="border-t border-white/5 pt-4 text-xs text-muted-foreground">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Scanning allows you to claim compressed tokens with minimal transaction fees.
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Scan;
