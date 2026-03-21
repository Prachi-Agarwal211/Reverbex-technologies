"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OutroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scaleVideo = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);
  const opacityOverlay = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.4, 0.8]);
  const blurVideo = useTransform(scrollYProgress, [0, 0.5, 1], [0, 8, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
        // Lower playback rate for majestic feeling
      video.playbackRate = 0.8;
      video.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, []);

  // GSAP ScrollTrigger Effects
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Video scroll-linked effects
      gsap.fromTo(videoRef.current,
        { scale: 0.9, filter: "blur(10px)" },
        {
          scale: 1.1,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      );

      // Content reveal animation
      const contentElements = contentRef.current?.querySelectorAll('.outro-content');
      contentElements?.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      // Button glow animation
      const button = contentRef.current?.querySelector('.outro-button');
      if (button) {
        gsap.to(button, {
          boxShadow: "0 0 40px rgba(59, 130, 246, 0.5)",
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden bg-black flex items-center justify-center">
      {/* Parallax Video Background with GSAP effects */}
      <motion.div 
        style={{ scale: scaleVideo }}
        className="absolute inset-0 w-full h-full z-0 transform-origin-center pointer-events-none"
      >
        <motion.div style={{ filter: blurVideo }}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </motion.div>
      
      {/* Dynamic Overlay */}
      <motion.div 
        style={{ opacity: opacityOverlay }}
        className="absolute inset-0 bg-black z-10 pointer-events-none" 
      />

      {/* Floating CTA Text with GSAP reveals */}
      <motion.div 
        ref={contentRef}
        style={{ y: yText }}
        className="relative z-20 flex flex-col items-center justify-center px-6 text-center max-w-4xl pt-20"
      >
        <h2 
          className="outro-content text-5xl md:text-7xl lg:text-[6rem] text-white mb-6 drop-shadow-2xl tracking-tight leading-[1.05]" 
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Ready to scale?
        </h2>
        <p className="outro-content text-white/70 text-base md:text-xl mb-12 max-w-2xl font-light tracking-wide drop-shadow-md leading-relaxed">
          Embark on a digital transformation journey with intelligent AI agents, automations, and custom software solutions.
        </p>
        
        <div className="outro-content relative group cursor-pointer inline-block">
          {/* Animated Glow behind button */}
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-30 group-hover:opacity-70 transition-opacity duration-500 animate-pulse" />
          <div className="outro-button relative inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white font-medium tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500 overflow-hidden">
             Start Building
          </div>
        </div>
      </motion.div>
    </section>
  );
}
