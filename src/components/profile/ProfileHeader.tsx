
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ProfileHeader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="p-4 md:p-6 frost-panel col-span-2">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex items-center justify-center h-16 w-16 rounded-full bg-glow-gradient shadow-glow-md overflow-hidden">
            <div className="absolute inset-[2px] rounded-full bg-card flex items-center justify-center">
              <span className="text-xl font-bold text-foreground">AR</span>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-medium tracking-tight">Alice Renderer</h3>
            <p className="text-sm text-muted-foreground">sol...x3fY</p>
          </div>
          <div className="ml-auto hidden md:block">
            <Link to="/profile/edit">
              <Button variant="outline" size="sm" className="frost-panel border-electric-blue/20 text-electric-blue hover:text-electric-blue/80">
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>
      </Card>
      
      <Card className="p-4 md:p-6 frost-panel">
        <h3 className="text-lg font-medium mb-1">Collected</h3>
        <div className="flex items-end justify-between">
          <span className="text-3xl font-semibold tracking-tighter">2</span>
          <Badge variant="outline" className="bg-mint-green/10 text-mint-green border-mint-green/20">
            Tokens
          </Badge>
        </div>
      </Card>
      
      <Card className="p-4 md:p-6 frost-panel">
        <h3 className="text-lg font-medium mb-1">Created</h3>
        <div className="flex items-end justify-between">
          <span className="text-3xl font-semibold tracking-tighter">1</span>
          <Badge variant="outline" className="bg-coral/10 text-coral border-coral/20">
            Events
          </Badge>
        </div>
      </Card>
    </div>
  );
};

export default ProfileHeader;
