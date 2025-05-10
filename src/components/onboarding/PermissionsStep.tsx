
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Switch } from "@/components/ui/switch";
import { Info, Lock, ShieldCheck } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PermissionItem {
  id: string;
  title: string;
  description: string;
  required: boolean;
  tooltip: string;
}

const permissions: PermissionItem[] = [
  {
    id: 'basic-access',
    title: 'Basic account access',
    description: 'View your public wallet address',
    required: true,
    tooltip: 'Required to identify your wallet and display your tokens.'
  },
  {
    id: 'token-viewing',
    title: 'Token viewing',
    description: 'View your token balances and collections',
    required: true,
    tooltip: 'Required to display your cTokens and collectibles.'
  },
  {
    id: 'token-transfer',
    title: 'Token transfers',
    description: 'Transfer tokens to and from your wallet',
    required: false,
    tooltip: 'Optional. Enabling allows you to send and receive tokens.'
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Receive alerts about new tokens and activities',
    required: false,
    tooltip: 'Optional. Stay updated on your token activities and new opportunities.'
  },
];

const PermissionsStep: React.FC = () => {
  const [enabledPermissions, setEnabledPermissions] = useState<string[]>(
    permissions.filter(p => p.required).map(p => p.id)
  );
  
  const togglePermission = (id: string) => {
    if (permissions.find(p => p.id === id)?.required) {
      return; // Can't toggle required permissions
    }
    
    setEnabledPermissions(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id) 
        : [...prev, id]
    );
  };
  
  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="h-6 w-6 text-onboarding-highlight" />
          <h2 className="font-jakarta font-bold text-2xl tracking-onboarding">Connect Securely</h2>
        </div>
        <p className="text-white/80 font-jakarta tracking-onboarding leading-onboarding mb-6">
          Review and approve the permissions needed to use cTokens. Required permissions cannot be disabled.
        </p>
      </motion.div>

      <div className="space-y-4">
        {permissions.map((permission, index) => (
          <motion.div
            key={permission.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (index * 0.1) }}
            className={`p-4 rounded-lg border transition-all ${
              enabledPermissions.includes(permission.id)
                ? 'bg-white/10 border-onboarding-highlight/50'
                : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <h3 className="font-jakarta font-medium text-base tracking-onboarding">
                  {permission.title}
                </h3>
                {permission.required && (
                  <span className="ml-2 text-xs bg-onboarding-highlight/20 text-onboarding-highlight px-2 py-0.5 rounded-full font-jakarta">
                    Required
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-white/60 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-white border-onboarding-highlight/30 max-w-xs">
                    <p className="text-sm">{permission.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
                
                <Switch
                  checked={enabledPermissions.includes(permission.id)}
                  onCheckedChange={() => togglePermission(permission.id)}
                  disabled={permission.required}
                  className="data-[state=checked]:bg-onboarding-action"
                />
              </div>
            </div>
            
            <p className="text-white/60 text-sm font-jakarta tracking-onboarding leading-onboarding">
              {permission.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 bg-white/5 border border-white/10 rounded-lg p-4 flex items-start"
      >
        <Lock className="h-5 w-5 text-onboarding-highlight mt-0.5 mr-3 flex-shrink-0" />
        <div className="font-jakarta tracking-onboarding leading-onboarding text-sm">
          <p className="text-white/90 mb-1">
            <span className="font-medium text-white">Your security is our priority.</span> We use industry-standard encryption and never store your private keys.
          </p>
          <p className="text-white/70">
            You can adjust these permissions anytime in your profile settings.
          </p>
        </div>
      </motion.div>
    </TooltipProvider>
  );
};

export default PermissionsStep;
