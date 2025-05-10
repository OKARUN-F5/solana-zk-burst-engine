
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, ChevronRight } from 'lucide-react';

interface CelebrationStepProps {
  userType?: 'creator' | 'attendee';
}

const CelebrationStep: React.FC<CelebrationStepProps> = ({ userType = 'attendee' }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    // Trigger confetti effect after component mounts
    const timer = setTimeout(() => {
      setShowConfetti(true);
      
      const duration = 3000;
      const end = Date.now() + duration;
      
      const colors = ['#5CE5D5', '#FF6AC2', '#FFFFFF'];
      
      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const getNextStepContent = () => {
    if (userType === 'creator') {
      return (
        <>
          <h3 className="font-jakarta font-medium text-lg mb-2 tracking-onboarding">Ready to Create Your First Token?</h3>
          <p className="text-white/70 font-jakarta tracking-onboarding leading-onboarding mb-4">
            Start building your community with compressed tokens.
          </p>
          <Button asChild className="bg-gradient-to-r from-onboarding-highlight to-onboarding-action text-black font-medium">
            <Link to="/create">
              Create Your First Token
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </>
      );
    } else {
      return (
        <>
          <h3 className="font-jakarta font-medium text-lg mb-2 tracking-onboarding">Ready to Start Collecting?</h3>
          <p className="text-white/70 font-jakarta tracking-onboarding leading-onboarding mb-4">
            Scan QR codes to collect tokens from events and experiences.
          </p>
          <Button asChild className="bg-gradient-to-r from-onboarding-highlight to-onboarding-action text-black font-medium">
            <Link to="/scan">
              Start Scanning
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </>
      );
    }
  };
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h2 className="font-jakarta font-bold text-2xl tracking-onboarding mb-3">You're All Set!</h2>
        <p className="text-white/80 font-jakarta tracking-onboarding leading-onboarding mb-6">
          Your cToken account is ready to use. Let's get you started.
        </p>
      </motion.div>

      <div className="flex justify-center mb-8">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="h-24 w-24 rounded-full bg-onboarding-highlight/20 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="h-16 w-16 rounded-full bg-onboarding-highlight flex items-center justify-center"
          >
            <Check className="h-10 w-10 text-black" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="space-y-4"
      >
        <div className="bg-white/10 rounded-lg p-6 border border-white/20">
          {getNextStepContent()}
        </div>
        
        <AnimatePresence>
          {showConfetti && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-white/60 text-sm font-jakarta"
            >
              Congratulations on joining the cToken community!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default CelebrationStep;
