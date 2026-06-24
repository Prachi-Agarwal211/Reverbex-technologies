"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SplitType from "split-type";
import { DESKTOP_NAV_ITEMS, MOBILE_NAV_ITEMS, SOCIALS, CONTACT, NAV_ROUTE_MAP } from "../lib/config";
import { useScrollDirection } from "@/lib/hooks/useScrollDirection";

const hiddenPath = "M 0 0 L 0 0 Q 500 0 1000 0 L 1000 0 Z";
const bulgeDownPath = "M 0 0 L 0 0 Q 500 1000 1000 0 L 1000 0 Z";
const fullPath = "M 0 0 L 0 1000 Q 500 1000 1000 1000 L 1000 0 Z";
const bulgeUpPath = "M 0 0 L 0 1000 Q 500 0 1000 1000 L 1000 0 Z";

export default function MorphingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  // Fix: separate refs for desktop/mobile link containers (was a single ref causing SplitType duplication)
  const desktopLinksRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const desktopSplit = useRef<SplitType | null>(null);
  const mobileSplit = useRef<SplitType | null>(null);
  const pathname = usePathname();
  const isNavVisible = useScrollDirection();

  // Reset menu on route change
  useEffect(() => {
    if (isOpen) {
      closeMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useGSAP(() => {
    // Initialize SplitType for desktop links
    if (desktopLinksRef.current) {
      const linkEls = desktopLinksRef.current.querySelectorAll(".menu-link-text-desktop");
      desktopSplit.current = new SplitType(Array.from(linkEls) as HTMLElement[], { types: "chars" });
    }

    // Initialize SplitType for mobile links
    if (mobileLinksRef.current) {
      const linkEls = mobileLinksRef.current.querySelectorAll(".menu-link-text-mobile");
      mobileSplit.current = new SplitType(Array.from(linkEls) as HTMLElement[], { types: "chars" });
    }

    // Initially hide all chars and fade items
    gsap.set(".menu-char-desktop, .menu-char-mobile", { yPercent: 100, opacity: 0 });
    gsap.set(".menu-fade-item", { opacity: 0, y: 20 });
  }, { scope: containerRef });

  function openMenu() {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsOpen(true);

    // Revert and re-split to avoid duplicate chars from previous opens
    if (desktopLinksRef.current) {
      desktopSplit.current?.revert();
      const linkEls = desktopLinksRef.current.querySelectorAll(".menu-link-text-desktop");
      desktopSplit.current = new SplitType(Array.from(linkEls) as HTMLElement[], { types: "chars", tagName: "span" });
      const chars = desktopLinksRef.current.querySelectorAll(".char");
      chars.forEach((c) => c.classList.add("menu-char-desktop"));
      gsap.set(chars, { yPercent: 100, opacity: 0 });
    }
    if (mobileLinksRef.current) {
      mobileSplit.current?.revert();
      const linkEls = mobileLinksRef.current.querySelectorAll(".menu-link-text-mobile");
      mobileSplit.current = new SplitType(Array.from(linkEls) as HTMLElement[], { types: "chars", tagName: "span" });
      const chars = mobileLinksRef.current.querySelectorAll(".char");
      chars.forEach((c) => c.classList.add("menu-char-mobile"));
      gsap.set(chars, { yPercent: 100, opacity: 0 });
    }

    tl.current = gsap.timeline({ onComplete: () => setIsAnimating(false) });

    // 1. Morph SVG down to cover screen
    tl.current
      .to(pathRef.current, { attr: { d: bulgeDownPath }, duration: 0.4, ease: "power2.in" })
      .to(pathRef.current, { attr: { d: fullPath }, duration: 0.4, ease: "power2.out" }, "-=0.1");

    // 2. Animate chars in — scope to desktop or mobile separately
    tl.current
      .to(".menu-char-desktop, .menu-char-mobile", {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.015,
        ease: "elastic.out(1, 0.25)",
      }, "-=0.3");

    // 3. Fade in contact info
    tl.current.to(".menu-fade-item", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    }, "-=0.6");
  }

  function closeMenu() {
    if (isAnimating) return;
    setIsAnimating(true);

    tl.current = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        setIsAnimating(false);
      },
    });

    // 1. Fade out content
    tl.current
      .to(".menu-char-desktop, .menu-char-mobile", {
        yPercent: -100,
        opacity: 0,
        duration: 0.3,
        stagger: 0.005,
        ease: "power2.in",
      })
      .to(".menu-fade-item", { opacity: 0, y: -20, duration: 0.3, ease: "power2.in" }, "<");

    // 2. Morph SVG back up
    tl.current
      .to(pathRef.current, { attr: { d: bulgeUpPath }, duration: 0.4, ease: "power2.in" }, "-=0.1")
      .to(pathRef.current, { attr: { d: hiddenPath }, duration: 0.4, ease: "power2.out" }, "-=0.1");
  }

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-screen z-[100] pointer-events-none">

      {/* The Toggle Button (Always Clickable) */}
      <div className={`absolute top-5 right-5 sm:top-6 sm:right-6 md:top-8 md:right-12 z-[101] pointer-events-auto transition-transform duration-500 ${
        isNavVisible || isOpen ? "translate-y-0" : "-translate-y-full"
      }`}>
        <button
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="relative overflow-hidden w-20 h-11 sm:w-24 sm:h-12 rounded-full bg-gradient-to-b from-[#EAB308] via-[#d4a007] to-[#b8860b] border border-[#EAB308]/30 flex items-center justify-center text-black text-xs sm:text-sm font-semibold tracking-widest uppercase hover:from-[#f5c842] hover:via-[#EAB308] hover:to-[#d4a007] transition-all duration-300 shadow-[0_2px_12px_rgba(234,179,8,0.3)]"
        >
          <div className={`absolute transition-transform duration-500 ${isOpen ? '-translate-y-12' : 'translate-y-0'}`}>
            Menu
          </div>
          <div className={`absolute transition-transform duration-500 ${isOpen ? 'translate-y-0' : 'translate-y-12'}`}>
            Close
          </div>
        </button>
      </div>

      {/* The Menu Overlay */}
      <div className={`absolute top-0 left-0 w-full h-full ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>

        {/* Morphing SVG Background */}
        <svg
          className="absolute top-0 left-0 w-full h-[110vh] -z-10"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="menuGradient" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#EAB308" />
              <stop offset="60%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </radialGradient>
          </defs>
          <path
            ref={pathRef}
            id="menu-path"
            fill="url(#menuGradient)"
            d={hiddenPath}
          />
        </svg>

        {/* ========== DESKTOP MENU ========== */}
        <div className={`hidden md:flex w-full h-full transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>

          {/* Left Column — Logo + Contact */}
          <div className="w-[40%] h-full flex flex-col justify-between p-16 lg:p-24 pt-20 lg:pt-24">
            {/* Logo */}
            <div className="menu-fade-item">
              <Link href="/" className="block group" onClick={closeMenu}>
                <Image
                  src="/logo for menu.png"
                  alt="Reverbex"
                  width={400}
                  height={400}
                  className="w-40 lg:w-48 h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>

            {/* Contact Info — Bottom Left */}
            <div className="space-y-5 pb-4">
              <div className="menu-fade-item">
                <span className="block text-[11px] uppercase tracking-[0.2em] font-bold mb-2 text-[#050505]/60">Say Hello</span>
                <a href={`mailto:${CONTACT.email}`} className="text-lg font-medium text-[#050505] hover:underline leading-relaxed">{CONTACT.emailDisplay}</a>
              </div>
              <div className="menu-fade-item">
                <span className="block text-[11px] uppercase tracking-[0.2em] font-bold mb-2 text-[#050505]/60">Call Us</span>
                <a href={CONTACT.phoneHref} className="text-lg font-medium text-[#050505] hover:underline">{CONTACT.phone}</a>
              </div>
              <div className="menu-fade-item flex gap-8 pt-4">
                <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#050505]/60 hover:text-[#050505] transition-colors">LinkedIn</a>
                <a href={SOCIALS.twitter} target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#050505]/60 hover:text-[#050505] transition-colors">Twitter</a>
              </div>
            </div>
          </div>

          {/* Right Column — Nav Links (uses its own scoped ref) */}
          <div ref={desktopLinksRef} className="w-[60%] h-full flex flex-col justify-center items-end pr-16 lg:pr-24 pt-12 gap-0">
            {DESKTOP_NAV_ITEMS.map((item, idx) => {
              const href = NAV_ROUTE_MAP[item.to] ?? "/";
              return (
                <Link
                  key={idx}
                  href={href}
                  onClick={closeMenu}
                  className="group relative text-[#050505] text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter uppercase leading-[1.05] hover:opacity-50 transition-opacity duration-300"
                >
                  <div className="menu-link-text-desktop inline-block overflow-hidden pb-2 lg:pb-3">
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ========== MOBILE MENU ========== */}
        <div className={`flex md:hidden w-full h-full flex-col transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>

          {/* Top — Logo */}
          <div className="pt-20 px-6 menu-fade-item">
            <Link href="/" className="block group" onClick={closeMenu}>
              <Image
                src="/logo for menu.png"
                alt="Reverbex"
                width={400}
                height={400}
                className="w-28 h-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Center — Nav Links (uses its own scoped ref — no more ref collision) */}
          <div ref={mobileLinksRef} className="flex-1 flex flex-col justify-center items-start px-6 gap-1">
            {MOBILE_NAV_ITEMS.map((item, idx) => {
              const href = NAV_ROUTE_MAP[item.to] ?? "/";
              return (
                <Link
                  key={idx}
                  href={href}
                  onClick={closeMenu}
                  className="group relative text-[#050505] text-4xl font-black tracking-tighter uppercase leading-[1.1] hover:opacity-50 transition-opacity duration-300"
                >
                  <div className="menu-link-text-mobile inline-block overflow-hidden pb-3">
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom — Contact Info */}
          <div className="space-y-4 px-6 pb-8">
            <div className="menu-fade-item">
              <span className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-1 text-[#050505]/60">Say Hello</span>
              <a href={`mailto:${CONTACT.email}`} className="text-base font-medium text-[#050505] hover:underline">{CONTACT.emailDisplay}</a>
            </div>
            <div className="menu-fade-item">
              <span className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-1 text-[#050505]/60">Call Us</span>
              <a href={CONTACT.phoneHref} className="text-base font-medium text-[#050505] hover:underline">{CONTACT.phone}</a>
            </div>
            <div className="menu-fade-item flex gap-6 pt-2">
              <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#050505]/60 hover:text-[#050505] transition-colors">LinkedIn</a>
              <a href={SOCIALS.twitter} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#050505]/60 hover:text-[#050505] transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
