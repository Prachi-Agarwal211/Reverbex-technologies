"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP, ScrollToPlugin);
}

const TOTAL_FRAMES = 192; // 0 to 191

export default function ImageSequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedPercent, setLoadedPercent] = useState(0);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(3, '0');
        img.src = `/images/frame_${paddedIndex}_delay-0.041s.jpg`;
        img.onload = () => {
            loadedCount++;
            setLoadedPercent(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
            
            // OPTIMIZATION: Set the first batch of images early to start rendering
            if (loadedCount === 1) {
                setImages([...loadedImages]);
            } else if (loadedCount === TOTAL_FRAMES) {
                setImages([...loadedImages]);
            }
        };
        loadedImages.push(img);
    }
  }, []);

  useGSAP(() => {
    if (images.length < TOTAL_FRAMES) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = (frameIndex: number) => {
        const img = images[frameIndex];
        if (!img || !img.complete) return;
        
        const pixelRatio = window.devicePixelRatio || 1;
        const parentWidth = window.innerWidth;
        const parentHeight = window.innerHeight;

        canvas.width = parentWidth * pixelRatio;
        canvas.height = parentHeight * pixelRatio;
        canvas.style.width = `${parentWidth}px`;
        canvas.style.height = `${parentHeight}px`;

        ctx.resetTransform();
        ctx.scale(pixelRatio, pixelRatio);

        // Maximize image upscaling quality for 720p sources
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        const imgWidth = img.width;
        const imgHeight = img.height;

        let ratio = Math.max(parentWidth / imgWidth, parentHeight / imgHeight);
        let drawWidth = imgWidth * ratio;
        let drawHeight = imgHeight * ratio;

        let offsetX = (parentWidth - drawWidth) / 2;
        let offsetY = (parentHeight - drawHeight) / 2;

        ctx.clearRect(0, 0, parentWidth, parentHeight);

        // Draw image directly - Filter applied via CSS on canvas for massive GPU performance boost
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Initial render
    render(0);

    // Ensure all other messages are hidden initially
    textRefs.current.slice(1).forEach(el => {
        if (el) gsap.set(el, { opacity: 0 });
    });

    // Initial load entry for scroll indicator
    gsap.fromTo(scrollIndicatorRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1.2 }
    );

    // Bouncing animation for scroll indicator
    gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });

    // Handle Resize Redraw
    const handleResize = () => render(0); // Simplified for performance
    window.addEventListener("resize", handleResize);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=5000", // Scroll distance
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
            // OPTIMIZATION: Manual render trigger for even smoother frame transitions
            render(Math.round(self.progress * (TOTAL_FRAMES - 1)));
        }
      }
    });

    // Ensure 1st Message starts at full opacity and correctly resets when scrolling back
    tl.set(textRefs.current[0], { opacity: 1, x: 0, filter: "blur(0px)" }, 0);

    // 1st Message (Top Left) - Starts visible, fades out at 0.15
    tl.to(textRefs.current[0], 
        { opacity: 0, x: -30, filter: "blur(5px)", duration: 0.05, ease: "power2.in" }, 
        0.15
    );

    // Fade out scroll indicator almost immediately
    tl.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.02, ease: "none" }, 0.01);

    // 0.20 -> 0.35 : 2nd Message (Top Right)
    tl.fromTo(textRefs.current[1], 
        { opacity: 0, x: 30, filter: "blur(5px)" }, 
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.05, ease: "power2.out" }, 
        0.20
    );
    tl.to(textRefs.current[1], { opacity: 0, x: 30, filter: "blur(5px)", duration: 0.05, ease: "power2.in" }, 0.35);

    // 0.40 -> 0.55 : 3rd Message (Bottom Left)
    tl.fromTo(textRefs.current[2], 
        { opacity: 0, x: -30, filter: "blur(5px)" }, 
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.05, ease: "power2.out" }, 
        0.40
    );
    tl.to(textRefs.current[2], { opacity: 0, x: -30, filter: "blur(5px)", duration: 0.05, ease: "power2.in" }, 0.55);

    // 0.60 -> 0.75 : 4th Message (Bottom Right)
    tl.fromTo(textRefs.current[3], 
        { opacity: 0, x: 30, filter: "blur(5px)" }, 
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.05, ease: "power2.out" }, 
        0.60
    );
    tl.to(textRefs.current[3], { opacity: 0, x: 30, filter: "blur(5px)", duration: 0.05, ease: "power2.in" }, 0.75);

    // 0.82 -> 1.00 : 5th Message (Bottom Center/Left)
    tl.fromTo(textRefs.current[4], 
        { opacity: 0, y: 20, filter: "blur(5px)" }, 
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.05, ease: "power2.out" }, 
        0.82
    );

    // Final Fade out of the entire sequence to reveal the WebGL Background smoothly
    tl.to(canvasRef.current, { opacity: 0, duration: 0.1, ease: "power1.in" }, 0.9);
    tl.to(containerRef.current, { backgroundColor: "rgba(0,0,0,0)", duration: 0.1, ease: "none" }, 0.9);
    // Stays visible till the end.
    // Stays visible till the end.

    // No auto-scroll as per user request.

    return () => {
        window.removeEventListener("resize", handleResize);
    };

  }, { scope: containerRef, dependencies: [images] });

  if (loadedPercent < 100) {
      return (
          <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white relative z-50">
              <div className="w-64 h-1 bg-white/10 rounded-full mb-4 overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full bg-white transition-all duration-300" style={{ width: `${loadedPercent}%` }} />
              </div>
              <div className="text-sm font-mono tracking-widest text-white/50">PRELOADING SEQUENCE... {loadedPercent}%</div>
          </div>
      );
  }

  return (
    // container needs h-screen for pure pinning, ScrollTrigger will wrap it and add padding automatically
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      
      {/* Canvas fills the screen - CSS filters used instead of ctx.filter for massive performance gain */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block filter contrast-[1.15] saturate-[1.2] brightness-[0.9]" />
      
      {/* Gradient Overlay for Contrast and Atmospheric Depth */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none z-10" />
      
      {/* Theme Atmosphere - Left Blue / Right Yellow */}
      <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-500/05 blur-[120px]" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-500/05 blur-[120px]" />
      </div>
      
      {/* --- Quadrant-Based UI Architecture --- */}
      <div className="absolute inset-0 pointer-events-none p-4 md:p-12 w-full h-full overflow-hidden z-20">
          
          {/* 1st Message - Top Left Quadrant (Safe from Logo) */}
          <div ref={el => { textRefs.current[0] = el; }} className="opacity-0 absolute left-6 md:left-12 top-20 md:top-48 max-w-[180px] md:max-w-xs text-left text-white">
              <h1 className="text-2xl md:text-5xl font-bold tracking-tighter mb-4 leading-[0.9] uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,1)]">Accelerate<br/>Growth With<br/>Custom AI.</h1>
              <div className="w-16 md:w-24 h-[2px] bg-white mt-4 md:mt-8 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              <p className="text-white font-mono text-[10px] md:text-[12px] font-bold tracking-[0.4em] uppercase mt-2 md:mt-4 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">Intelligence / 01</p>
          </div>

          {/* 2nd Message - Top Right Quadrant (Safe from Menu) */}
          <div ref={el => { textRefs.current[1] = el; }} className="opacity-0 absolute right-6 md:right-12 top-20 md:top-48 max-w-[180px] md:max-w-xs text-right text-white">
              <h2 className="text-2xl md:text-5xl font-bold tracking-tighter mb-4 leading-[0.9] uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,1)]">Intelligent<br/>Software<br/>Solutions.</h2>
              <div className="w-16 md:w-24 h-[2px] bg-white mt-4 md:mt-8 ml-auto shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              <p className="text-white font-mono text-[10px] md:text-[12px] font-bold tracking-[0.4em] uppercase mt-2 md:mt-4 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">Development / 02</p>
          </div>

          {/* 3rd Message - Bottom Left Quadrant */}
          <div ref={el => { textRefs.current[2] = el; }} className="opacity-0 absolute left-6 md:left-12 bottom-32 md:bottom-48 max-w-[180px] md:max-w-xs text-left text-white">
              <h2 className="text-2xl md:text-5xl font-bold tracking-tighter mb-4 leading-[0.9] uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,1)]">Transform Your<br/>Workflow<br/>Today.</h2>
              <div className="w-16 md:w-24 h-[2px] bg-white mt-4 md:mt-8 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              <p className="text-white font-mono text-[10px] md:text-[12px] font-bold tracking-[0.4em] uppercase mt-2 md:mt-4 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">Efficiency / 03</p>
          </div>

          {/* 4th Message - Bottom Right Quadrant (Neural Infrastructure) */}
          <div ref={el => { textRefs.current[3] = el; }} className="opacity-0 absolute right-6 md:right-12 bottom-12 md:bottom-24 max-w-[180px] md:max-w-xs text-right text-white">
              <h2 className="text-2xl md:text-5xl font-bold tracking-tighter mb-4 leading-[0.9] uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,1)]">Scalable Neural<br/>Architecture.</h2>
              <div className="w-16 md:w-24 h-[2px] bg-white mt-4 md:mt-8 ml-auto shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              <p className="text-white font-mono text-[10px] md:text-[12px] font-bold tracking-[0.4em] uppercase mt-2 md:mt-4 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">Engineering / 04</p>
          </div>

          {/* 5th Message - Bottom Center/Left Final CTA */}
          <div ref={el => { textRefs.current[4] = el; }} className="opacity-0 absolute left-6 md:left-12 bottom-8 max-w-sm text-left pointer-events-auto text-white">
              <h2 className="text-lg md:text-4xl font-bold tracking-tighter mb-2 uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,1)]">Your AI Partner.</h2>
              <a href="mailto:15anuragsingh2003@gmail.com" className="text-white hover:text-blue-400 transition-all text-[12px] md:text-[14px] font-bold tracking-[0.3em] lowercase block border-b-2 border-white w-fit pb-1 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">15anuragsingh2003@gmail.com</a>
          </div>
      </div>

      {/* Persistent Animated Scroll Indicator on first load */}
      <div ref={scrollIndicatorRef} className="opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none text-white/50">
          <span className="text-xs uppercase tracking-widest font-mono">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/50 to-transparent"></div>
      </div>
    </div>
  );
}
