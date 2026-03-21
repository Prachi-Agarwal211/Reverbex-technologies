# 🤖 REVERBEX TECHNOLOGIES — AGENT CONFIGURATION

## Project Overview
**Reverbex Technologies** — Award-winning architecture portfolio website
**Tech Stack**: Next.js 15 / React 19 / TypeScript strict / GSAP 3.14 / Lenis 1.3 / Tailwind 3.4
**Fonts**: Syne (display) + DM Sans (body)
**Location**: `C:\Users\15anu\OneDrive\文档\code\reverbex_technlogy\Reverbex-technologies`

---

## 📁 Project Structure

```
Reverbex-technologies/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + fonts
│   │   ├── page.tsx            # Main page composition
│   │   └── globals.css         # Global styles + animations
│   ├── components/
│   │   ├── SmoothScroll.tsx    # Lenis + GSAP scroll
│   │   ├── HeroVideo.tsx       # Hero video with animations
│   │   ├── Navbar.tsx          # Navigation component
│   │   ├── OurStory.tsx        # Story section
│   │   ├── Services.tsx        # Services section
│   │   ├── FeaturedArchitectures.tsx
│   │   ├── Methodology.tsx     # Methodology section
│   │   ├── TechStream.tsx      # Tech marquee
│   │   ├── Founders.tsx        # Founders section
│   │   ├── ContactSection.tsx  # Contact section
│   │   ├── SplitHeading.tsx    # ⚠️ TO DELETE (animation conflict)
│   │   ├── CustomCursor.tsx    # Custom cursor
│   │   └── Preloader.tsx       # Loading screen
│   ├── hooks/
│   │   ├── useSmoothScroll.ts  # Lenis hook
│   │   └── useIntersectionObserver.ts
│   └── lib/
│       └── utils.ts            # CN helper
├── public/
│   ├── videos/                 # Hero video, overlays
│   ├── images/                 # Project images
│   └── fonts/                  # Custom fonts
├── .qwen/                      # Project brain
│   ├── SHINZU.md              # Universal rules
│   ├── AGENTS.md              # This file
│   ├── patterns/              # Verified patterns
│   ├── bugs/fixed.md          # Bug records
│   ├── decisions/             # Architectural decisions
│   └── learnings/             # Session insights
└── package.json
```

---

## 🎯 CURRENT STATE (Session 1)

### Known Issues (PHASE 1 - Critical)
1. **SmoothScroll.tsx**: GSAP ticker memory leak — unnamed function reference
2. **page.tsx**: Inline overflow styles — should be CSS class toggle
3. **HeroVideo.tsx**: Animation architecture broken — needs 3-hook pattern
4. **SplitHeading.tsx**: Animation conflict — DELETE FILE
5. **All components**: Using useEffect+context instead of useGSAP
6. **All components**: gsap.registerPlugin in multiple files
7. **ContactSection**: Missing IntersectionObserver for video
8. **All components**: hw-accelerated class on static elements

### Pending Work
- **PHASE 1**: Critical Bug Fixes (BLOCKING)
- **PHASE 2**: Typography System (Syne + DM Sans)
- **PHASE 3-11**: Section Rebuilds (parallelizable)
- **PHASE 12-21**: Polish, Performance, Accessibility, SEO

---

## 🤖 AGENT DELEGATION MATRIX

| Task | Agent | Priority |
|------|-------|----------|
| PHASE 1: Critical Bug Fixes | `engineer` | 🔴 CRITICAL |
| PHASE 2: Typography System | `frontend-engineer` | 🔴 CRITICAL |
| PHASE 3: Navbar Rebuild | `frontend-engineer` | 🟡 HIGH |
| PHASE 4: HeroVideo Rebuild | `engineer` | 🟡 HIGH |
| PHASE 5: OurStory Rebuild | `frontend-engineer` | 🟡 HIGH |
| PHASE 6: Services Rebuild | `frontend-engineer` | 🟡 HIGH |
| PHASE 7: FeaturedArchitectures | `frontend-engineer` | 🟡 HIGH |
| PHASE 8: Methodology Rebuild | `frontend-engineer` | 🟡 HIGH |
| PHASE 9: TechStream Rebuild | `frontend-engineer` | 🟢 MEDIUM |
| PHASE 10: Founders Rebuild | `frontend-engineer` | 🟢 MEDIUM |
| PHASE 11: ContactSection Rebuild | `engineer` | 🟢 MEDIUM |
| PHASE 12: Preloader | `frontend-engineer` | 🟢 MEDIUM |
| PHASE 13: CustomCursor | `frontend-engineer` | 🟢 MEDIUM |
| PHASE 14: globals.css | `frontend-engineer` | 🟢 MEDIUM |
| PHASE 15: Mobile Optimizations | `frontend-engineer` | 🟡 HIGH |
| PHASE 16: Performance | `engineer` | 🟡 HIGH |
| PHASE 17: Accessibility | `qa-engineer` | 🟡 HIGH |
| PHASE 18: SEO | `engineer` | 🟢 MEDIUM |
| PHASE 19: Award Details | `frontend-engineer` | 🟢 MEDIUM |
| PHASE 20: File Deletions | `engineer` | 🟢 MEDIUM |
| PHASE 21: Verification | `qa-engineer` | 🔴 CRITICAL |

---

## 📋 DELEGATION PROTOCOL

### When Delegating to `engineer`:
```
Context: [Specific component/file]
Task: [Clear action item]
Success Criteria: [Measurable outcome]
Constraints: [SHINZU principles, patterns to use]
```

### When Delegating to `frontend-engineer`:
```
Context: [UI/UX requirement]
Design Spec: [Visual/interaction details]
Responsive: [Mobile/tablet/desktop behavior]
Accessibility: [ARIA, focus, motion requirements]
```

### When Delegating to `qa-engineer`:
```
Test Scope: [What to test]
Checklist: [Specific items to verify]
Browsers: [Target browsers]
Devices: [Mobile/tablet/desktop]
```

---

## 🔧 VERIFIED PATTERNS (Use These)

### GSAP + React 19 Pattern
```typescript
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';

const Component = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.to('.element', { x: 100, duration: 1 });
    }, containerRef);
    
    return () => ctx.revert(); // Cleanup
  }, { scope: containerRef });
  
  return <div ref={containerRef}>...</div>;
};
```

### IntersectionObserver Pattern
```typescript
const ref = useRef<HTMLDivElement>(null);

useEffect(() => {
  const element = ref.current;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        // Trigger animation
      }
    },
    { threshold: 0.1 }
  );
  
  if (element) observer.observe(element);
  return () => observer.disconnect();
}, []);
```

---

## 📊 BUILD STATUS

| Phase | Status | Build Pass | Notes |
|-------|--------|------------|-------|
| PHASE 1 | ✅ COMPLETE | ✅ YES | 4 bugs fixed, 4 verified |
| PHASE 2 | ⏳ PENDING | - | Typography (Syne + DM Sans) |
| PHASE 3-11 | ⏳ PENDING | - | Sections rebuild |
| PHASE 12-21 | ⏳ PENDING | - | Polish |

---

## 📝 SESSION MEMORY

**Session 1**: Award-Winning Rebuild — PHASE 1 COMPLETE ✅

**Accomplishments**:
- Created .qwen/ brain structure (SHINZU.md, AGENTS.md, patterns/, bugs/, decisions/)
- Fixed 4 critical bugs:
  1. SmoothScroll.tsx: GSAP ticker memory leak (named function reference)
  2. page.tsx: Inline overflow styles → CSS class toggle
  3. ContactSection.tsx: Added IntersectionObserver for video playback
  4. ContactSection.tsx: Removed hw-accelerated from static video
- Verified 4 components already correct:
  1. HeroVideo.tsx: Already uses 3-hook pattern
  2. SplitHeading.tsx: Already deleted
  3. All components: Already use useGSAP (not useEffect)
  4. All components: gsap.registerPlugin only in SmoothScroll
- Build verification: ✅ PASSED (1418ms, no errors)
- Documented patterns in .qwen/patterns/verified.md
- Recorded bug fixes in .qwen/bugs/fixed.md

**Current State**:
- PHASE 1: ✅ COMPLETE
- All critical bugs fixed
- Build passing
- Ready for PHASE 2

**Next Steps**:
1. PHASE 2: Typography System (Syne + DM Sans fonts)
   - Update layout.tsx with Syne + DM Sans
   - Update globals.css font variables
   - Update ALL fontFamily references sitewide
   - Adjust clamp values for Syne metrics
2. Run build after PHASE 2
3. Proceed to PHASE 3-11 (Section Rebuilds)

**Pending Issues**: None
**TODO**: PHASE 2 Typography System

---

*Last Updated: Session 1 — Reverbex Technologies Award-Winning Rebuild*
*Version: 1.0.0*
