"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, Briefcase, Heart, Building2 } from "lucide-react";
import { MOBILE_NAV_ITEMS, NAV_ROUTE_MAP } from "@/lib/config";
import { scrollToSection } from "@/lib/scrollToSection";

const iconMap: Record<string, React.ElementType> = {
  hero: Home,
  capabilities: Layers,
  architectures: Briefcase,
  industries: Building2,
  reverbexbond: Heart,
};

export default function MobileBottomNav() {
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  useEffect(() => {
    if (document.body.classList.contains("loaded")) {
      setVisible(true);
      return;
    }

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

    const fallbackTimer = setTimeout(() => {
      setVisible(true);
      observer.disconnect();
    }, 5000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Track active section only on homepage
  useEffect(() => {
    if (!isHomepage) return;

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
  }, [isHomepage]);

  // Set active based on current route on sub-pages
  useEffect(() => {
    if (!isHomepage) {
      const match = Object.entries(NAV_ROUTE_MAP).find(([, route]) => route === pathname);
      if (match) setActive(match[0]);
    }
  }, [pathname, isHomepage]);

  if (!visible) return null;

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      aria-label="Mobile bottom navigation"
    >
      <div className="bg-black/90 backdrop-blur-xl border-t border-white/10 px-2 pt-2 pb-2">
        <div className="flex items-center justify-around">
          {MOBILE_NAV_ITEMS.map(({ label, to }) => {
            const Icon = iconMap[to] || Home;
            const isActive = active === to;
            const route = NAV_ROUTE_MAP[to];

            if (isHomepage) {
              return (
                <button
                  key={to}
                  onClick={() => {
                    setActive(to);
                    scrollToSection(to);
                  }}
                  className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200 ${
                    isActive ? "bg-white/5" : "active:bg-white/5"
                  }`}
                  aria-label={`Go to ${label}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isActive ? "text-[#EAB308]" : "text-white/40"
                    }`}
                  />
                  <span
                    className={`text-[9px] font-medium tracking-wider uppercase transition-colors duration-200 ${
                      isActive ? "text-[#EAB308]" : "text-white/40"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={to}
                href={route || "/"}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200 ${
                  isActive ? "bg-white/5" : "active:bg-white/5"
                }`}
                aria-label={`Go to ${label}`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive ? "text-[#EAB308]" : "text-white/40"
                  }`}
                />
                <span
                  className={`text-[9px] font-medium tracking-wider uppercase transition-colors duration-200 ${
                    isActive ? "text-[#EAB308]" : "text-white/40"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
