"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
        // Lower playback rate for majestic feeling
      video.playbackRate = 0.8;
      video.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
         scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
         }
      });

      tl.fromTo('.contact-title-word', 
          { opacity: 0, yPercent: 120, rotateX: -15 }, 
          { opacity: 1, yPercent: 0, rotateX: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" }
        )
        .fromTo('.contact-link-group', 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 
          "-=0.7"
        )
        .fromTo('.contact-footer', 
          { opacity: 0 }, 
          { opacity: 1, duration: 1 }, 
          "-=0.4"
        );
    });

    mm.add("(max-width: 767px)", () => {
      const reveals = containerRef.current?.querySelectorAll('.mobile-reveal');
      if (reveals) {
        gsap.fromTo(reveals, 
           { opacity: 0, y: 30 },
           { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 75%", toggleActions: "play none none reverse" } }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="contact" className="relative w-full min-h-[100dvh] overflow-hidden bg-black flex flex-col justify-end">
      {/* Absolute Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-50 hw-accelerated"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Extremely heavy dark overlay for minimal readable look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/40 z-10 pointer-events-none" /> 
        <div className="absolute inset-0 bg-[#050505]/30 z-10 pointer-events-none mix-blend-multiply" />
      </div>

      {/* Content strictly positioned at the bottom */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-12 md:pb-20 flex flex-col items-start justify-end pointer-events-none">

        {/* Massive Minimalist Heading */}
        <div className="w-full mb-16 md:mb-32 flex flex-col gap-6 pointer-events-auto">
           <div className="flex flex-wrap gap-4 md:gap-8">
           {("Ready to scale?").split(" ").map((word, i) => (
             <div key={i} className="overflow-hidden mobile-reveal pb-2">
               <h2
                 className="contact-title-word text-[clamp(4.5rem,14vw,14rem)] text-white tracking-tighter leading-none inline-block hw-accelerated pr-2 md:pr-4"
                 style={{ fontFamily: "var(--font-playfair), Georgia, serif", perspective: "800px" }}
               >
                 {word}
               </h2>
             </div>
           ))}
           </div>
           <p className="hero-subtext text-white/70 text-[clamp(0.65rem,1.5vw,0.85rem)] font-light tracking-[0.15em] uppercase mt-1 drop-shadow-md pb-2 mobile-reveal max-w-2xl" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Partner with us to deploy intelligent architecture that reduces overhead, automates workflows, and accelerates your business growth.
           </p>
        </div>

        {/* Clean CSS Grid for contact info */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 border-t border-white/10 pt-10 md:pt-16 pointer-events-auto">

           <div className="contact-link-group mobile-reveal flex flex-col items-start gap-4">
              <span className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">Inquiries</span>
              <div className="flex flex-col gap-3">
                 <a href="mailto:15anuragsingh2003@gmail.com" className="group text-white text-lg md:text-2xl font-light hover:text-white transition-colors relative inline-block w-max">
                    <span className="relative z-10">15anuragsingh2003@gmail.com</span>
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-blue-500 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                 </a>
                 <a href="mailto:prachiagarwal211@gmail.com" className="group text-white text-lg md:text-2xl font-light hover:text-white transition-colors relative inline-block w-max">
                    <span className="relative z-10">prachiagarwal211@gmail.com</span>
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-blue-500 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                 </a>
              </div>
           </div>

           <div className="contact-link-group mobile-reveal flex flex-col items-start gap-4 md:pl-12">
              <span className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">Phone</span>
              <div className="flex flex-col gap-3">
                 <a href="tel:+919929986743" className="group text-white text-lg md:text-2xl font-light hover:text-white transition-colors relative inline-block w-max">
                    <span className="relative z-10">+91 99299 86743</span>
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-yellow-500 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                 </a>
                 <a href="tel:+919155804490" className="group text-white text-lg md:text-2xl font-light hover:text-white transition-colors relative inline-block w-max">
                    <span className="relative z-10">+91 91558 04490</span>
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-yellow-500 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                 </a>
              </div>
           </div>

           <div className="contact-link-group mobile-reveal flex flex-col items-start gap-4 md:pl-12">
              <span className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">Location</span>
              <div className="flex flex-col gap-3">
                 <p className="text-white text-lg md:text-2xl font-light">
                    India / Remote-First
                 </p>
                 <p className="text-white/60 text-sm md:text-base font-light max-w-xs mt-1">
                    Deploying intelligence globally.
                 </p>
              </div>
           </div>

        </div>

        {/* Bottom Footer Credits Line */}
        <div className="contact-footer mobile-reveal w-full mt-16 md:mt-24 flex flex-col sm:flex-row items-start sm:items-center justify-between pointer-events-auto gap-4">
          <p className="text-white/30 text-[10px] md:text-xs tracking-[0.2em] uppercase">
            © 2026 Reverbex Technologies • Redefining Operations
          </p>
          <a
            href="#home"
            className="text-white/40 hover:text-white text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors"
          >
            Back to Top
          </a>
        </div>
      </div>
    </section>
  );
}