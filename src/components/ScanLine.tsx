
import React from 'react';
import { motion } from 'framer-motion';

interface ScanLineProps {
  speed?: number;
  color?: string;
  startPosition?: string;
  endPosition?: string;
}

export const ScanLine: React.FC<ScanLineProps> = ({
  speed = 3,
  color = "bg-electric-blue",
  startPosition = "5%",
  endPosition = "95%"
}) => (
  <motion.div
    className={`absolute left-0 right-0 h-0.5 ${color} shadow-glow-md`}
    initial={{ top: startPosition }}
    animate={{
      top: [startPosition, endPosition, startPosition],
    }}
    transition={{
      duration: speed,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop"
    }}
  >
    {/* Inner glow effect */}
    <div className={`absolute inset-0 blur-sm ${color}`}></div>
  </motion.div>
);

export default ScanLine;
