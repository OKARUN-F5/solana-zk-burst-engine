
import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  isNextDisabled?: boolean;
  isPreviousHidden?: boolean;
  nextLabel?: string;
  showSkip?: boolean;
  onSkip?: () => void;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isNextDisabled = false,
  isPreviousHidden = false,
  nextLabel = "Continue",
  showSkip = false,
  onSkip
}) => {
  const progressPercentage = ((currentStep) / totalSteps) * 100;
  const isMobile = useIsMobile();

  return (
    <div className="onboarding-container flex flex-col min-h-screen">
      {/* Logo and progress indicator */}
      <header className="px-4 sm:px-6 py-4 sm:py-6 flex justify-center relative">
        <div className="absolute left-2 sm:left-6 top-4 sm:top-6">
          {!isPreviousHidden && (
            <Button 
              variant="ghost" 
              size={isMobile ? "sm" : "default"}
              onClick={onPrevious}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-1 sm:mr-2 h-4 w-4" />
              <span className={isMobile ? "text-xs" : ""}>Back</span>
            </Button>
          )}
        </div>
        
        <div className="flex flex-col items-center">
          <div className="relative h-8 w-8 sm:h-10 sm:w-10 overflow-hidden rounded-full bg-gradient-to-r from-onboarding-highlight to-onboarding-action mb-1 sm:mb-2">
            <div className="absolute inset-[1px] rounded-full bg-onboarding-from flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">cT</span>
            </div>
          </div>
          <h1 className="font-jakarta font-bold tracking-onboarding text-lg sm:text-xl">cToken Onboarding</h1>
        </div>
        
        {showSkip && onSkip && (
          <div className="absolute right-2 sm:right-6 top-4 sm:top-6">
            <Button 
              variant="ghost" 
              size={isMobile ? "sm" : "default"}
              onClick={onSkip}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <span className={isMobile ? "text-xs" : ""}>Skip</span>
            </Button>
          </div>
        )}
      </header>

      {/* Progress bar */}
      <div className="px-4 sm:px-6 mb-4 sm:mb-8">
        <div className="flex justify-between text-xs mb-1 sm:mb-2 px-1 text-white/70 font-jakarta">
          <span>Getting Started</span>
          <span>Step {currentStep} of {totalSteps}</span>
        </div>
        <Progress value={progressPercentage} className="h-1.5 bg-white/20" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-3 sm:px-4 pb-10 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="onboarding-card max-w-full sm:max-w-[95%] md:max-w-xl mx-auto w-full"
        >
          <div className="onboarding-step p-4 sm:p-6 md:p-8">
            {children}

            <div className="flex justify-end mt-4">
              <Button
                onClick={onNext}
                disabled={isNextDisabled}
                className="bg-gradient-to-r from-onboarding-highlight to-onboarding-action text-black font-medium w-full sm:w-auto"
              >
                {nextLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
