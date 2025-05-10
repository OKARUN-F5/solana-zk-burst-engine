
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { QrCode, Plus, User } from 'lucide-react';

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-ctoken-gradient animate-pulse-glow">
            <div className="absolute inset-[1px] rounded-full bg-background flex items-center justify-center">
              <QrCode className="h-4 w-4 text-primary" />
            </div>
          </div>
          {!isMobile && (
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-ctoken-gradient">
              cToken POP
            </h1>
          )}
        </Link>
        
        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/scan" className="flex items-center gap-1">
              <QrCode className="h-4 w-4" />
              {!isMobile && <span>Scan</span>}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/create" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              {!isMobile && <span>Create</span>}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/profile" className="flex items-center gap-1">
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
