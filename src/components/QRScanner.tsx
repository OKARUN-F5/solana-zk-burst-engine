
import React, { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import ScanLine from '@/components/ScanLine';
import { QrCode, AlertCircle } from 'lucide-react';

interface QRScannerProps {
  onScan: (data: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const { toast } = useToast();
  
  // Simulate loading the camera
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Simulate requesting camera permission
      const mockAskPermission = async () => {
        try {
          // In a real app, this would be navigator.mediaDevices.getUserMedia({ video: true })
          setHasPermission(true);
          setScanActive(true);
          
          // Provide haptic feedback when scanner activates
          if ('vibrate' in navigator) {
            navigator.vibrate([50]);
          }
        } catch (error) {
          toast({
            title: "Camera access denied",
            description: "Please allow camera access to scan QR codes",
            variant: "destructive"
          });
          setHasPermission(false);
        }
      };
      
      mockAskPermission();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [toast]);
  
  // Simulate QR code detection after a delay
  useEffect(() => {
    if (hasPermission && scanActive) {
      // In a real app, this would be the callback from the QR scanner library
      const timer = setTimeout(() => {
        // Mocked QR code data
        const mockQRData = "solana:cToken123456789";
        
        // Provide strong haptic feedback on successful scan
        if ('vibrate' in navigator) {
          navigator.vibrate([100, 50, 100]);
        }
        
        setScanActive(false);
        onScan(mockQRData);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [hasPermission, scanActive, onScan]);
  
  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto overflow-hidden rounded-2xl">
      <AnimatePresence>
        {isLoading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-16 h-16 rounded-full border-2 border-violet-500 border-t-transparent"
            />
          </motion.div>
        ) : hasPermission ? (
          <>
            {/* Camera feed simulation with gradient background */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-br from-deep-purple/20 to-background"
            >
              {/* Grid pattern overlay for AR-like effect */}
              <div className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zm0-20h20v20H20V0zM0 20h20v20H0V20z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
                  backgroundSize: "40px 40px"
                }}
              />
            </motion.div>
            
            {/* Scanning animation */}
            {scanActive && <ScanLine />}
            
            {/* Scanner overlay */}
            <div className="absolute inset-0 p-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-full h-full border-2 border-white/30 rounded-xl"
              >
                {/* Corner markers for targeting effect */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-electric-blue rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-electric-blue rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-electric-blue rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-electric-blue rounded-br-lg" />
              </motion.div>
              
              {/* Instructions */}
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-white/80 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full inline-block"
                >
                  Point at a cToken QR code
                </motion.p>
              </div>
            </div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-md p-6 text-center"
          >
            <AlertCircle className="h-12 w-12 text-electric-blue mb-4" />
            <h3 className="text-lg font-medium mb-2">Camera access required</h3>
            <p className="mb-6 text-muted-foreground">We need camera access to scan QR codes</p>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-deep-gradient text-white rounded-xl font-medium shadow-glow-sm"
              onClick={() => {
                setHasPermission(true);
                if ('vibrate' in navigator) {
                  navigator.vibrate(50);
                }
              }}
            >
              Allow Camera Access
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QRScanner;
