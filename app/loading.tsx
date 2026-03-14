"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white relative z-50 overflow-hidden">
      {/* Animated logo placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        {/* Pulsing dot */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-3 h-3 rounded-full bg-white"
        />
        
        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs font-mono tracking-[0.3em] text-white/40"
        >
          LOADING
        </motion.div>
      </motion.div>
      
      {/* Ambient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-yellow-900/10" />
    </div>
  );
}
