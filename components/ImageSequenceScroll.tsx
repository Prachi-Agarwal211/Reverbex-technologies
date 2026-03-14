"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP, ScrollToPlugin);
}

const TOTAL_FRAMES = 138; // Only 138 frames exist (frame_000 to frame_137)
const MIN_FRAMES_TO_SHOW = 20; // Show content after loading at least this many frames
const LOAD_BATCH_SIZE = 10; // Batch size for progressive loading

export default function ImageSequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const imageRefs = useRef<HTMLImageElement[]>([]);

  // Progressive loading with batch processing
  useEffect(() => {
    let mounted = true;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let currentLoaded = 0;
    let isReady = false;

    const loadBatch = (startIndex: number) => {
      if (!mounted) return;
      
      const endIndex = Math.min(startIndex + LOAD_BATCH_SIZE, TOTAL_FRAMES);

      for (let i = startIndex; i < endIndex; i++) {
        const img = new Image();
        img.decoding = "async"; // Async decoding for better performance
        const paddedIndex = i.toString().padStart(3, '0');
        img.src = `/images/frame_${paddedIndex}_delay-0.041s.jpg`;
        
        img.onload = () => {
          if (!mounted) return;
          loadedImages[i] = img;
          currentLoaded++;
          
          // Show first frame preview when first image loads
          if (currentLoaded === 1) {
            setFirstFrameLoaded(true);
          }
          
          // Update images array progressively and mark ready when threshold reached
          if (currentLoaded >= MIN_FRAMES_TO_SHOW && !isReady) {
            isReady = true;
            setImages([...loadedImages]);
            setIsReady(true);
          } else if (currentLoaded < MIN_FRAMES_TO_SHOW) {
            // Update available frames for progressive rendering
            setImages([...loadedImages]);
          }
          
          setLoadedCount(currentLoaded);
        };
        
        img.onerror = () => {
          // Skip failed images gracefully - still count them as loaded
          currentLoaded++;
          setLoadedCount(currentLoaded);
          // Even on error, update images array
          setImages([...loadedImages]);
        };
      }
    };

    // Start loading first batch immediately
    loadBatch(0);
    
    // Load remaining batches with delay to not block main thread
    let batchIndex = LOAD_BATCH_SIZE;
    const loadRemaining = () => {
      if (batchIndex < TOTAL_FRAMES) {
        loadBatch(batchIndex);
        batchIndex += LOAD_BATCH_SIZE;
        // Use setTimeout to yield to main thread
        setTimeout(loadRemaining, 50);
      }
    };
    setTimeout(loadRemaining, 100);

    return () => {
      mounted = false;
    };
  }, []); // Empty deps - only run once on mount

  useGSAP(() => {
    // Filter out undefined/null entries (unloaded frames)
    const loadedImages = images.filter(img => img && img.complete);
    if (loadedImages.length < MIN_FRAMES_TO_SHOW) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = (frameIndex: number) => {
        // Use loaded images array with index mapping
        const img = loadedImages[Math.min(frameIndex, loadedImages.length - 1)];
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
            // Use loaded images count for progress calculation
            const maxFrame = loadedImages.length - 1;
            render(Math.round(self.progress * maxFrame));
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

  }, { scope: containerRef, dependencies: [loadedCount] });

  // Loading skeleton - shows immediately with first frame preview
  if (!isReady) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white relative z-50 overflow-hidden">
        {/* First frame preview while loading */}
        {firstFrameLoaded && (
          <div className="absolute inset-0 opacity-30">
            <img 
              src="/images/frame_000_delay-0.041s.jpg" 
              alt="Loading preview"
              className="w-full h-full object-cover blur-sm"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black/80" />
        
        {/* Loading indicator */}
        <div className="flex flex-col items-center gap-4 z-10">
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${Math.min((loadedCount / MIN_FRAMES_TO_SHOW) * 100, 100)}%` }}
            />
          </div>
          <div className="text-xs font-mono tracking-widest text-white/40">
            LOADING... {loadedCount}/{TOTAL_FRAMES}
          </div>
        </div>
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
