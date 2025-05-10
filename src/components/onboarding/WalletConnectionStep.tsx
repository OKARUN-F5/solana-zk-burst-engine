
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Info, Wallet } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

const walletOptions = [
  { id: 'phantom', name: 'Phantom', icon: '👻', popular: true },
  { id: 'solflare', name: 'Solflare', icon: '🔆' },
  { id: 'backpack', name: 'Backpack', icon: '🎒' },
  { id: 'glow', name: 'Glow', icon: '✨' },
];

const WalletConnectionStep: React.FC = () => {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-jakarta font-bold text-xl sm:text-2xl tracking-onboarding mb-2">Connect Your Wallet</h2>
        <p className="text-white/80 font-jakarta tracking-onboarding leading-onboarding text-sm sm:text-base mb-4 sm:mb-6">
          To start using cTokens, connect your Solana wallet. Don't have one yet? We'll help you set one up.
        </p>
      </motion.div>

      <div className="space-y-2 sm:space-y-3">
        {walletOptions.map((wallet) => (
          <motion.div
            key={wallet.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + walletOptions.indexOf(wallet) * 0.1 }}
          >
            <button
              className={`w-full p-3 sm:p-4 rounded-lg flex items-center justify-between transition-all
                ${selectedWallet === wallet.id 
                  ? 'bg-white/20 border border-onboarding-highlight' 
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}
              onClick={() => setSelectedWallet(wallet.id)}
            >
              <div className="flex items-center">
                <span className="text-xl sm:text-2xl mr-2 sm:mr-3">{wallet.icon}</span>
                <div className="text-left">
                  <div className="font-jakarta font-medium tracking-onboarding flex items-center text-sm sm:text-base">
                    {wallet.name}
                    {wallet.popular && (
                      <span className="ml-2 text-[10px] sm:text-xs bg-onboarding-highlight/20 text-onboarding-highlight px-1.5 sm:px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {selectedWallet === wallet.id && <Check className="h-4 w-4 sm:h-5 sm:w-5 text-onboarding-highlight" />}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 sm:mt-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 flex items-start"
        >
          <Info className="h-4 w-4 sm:h-5 sm:w-5 text-onboarding-highlight mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
          <div className="font-jakarta tracking-onboarding leading-onboarding text-xs sm:text-sm">
            <p className="text-white/90">
              New to Solana wallets? They're safe, secure digital wallets for your tokens 
              and collectibles. <span className="text-onboarding-action">Learn more</span>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default WalletConnectionStep;
