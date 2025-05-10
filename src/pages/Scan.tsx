
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import QRScanner from '@/components/QRScanner';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Check, QrCode, AlertCircle } from 'lucide-react';

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
  };
  
  const handleScanResult = (data: string) => {
    console.log('QR code scanned:', data);
    setStatus(ScanStatus.PROCESSING);
    
    // Simulate processing delay
    setTimeout(() => {
      // Check if the QR code is valid
      if (!data.startsWith('solana:')) {
        setStatus(ScanStatus.ERROR);
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
      
      toast({
        title: "Token claimed successfully",
        description: "The compressed token has been added to your collection",
      });
    }, 2000);
  };
  
  const resetScan = () => {
    setStatus(ScanStatus.READY);
    setTokenInfo(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-1">Scan & Claim</h1>
          <p className="text-muted-foreground mb-6">Scan a QR code to claim a compressed token</p>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                QR Scanner
              </CardTitle>
              <CardDescription>
                Point your camera at a cToken QR code to claim it
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {status === ScanStatus.READY && (
                <div className="flex flex-col items-center py-8 gap-4">
                  <div className="p-4 rounded-full bg-muted">
                    <QrCode className="h-12 w-12 text-solana" />
                  </div>
                  <Button onClick={handleStartScan}>Start Scanning</Button>
                </div>
              )}
              
              {status === ScanStatus.SCANNING && (
                <QRScanner onScan={handleScanResult} />
              )}
              
              {status === ScanStatus.PROCESSING && (
                <div className="flex flex-col items-center py-12 gap-6">
                  <LoadingSpinner size="lg" />
                  <p className="text-muted-foreground">Processing your token claim...</p>
                </div>
              )}
              
              {status === ScanStatus.SUCCESS && tokenInfo && (
                <div className="flex flex-col items-center py-8 gap-6 animate-fade-in">
                  <div className="h-20 w-20 rounded-full bg-ctoken/20 flex items-center justify-center">
                    <Check className="h-10 w-10 text-ctoken" />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-1">Token Claimed!</h3>
                    <p className="text-muted-foreground">"{tokenInfo.title}" has been added to your collection</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={resetScan}>Scan Another</Button>
                    <Button onClick={() => navigate('/profile')}>View Collection</Button>
                  </div>
                </div>
              )}
              
              {status === ScanStatus.ERROR && (
                <div className="py-6">
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error scanning QR code</AlertTitle>
                    <AlertDescription>
                      The QR code couldn't be processed. Please try again with a valid cToken QR code.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="flex justify-center mt-6">
                    <Button onClick={resetScan}>Try Again</Button>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
              Scanning allows you to claim compressed tokens with minimal transaction fees.
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Scan;
