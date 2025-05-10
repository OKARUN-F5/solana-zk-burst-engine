
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface QRDisplayProps {
  value: string;
  size?: number;
  downloadName?: string;
}

const QRDisplay: React.FC<QRDisplayProps> = ({ 
  value, 
  size = 200,
  downloadName = "qr-code" 
}) => {
  const [copied, setCopied] = useState(false);
  
  // In a real application, we would generate a real QR code here
  // For now, we'll use a placeholder
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
  };
  
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);
  
  const handleDownload = () => {
    // In a real app, we would use the QR code canvas to generate a download
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `${downloadName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <img
          src={qrCodeUrl}
          alt="QR Code"
          width={size}
          height={size}
          className="rounded-md"
        />
      </div>
      
      <div className="flex gap-2 w-full justify-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopy}
        >
          <Copy className="h-4 w-4 mr-1" />
          {copied ? "Copied!" : "Copy Link"}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDownload}
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default QRDisplay;
