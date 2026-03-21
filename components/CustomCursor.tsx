"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDesktop(window.innerWidth >= 768 && !window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  useEffect(() => {
    if (!isDesktop || !cursorRef.current || !cursorDotRef.current) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    let isHovering = false;
    let activeTarget: HTMLElement | null = null;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    const mouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isHovering) {
        gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.6, ease: "power3.out", overwrite: "auto" });
        gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, overwrite: "auto" });
      } else if (activeTarget) {
        const rect = activeTarget.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;

        const distanceX = mouseX - targetX;
        const distanceY = mouseY - targetY;

        // Snap cursor to center of element with slight pull
        gsap.to(cursor, { x: targetX + distanceX * 0.1, y: targetY + distanceY * 0.1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
        gsap.to(dot, { x: targetX + distanceX * 0.05, y: targetY + distanceY * 0.05, duration: 0.2, overwrite: "auto" });
        
        // Pull the element itself using hardware acceleration
        gsap.to(activeTarget, { x: distanceX * 0.2, y: distanceY * 0.2, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      }
    };

    const mouseEnter = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button, .magnetic') as HTMLElement;
      if (target) {
        isHovering = true;
        activeTarget = target;
        gsap.to(cursor, { scale: 2.5, backgroundColor: "rgba(255,255,255,0.1)", borderColor: "transparent", duration: 0.3 });
        gsap.to(dot, { scale: 0, duration: 0.3 });
      }
    };

    const mouseLeave = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button, .magnetic') as HTMLElement;
      if (target && activeTarget === target) {
        isHovering = false;
        gsap.to(cursor, { scale: 1, backgroundColor: "transparent", borderColor: "rgba(255,255,255,0.4)", duration: 0.3 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
        
        // Reset element position
        gsap.to(activeTarget, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)", overwrite: "auto" });
        activeTarget = null;
      }
    };

    const mouseDown = () => {
       if(!isHovering) gsap.to(cursor, { scale: 0.8, duration: 0.2 });
    }
    const mouseUp = () => {
       if(!isHovering) gsap.to(cursor, { scale: 1, duration: 0.2 });
    }

    window.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseover", mouseEnter);
    document.addEventListener("mouseout", mouseLeave);
    document.addEventListener("mousedown", mouseDown);
    document.addEventListener("mouseup", mouseUp);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseover", mouseEnter);
      document.removeEventListener("mouseout", mouseLeave);
      document.removeEventListener("mousedown", mouseDown);
      document.removeEventListener("mouseup", mouseUp);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-white/40 rounded-full pointer-events-none z-[100] mix-blend-exclusion flex items-center justify-center hw-accelerated"
        style={{ transform: "translate3d(0,0,0)" }}
      />
      <div 
        ref={cursorDotRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[100] mix-blend-exclusion hw-accelerated"
        style={{ transform: "translate3d(0,0,0)" }}
      />
    </>
  );
}
