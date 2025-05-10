
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Scan, Plus } from 'lucide-react';

interface QuickActionsProps {
  triggerHapticFeedback: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ triggerHapticFeedback }) => {
  return (
    <Card className="p-4 md:p-6 frost-panel col-span-1 md:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Link to="/scan" className="block">
          <Button 
            variant="outline" 
            className="frost-panel w-full h-auto py-4 flex flex-col gap-2 items-center justify-center hover:shadow-glow-sm transition-all"
            onClick={triggerHapticFeedback}
          >
            <Scan className="h-6 w-6 text-electric-blue mb-1" />
            <span className="text-sm font-medium">Scan Token</span>
          </Button>
        </Link>
        <Link to="/create" className="block">
          <Button 
            variant="outline" 
            className="frost-panel w-full h-auto py-4 flex flex-col gap-2 items-center justify-center hover:shadow-glow-sm transition-all"
            onClick={triggerHapticFeedback}
          >
            <Plus className="h-6 w-6 text-mint-green mb-1" />
            <span className="text-sm font-medium">Create Token</span>
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default QuickActions;
