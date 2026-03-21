"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Check } from "lucide-react";

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // IntersectionObserver for video - play when 10% visible, pause when not
  React.useEffect(() => {
    const video = videoRef.current;
    const element = containerRef.current;
    if (!video || !element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.playbackRate = 0.8;
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  // Copy email functionality with toast
  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      // Silently fail - toast won't show but user can still copy manually
    }
  };

  useGSAP(() => {
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
        // Heading color shift animation
        .fromTo('.contact-heading',
          { color: "rgba(255,255,255,0.9)" },
          { color: "rgba(255,255,255,1)", duration: 0.8 },
          "-=0.8"
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

  // Back to top with lenis.scrollTo
  const handleBackToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} id="contact" className="relative w-full min-h-[100dvh] overflow-hidden overflow-x-hidden bg-black flex flex-col justify-end">
      {/* Absolute Video Background - Desktop only, static image for mobile */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {/* Desktop: Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-50 hidden md:block"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Mobile: Static Ken Burns image fallback */}
        <div
          className="absolute inset-0 w-full h-full md:hidden animate-ken-burns"
          style={{
            backgroundImage: 'url(/contact-fallback.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        {/* Dark overlay for minimal readable look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/40 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[#050505]/30 z-10 pointer-events-none hidden md:block mix-blend-multiply" />
      </div>

      {/* Content strictly positioned at the bottom */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-12 md:pb-20 pb-safe flex flex-col items-start justify-end pointer-events-none">

        {/* Massive Minimalist Heading */}
        <div className="w-full mb-16 md:mb-32 flex flex-col gap-6 pointer-events-auto">
          {/* Header lines with yellow accent */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-white/10 flex-1 max-w-[60px]" />
            <span className="text-yellow-500 text-[clamp(0.65rem,1.5vw,0.85rem)] font-light tracking-[0.2em] uppercase tabular">
              Get In Touch
            </span>
            <div className="h-px bg-white/10 flex-1 max-w-[60px]" />
          </div>
           <div className="flex flex-wrap gap-4 md:gap-8">
           {("Ready to scale?").split(" ").map((word, i) => (
             <div key={i} className="overflow-hidden mobile-reveal pb-2">
               <h2
                 className="contact-title-word text-[clamp(4.5rem,14vw,14rem)] text-white tracking-tighter leading-none inline-block pr-2 md:pr-4"
                 style={{ fontFamily: "var(--font-syne), sans-serif", perspective: "800px" }}
               >
                 {word}
               </h2>
             </div>
           ))}
           </div>
           <p className="hero-subtext text-white/70 text-[clamp(0.65rem,1.5vw,0.85rem)] font-light tracking-[0.15em] uppercase mt-1 drop-shadow-md pb-2 mobile-reveal max-w-2xl" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
              Partner with us to deploy intelligent architecture that reduces overhead, automates workflows, and accelerates your business growth.
           </p>
        </div>

        {/* Clean CSS Grid for contact info */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 border-t border-white/10 pt-10 md:pt-16 pointer-events-auto">

           <div className="contact-link-group mobile-reveal flex flex-col items-start gap-4">
              <span className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">Inquiries</span>
              <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-3 group">
                    <a href="mailto:15anuragsingh2003@gmail.com" className="text-white text-lg md:text-2xl font-light hover:text-white transition-colors relative inline-block w-max">
                       <span className="relative z-10">15anuragsingh2003@gmail.com</span>
                       <span className="absolute left-0 bottom-0 w-full h-[1px] bg-blue-500 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                    </a>
                    {/* Separate copy button */}
                    <button
                      onClick={() => handleCopyEmail("15anuragsingh2003@gmail.com")}
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      aria-label="Copy email"
                    >
                      {copiedEmail === "15anuragsingh2003@gmail.com" ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                 </div>
                 <div className="flex items-center gap-3 group">
                    <a href="mailto:prachiagarwal211@gmail.com" className="text-white text-lg md:text-2xl font-light hover:text-white transition-colors relative inline-block w-max">
                       <span className="relative z-10">prachiagarwal211@gmail.com</span>
                       <span className="absolute left-0 bottom-0 w-full h-[1px] bg-blue-500 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                    </a>
                    {/* Separate copy button */}
                    <button
                      onClick={() => handleCopyEmail("prachiagarwal211@gmail.com")}
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      aria-label="Copy email"
                    >
                      {copiedEmail === "prachiagarwal211@gmail.com" ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                 </div>
              </div>
              {/* Toast notification */}
              {copiedEmail && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-300 z-50">
                  ✓ Copied
                </div>
              )}
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
                 <div className="flex items-center gap-2 text-white/60 text-sm md:text-base font-light max-w-xs mt-1">
                    {/* Live indicator with animated green dot */}
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Available — Remote
                 </div>
              </div>
           </div>

        </div>

        {/* Bottom Footer Credits Line */}
        <div className="contact-footer mobile-reveal w-full mt-16 md:mt-24 flex flex-col sm:flex-row items-start sm:items-center justify-between pointer-events-auto gap-4">
          <p className="text-white/30 text-[10px] md:text-xs tracking-[0.2em] uppercase">
            {/* Auto year */}
            © {new Date().getFullYear()} Reverbex Technologies • Redefining Operations
          </p>
          {/* Back to top with lenis.scrollTo */}
          <button
            onClick={handleBackToTop}
            className="text-white/40 hover:text-white text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors cursor-pointer"
          >
            Back to Top
          </button>
        </div>
      </div>
    </section>
  );
}
