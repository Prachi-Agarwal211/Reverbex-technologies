"use client";

import { motion } from "framer-motion";
import { useAudioSafe } from "./AudioContext";

export default function FloatingOrbs() {
  const audio = useAudioSafe();

  // Get audio intensity values, default to 0 if no audio context
  const bassIntensity = audio?.bassIntensity || 0;
  const midIntensity = audio?.midIntensity || 0;
  const highIntensity = audio?.highIntensity || 0;
  const isBeat = audio?.isBeat || false;

  // Calculate dynamic values based on audio
  const bassScale = 1 + (bassIntensity / 255) * 0.3;  // Up to 30% larger on bass
  const midScale = 1 + (midIntensity / 255) * 0.2;    // Up to 20% larger on mids
  const highScale = 1 + (highIntensity / 255) * 0.15; // Up to 15% larger on highs

  // Color intensity based on audio
  const bassOpacity = 0.25 + (bassIntensity / 255) * 0.35;
  const midOpacity = 0.12 + (midIntensity / 255) * 0.25;
  const highOpacity = 0.1 + (highIntensity / 255) * 0.2;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Cyan Orb - Top Left - Reacts to BASS */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(34, 211, 238, ${bassOpacity}) 0%, rgba(34, 211, 238, ${bassOpacity * 0.4}) 50%, transparent 70%)`,
          filter: "blur(100px)",
        }}
        animate={{
          x: ["-10%", "5%", "-10%"],
          y: ["20%", "30%", "20%"],
          scale: isBeat ? bassScale * 1.2 : bassScale,
        }}
        transition={{
          x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 20, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: isBeat ? 0.1 : 0.3, ease: "easeOut" },
        }}
      />

      {/* Purple Orb - Bottom Right - Reacts to MIDS */}
      <motion.div
        className="absolute w-80 h-80 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(168, 85, 247, ${midOpacity}) 0%, transparent 70%)`,
          filter: "blur(70px)",
          right: 0,
          bottom: 0,
        }}
        animate={{
          x: ["10%", "-5%", "10%"],
          y: ["-20%", "-30%", "-20%"],
          scale: midScale,
        }}
        transition={{
          x: { duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 },
          y: { duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 },
          scale: { duration: 0.3, ease: "easeOut" },
        }}
      />

      {/* Pink Orb - Center Right - Reacts to HIGHS */}
      <motion.div
        className="absolute w-72 h-72 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(232, 121, 249, ${highOpacity}) 0%, transparent 70%)`,
          filter: "blur(60px)",
          right: "20%",
          top: "50%",
        }}
        animate={{
          x: ["-5%", "5%", "-5%"],
          y: ["-10%", "10%", "-10%"],
          scale: highScale,
        }}
        transition={{
          x: { duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 },
          y: { duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 },
          scale: { duration: 0.2, ease: "easeOut" },
        }}
      />

      {/* Blue Orb - Top Center - Reacts to MIDS */}
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(129, 140, 248, ${midOpacity * 0.7}) 0%, transparent 70%)`,
          filter: "blur(50px)",
          left: "50%",
          top: "15%",
        }}
        animate={{
          x: ["-15%", "15%", "-15%"],
          y: ["0%", "10%", "0%"],
          scale: midScale * 0.9,
        }}
        transition={{
          x: { duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 },
          y: { duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 },
          scale: { duration: 0.3, ease: "easeOut" },
        }}
      />

      {/* Teal Orb - Bottom Left - Reacts to BASS */}
      <motion.div
        className="absolute w-56 h-56 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(103, 232, 249, ${bassOpacity * 0.4}) 0%, transparent 70%)`,
          filter: "blur(55px)",
          left: "15%",
          bottom: "20%",
        }}
        animate={{
          x: ["5%", "-5%", "5%"],
          y: ["5%", "-5%", "5%"],
          scale: bassScale * 0.95,
        }}
        transition={{
          x: { duration: 19, repeat: Infinity, ease: "easeInOut", delay: 4 },
          y: { duration: 19, repeat: Infinity, ease: "easeInOut", delay: 4 },
          scale: { duration: isBeat ? 0.1 : 0.3, ease: "easeOut" },
        }}
      />

      {/* Beat Flash - Center overlay that pulses on beat */}
      {isBeat && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(34, 211, 238, 0.1) 0%, transparent 50%)",
          }}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );
}