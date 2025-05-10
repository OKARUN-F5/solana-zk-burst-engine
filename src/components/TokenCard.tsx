
import React, { useState } from 'react';
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
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate rotation - limit to small angles for subtle effect
    const rotateX = ((mouseY - centerY) / (rect.height / 2)) * -5;
    const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 5;

    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    // Reset rotations
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <motion.div
        className="token-card cursor-pointer overflow-hidden transition-all duration-300"
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 15 
        }}
      >
        <div className="relative overflow-hidden">
          {imageUrl ? (
            <motion.img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-32 object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
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
                  ? "bg-teal-500 border-teal-500/10 text-black font-medium shadow-glow-sm" 
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
              <motion.span 
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block w-2 h-2 rounded-full bg-electric-blue mr-2"
              />
              {date}
            </p>
          )}
        </div>
        
        {/* Shine effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0"
          initial={{ opacity: 0, left: "-100%" }}
          whileHover={{ 
            opacity: 0.15, 
            left: "100%", 
            transition: { duration: 0.7 } 
          }}
          transition={{ duration: 0.7 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default TokenCard;
