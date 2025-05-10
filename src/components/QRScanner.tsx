
import React, { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface QRScannerProps {
  onScan: (data: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const { toast } = useToast();
  
  // Mock implementation - in a real app, we would use a QR code scanning library
  useEffect(() => {
    // Simulate loading the camera
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Simulate requesting camera permission
      const mockAskPermission = async () => {
        try {
          // In a real app, this would be navigator.mediaDevices.getUserMedia({ video: true })
          setHasPermission(true);
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
    if (hasPermission) {
      // In a real app, this would be the callback from the QR scanner library
      const timer = setTimeout(() => {
        // Mocked QR code data
        const mockQRData = "solana:cToken123456789";
        onScan(mockQRData);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [hasPermission, onScan]);
  
  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto overflow-hidden rounded-lg">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : hasPermission ? (
        <>
          {/* This would be a video element in a real implementation */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-background">
            {/* Scanning animation */}
            <div className="absolute left-0 right-0 h-0.5 bg-ctoken-light top-1/2 animate-pulse"></div>
          </div>
          
          {/* Scanner overlay */}
          <div className="absolute inset-0 p-8">
            <div className="w-full h-full border-2 border-dashed border-white/40 rounded-lg"></div>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted p-4 text-center">
          <p className="mb-4">Camera access is required to scan QR codes</p>
          <button 
            className="px-4 py-2 bg-primary text-white rounded-md"
            onClick={() => setHasPermission(true)}
          >
            Allow Camera Access
          </button>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
