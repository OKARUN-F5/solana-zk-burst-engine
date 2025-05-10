
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

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
      className="token-card cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-glow-md"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-32 bg-gradient-to-br from-deep-purple to-electric-blue opacity-80 relative overflow-hidden">
            {/* Abstract pattern overlay */}
            <div className="absolute inset-0 opacity-30" 
                 style={{ 
                   backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E\")",
                   backgroundSize: "30px 30px"
                 }}>
            </div>
            
            {/* Floating particles animation */}
            <motion.div 
              className="absolute w-6 h-6 rounded-full bg-white/20"
              animate={{ 
                x: [0, 10, 20, 10, 0],
                y: [0, 15, 5, 20, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ left: '20%', top: '30%' }}
            />
            
            <motion.div 
              className="absolute w-4 h-4 rounded-full bg-white/20"
              animate={{ 
                x: [0, -15, -5, -20, 0],
                y: [0, 10, 20, 5, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ right: '30%', top: '20%' }}
            />
          </div>
        )}
        
        {claimed !== undefined && (
          <div className="absolute top-2 right-2">
            <Badge 
              variant={claimed ? "default" : "outline"} 
              className={claimed 
                ? "bg-mint-green border-mint-green/10 text-black font-medium shadow-glow-sm" 
                : "bg-transparent border-white/20 text-white"
              }
            >
              {claimed ? "Claimed" : "Unclaimed"}
            </Badge>
          </div>
        )}
        
        {count !== undefined && (
          <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md text-white px-2 py-1 rounded-md text-xs font-medium">
            {count} issued
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
        {date && (
          <p className="text-xs text-muted-foreground mt-2 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-electric-blue mr-2"></span>
            {date}
          </p>
        )}
      </div>
    </Card>
  );
};

export default TokenCard;
