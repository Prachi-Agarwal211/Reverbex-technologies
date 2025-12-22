"use client";

import { motion } from "framer-motion";

export default function FloatingOrbs() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Cyan Orb - Top Left */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.25) 0%, rgba(34, 211, 238, 0.1) 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: ["-10%", "5%", "-10%"],
          y: ["20%", "30%", "20%"],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Purple Orb - Bottom Right */}
      <motion.div
        className="absolute w-80 h-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)",
          filter: "blur(70px)",
          right: 0,
          bottom: 0,
        }}
        animate={{
          x: ["10%", "-5%", "10%"],
          y: ["-20%", "-30%", "-20%"],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Pink Orb - Center Right */}
      <motion.div
        className="absolute w-72 h-72 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(232, 121, 249, 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          right: "20%",
          top: "50%",
        }}
        animate={{
          x: ["-5%", "5%", "-5%"],
          y: ["-10%", "10%", "-10%"],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Blue Orb - Top Center */}
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(129, 140, 248, 0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
          left: "50%",
          top: "15%",
        }}
        animate={{
          x: ["-15%", "15%", "-15%"],
          y: ["0%", "10%", "0%"],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Teal Orb - Bottom Left */}
      <motion.div
        className="absolute w-56 h-56 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(103, 232, 249, 0.09) 0%, transparent 70%)",
          filter: "blur(55px)",
          left: "15%",
          bottom: "20%",
        }}
        animate={{
          x: ["5%", "-5%", "5%"],
          y: ["5%", "-5%", "5%"],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}