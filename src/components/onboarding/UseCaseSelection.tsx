
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Users, Crown, HelpCircle } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

interface UseCaseSelectionProps {
  onSelectUserType: (type: 'creator' | 'attendee') => void;
  selectedUserType: 'creator' | 'attendee';
}

const UseCaseSelection: React.FC<UseCaseSelectionProps> = ({ onSelectUserType, selectedUserType }) => {
  const isMobile = useIsMobile();
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-jakarta font-bold text-xl sm:text-2xl tracking-onboarding mb-2">How will you use cTokens?</h2>
        <p className="text-white/80 font-jakarta tracking-onboarding leading-onboarding text-sm sm:text-base mb-4 sm:mb-6">
          Select your primary use case to personalize your experience.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            className={`w-full h-full p-4 rounded-lg flex flex-col items-center text-center transition-all
              ${selectedUserType === 'creator' 
                ? 'bg-white/20 border border-onboarding-highlight' 
                : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}
            onClick={() => onSelectUserType('creator')}
          >
            <div className="mb-3 relative">
              <div className="rounded-full bg-white/10 p-3">
                <Crown className="h-6 w-6 text-onboarding-highlight" />
              </div>
              {selectedUserType === 'creator' && (
                <div className="absolute -top-1 -right-1 bg-onboarding-highlight rounded-full p-0.5">
                  <Check className="h-3 w-3 text-black" />
                </div>
              )}
            </div>
            <h3 className="font-jakarta font-semibold tracking-onboarding text-base sm:text-lg mb-1">Event Creator</h3>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-jakarta">
              I want to create and distribute tokens for my events or community.
            </p>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            className={`w-full h-full p-4 rounded-lg flex flex-col items-center text-center transition-all
              ${selectedUserType === 'attendee' 
                ? 'bg-white/20 border border-onboarding-highlight' 
                : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}
            onClick={() => onSelectUserType('attendee')}
          >
            <div className="mb-3 relative">
              <div className="rounded-full bg-white/10 p-3">
                <Users className="h-6 w-6 text-onboarding-highlight" />
              </div>
              {selectedUserType === 'attendee' && (
                <div className="absolute -top-1 -right-1 bg-onboarding-highlight rounded-full p-0.5">
                  <Check className="h-3 w-3 text-black" />
                </div>
              )}
            </div>
            <h3 className="font-jakarta font-semibold tracking-onboarding text-base sm:text-lg mb-1">Event Attendee</h3>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-jakarta">
              I want to collect tokens from events I attend or participate in.
            </p>
          </button>
        </motion.div>
      </div>

      <div className="mt-4 sm:mt-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 flex items-start"
        >
          <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-onboarding-highlight mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
          <div className="font-jakarta tracking-onboarding leading-onboarding text-xs sm:text-sm">
            <p className="text-white/90">
              Don't worry, you can always switch between these roles later in your profile settings.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default UseCaseSelection;
