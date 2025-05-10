
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Share, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface TokenGalleryCardProps {
  token: {
    id: string;
    title: string;
    description: string;
    image: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
    date: string;
    eventName?: string;
    claimed: boolean;
    value?: number;
  };
  onClick?: () => void;
  className?: string;
}

const getRarityColor = (rarity: string): string => {
  switch (rarity) {
    case 'common': return 'bg-slate-400';
    case 'uncommon': return 'bg-emerald-400';
    case 'rare': return 'bg-blue-500';
    case 'legendary': return 'bg-gallery-accent-pink';
    default: return 'bg-slate-400';
  }
};

const TokenGalleryCard: React.FC<TokenGalleryCardProps> = ({ token, onClick, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) - 0.5;
    const y = ((e.clientY - rect.top) / rect.height) - 0.5;
    
    setMousePosition({ x, y });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Sharing Token",
      description: `${token.title} has been shared to your clipboard.`,
    });
  };

  // For mobile devices - use device motion
  useEffect(() => {
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta === null || event.gamma === null) return;
      
      const x = (event.gamma || 0) / 30; // -30 to 30 degrees
      const y = (event.beta || 0) / 30; // -30 to 30 degrees
      
      setMousePosition({ 
        x: Math.max(-0.5, Math.min(0.5, x / 2)), 
        y: Math.max(-0.5, Math.min(0.5, y / 2)) 
      });
    };

    window.addEventListener('deviceorientation', handleDeviceOrientation);
    
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "token-card relative cursor-pointer overflow-hidden rounded-2xl h-full min-h-[280px] p-0.5",
        "bg-gradient-to-br from-gallery-bg-from to-gallery-bg-to",
        "shadow-token-card hover:shadow-token-glow transition-all duration-500",
        { "animate-glow-pulse": isHovered },
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        transform: isHovered ? `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)` : 'none',
        transition: isHovered ? 'none' : 'all 0.5s ease-out'
      }}
    >
      {/* Interior of card with gradient border effect */}
      <div className="absolute inset-0 p-0.5 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gallery-accent-pink/20 to-gallery-accent-teal/20 rounded-2xl" />
      </div>

      {/* Card content */}
      <div className="relative h-full flex flex-col z-10 rounded-2xl overflow-hidden backdrop-blur-sm bg-black/40">
        {/* Image */}
        <div className="relative h-40 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url(${token.image})`,
              transform: isHovered ? `scale(1.05) translateX(${mousePosition.x * 5}px) translateY(${mousePosition.y * 5}px)` : 'scale(1)',
              transition: 'transform 0.3s ease-out'
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          
          {/* Rarity badge */}
          <Badge className={`absolute top-2 left-2 capitalize ${getRarityColor(token.rarity)}`}>
            {token.rarity}
          </Badge>
        </div>

        {/* Card body */}
        <div className="relative flex flex-col flex-grow p-4">
          <h3 className="font-dm-sans font-bold text-lg tracking-super-tight text-white mb-1 line-clamp-1">
            {token.title}
          </h3>
          
          <p className="text-sm text-slate-300 mb-2 line-clamp-2" style={{ opacity: 0.8 }}>
            {token.description}
          </p>
          
          {token.eventName && (
            <span className="text-xs text-gallery-accent-teal mb-2">
              {token.eventName}
            </span>
          )}

          {/* Bottom info bar */}
          <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/10">
            <span className="text-xs text-slate-400">{token.date}</span>
            <div className="flex items-center gap-2">
              {token.value && (
                <span className="text-xs font-medium text-gallery-accent-teal">
                  ~${token.value.toFixed(2)}
                </span>
              )}
              <button 
                onClick={handleShare}
                className="text-white/70 hover:text-gallery-accent-pink transition-colors p-1"
              >
                <Share size={16} />
              </button>
              <button className="text-white/70 hover:text-yellow-400 transition-colors p-1">
                <Star size={16} />
              </button>
            </div>
          </div>
          
          {/* Shine effect on hover */}
          {isHovered && (
            <div 
              className="absolute inset-0 bg-card-shine opacity-20" 
              style={{ 
                transform: `translateX(${mousePosition.x * 200}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TokenGalleryCard;
