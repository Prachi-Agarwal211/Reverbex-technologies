---
name: gsap-patterns
description: >
  Verified GSAP + React 19 animation patterns for the Reverbex Technologies
  Next.js project. Use when building, debugging, or reviewing GSAP animations,
  scroll sequences, or component lifecycle cleanup.
---

# GSAP + Next.js Animation Patterns

Verified patterns for this project's stack: Next.js 15 (App Router), React 19,
GSAP 3.14, Lenis 1.3, Tailwind CSS.

**Read `DESIGN.md` before any visual work. Read `CLAUDE.md` for coding standards.**

---

## Pattern 1: GSAP Ticker — Named Function Reference for Cleanup

**Problem:** GSAP ticker callbacks without named function references cause
memory leaks on component unmount.

**File:** `components/SmoothScroll.tsx`

```typescript
// ✅ CORRECT: Named function reference for proper cleanup
const gsapTickerCb = (time: number) => lenis.raf(time * 1000);
gsap.ticker.add(gsapTickerCb);

return () => {
  gsap.ticker.remove(gsapTickerCb); // Same reference
};
```

**Rule:** Always store callback references in a const and use the same reference
in `add()` and `remove()`.

---

## Pattern 2: CSS Class Toggle for Overflow Control

**Problem:** Inline styles via JavaScript for overflow control violate separation
of concerns and cause hydration mismatches.

**Files:** `app/page.tsx`, `app/globals.css`

```typescript
// ✅ CORRECT: CSS class toggle
document.documentElement.classList.add('preloader-active');
document.documentElement.classList.remove('preloader-active');
```

```css
/* globals.css */
html.preloader-active {
  overflow: hidden;
}
```

**Rule:** Never use `element.style.overflow = 'hidden'` via JavaScript. Always
use CSS class toggles.

---

## Pattern 3: IntersectionObserver for Media Playback

**Problem:** Media elements playing continuously when not visible waste
resources and battery.

**File:** `components/ContactSection.tsx`

```typescript
useEffect(() => {
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
```

**Rule:** Every `<video>` or `<audio>` element must have an IntersectionObserver
that pauses playback when out of viewport.

---

## Pattern 4: GSAP 3-Hook Architecture for Complex Animations

**Problem:** Complex animations with entrance, cycling, and exit phases need
clean separation to avoid conflicts and enable proper cleanup.

**File:** `components/HeroVideo.tsx`

```typescript
// Hook 1: Entrance animation — runs once on mount
useGSAP(() => {
  const ctx = gsap.context(() => {
    // Setup entrance animations
  }, containerRef);
  return () => ctx.revert();
}, { scope: containerRef });

// Hook 2: Entry animation when state changes
useGSAP(() => {
  const ctx = gsap.context(() => {
    // Setup entry animations based on currentIndex
  }, textContainerRef);
  return () => ctx.revert();
}, { scope: textContainerRef, dependencies: [currentIndex] });

// Hook 3: Exit animation with cycling
useEffect(() => {
  const ctx = gsap.context(() => {
    // Setup exit animations and setInterval
  }, containerRef);
  return () => {
    ctx.revert();
    if (exitTlRef.current) exitTlRef.current.kill();
  };
}, [currentIndex, statements.length]);
```

**Rule:** Separate entrance, state-change, and exit animations into distinct
hooks. Each hook manages its own GSAP context and cleanup.

---

## Pattern 5: gsap.registerPlugin — Single Registration Point

**Problem:** Registering GSAP plugins in multiple components causes redundancy
and potential conflicts.

**File:** `components/SmoothScroll.tsx` (single registration point)

```typescript
// ✅ CORRECT: Register once at module level in a single file
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger); // ONLY HERE
```

```typescript
// ✅ CORRECT: Import and use in other components without registering
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// No gsap.registerPlugin call
```

**Rule:** `gsap.registerPlugin(ScrollTrigger)` appears ONLY in
`SmoothScroll.tsx`. All other components import and use without registering.

---

## Pattern 6: Selective hw-accelerated Class Usage

**Problem:** Applying `hw-accelerated` to static elements adds unnecessary GPU
overhead.

```css
/* globals.css */
.hw-accelerated {
  transform: translate3d(0, 0, 0);
  will-change: transform, opacity;
  backface-visibility: hidden;
}
```

**KEEP on:**
- Elements with GSAP animations
- Elements with CSS animations (marquee, ken-burns)
- Elements with transform/opacity transitions

**REMOVE from:**
- Static images
- Background videos without animations
- Text elements without animations

**Rule:** Audit `hw-accelerated` usage. Only apply to elements that are actually
animated.

---

## General Rules

| Rule | Detail |
|------|--------|
| Animate only | `transform` and `opacity` — never width, height, top, left, margin, padding |
| Reduced motion | Always check `prefers-reduced-motion` and disable animations |
| Cleanup | Every GSAP context must call `ctx.revert()` on unmount |
| Client only | GSAP animations must be in Client Components (`'use client'`) |
| Import style | Use `import gsap from 'gsap'` — not `import { gsap } from 'gsap'` |

---

*Source: `.qwen/patterns/verified.md` — 6 patterns verified 2026-03-21*
*Last Updated: 2026-06-21*
