"use client";

import React, { useEffect, useRef, ReactNode, JSX } from "react";

interface MobileRevealProps {
  children: ReactNode;
  variant?: "fade-up" | "clip-up" | "clip-left" | "scale-in";
  delay?: number;
  threshold?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * MobileReveal
 * -----------
 * Adds data-reveal / data-visible attributes for CSS-only animations.
 * Uses IntersectionObserver — zero GSAP. Works perfectly on mobile.
 * The CSS transitions are defined in globals.css and animate on compositor thread.
 */
export default function MobileReveal({
  children,
  variant = "fade-up",
  delay = 0,
  threshold = 0.15,
  className = "",
  as: Tag = "div",
}: MobileRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.setProperty("--reveal-delay", `${delay}ms`);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-visible", "true");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      data-reveal={variant}
      className={className}
    >
      {children}
    </div>
  );
}

/**
 * MobileRevealGroup
 * ----------------
 * Wraps children and staggers their reveals automatically.
 * Each direct child gets an incremental delay.
 */
interface MobileRevealGroupProps {
  children: ReactNode;
  stagger?: number; // ms between each child
  variant?: "fade-up" | "clip-up" | "scale-in";
  className?: string;
}

export function MobileRevealGroup({
  children,
  stagger = 80,
  variant = "fade-up",
  className = "",
}: MobileRevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = Array.from(el.children) as HTMLElement[];
    children.forEach((child, i) => {
      child.setAttribute("data-reveal", variant);
      child.style.setProperty("--reveal-delay", `${i * stagger}ms`);
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            setTimeout(() => {
              child.setAttribute("data-visible", "true");
            }, i * stagger);
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger, variant]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
