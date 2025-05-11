
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ZkCompressionExplainer: React.FC = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-jakarta font-bold text-2xl tracking-onboarding mb-2">
          Power of ZK Compression
        </h2>
        <p className="text-white/80 font-jakarta tracking-onboarding leading-onboarding mb-6">
          cTokens use Solana's Zero-Knowledge compression to make blockchain collectibles more
          efficient and affordable than ever before.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative h-60 mb-8"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Traditional NFT representation */}
            <motion.div
              initial={{ scale: 1, x: 0 }}
              animate={{ scale: 0.8, x: -100 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-lg flex flex-col items-center justify-center border border-white/20"
            >
              <div className="text-4xl mb-2">🖼️</div>
              <div className="text-sm font-jakarta font-medium">Traditional NFT</div>
              <div className="mt-2 text-xs text-white/60">~5 KB each</div>
            </motion.div>
            
            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-onboarding-highlight"
            >
              →
            </motion.div>
            
            {/* Compressed token representation */}
            <motion.div
              initial={{ scale: 0.5, x: 100, opacity: 0 }}
              animate={{ scale: 1, x: 100, opacity: 1 }}
              transition={{ delay: 2.2, duration: 1 }}
              className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-onboarding-highlight/20 to-onboarding-action/20 rounded-lg flex flex-col items-center justify-center border border-onboarding-highlight/30"
            >
              <div className="text-4xl mb-2">🧩</div>
              <div className="text-sm font-jakarta font-medium">cToken</div>
              <div className="mt-2 text-xs text-onboarding-highlight">~0.01 KB each</div>
            </motion.div>

            {/* Percentage savings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.5 }}
              className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 text-center"
            >
              <div className="bg-onboarding-highlight/20 rounded-full px-4 py-1 mb-1">
                <span className="text-xl font-bold font-jakarta text-onboarding-highlight">
                  99.8% more efficient
                </span>
              </div>
              <div className="text-sm text-white/70">Less cost, faster transactions</div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Tabs defaultValue="benefits" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10">
            <TabsTrigger value="benefits" className="font-jakarta data-[state=active]:bg-onboarding-highlight data-[state=active]:text-black">Benefits</TabsTrigger>
            <TabsTrigger value="howItWorks" className="font-jakarta data-[state=active]:bg-onboarding-highlight data-[state=active]:text-black">How It Works</TabsTrigger>
          </TabsList>
          <TabsContent value="benefits" className="pt-4">
            <ul className="space-y-3 font-jakarta tracking-onboarding">
              <li className="flex items-start">
                <div className="bg-onboarding-highlight/20 p-1 rounded-full mr-3 mt-0.5">
                  <span className="text-onboarding-highlight text-sm">✓</span>
                </div>
                <span>Issue thousands of tokens for nearly zero cost</span>
              </li>
              <li className="flex items-start">
                <div className="bg-onboarding-highlight/20 p-1 rounded-full mr-3 mt-0.5">
                  <span className="text-onboarding-highlight text-sm">✓</span>
                </div>
                <span>Lightning-fast transactions and claiming</span>
              </li>
              <li className="flex items-start">
                <div className="bg-onboarding-highlight/20 p-1 rounded-full mr-3 mt-0.5">
                  <span className="text-onboarding-highlight text-sm">✓</span>
                </div>
                <span>Same security guarantees as traditional NFTs</span>
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="howItWorks" className="pt-4 font-jakarta tracking-onboarding leading-onboarding">
            <p className="mb-3">
              ZK Compression uses advanced cryptography to "compress" token data on the blockchain.
            </p>
            <p className="mb-3">
              Instead of storing each token completely on-chain, we store a cryptographic proof that verifies the token's existence and ownership.
            </p>
            <p>
              This approach maintains the security of blockchain while dramatically reducing storage costs.
            </p>
          </TabsContent>
        </Tabs>
      </motion.div>
    </>
  );
};

export default ZkCompressionExplainer;
