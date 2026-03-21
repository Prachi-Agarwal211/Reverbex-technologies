"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const navLinks = [
  { name: "Home", to: "home" },
  { name: "Services", to: "services" },
  { name: "Capabilities", to: "capabilities" },
  { name: "Founders", to: "founders" },
  { name: "Contact", to: "contact" },
];

// Enhanced scrollToSection with Lenis support
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const targetPosition = elementPosition - offset;

    // Try Lenis first, fallback to native
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(targetPosition, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const mobileMenuTlRef = useRef<gsap.core.Timeline | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Mount check
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll-aware background (passive: true for performance)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section indicator with IntersectionObserver
  useEffect(() => {
    const sections = navLinks.map((link) => document.getElementById(link.to));
    const validSections = sections.filter((s): s is HTMLElement => s !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    validSections.forEach((section) => observer.observe(section));
    return () => validSections.forEach((section) => observer.unobserve(section));
  }, []);

  // Mobile menu GSAP animation
  useGSAP(() => {
    if (!mobileMenuOpen) {
      // Animate out
      if (mobileMenuTlRef.current) mobileMenuTlRef.current.kill();
      mobileMenuTlRef.current = gsap.timeline({
        onComplete: () => {
          // Cleanup happens in return
        },
      });

      const items = document.querySelectorAll(".mobile-nav-item");
      mobileMenuTlRef.current.to(items, {
        y: -30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: "power3.in",
      });

      mobileMenuTlRef.current.to(
        ".mobile-menu-overlay",
        {
          opacity: 0,
          backdropFilter: "blur(0px)",
          duration: 0.4,
          ease: "power3.in",
        },
        0
      );
    } else {
      // Animate in with stagger
      if (mobileMenuTlRef.current) mobileMenuTlRef.current.kill();
      mobileMenuTlRef.current = gsap.timeline();

      const items = document.querySelectorAll(".mobile-nav-item");

      // Reset items
      gsap.set(items, { y: 30, opacity: 0 });

      mobileMenuTlRef.current.to(".mobile-menu-overlay", {
        opacity: 1,
        backdropFilter: "blur(24px)",
        duration: 0.6,
        ease: "power3.out",
      });

      mobileMenuTlRef.current.to(
        items,
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }

    return () => {
      if (mobileMenuTlRef.current) mobileMenuTlRef.current.kill();
    };
  }, { dependencies: [mobileMenuOpen] });

  if (!isMounted) return null;

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-xl bg-black/60 border-b border-white/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo with Version Tag */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 cursor-pointer group"
            aria-label="Reverbex Technologies - Home"
          >
            <Image
              src="/logo.PNG"
              alt="Reverbex"
              width={36}
              height={36}
              className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <div className="flex items-baseline">
              <span
                className="text-2xl text-white font-bold transition-colors duration-300"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                REVERBEX
              </span>
              <span className="text-[9px] text-white/25 tracking-[0.2em] ml-2 mt-1 self-start">
                v2
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div
            className="hidden md:flex items-center gap-8"
            role="navigation"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.to)}
                className="relative text-white/80 hover:text-white text-sm font-medium cursor-pointer transition-colors group py-1"
                aria-label={`Navigate to ${link.name} section`}
                aria-current={activeSection === link.to ? "page" : undefined}
              >
                {link.name}
                {/* Hover underline animation */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                {/* Active indicator dot */}
                {activeSection === link.to && (
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 bg-yellow-500 rounded-full" />
                )}
              </button>
            ))}

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="ml-4 px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] active:scale-95"
            >
              Get in touch
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Full Screen with Staggered Animation */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay fixed inset-0 z-40 bg-black/95 flex flex-col md:hidden"
          role="dialog"
          aria-label="Mobile navigation menu"
          aria-modal="true"
        >
          {/* Close button at top-right */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors z-50"
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation links with counter numbers */}
          <div className="flex-1 flex flex-col justify-center items-center gap-0 px-6">
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                className="mobile-nav-item flex items-center gap-4 cursor-pointer group"
                onClick={() => {
                  scrollToSection(link.to);
                  setMobileMenuOpen(false);
                }}
              >
                <span className="text-[10px] text-yellow-500/40 font-mono tracking-widest">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-white text-3xl font-light tracking-wide group-hover:text-yellow-500 transition-colors duration-300">
                  {link.name}
                </span>
              </button>
            ))}
          </div>

          {/* Email at bottom */}
          <div className="mobile-nav-item pb-12 px-6 text-center">
            <a
              href="mailto:hello@reverbex.com"
              className="text-white/50 hover:text-yellow-500 text-sm tracking-[0.15em] uppercase transition-colors duration-300"
            >
              hello@reverbex.com
            </a>
          </div>
        </div>
      )}
    </>
  );
}
