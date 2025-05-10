
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface TokenCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  date?: string;
  claimed?: boolean;
  count?: number;
  onClick?: () => void;
}

const TokenCard: React.FC<TokenCardProps> = ({
  title,
  description,
  imageUrl,
  date,
  claimed,
  count,
  onClick
}) => {
  return (
    <Card 
      className="token-card cursor-pointer group" 
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-32 object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-32 bg-gradient-to-br from-solana to-ctoken opacity-80" />
        )}
        
        {claimed !== undefined && (
          <div className="absolute top-2 right-2">
            <Badge variant={claimed ? "default" : "outline"} className={claimed ? "bg-ctoken" : ""}>
              {claimed ? "Claimed" : "Unclaimed"}
            </Badge>
          </div>
        )}
        
        {count !== undefined && (
          <div className="absolute bottom-2 right-2 bg-black/40 text-white px-2 py-1 rounded-md text-xs font-semibold">
            {count} issued
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
        {date && (
          <p className="text-xs text-muted-foreground mt-2">{date}</p>
        )}
      </div>
    </Card>
  );
};

export default TokenCard;
