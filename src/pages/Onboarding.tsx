
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import OnboardingLayout from '@/components/onboarding/OnboardingLayout';
import WalletConnectionStep from '@/components/onboarding/WalletConnectionStep';
import ZkCompressionExplainer from '@/components/onboarding/ZkCompressionExplainer';
import UseCaseSelection from '@/components/onboarding/UseCaseSelection';
import PermissionsStep from '@/components/onboarding/PermissionsStep';
import CelebrationStep from '@/components/onboarding/CelebrationStep';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<'creator' | 'attendee'>('attendee');
  const isMobile = useIsMobile();
  
  const totalSteps = 5;
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      
      // If we're moving to step 3, show a toast
      if (currentStep === 2) {
        toast({
          title: "Learning more about ZK Compression",
          description: isMobile ? "Discover how this makes tokens efficient" : "Discover how this technology makes tokens more efficient",
        });
      }
    } else {
      // Complete onboarding
      navigate('/');
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleSkip = () => {
    navigate('/');
  };

  const handleSetUserType = (type: 'creator' | 'attendee') => {
    setUserType(type);
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <WalletConnectionStep />;
      case 2:
        // Remove the userType prop since ZkCompressionExplainer doesn't accept it
        return <ZkCompressionExplainer />;
      case 3:
        return <UseCaseSelection onSelectUserType={handleSetUserType} selectedUserType={userType} />;
      case 4:
        return <PermissionsStep userType={userType} />;
      case 5:
        return <CelebrationStep userType={userType} />;
      default:
        return null;
    }
  };
  
  const getNextButtonLabel = () => {
    if (currentStep === totalSteps) return "Go to Dashboard";
    return "Continue";
  };
  
  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrevious={handlePrevious}
      isPreviousHidden={currentStep === 1}
      nextLabel={getNextButtonLabel()}
      showSkip={currentStep < totalSteps}
      onSkip={handleSkip}
    >
      {renderStepContent()}
    </OnboardingLayout>
  );
};

export default Onboarding;
