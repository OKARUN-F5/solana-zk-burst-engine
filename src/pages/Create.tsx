
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import QRDisplay from '@/components/QRDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import { CheckCircle } from 'lucide-react';

const Create = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenData, setTokenData] = useState({
    title: "",
    description: "",
    maxSupply: "100",
    expirationDate: "",
  });
  const [qrValue, setQrValue] = useState("");
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTokenData({
      ...tokenData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tokenData.title) {
      toast({
        title: "Missing information",
        description: "Please provide a title for your token",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate token creation delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setActiveTab("share");
      
      // Generate a mock token ID
      const tokenId = "cToken_" + Math.random().toString(36).substring(2, 15);
      setQrValue(`solana:token/${tokenId}`);
      
      toast({
        title: "Token created successfully",
        description: "Your compressed token has been created and is ready to share",
      });
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-1">Create a new cToken</h1>
          <p className="text-muted-foreground mb-6">Design your compressed token for attendees to claim</p>
          
          <Card>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <CardHeader>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="details">Token Details</TabsTrigger>
                  <TabsTrigger value="share" disabled={!isSuccess}>Share</TabsTrigger>
                </TabsList>
              </CardHeader>
              
              <CardContent>
                <TabsContent value="details">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Token Title</Label>
                        <Input 
                          id="title" 
                          name="title" 
                          placeholder="e.g., Solana Hackathon 2025" 
                          value={tokenData.title}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                          id="description" 
                          name="description" 
                          placeholder="What is this token for?" 
                          rows={4}
                          value={tokenData.description}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="maxSupply">Max Supply</Label>
                          <Input 
                            id="maxSupply" 
                            name="maxSupply" 
                            type="number"
                            min="1"
                            placeholder="100" 
                            value={tokenData.maxSupply}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="expirationDate">Expiration Date (Optional)</Label>
                          <Input 
                            id="expirationDate" 
                            name="expirationDate" 
                            type="date"
                            value={tokenData.expirationDate}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button type="submit" className="w-full" disabled={isLoading || isSuccess}>
                        {isLoading ? (
                          <>
                            <LoadingSpinner size="sm" className="mr-2" />
                            Creating Token...
                          </>
                        ) : isSuccess ? (
                          <>
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Token Created
                          </>
                        ) : (
                          "Create Token"
                        )}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="share">
                  <div className="flex flex-col items-center space-y-6 py-4">
                    <div>
                      <h3 className="text-lg font-semibold text-center mb-2">Share this QR code with attendees</h3>
                      <p className="text-sm text-muted-foreground text-center mb-6">
                        Attendees can scan this QR code to claim their token
                      </p>
                    </div>
                    
                    <QRDisplay 
                      value={qrValue} 
                      size={240}
                      downloadName={tokenData.title.replace(/\s+/g, '_')}
                    />
                    
                    <div className="bg-muted/50 p-4 rounded-lg mt-6 w-full max-w-md">
                      <h4 className="font-medium mb-2">Token Details</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-muted-foreground">Title:</span> {tokenData.title}</p>
                        <p><span className="text-muted-foreground">Max Supply:</span> {tokenData.maxSupply}</p>
                        {tokenData.expirationDate && (
                          <p><span className="text-muted-foreground">Expires:</span> {new Date(tokenData.expirationDate).toLocaleDateString()}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
            
            <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
              Tokens are created using Solana ZK Compression for minimal cost and maximum scalability.
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Create;
