'use client';
import { useEffect, useRef } from 'react';

/** Muted autoplay loop. Poster-only on small screens / reduced motion / save-data; plays only while on screen. */
export default function LoopVideo({ src, mobileSrc, poster, className = '', minWidth = 768 }: { src: string; mobileSrc?: string; poster: string; className?: string; minWidth?: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    if (innerWidth < minWidth || matchMedia('(prefers-reduced-motion: reduce)').matches || conn?.saveData) return;
    // The supplied video library contains MP4 files only.
    let source: HTMLSourceElement | null = null;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!source) {
          source = document.createElement('source');
          source.src = `${mobileSrc && innerWidth < 768 ? mobileSrc : src}.mp4`;
          source.type = 'video/mp4'; v.appendChild(source); v.load();
        }
        v.play().catch(() => {});
      } else v.pause();
    }, { threshold: .05 });
    io.observe(v); return () => { io.disconnect(); v.pause(); source?.remove(); v.load(); };
  }, [src, mobileSrc, minWidth]);
  return <video ref={ref} poster={poster} muted loop playsInline autoPlay preload="none" aria-hidden className={`pointer-events-none object-cover ${className}`} />;
}
