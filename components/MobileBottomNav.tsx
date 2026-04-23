"use client";

import { useState, useEffect } from "react";
import { Home, BookOpen, Layers, Cpu, BookMarked, Users, Mail } from "lucide-react";
import { MOBILE_NAV_ITEMS } from "@/lib/config";

// Map section IDs to icons
const iconMap: Record<string, React.ElementType> = {
  hero: Home,
  story: BookOpen,
  capabilities: Layers,
  services: Cpu,
  architectures: BookMarked,
  founders: Users,
  contact: Mail,
};

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const target = el.getBoundingClientRect().top + window.scrollY;
  if ((window as any).lenis) {
    (window as any).lenis.scrollTo(target, { duration: 1, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  } else {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
};

export default function MobileBottomNav() {
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);

  // Event-based visibility: listen for 'loaded' class on body
  useEffect(() => {
    // Check if already loaded
    if (document.body.classList.contains("loaded")) {
      setVisible(true);
      return;
    }

    // Use MutationObserver to detect when preloader completes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          if (document.body.classList.contains("loaded")) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    // Fallback timeout in case MutationObserver doesn't fire
    const fallbackTimer = setTimeout(() => {
      setVisible(true);
      observer.disconnect();
    }, 5000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Track active section
  useEffect(() => {
    const sections = MOBILE_NAV_ITEMS.map((n) => document.getElementById(n.to)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  if (!visible) return null;

  return (
    <nav
      className="md:hidden mobile-bottom-nav"
      style={{
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      aria-label="Mobile bottom navigation"
    >
      {MOBILE_NAV_ITEMS.map(({ label, to }) => {
        const Icon = iconMap[to] || Home;
        return (
          <button
            key={to}
            onClick={() => {
              setActive(to);
              scrollToSection(to);
            }}
            className={`mobile-bottom-nav-item ${active === to ? "active" : ""}`}
            aria-label={`Go to ${label}`}
          >
            <Icon className="mobile-bottom-nav-icon" style={{ width: 20, height: 20 }} />
            <span className="mobile-bottom-nav-label">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
