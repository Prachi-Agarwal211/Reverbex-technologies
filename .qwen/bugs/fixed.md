# 🐛 REVERBEX TECHNOLOGIES — BUG FIX RECORD

## Session 1: PHASE 1 Critical Bug Fixes (2026-03-21)

---

### BUG #1: GSAP Ticker Memory Leak in SmoothScroll.tsx
**Status**: ✅ FIXED  
**Severity**: HIGH  
**Component**: `components/SmoothScroll.tsx`

**Root Cause**:  
The gsap.ticker callback was not using a named function reference, potentially causing memory leaks on component unmount.

**Solution Applied**:  
- Stored the callback function in a variable: `const gsapTickerCb = (time: number) => lenis.raf(time * 1000);`
- Used the same reference for both `gsap.ticker.add(gsapTickerCb)` and `gsap.ticker.remove(gsapTickerCb)`
- Ensures proper cleanup on unmount

**Prevention**:  
Always use named function references for GSAP ticker callbacks to ensure proper cleanup.

**Source**: SHINZU.md Anti-Pattern: Memory Leaks

---

### BUG #2: Inline Overflow Styles in page.tsx
**Status**: ✅ FIXED  
**Severity**: MEDIUM  
**Component**: `app/page.tsx`

**Root Cause**:  
Using inline styles (`document.documentElement.style.overflow`) instead of CSS class toggles violates the SHINZU principle of separation of concerns.

**Solution Applied**:  
- Replaced inline style manipulation with CSS class toggles
- Added `html.preloader-active` class in globals.css
- Changed from `document.documentElement.style.overflow = 'hidden'` to `document.documentElement.classList.add('preloader-active')`

**Prevention**:  
Always use CSS classes for style changes, never inline styles via JavaScript.

**Source**: SHINZU.md Anti-Pattern: Inline Styles

---

### BUG #3: HeroVideo.tsx Animation Architecture
**Status**: ✅ VERIFIED CORRECT  
**Severity**: N/A  
**Component**: `components/HeroVideo.tsx`

**Finding**:  
The component already implements the correct 3-hook pattern:
- Hook 1: Entrance animation (useGSAP)
- Hook 2: Entry animation for text (useGSAP with dependencies)
- Hook 3: Exit animation (useEffect + setInterval pattern)

**No changes required** - already follows best practices.

---

### BUG #4: SplitHeading.tsx Animation Conflict
**Status**: ✅ ALREADY DELETED  
**Severity**: N/A  
**Component**: `components/SplitHeading.tsx`

**Finding**:  
File was already deleted from the project.

**No changes required**.

---

### BUG #5: useEffect+context Instead of useGSAP
**Status**: ✅ VERIFIED CORRECT  
**Severity**: N/A  
**Components**: All components

**Finding**:  
All components already use `useGSAP` from `@gsap/react` instead of `useEffect` for GSAP animations.

**No changes required** - already follows best practices.

---

### BUG #6: gsap.registerPlugin in Multiple Files
**Status**: ✅ VERIFIED CORRECT  
**Severity**: N/A  
**Components**: All components

**Finding**:  
`gsap.registerPlugin(ScrollTrigger)` is only called once in `SmoothScroll.tsx` at module level.

**No changes required** - already follows best practices.

---

### BUG #7: ContactSection Missing IntersectionObserver for Video
**Status**: ✅ FIXED  
**Severity**: MEDIUM  
**Component**: `components/ContactSection.tsx`

**Root Cause**:  
Video was playing continuously even when not visible, wasting resources and battery.

**Solution Applied**:  
- Added IntersectionObserver to detect when the section is visible
- Video only plays when section is in viewport (threshold: 0.1)
- Video pauses when section scrolls out of view
- Proper cleanup on unmount with `observer.disconnect()` and `video.pause()`

**Prevention**:  
Always use IntersectionObserver for media elements that should only play when visible.

**Source**: SHINZU.md Principle 2: Performance is a Feature

---

### BUG #8: hw-accelerated Class on Static Elements
**Status**: ✅ FIXED  
**Severity**: LOW  
**Components**: `components/ContactSection.tsx`

**Root Cause**:  
The `hw-accelerated` class was applied to static video element that doesn't animate, adding unnecessary GPU overhead.

**Solution Applied**:  
- Removed `hw-accelerated` from the static video element in ContactSection
- Kept `hw-accelerated` only on truly animated elements:
  - HeroVideo: video (opacity transition), marquee (CSS animation)
  - ContactSection: title words (GSAP animation)
  - ServicesSection: images (scale, clip-path animations)
  - FeaturedArchitectures: cards and images (horizontal scroll, scale)
  - Founders: cards and images (hover scale animations)
  - TechStream: ticker rows (CSS marquee animation)

**Prevention**:  
Only apply `hw-accelerated` class to elements that are actually animated. Static elements should not have this class.

**Source**: SHINZU.md Principle 2: Performance is a Feature

---

## Build Verification

**Build Command**: `npm run build`  
**Result**: ✅ PASSED  
**Compiled**: 1418ms  
**Linting**: ✅ No errors  
**TypeScript**: ✅ No errors  

```
✓ Compiled successfully in 1418ms
✓ Linting and checking validity of types
✓ Generating static pages (4/4)
✓ Finalizing page optimization
```

---

## Summary

| Bug ID | Component | Status | Severity |
|--------|-----------|--------|----------|
| #1 | SmoothScroll.tsx | ✅ Fixed | HIGH |
| #2 | page.tsx | ✅ Fixed | MEDIUM |
| #3 | HeroVideo.tsx | ✅ Verified | N/A |
| #4 | SplitHeading.tsx | ✅ Deleted | N/A |
| #5 | All components | ✅ Verified | N/A |
| #6 | All components | ✅ Verified | N/A |
| #7 | ContactSection.tsx | ✅ Fixed | MEDIUM |
| #8 | ContactSection.tsx | ✅ Fixed | LOW |

**Total Fixed**: 4 bugs  
**Total Verified**: 4 components (already correct)  
**Build Status**: ✅ PASS

---

*Documented: Session 1 — PHASE 1 Critical Bug Fixes*  
*Next: PHASE 2 Typography System*
