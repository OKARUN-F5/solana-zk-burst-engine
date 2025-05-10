
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CheckCircle, Image, Plus, Zap } from 'lucide-react';
import QRDisplay from '@/components/QRDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';

type WizardStep = {
  id: number;
  title: string;
  description: string;
};

const steps: WizardStep[] = [
  { 
    id: 1, 
    title: "Basic Info", 
    description: "Enter essential token details" 
  },
  { 
    id: 2, 
    title: "Appearance", 
    description: "Customize the visual elements" 
  },
  { 
    id: 3, 
    title: "Preview", 
    description: "Review your token before creating" 
  },
  { 
    id: 4, 
    title: "Deploy", 
    description: "Create your compressed token" 
  },
];

const TokenWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [creationComplete, setCreationComplete] = useState(false);
  const [tokenData, setTokenData] = useState({
    title: "",
    description: "",
    image: "",
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
  
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
    
    // If moving to final step, simulate token creation
    if (currentStep === 3) {
      handleCreateToken();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleCreateToken = () => {
    // Validate form
    if (!tokenData.title) {
      toast({
        title: "Missing information",
        description: "Please provide a title for your token",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate token creation delay
    setTimeout(() => {
      setLoading(false);
      setCreationComplete(true);
      
      // Generate a mock token ID
      const tokenId = "cToken_" + Math.random().toString(36).substring(2, 15);
      setQrValue(`solana:token/${tokenId}`);
      
      toast({
        title: "Token created successfully",
        description: "Your compressed token has been created and is ready to share",
      });
    }, 2000);
  };
  
  const progressPercentage = (currentStep / steps.length) * 100;
  
  return (
    <div className="space-y-8">
      {/* Wizard Progress */}
      <div className="space-y-6">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div 
                className={`wizard-step ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
              >
                {currentStep > step.id ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div 
                  className={`wizard-connector ${currentStep > step.id ? 'active' : ''}`}
                />
              )}
              <div className="mt-2 text-center">
                <p className="text-xs font-medium">{step.title}</p>
                <p className="text-xs text-muted-foreground hidden md:block">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Progress value={progressPercentage} className="h-1.5 bg-black/20" />
      </div>
      
      {/* Step Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {currentStep === 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold creator-gradient-text">Basic Information</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Token Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    placeholder="e.g., Solana Hackathon 2025" 
                    value={tokenData.title}
                    onChange={handleInputChange}
                    className="input-creator"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    placeholder="What is this token for?" 
                    rows={3}
                    value={tokenData.description}
                    onChange={handleInputChange}
                    className="input-creator"
                  />
                </div>
              </div>
            </motion.div>
          )}
          
          {currentStep === 2 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold creator-gradient-text">Token Appearance</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Token Image (Optional)</Label>
                  <div className="border border-dashed border-white/20 rounded-lg p-6 flex flex-col items-center justify-center bg-black/10 hover:bg-black/20 transition-colors cursor-pointer">
                    <Image className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended: 800x800px, max 5MB
                    </p>
                    <Input 
                      id="image"
                      type="file"
                      className="hidden"
                    />
                  </div>
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
                      className="input-creator"
                    />
                    <p className="text-xs text-muted-foreground">Maximum number of tokens that can be claimed</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expirationDate">Expiration Date (Optional)</Label>
                    <Input 
                      id="expirationDate" 
                      name="expirationDate" 
                      type="date"
                      value={tokenData.expirationDate}
                      onChange={handleInputChange}
                      className="input-creator"
                    />
                    <p className="text-xs text-muted-foreground">Date after which tokens can no longer be claimed</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {currentStep === 3 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold creator-gradient-text">Preview & Confirm</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Token Details</h3>
                  <div className="rounded-lg border border-white/10 bg-black/10 p-4 space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Title:</span>
                      <p className="font-medium">{tokenData.title || "Untitled Token"}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-muted-foreground">Description:</span>
                      <p className="text-sm">{tokenData.description || "No description provided"}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-muted-foreground">Max Supply:</span>
                      <p>{tokenData.maxSupply}</p>
                    </div>
                    
                    {tokenData.expirationDate && (
                      <div>
                        <span className="text-sm text-muted-foreground">Expires:</span>
                        <p>{new Date(tokenData.expirationDate).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">ZK Compression Benefits</h3>
                  <div className="rounded-lg border border-white/10 bg-black/10 p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-creator-primary/20 p-1.5 rounded-full">
                        <Zap className="h-4 w-4 text-creator-primary-light" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">99.8% Cost Savings</p>
                        <p className="text-xs text-muted-foreground">Compared to regular Solana tokens</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-creator-primary/20 p-1.5 rounded-full">
                        <Plus className="h-4 w-4 text-creator-primary-light" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Unlimited Scalability</p>
                        <p className="text-xs text-muted-foreground">Create millions of tokens with minimal cost</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {currentStep === 4 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold creator-gradient-text">Token Created</h2>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <LoadingSpinner size="md" className="mb-4" />
                  <p className="text-muted-foreground">Creating your ZK-compressed token on Solana...</p>
                </div>
              ) : creationComplete ? (
                <div className="flex flex-col items-center py-4">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="mb-6"
                  >
                    <div className="bg-creator-success/20 p-4 rounded-full mb-4">
                      <CheckCircle className="h-12 w-12 text-creator-success" />
                    </div>
                    <h3 className="text-center text-xl font-medium mb-2">Token Created Successfully!</h3>
                    <p className="text-center text-muted-foreground">
                      Your token is now ready to be distributed
                    </p>
                  </motion.div>
                  
                  <div className="p-1 bg-white rounded-lg">
                    <QRDisplay 
                      value={qrValue} 
                      size={180}
                      downloadName={tokenData.title.replace(/\s+/g, '_')}
                    />
                  </div>
                  
                  <div className="mt-6 w-full space-y-4">
                    <Button className="w-full bg-gradient-to-r from-creator-primary to-creator-primary-light hover:opacity-90">
                      Continue to Distribution
                    </Button>
                    <Button variant="outline" className="w-full bg-black/20 border-white/10 hover:bg-black/30">
                      Create Another Token
                    </Button>
                  </div>
                </div>
              ) : null}
            </motion.div>
          )}
        </div>
        
        <div className="lg:col-span-2">
          <Card className="p-6 bg-black/20 border-white/10 h-full">
            <h3 className="text-sm font-medium mb-4">Live Preview</h3>
            
            <div className="relative aspect-square rounded-lg overflow-hidden border border-white/10 mb-4">
              <div className="token-3d w-full h-full bg-gradient-to-br from-creator-primary to-creator-primary-light">
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div className="text-white">
                    <h3 className="font-semibold text-lg tracking-tight break-words">
                      {tokenData.title || "Your Token Title"}
                    </h3>
                    <p className="text-sm text-white/70 line-clamp-2 mt-1">
                      {tokenData.description || "Token description will appear here"}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div className="bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                      <p className="text-xs text-white/90 font-medium">
                        Max Supply: {tokenData.maxSupply}
                      </p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm p-1.5 rounded-lg">
                      <img
                        src="https://cryptologos.cc/logos/solana-sol-logo.png"
                        alt="Solana"
                        className="w-5 h-5"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mb-6">
              This is how your token will appear to collectors
            </p>
            
            {/* Technical Details */}
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">Token Technical Details</p>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-black/20 rounded-md p-2">
                  <span className="text-muted-foreground">Type:</span>
                  <p className="font-mono">ZK-Compressed</p>
                </div>
                
                <div className="bg-black/20 rounded-md p-2">
                  <span className="text-muted-foreground">Standard:</span>
                  <p className="font-mono">SPL Token</p>
                </div>
                
                <div className="bg-black/20 rounded-md p-2">
                  <span className="text-muted-foreground">Decimals:</span>
                  <p className="font-mono">0</p>
                </div>
                
                <div className="bg-black/20 rounded-md p-2">
                  <span className="text-muted-foreground">ZK Proof:</span>
                  <p className="font-mono">Groth16</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      {currentStep !== 4 && (
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="bg-black/20 border-white/10 hover:bg-black/30 disabled:opacity-50"
          >
            Back
          </Button>
          
          <Button 
            onClick={handleNext}
            className="bg-gradient-to-r from-creator-primary to-creator-primary-light hover:opacity-90"
          >
            {currentStep === 3 ? "Create Token" : "Continue"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TokenWizard;
