
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { QrCode, Plus, User, Scan } from 'lucide-react';

const Header = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const triggerHapticFeedback = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={triggerHapticFeedback}>
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-deep-gradient animate-pulse-glow shadow-glow-md">
            <div className="absolute inset-[1px] rounded-full bg-background flex items-center justify-center">
              <QrCode className="h-4 w-4 text-electric-blue" />
            </div>
          </div>
          {!isMobile && (
            <h1 className="text-xl font-bold glow-text tracking-tighter">
              cToken POP
            </h1>
          )}
        </Link>
        
        <nav className="flex items-center gap-2">
          <Button 
            asChild 
            variant={isActive("/scan") ? "default" : "ghost"} 
            size="sm"
            className={isActive("/scan") ? "bg-deep-gradient text-white shadow-glow-sm" : ""}
            onClick={triggerHapticFeedback}
          >
            <Link to="/scan" className="flex items-center gap-2">
              <Scan className="h-4 w-4" />
              {!isMobile && <span>Scan</span>}
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant={isActive("/create") ? "default" : "ghost"} 
            size="sm"
            className={isActive("/create") ? "bg-deep-gradient text-white shadow-glow-sm" : ""}
            onClick={triggerHapticFeedback}
          >
            <Link to="/create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {!isMobile && <span>Create</span>}
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant={isActive("/creator") ? "default" : "ghost"} 
            size="sm"
            className={isActive("/creator") ? "bg-gradient-to-r from-creator-primary to-creator-primary-light text-white shadow-glow-sm" : ""}
            onClick={triggerHapticFeedback}
          >
            <Link to="/creator" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              {!isMobile && <span>Creator</span>}
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant={isActive("/profile") ? "default" : "ghost"} 
            size="sm"
            className={isActive("/profile") ? "bg-deep-gradient text-white shadow-glow-sm" : ""}
            onClick={triggerHapticFeedback}
          >
            <Link to="/profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {!isMobile && <span>Profile</span>}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
