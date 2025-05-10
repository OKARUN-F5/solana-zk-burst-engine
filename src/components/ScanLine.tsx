
import React from 'react';
import { motion } from 'framer-motion';

export const ScanLine: React.FC = () => (
  <motion.div
    className="absolute left-0 right-0 h-0.5 bg-electric-blue shadow-glow-md"
    initial={{ top: "5%" }}
    animate={{
      top: ["5%", "95%", "5%"],
    }}
    transition={{
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop"
    }}
  >
    {/* Inner glow effect */}
    <div className="absolute inset-0 blur-sm bg-electric-blue"></div>
  </motion.div>
);
