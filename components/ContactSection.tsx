"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
        // Lower playback rate for majestic feeling
      video.playbackRate = 0.8;
      video.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, []);

  return (
    <section id="contact" className="relative w-full min-h-[100dvh] overflow-hidden bg-gradient-to-b from-[#050505] to-black flex flex-col justify-end">
      {/* Absolute Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
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
        {/* Subtle Dark Gradient Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" /> 
      </div>
      
      {/* Top Spacer to keep center empty */}
      <div className="flex-1 w-full shrink-0 z-10 pointer-events-none" />

      {/* Content strictly positioned at the bottom/left to keep the center of the video fully visible */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12 md:pb-24 flex flex-col items-start justify-end pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto"
        >
          <h2 className="text-5xl md:text-7xl lg:text-[6rem] text-gradient-animated mb-4 tracking-tight drop-shadow-2xl leading-none" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Get in Touch
          </h2>
          <p className="text-white/70 text-sm md:text-lg mb-10 tracking-[0.1em] font-light max-w-2xl" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Ready to transform your business with intelligent architecture? We build autonomous systems that redefine enterprise operations.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full lg:w-[60%] pointer-events-auto">
          {/* Contact Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-[1.5] p-6 md:p-8 rounded-2xl border border-white/10 bg-black/80 md:bg-black/40 md:backdrop-blur-xl hover:bg-black/90 md:hover:bg-black/60 hover:border-blue-500/40 transition-all duration-500 shadow-xl group relative overflow-hidden flex flex-col gap-4 justify-between"
          >
            <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-widest font-semibold group-hover:text-blue-400/50 transition-colors">Contact</p>
            
            <div className="flex flex-col gap-2 md:gap-3 relative z-10 font-light text-sm md:text-lg">
              <a href="mailto:15anuragsingh2003@gmail.com" className="text-white hover:text-blue-400 transition-colors truncate">
                15anuragsingh2003@gmail.com
              </a>
              <a href="mailto:prachiagarwal211@gmail.com" className="text-white hover:text-blue-400 transition-colors truncate">
                prachiagarwal211@gmail.com
              </a>
              <div className="h-px w-full bg-white/10 my-1 md:my-2" />
              <a href="tel:+919929986743" className="text-white hover:text-blue-400 transition-colors">
                +91 99299 86743
              </a>
              <a href="tel:+919155804490" className="text-white hover:text-blue-400 transition-colors">
                +91 91558 04490
              </a>
            </div>
          </motion.div>

          {/* Location Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 p-6 md:p-8 rounded-2xl border border-white/10 bg-black/80 md:bg-black/40 md:backdrop-blur-xl hover:bg-black/90 md:hover:bg-black/60 hover:border-yellow-500/40 transition-all duration-500 shadow-xl group relative overflow-hidden flex flex-col justify-between min-h-[160px] md:min-h-0"
          >
            <div className="hidden md:block absolute inset-0 bg-gradient-to-bl from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-widest mb-2 md:mb-4 font-semibold group-hover:text-yellow-400/50 transition-colors">Headquarters</p>
            <p className="text-base md:text-xl text-white relative z-10 font-light">
              India / Remote-First
            </p>
          </motion.div>
        </div>

        {/* Bottom Footer Credits Line */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-white/10 pt-6 pointer-events-auto gap-4"
        >
          <p className="text-white/30 text-xs tracking-[0.2em] uppercase">
            © 2026 Reverbex Technologies • Redefining Operations
          </p>
          <a 
            href="#home" 
            className="text-white/50 hover:text-white text-xs tracking-widest uppercase transition-colors"
          >
            Back to Top
          </a>
        </motion.div>
      </div>
    </section>
  );
}