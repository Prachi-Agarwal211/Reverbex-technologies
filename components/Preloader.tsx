"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const hasCompletedRef = useRef(false);
  const progressRef = useRef(0);

  // GSAP animations - runs ONCE on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(coreRef.current, { scale: 0.8, opacity: 0.5 });
      gsap.set(ring1Ref.current, { rotate: 0 });
      gsap.set(ring2Ref.current, { rotate: 0 });
      gsap.set(progressFillRef.current, { width: 0 });
      gsap.set(percentageRef.current, { opacity: 0 });
      gsap.set(brandRef.current, { opacity: 0, y: 20 });
      gsap.set(taglineRef.current, { opacity: 0 });

      const tl = gsap.timeline();

      // Initial fade in
      tl.to(brandRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out"
      })
      .to(taglineRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3")
      .to(percentageRef.current, {
        opacity: 1,
        duration: 0.3,
      }, "-=0.3");

      // Continuous animations
      gsap.to(coreRef.current, {
        scale: 1.15,
        opacity: 1,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "easeInOut"
      });

      gsap.to(ring1Ref.current, {
        rotate: 360,
        duration: 3,
        repeat: -1,
        ease: "none"
      });

      gsap.to(ring2Ref.current, {
        rotate: -360,
        duration: 5,
        repeat: -1,
        ease: "none"
      });

      // Progress simulation with GSAP
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          
          // Only trigger exit once
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true;
            
            // Small delay to show 100% before exiting
            setTimeout(() => {
              const exitTl = gsap.timeline({
                onComplete: () => {
                  // Ensure visibility is hidden after animation
                  if (containerRef.current) {
                    containerRef.current.style.visibility = 'hidden';
                    containerRef.current.style.pointerEvents = 'none';
                  }
                  onComplete();
                }
              });

              exitTl.to(containerRef.current, {
                y: -50,
                opacity: 0,
                duration: 0.6,
                ease: "power4.inOut"
              });
            }, 300);
          }
          return;
        }
        
        const increment = Math.max(1, Math.floor(Math.random() * 15));
        currentProgress = Math.min(currentProgress + increment, 100);
        progressRef.current = currentProgress;
        
        // Animate progress bar
        gsap.to(progressFillRef.current, {
          width: `${currentProgress}%`,
          duration: 0.15,
          ease: "power2.out"
        });

        // Update percentage text
        percentageRef.current!.innerText = Math.round(currentProgress) + "%";
      }, 100);

      return () => {
        clearInterval(progressInterval);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
    >
      {/* Animated Logo / Brand Mark */}
      <div className="relative mb-8 md:mb-12">
        {/* Pulsing Core */}
        <div
          ref={coreRef}
          className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.6)]"
        />

        {/* Orbiting Rings */}
        <div
          ref={ring1Ref}
          className="absolute inset-0 -m-4 md:-m-6 border border-white/10 rounded-full"
        />
        <div
          ref={ring2Ref}
          className="absolute inset-0 -m-6 md:-m-10 border border-white/5 rounded-full"
        />

        {/* Glow Effect */}
        <div className="absolute inset-0 -m-8 md:-m-12 bg-blue-500/10 blur-2xl rounded-full" />
      </div>

      {/* Brand Name */}
      <div
        ref={brandRef}
        className="text-2xl md:text-3xl font-light tracking-[0.3em] text-white mb-2"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        REVERBEX
      </div>

      {/* Tagline */}
      <div
        ref={taglineRef}
        className="text-[10px] md:text-xs tracking-[0.2em] text-white/40 uppercase mb-8 md:mb-12"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        Intelligent Architecture
      </div>

      {/* Progress Bar */}
      <div className="w-48 md:w-64 h-[1px] bg-white/10 rounded-full overflow-hidden">
        <div
          ref={progressFillRef}
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"
        />
      </div>

      {/* Percentage */}
      <div
        ref={percentageRef}
        className="mt-3 text-[10px] font-mono tracking-[0.15em] text-white/30"
      >
        0%
      </div>

      {/* Ambient Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-yellow-900/5 pointer-events-none" />
    </div>
  );
}
