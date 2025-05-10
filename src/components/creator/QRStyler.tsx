
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { Check, Download, Eye } from 'lucide-react';

type QRStyle = {
  id: string;
  name: string;
  previewUrl: string;
};

const qrStyles: QRStyle[] = [
  {
    id: "standard",
    name: "Standard",
    previewUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=standard"
  },
  {
    id: "rounded",
    name: "Rounded",
    previewUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=rounded" 
  },
  {
    id: "circular",
    name: "Circular",
    previewUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=circular"
  },
  {
    id: "dotted",
    name: "Dotted",
    previewUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=dotted"
  }
];

const QRStyler = () => {
  const [selectedStyle, setSelectedStyle] = useState("standard");
  const [selectedTab, setSelectedTab] = useState("style");
  const [foregroundColor, setForegroundColor] = useState("#2D0C76");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [logoEnabled, setLogoEnabled] = useState(false);
  const [cornerRadius, setCornerRadius] = useState([25]);
  const [logoSize, setLogoSize] = useState([30]);
  const { toast } = useToast();
  
  const handleDownload = () => {
    toast({
      title: "QR Code downloaded",
      description: "Your customized QR code has been downloaded."
    });
  };
  
  const handleSaveStyle = () => {
    toast({
      title: "Style saved",
      description: "Your QR code style has been saved as default."
    });
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold creator-gradient-text mb-2">QR Code Styling</h2>
        <p className="text-muted-foreground">Customize how your QR codes look when shared with attendees</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="logo">Logo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="style" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {qrStyles.map((style) => (
                  <motion.div
                    key={style.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      relative rounded-xl overflow-hidden cursor-pointer border transition-all
                      ${selectedStyle === style.id 
                        ? 'border-creator-primary shadow-creator' 
                        : 'border-white/10'}
                    `}
                    onClick={() => setSelectedStyle(style.id)}
                  >
                    <div className="bg-white p-3">
                      <img 
                        src={style.previewUrl}
                        alt={style.name}
                        className="w-full aspect-square object-contain"
                      />
                    </div>
                    
                    <div className="p-2 flex justify-between items-center">
                      <p className="text-sm font-medium">{style.name}</p>
                      
                      {selectedStyle === style.id && (
                        <div className="h-5 w-5 rounded-full bg-creator-primary flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="cornerRadius">Corner Radius</Label>
                    <span className="text-sm text-muted-foreground">{cornerRadius}%</span>
                  </div>
                  <Slider
                    id="cornerRadius" 
                    min={0} 
                    max={50} 
                    step={1}
                    value={cornerRadius} 
                    onValueChange={setCornerRadius}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="colors" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="foregroundColor">Foreground Color</Label>
                  <div className="flex gap-3">
                    <div 
                      className="h-10 w-10 rounded-md border border-white/20"
                      style={{ backgroundColor: foregroundColor }}
                    />
                    <Input
                      id="foregroundColor"
                      type="text"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="input-creator"
                    />
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2">
                    {['#2D0C76', '#5438DC', '#00D18B', '#FF9F5A', '#FFFFFF'].map((color) => (
                      <div
                        key={color}
                        className={`h-8 rounded-md cursor-pointer border ${color === foregroundColor ? 'ring-2 ring-creator-primary-light' : 'border-white/10'}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setForegroundColor(color)}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label htmlFor="backgroundColor">Background Color</Label>
                  <div className="flex gap-3">
                    <div 
                      className="h-10 w-10 rounded-md border border-white/20"
                      style={{ backgroundColor: backgroundColor }}
                    />
                    <Input
                      id="backgroundColor"
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="input-creator"
                    />
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2">
                    {['#FFFFFF', '#F8F9FD', '#EEEEFF', '#222222', '#000000'].map((color) => (
                      <div
                        key={color}
                        className={`h-8 rounded-md cursor-pointer border ${color === backgroundColor ? 'ring-2 ring-creator-primary-light' : 'border-white/10'}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setBackgroundColor(color)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-4">
                <h3 className="text-sm font-medium mb-3">Gradient Options</h3>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {[
                    'linear-gradient(to right, #2D0C76, #5438DC)',
                    'linear-gradient(to right, #00D18B, #38DCA8)',
                    'linear-gradient(to right, #FF9F5A, #FFBD80)',
                    'linear-gradient(to right, #5438DC, #00D18B)',
                    'linear-gradient(to right, #2D0C76, #FF9F5A)'
                  ].map((gradient, index) => (
                    <div
                      key={index}
                      className="h-8 rounded-md cursor-pointer border border-white/10 hover:border-white/30 transition-colors"
                      style={{ background: gradient }}
                      onClick={() => setForegroundColor(gradient)}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="logo" className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="logo-toggle" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <span>Add Logo to QR Code</span>
                  <div className="rounded-full px-2 py-0.5 bg-creator-primary/20 text-xs text-creator-primary-light">Premium</div>
                </Label>
                <Switch 
                  id="logo-toggle"
                  checked={logoEnabled}
                  onCheckedChange={setLogoEnabled}
                />
              </div>
              
              {logoEnabled && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="border border-dashed border-white/20 rounded-lg p-6 flex flex-col items-center justify-center bg-black/10 hover:bg-black/20 transition-colors cursor-pointer">
                    <div className="h-16 w-16 rounded-lg bg-creator-primary/20 flex items-center justify-center mb-3">
                      <svg className="h-8 w-8 text-creator-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                      </svg>
                    </div>
                    <p className="text-sm text-center">
                      Drag and drop or click to upload your logo
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 text-center">
                      Recommended: PNG or SVG with transparency, square format
                    </p>
                    <Input
                      type="file"
                      className="hidden"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="logoSize">Logo Size</Label>
                      <span className="text-sm text-muted-foreground">{logoSize}%</span>
                    </div>
                    <Slider
                      id="logoSize" 
                      min={10} 
                      max={50} 
                      step={1}
                      value={logoSize} 
                      onValueChange={setLogoSize}
                    />
                  </div>
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="mb-4 text-center">
            <h3 className="text-sm font-medium mb-1">Preview</h3>
            <p className="text-xs text-muted-foreground">
              This is how your QR code will appear to scanners
            </p>
          </div>
          
          <div className="p-8 bg-white rounded-xl shadow-lg mb-6">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${selectedStyle}`}
              alt="QR Code Preview"
              className="w-[180px] h-[180px]"
              style={{ 
                filter: `hue-rotate(${foregroundColor === "#2D0C76" ? "0deg" : "240deg"})`
              }}
            />
          </div>
          
          <div className="space-y-3 w-full">
            <Button 
              className="w-full bg-creator-primary hover:bg-creator-primary-light"
              onClick={handleSaveStyle}
            >
              <Check className="h-4 w-4 mr-2" />
              Save as Default Style
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full bg-black/20 border-white/10 hover:bg-black/30"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 mr-2" />
              Download QR Code
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full bg-black/20 border-white/10 hover:bg-black/30"
            >
              <Eye className="h-4 w-4 mr-2" />
              Test Scanner
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRStyler;
