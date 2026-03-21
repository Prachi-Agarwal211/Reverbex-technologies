"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const TAGLINES = [
  "Intelligent Architecture",
  "Autonomous Systems",
  "Enterprise Intelligence"
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerPathRef = useRef<SVGPathElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const hasCompletedRef = useRef(false);
  const progressRef = useRef(0);
  const taglineIndexRef = useRef(0);

  // GSAP animations - runs ONCE on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(innerPathRef.current, { strokeDashoffset: 80 });
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

      // Animate SVG hexagon stroke
      gsap.to(innerPathRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 0.5
      });

      // Progress simulation with eased curve
      let currentProgress = 0;
      const simulateProgress = () => {
        if (currentProgress >= 100) {
          clearInterval(progressInterval);

          // Only trigger exit once
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true;

            // Small delay to show 100% before exiting
            setTimeout(() => {
              const exitTl = gsap.timeline({
                onComplete: () => {
                  if (containerRef.current) {
                    containerRef.current.style.visibility = 'hidden';
                    containerRef.current.style.pointerEvents = 'none';
                  }
                  onComplete();
                }
              });

              // Iris exit animation: clip-path circle(150%) → circle(0%)
              exitTl.to(containerRef.current, {
                clipPath: "circle(0% at 50% 50%)",
                duration: 0.8,
                ease: "power4.inOut"
              });
            }, 300);
          }
          return;
        }

        // Eased progress simulation
        let increment: number;
        if (currentProgress < 30) {
          // Slow start: 1-2%
          increment = Math.floor(Math.random() * 2) + 1;
        } else if (currentProgress < 80) {
          // Fast middle: 5-12%
          increment = Math.floor(Math.random() * 8) + 5;
        } else {
          // Slow end: 1-2%
          increment = Math.floor(Math.random() * 2) + 1;
        }

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
      };

      const progressInterval = setInterval(simulateProgress, 100);

      // Tagline cycling every 1.2s with opacity crossfade
      const cycleTaglines = () => {
        const nextIndex = (taglineIndexRef.current + 1) % TAGLINES.length;
        
        gsap.to(taglineRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            taglineRef.current!.innerText = TAGLINES[nextIndex];
            taglineIndexRef.current = nextIndex;
            gsap.to(taglineRef.current, {
              opacity: 1,
              duration: 0.4,
              ease: "power2.out"
            });
          }
        });
      };

      const taglineInterval = setInterval(cycleTaglines, 1200);

      return () => {
        clearInterval(progressInterval);
        clearInterval(taglineInterval);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black preloader-clip"
      style={{ clipPath: "circle(150% at 50% 50%)" }}
    >
      {/* Animated SVG Logo Mark */}
      <div className="relative mb-8 md:mb-12">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          {/* Outer hexagon */}
          <path
            d="M16 2L28 8V24L16 30L4 24V8L16 2Z"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
          {/* Inner hexagon - animated stroke */}
          <path
            ref={innerPathRef}
            d="M16 8L24 12V20L16 24L8 20V12L16 8Z"
            stroke="white"
            strokeWidth="1"
            strokeDasharray="80"
            strokeDashoffset="80"
          />
          {/* Center gradient circle */}
          <circle cx="16" cy="16" r="3" fill="url(#gradient)" />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glow Effect */}
        <div className="absolute inset-0 -m-12 bg-blue-500/10 blur-2xl rounded-full" />
      </div>

      {/* Brand Name */}
      <div
        ref={brandRef}
        className="text-2xl md:text-3xl font-light tracking-[0.3em] text-white mb-2"
        style={{ fontFamily: "var(--font-syne), sans-serif" }}
      >
        REVERBEX
      </div>

      {/* Tagline - cycles every 1.2s */}
      <div
        ref={taglineRef}
        className="text-[10px] md:text-xs tracking-[0.2em] text-white/40 uppercase mb-8 md:mb-12"
        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
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
