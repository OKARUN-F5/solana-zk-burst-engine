
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Check, QrCode, User } from 'lucide-react';

interface UseCaseOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

const useCaseOptions: UseCaseOption[] = [
  {
    id: 'creator',
    title: 'Event Creator',
    description: 'Create and distribute tokens for your events, conferences, or communities',
    icon: <QrCode className="h-6 w-6 text-onboarding-action" />,
    benefits: [
      'Issue tokens for attendees to claim',
      'Track engagement and participation',
      'Reward community members',
      'Create exclusive experiences',
    ]
  },
  {
    id: 'attendee',
    title: 'Event Attendee',
    description: 'Collect tokens from events and experiences you participate in',
    icon: <User className="h-6 w-6 text-onboarding-highlight" />,
    benefits: [
      'Prove your attendance at events',
      'Build a collection of experiences',
      'Unlock exclusive benefits from creators',
      'Join token-gated communities',
    ]
  }
];

const UseCaseSelection: React.FC = () => {
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-jakarta font-bold text-2xl tracking-onboarding mb-2">How Will You Use cTokens?</h2>
        <p className="text-white/80 font-jakarta tracking-onboarding leading-onboarding mb-6">
          We'll personalize your experience based on your primary use case.
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {useCaseOptions.map((option) => (
          <Card 
            key={option.id}
            className={`border cursor-pointer transition-all duration-300 ${
              selectedUseCase === option.id 
                ? 'border-onboarding-action bg-white/10' 
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
            onClick={() => setSelectedUseCase(option.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center mr-4 ${
                  selectedUseCase === option.id 
                    ? 'bg-onboarding-action/20' 
                    : 'bg-white/10'
                }`}>
                  {option.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-jakarta font-semibold text-lg tracking-onboarding">{option.title}</h3>
                    {selectedUseCase === option.id && <Check className="h-5 w-5 text-onboarding-action" />}
                  </div>
                  <p className="text-white/70 font-jakarta text-sm tracking-onboarding leading-onboarding mt-1">
                    {option.description}
                  </p>
                  
                  {selectedUseCase === option.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <p className="font-jakarta text-xs text-white/60 mb-2">BENEFITS:</p>
                      <ul className="space-y-1">
                        {option.benefits.map((benefit, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + (index * 0.1) }}
                            className="flex items-center text-sm font-jakarta tracking-onboarding"
                          >
                            <span className="text-xs text-onboarding-highlight mr-2">•</span>
                            {benefit}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </>
  );
};

export default UseCaseSelection;
