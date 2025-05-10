
import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from 'lucide-react';

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

  return (
    <div className="onboarding-container flex flex-col min-h-screen">
      {/* Logo and progress indicator */}
      <header className="px-6 py-6 flex justify-center relative">
        <div className="absolute left-6 top-6">
          {!isPreviousHidden && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onPrevious}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
        </div>
        
        <div className="flex flex-col items-center">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-r from-onboarding-highlight to-onboarding-action mb-2">
            <div className="absolute inset-[1px] rounded-full bg-onboarding-from flex items-center justify-center">
              <span className="text-white font-bold text-sm">cT</span>
            </div>
          </div>
          <h1 className="font-jakarta font-bold tracking-onboarding text-xl">cToken Onboarding</h1>
        </div>
        
        {showSkip && onSkip && (
          <div className="absolute right-6 top-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onSkip}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              Skip
            </Button>
          </div>
        )}
      </header>

      {/* Progress bar */}
      <div className="px-6 mb-8">
        <div className="flex justify-between text-xs mb-2 px-1 text-white/70 font-jakarta">
          <span>Getting Started</span>
          <span>Step {currentStep} of {totalSteps}</span>
        </div>
        <Progress value={progressPercentage} className="h-1.5 bg-white/20" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="onboarding-card"
        >
          <div className="onboarding-step">
            {children}

            <div className="flex justify-end mt-4">
              <Button
                onClick={onNext}
                disabled={isNextDisabled}
                className="bg-gradient-to-r from-onboarding-highlight to-onboarding-action text-black font-medium"
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
