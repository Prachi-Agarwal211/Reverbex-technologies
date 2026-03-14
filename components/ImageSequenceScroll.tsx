"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const TOTAL_FRAMES = 192;

export default function ImageSequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  // PERFORMANCE FIX: Use Ref for images to avoid React re-render cycles
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [loadedPercent, setLoadedPercent] = useState(0);

  // Preload logic with priority queue
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    // Helper to load a single frame
    const loadFrame = (index: number): Promise<HTMLImageElement> => {
        return new Promise((resolve) => {
            const img = new Image();
            const paddedIndex = index.toString().padStart(3, '0');
            img.src = `/images/frame_${paddedIndex}_delay-0.041s.jpg`;
            img.onload = () => {
                if (isMounted) {
                    loadedCount++;
                    setLoadedPercent(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
                }
                resolve(img);
            };
        });
    };

    const initSequence = async () => {
        // 1. Load CRITICAL frames first (first 10 frames) to start UI immediately
        const criticalIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const criticalPromises = criticalIndices.map(i => loadFrame(i));
        const firstBatch = await Promise.all(criticalPromises);
        
        firstBatch.forEach((img, i) => {
            loadedImages[criticalIndices[i]] = img;
        });

        if (!isMounted) return;
        
        imagesRef.current = loadedImages;
        setIsReady(true); // Reveal UI as soon as critical frames are ready

        // 2. Load the rest in the background without blocking
        const remainingIndices = Array.from({ length: TOTAL_FRAMES }, (_, i) => i).filter(i => !criticalIndices.includes(i));
        
        // Load in smaller chunks to avoid network congestion
        const chunkSize = 10;
        for (let i = 0; i < remainingIndices.length; i += chunkSize) {
            const chunk = remainingIndices.slice(i, i + chunkSize);
            const imgs = await Promise.all(chunk.map(idx => loadFrame(idx)));
            imgs.forEach((img, j) => {
                loadedImages[chunk[j]] = img;
            });
            imagesRef.current = [...loadedImages];
        }
    };

    initSequence();

    return () => {
        isMounted = false;
    };
  }, []);

  useGSAP(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // Optimize for non-transparent
    if (!ctx) return;

    const render = (frameIndex: number) => {
        const img = imagesRef.current[frameIndex];
        if (!img || !img.complete) {
            // Fallback to nearest loaded frame if current frame isn't ready
            let nearest = frameIndex;
            while (nearest >= 0 && (!imagesRef.current[nearest] || !imagesRef.current[nearest].complete)) {
                nearest--;
            }
            if (nearest >= 0) render(nearest);
            return;
        }
        
        const parentWidth = window.innerWidth;
        const parentHeight = window.innerHeight;
        
        // Basic scale to fill
        const imgWidth = img.width;
        const imgHeight = img.height;
        const ratio = Math.max(parentWidth / imgWidth, parentHeight / imgHeight);
        const drawWidth = imgWidth * ratio;
        const drawHeight = imgHeight * ratio;
        const offsetX = (parentWidth - drawWidth) / 2;
        const offsetY = (parentHeight - drawHeight) / 2;

        if (canvas.width !== parentWidth || canvas.height !== parentHeight) {
            canvas.width = parentWidth;
            canvas.height = parentHeight;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Initial render
    render(0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=5000",
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
            const frame = Math.round(self.progress * (TOTAL_FRAMES - 1));
            requestAnimationFrame(() => render(frame));
        }
      }
    });

    // Reset visibility logic
    textRefs.current.forEach((el, i) => {
        if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0, y: 0 });
    });

    // Animation sequences
    tl.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.02 }, 0.01);
    
    tl.to(textRefs.current[0], { opacity: 0, y: -30, filter: "blur(10px)", duration: 0.05 }, 0.15);

    tl.fromTo(textRefs.current[1], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.05 }, 0.20);
    tl.to(textRefs.current[1], { opacity: 0, y: -30, filter: "blur(10px)", duration: 0.05 }, 0.35);

    tl.fromTo(textRefs.current[2], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.05 }, 0.40);
    tl.to(textRefs.current[2], { opacity: 0, y: -30, filter: "blur(10px)", duration: 0.05 }, 0.55);

    tl.fromTo(textRefs.current[3], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.05 }, 0.60);
    tl.to(textRefs.current[3], { opacity: 0, y: -30, filter: "blur(10px)", duration: 0.05 }, 0.75);

    tl.fromTo(textRefs.current[4], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.05 }, 0.82);

    // Fade to reveal WebGL
    tl.to(canvasRef.current, { opacity: 0, duration: 0.1 }, 0.9);
    tl.to(containerRef.current, { backgroundColor: "transparent", duration: 0.1 }, 0.9);

  }, { scope: containerRef, dependencies: [isReady] });

  // Custom high-performance loader
  if (!isReady) {
      return (
          <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-[#030610] text-white z-[9999]">
              <div className="relative w-48 h-[2px] bg-white/10 overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-white transition-all duration-300" style={{ width: `${loadedPercent}%` }} />
              </div>
              <div className="mt-6 text-[10px] font-mono tracking-[0.5em] text-white/40 uppercase animate-pulse">Initializing Core / {loadedPercent}%</div>
          </div>
      );
  }

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden will-change-contents">
      
      {/* Canvas - CSS Filters for GPU Acceleration */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block filter contrast-[1.15] saturate-[1.2] brightness-[0.9] will-change-transform" />
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-10" />
      
      <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-500/10 blur-[120px]" />
      </div>
      
      <div className="absolute inset-0 pointer-events-none p-4 md:p-12 w-full h-full overflow-hidden z-20">
          
          <div ref={el => { textRefs.current[0] = el; }} className="absolute left-6 md:left-12 top-20 md:top-48 max-w-[180px] md:max-w-xs text-left text-white">
              <h1 className="text-2xl md:text-5xl font-bold tracking-tighter mb-4 leading-[0.9] uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,1)]">Accelerate<br/>Growth With<br/>Custom AI.</h1>
              <div className="w-16 md:w-24 h-[2px] bg-white mt-4 md:mt-8 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              <p className="text-white font-mono text-[10px] md:text-[12px] font-bold tracking-[0.4em] uppercase mt-2 md:mt-4">Intelligence / 01</p>
          </div>

          <div ref={el => { textRefs.current[1] = el; }} className="opacity-0 absolute right-6 md:right-12 top-20 md:top-48 max-w-[180px] md:max-w-xs text-right text-white">
              <h2 className="text-2xl md:text-5xl font-bold tracking-tighter mb-4 leading-[0.9] uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,1)]">Intelligent<br/>Software<br/>Solutions.</h2>
              <div className="w-16 md:w-24 h-[2px] bg-white mt-4 md:mt-8 ml-auto shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              <p className="text-white font-mono text-[10px] md:text-[12px] font-bold tracking-[0.4em] uppercase mt-2 md:mt-4">Development / 02</p>
          </div>

          <div ref={el => { textRefs.current[2] = el; }} className="opacity-0 absolute left-6 md:left-12 bottom-32 md:bottom-48 max-w-[180px] md:max-w-xs text-left text-white">
              <h2 className="text-2xl md:text-5xl font-bold tracking-tighter mb-4 leading-[0.9] uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,1)]">Transform Your<br/>Workflow<br/>Today.</h2>
              <div className="w-16 md:w-24 h-[2px] bg-white mt-4 md:mt-8 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              <p className="text-white font-mono text-[10px] md:text-[12px] font-bold tracking-[0.4em] uppercase mt-2 md:mt-4">Efficiency / 03</p>
          </div>

          <div ref={el => { textRefs.current[3] = el; }} className="opacity-0 absolute right-6 md:right-12 bottom-12 md:bottom-24 max-w-[180px] md:max-w-xs text-right text-white">
              <h2 className="text-2xl md:text-5xl font-bold tracking-tighter mb-4 leading-[0.9] uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,1)]">Scalable Neural<br/>Architecture.</h2>
              <div className="w-16 md:w-24 h-[2px] bg-white mt-4 md:mt-8 ml-auto shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              <p className="text-white font-mono text-[10px] md:text-[12px] font-bold tracking-[0.4em] uppercase mt-2 md:mt-4">Engineering / 04</p>
          </div>

          <div ref={el => { textRefs.current[4] = el; }} className="opacity-0 absolute left-6 md:left-12 bottom-8 max-w-sm text-left pointer-events-auto text-white">
              <h2 className="text-lg md:text-4xl font-bold tracking-tighter mb-2 uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,1)]">Your AI Partner.</h2>
              <a href="mailto:15anuragsingh2003@gmail.com" className="text-white hover:text-blue-400 transition-all text-[12px] md:text-[14px] font-bold tracking-[0.3em] lowercase block border-b-2 border-white w-fit pb-1">15anuragsingh2003@gmail.com</a>
          </div>
      </div>

      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none text-white/50">
          <span className="text-xs uppercase tracking-widest font-mono">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent shadow-[0_0_8px_white]"></div>
      </div>
    </div>
  );
}
