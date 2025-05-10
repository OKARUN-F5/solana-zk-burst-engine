
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CompressionStatus = () => {
  return (
    <Card className="p-4 md:p-6 frost-panel col-span-1 md:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">ZK Compression Status</h3>
        <Badge variant="outline" className="bg-deep-gradient text-white border-none">Active</Badge>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Storage Saved</span>
          <span className="font-medium">94%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div className="bg-deep-gradient h-full rounded-full w-[94%] shimmer-bg"></div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          You've saved 0.34 SOL using ZK Compression technology
        </p>
      </div>
    </Card>
  );
};

export default CompressionStatus;
