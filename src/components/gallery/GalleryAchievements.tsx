
import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  completed: boolean;
  image?: string;
}

interface GalleryAchievementsProps {
  achievements: Achievement[];
}

const GalleryAchievements: React.FC<GalleryAchievementsProps> = ({ achievements }) => {
  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h2 className="font-dm-sans font-bold text-2xl tracking-super-tight text-white">Collection Achievements</h2>
          <p className="text-slate-300">Unlock special badges and rewards by collecting tokens</p>
        </div>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {achievements.map((achievement) => (
            <CarouselItem key={achievement.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <AchievementCard achievement={achievement} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-end gap-2 mt-4">
          <CarouselPrevious className="bg-black/30 border-white/10 text-white hover:bg-black/50" />
          <CarouselNext className="bg-black/30 border-white/10 text-white hover:bg-black/50" />
        </div>
      </Carousel>
    </div>
  );
};

const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative rounded-xl overflow-hidden backdrop-blur-sm p-4 h-full
        ${achievement.completed 
          ? 'bg-gradient-to-br from-gallery-accent-teal/20 to-gallery-accent-pink/20 border border-gallery-accent-teal/30' 
          : 'bg-black/30 border border-white/10'}`}
    >
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4
          ${achievement.completed 
            ? 'bg-gallery-accent-teal text-black' 
            : 'bg-white/10 text-white/70'}`}
        >
          <BadgeCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-dm-sans font-bold text-lg tracking-super-tight text-white">{achievement.title}</h3>
          <p className="text-sm text-slate-300">{achievement.description}</p>
        </div>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-white/70">Progress</span>
          <span className={achievement.completed ? 'text-gallery-accent-teal' : 'text-white/70'}>
            {achievement.progress}/{achievement.total}
          </span>
        </div>
        <Progress 
          value={(achievement.progress / achievement.total) * 100} 
          className={`h-2 ${achievement.completed ? 'bg-white/20' : 'bg-white/10'}`}
        />
      </div>
      
      {achievement.completed && (
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-0 right-0 transform rotate-45 translate-y-[-50%] translate-x-[50%] w-24 text-center py-1 bg-gallery-accent-teal text-xs font-medium text-black">
            UNLOCKED
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GalleryAchievements;
