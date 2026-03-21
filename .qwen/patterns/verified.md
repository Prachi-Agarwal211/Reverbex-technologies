# 📐 REVERBEX TECHNOLOGIES — VERIFIED PATTERNS

## Pattern #1: GSAP Ticker Memory Leak Prevention
**Source**: `components/SmoothScroll.tsx`  
**Category**: Performance / Memory Management  
**Verified**: Session 1 (2026-03-21)

### Problem
GSAP ticker callbacks without named function references can cause memory leaks on component unmount.

### Solution
```typescript
// ✅ CORRECT: Named function reference for proper cleanup
const gsapTickerCb = (time: number) => lenis.raf(time * 1000);
gsap.ticker.add(gsapTickerCb);
// ...
return () => {
  gsap.ticker.remove(gsapTickerCb); // Same reference
};
```

### Usage
Use this pattern whenever adding callbacks to GSAP's ticker.

---

## Pattern #2: CSS Class Toggle for Overflow Control
**Source**: `app/page.tsx`, `app/globals.css`  
**Category**: Code Quality / Separation of Concerns  
**Verified**: Session 1 (2026-03-21)

### Problem
Using inline styles via JavaScript for overflow control violates separation of concerns.

### Solution
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

### Usage
Always use CSS classes for style changes, never inline styles via JavaScript.

---

## Pattern #3: IntersectionObserver for Media Playback
**Source**: `components/ContactSection.tsx`  
**Category**: Performance / Resource Management  
**Verified**: Session 1 (2026-03-21)

### Problem
Media elements playing continuously even when not visible waste resources and battery.

### Solution
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
          video.play().catch((e) => console.log("Autoplay prevented:", e));
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

### Usage
Use this pattern for any video/audio element that should only play when visible.

---

## Pattern #4: GSAP 3-Hook Architecture for Complex Animations
**Source**: `components/HeroVideo.tsx`  
**Category**: Animation Architecture  
**Verified**: Session 1 (2026-03-21)

### Problem
Complex animations with entrance, cycling, and exit phases need clean separation.

### Solution
```typescript
// Hook 1: Entrance animation - runs once on mount
useGSAP(() => {
  // Setup entrance animations
  return () => mm.revert();
}, { scope: containerRef });

// Hook 2: Entry animation when state changes
useGSAP(() => {
  // Setup entry animations based on currentIndex
  return () => mm.revert();
}, { scope: textContainerRef, dependencies: [currentIndex] });

// Hook 3: Exit animation with cycling
useEffect(() => {
  // Setup exit animations and setInterval
  return () => {
    mm.revert();
    if (exitTlRef.current) exitTlRef.current.kill();
  };
}, [currentIndex, statements.length]);
```

### Usage
Use this pattern for components with complex animation lifecycles.

---

## Pattern #5: gsap.registerPlugin Only Once
**Source**: `components/SmoothScroll.tsx`  
**Category**: Code Quality / Best Practices  
**Verified**: Session 1 (2026-03-21)

### Problem
Registering GSAP plugins in multiple components causes redundancy and potential conflicts.

### Solution
```typescript
// ✅ CORRECT: Register once at module level in a single file
// components/SmoothScroll.tsx
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger); // ONLY HERE
```

```typescript
// ✅ CORRECT: Import and use in other components without registering
// Other components
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// No gsap.registerPlugin call
```

### Usage
Always register GSAP plugins in one central location (SmoothScroll.tsx).

---

## Pattern #6: Selective hw-accelerated Class Usage
**Source**: Multiple components  
**Category**: Performance / GPU Optimization  
**Verified**: Session 1 (2026-03-21)

### Problem
Applying `hw-accelerated` class to static elements adds unnecessary GPU overhead.

### Solution
Only apply `hw-accelerated` to elements that are actually animated:

```css
/* globals.css */
.hw-accelerated {
  transform: translate3d(0, 0, 0);
  will-change: transform, opacity;
  backface-visibility: hidden;
}
```

**KEEP on**:
- Elements with GSAP animations
- Elements with CSS animations (marquee, ken-burns)
- Elements with transform/opacity transitions

**REMOVE from**:
- Static images
- Background videos without animations
- Text elements without animations

### Usage
Audit all `hw-accelerated` usages and remove from static elements.

---

*Last Updated: Session 1 — PHASE 1 Critical Bug Fixes*  
*Total Patterns: 6*
