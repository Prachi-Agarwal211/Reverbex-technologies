# COMPREHENSIVE WEB DESIGN MASTERY GUIDE
## From AI Slop to Award-Winning — Every Aspect Covered

---

## TABLE OF CONTENTS

1. [Current Site Audit — Every Problem Found](#audit)
2. [Color Theory & Dark Mode](#color)
3. [Typography Systems](#typography)
4. [Spacing & Layout Grids](#spacing)
5. [Visual Hierarchy](#hierarchy)
6. [Component Design Patterns](#components)
7. [Micro-Interactions & Motion](#motion)
8. [Photography & Image Treatment](#images)
9. [Copywriting & Content](#copy)
10. [Responsive Design](#responsive)
11. [Performance & Accessibility](#performance)
12. [The 2026 Anti-AI Aesthetic](#anti-ai)

---

## 1. CURRENT SITE AUDIT — EVERY PROBLEM FOUND {#audit}

### CRITICAL: Global Failures

**A. Font System is Broken**
- `app/layout.tsx:11` loads Space Grotesk instead of Syne (DESIGN.md specifies Syne)
- `app/layout.tsx:18` loads Inter as body font (DESIGN.md line 77 says "Never use Inter")
- ~100+ inline `style={{ fontFamily: "var(--font-heading)" }}` overrides across all components because Tailwind font classes don't resolve

**B. tailwind.config.ts is Empty**
- Zero custom colors, zero spacing tokens, zero custom utilities
- Everything is hardcoded with arbitrary values in every component

**C. Color System Doesn't Match DESIGN.md**
- `globals.css:6-7` uses `#000000` and `#ffffff` instead of DESIGN.md's `#050505` and `#F5F5F0`
- No CSS custom properties for spacing, shadows, or elevation from DESIGN.md

### Component-Level Problems

**Gradient Text (DESIGN.md violation)**
- `HeroVideo.tsx:99` — yellow-to-white gradient on headline
- `Navbar.tsx:52` — gradient text on brand name

**Glassmorphism (AI tell)**
- `ContactSection.tsx:218` — `backdrop-blur-md` on form card

**Neon Glow Shadows (AI tell)**
- `HeroVideo.tsx:111` — `hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]`
- `PremiumPositioning.tsx:119` — `shadow-[0_0_40px_rgba(234,179,8,0.1)]`

**Blue Color Scheme Mismatch**
- `MorphingMenu.tsx:135` — blue gradient button on yellow-accent site
- `TrustedBy.tsx:17,159,178,180` — entire section uses blue accent

**Stock Images (DESIGN.md violation)**
- `FeaturedArchitectures.tsx:15,24,33` — Unsplash images for case studies
- `StickyServices.tsx:20,30,40,50,60,70` — Unsplash images for services

**Identical Card Grids (6 sections)**
- WhatWeOffer, WhyReverbex, WhyNextJs, Testimonials, Industries, LiveResults — all use the same 3-column card grid pattern

**Identical Animations (10 sections)**
- Every section uses `gsap.fromTo(".class", { opacity: 0, y: 35 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 })` — same timing, easing, and scroll trigger

**Identical Hover Effects (every card)**
- Every card uses `hover:border-[#EAB308]/50 transition-all duration-300` — no unique interactions

**Dead Code**
- `OurStory.tsx` — duplicates ReverbexBond.tsx entirely, never rendered on homepage
- `WhatWeOffer.tsx` — exported but never imported in page.tsx

**Content Duplicates**
- "We Don't Disappear After Launch" is headline for two sections
- Trust line with checkmarks repeated verbatim in two components

**Generic Copy**
- "Everything your business needs to attract customers, streamline operations, and increase revenue"
- "Submit Inquiry" as CTA
- "How We Work" as section title

**Accessibility Issues**
- `ContactSection.tsx:101` — `(window as any).lenis` uses `any` type
- FAQSection animates `maxHeight` (DESIGN.md: "NEVER animate height")
- Duplicate `prefers-reduced-motion` blocks in globals.css

---

## 2. COLOR THEORY & DARK MODE {#color}

### The 2026 Dark Mode Rules

**Don't use pure black (#000000)**
- Causes eye strain and OLED smearing
- Use near-black: `#050505`, `#0A0A0A`, `#0F0F0F`
- Reserve `#000000` only for OLED battery savings on mobile

**Dark Mode Color Hierarchy**
```
Background:    #050505 (darkest)
Surface:       #0A0A0A (cards, panels)
Elevated:      #141414 (hover states)
Border:        #1A1A1A (dividers)
Text Muted:    #666666 (secondary text)
Text Secondary:#A0A0A0 (supporting text)
Text Primary:  #F5F5F0 (main content)
Accent:        #EAB308 (CTAs, highlights — ONE accent only)
```

**The One-Accent Rule**
- Use ONE accent color for the entire site
- Never use accent for decorative backgrounds
- Reserve accent for: CTAs, links, active states, key highlights
- Your site uses `#EAB308` (gold) — keep it, remove the blue

**What's Dying in 2026**
- Pure black UI — causes eye strain
- Generic corporate blue — feels impersonal
- Overused mesh gradients — banner blindness
- Uncontrolled neon — visual fatigue

**Premium Color Psychology**
- Black + Gold = Luxury, exclusivity (your current palette)
- Charcoal + Mustard = Warmth, craft
- Deep Green + Cream = Organic, trustworthy
- Navy + Coral = Bold, energetic

### Your Current Color Problems
1. Blue accent in TrustedBy and MorphingMenu — two accent colors = confusion
2. Cyan in FractalGlassBackground — not in design system
3. `#888888` in HeroVideo — not in palette
4. `#FDE68A` in ContactSection — not in palette
5. Every section alternates between only `#050505` and `#0A0A0A` — flat, no elevation

---

## 3. TYPOGRAPHY SYSTEMS {#typography}

### The 95% Rule
"95% of web design is typography" — Oliver Reichenstein

### Modular Scale Theory

A modular scale creates harmonious size relationships:
```
size = base × ratio^step

For 16px base, ratio 1.25 (Major Third):
Step -2:  10.24px  (small print)
Step -1:  12.80px  (captions)
Step  0:  16.00px  (body text)
Step  1:  20.00px  (h4)
Step  2:  25.00px  (h3)
Step  3:  31.25px  (h2)
Step  4:  39.06px  (h1)
Step  5:  48.83px  (display)
```

### Common Ratios
- **1.067 (Minor Second)**: Dense UIs, dashboards
- **1.125 (Major Second)**: Conservative, admin interfaces
- **1.200 (Minor Third)**: Most versatile, common choice
- **1.250 (Major Third)**: Clear hierarchy, bold
- **1.333 (Perfect Fourth)**: Bold, dramatic — good for premium sites

### Line Height Rules
```
Headings (large text): 1.1–1.3
Subheadings: 1.35
Body text: 1.5–1.7
Small/caption text: 1.4–1.6 (needs MORE leading, not less)
```

### Measure (Optimal Line Length)
- Body text: 50–75 characters per line (66 is sweet spot)
- Too narrow: choppy reading
- Too wide: loses the reader

### Font Pairing Principles
1. Use ONE font if possible — most sites don't need two
2. If pairing: serif + sans-serif, or display + workhorse
3. Never use more than 2 typefaces
4. Weight is its own variable — one typeface with 3 weights reads as hierarchy
5. Test at real sizes — amazing at 48px may be unreadable at 14px

### 2026 Typography Trends
- **Variable fonts are mainstream** — one file replaces 6-10 weights
- **Display serifs are back** — GT Sectra, Editorial New, Tiempos Headline
- **Mono fonts as accents** — Berkeley Mono, JetBrains Mono, Geist Mono
- **Kinetic typography** — text that animates on scroll
- **Oversized headlines** — typographic statements as primary visual

### Premium Font Pairings (Free)
| Display/Heading | Body | Mood |
|----------------|------|------|
| Instrument Serif | Inter | Editorial, fresh |
| Playfair Display | Inter | Editorial on budget |
| Space Grotesk | DM Sans | Technical, modern |
| Syne | DM Sans | Bold, editorial |

### Your Current Typography Problems
1. Space Grotesk + Inter — generic, AI-associated
2. Syne specified in DESIGN.md but never loaded
3. ~100+ inline font overrides because Tailwind config is broken
4. No modular scale — arbitrary font sizes everywhere
5. Line heights not optimized for dark mode (need more leading on dark)

---

## 4. SPACING & LAYOUT GRIDS {#spacing}

### The 8pt Grid System

Every spacing value is a multiple of 8:
```
4, 8, 16, 24, 32, 48, 64, 96, 128
```

**Why 8pt works:**
- Scales cleanly across device pixel ratios
- 8 logical pixels stays sharp at 1×, 1.5×, 2×, and 3×
- Most icon grids align to it (24×24, 16×16)
- Material Design and Apple HIG both use it

### The Hybrid Scale
Most production scales use:
- Arithmetic at bottom: 4, 8, 12, 16, 20, 24 (fine control)
- Geometric at top: 32, 48, 64, 96, 128 (dramatic jumps)

### Spacing Friendship
Elements that are close together are perceived as related:
- **Related items**: Small gap (8–16px)
- **Grouped sections**: Medium gap (32–48px)
- **Major sections**: Large gap (64–128px)

### The 4pt vs 8pt Decision
- **4pt grid**: Dense UIs, admin dashboards, mobile apps
- **8pt grid**: Web applications, marketing sites, editorial
- **Hybrid**: 4pt for component-internal, 8pt for page-level layout

### CSS Implementation
```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 48px;
  --space-7: 64px;
  --space-8: 96px;
  --space-9: 128px;
}
```

### Your Current Spacing Problems
1. No spacing system defined — all arbitrary values
2. Inconsistent padding across sections (`pb-24 sm:pb-16 md:pb-20` — backwards)
3. No CSS custom properties for spacing
4. tailwind.config.ts has no spacing tokens

---

## 5. VISUAL HIERARCHY {#hierarchy}

### The Three Layers of Attention

**Layer 1: Primary (What users notice first)**
- Hero headline
- Main CTA button
- Key visual/image

**Layer 2: Secondary (What users notice second)**
- Section headings
- Supporting text
- Navigation

**Layer 3: Tertiary (What users notice last)**
- Fine print
- Footer links
- Secondary CTAs

### The 7 Principles

**1. Size and Scale**
- Larger = more important
- Headlines should be 3-5× body text size
- CTAs should be visually distinct from surrounding text

**2. Color and Contrast**
- High contrast attracts attention
- Use accent color sparingly for CTAs
- Low-contrast elements recede

**3. Typography**
- Weight: Bold > Regular > Light
- Size: Large > Medium > Small
- Style: Italic, ALL CAPS, underline for emphasis

**4. Spacing and Alignment**
- White space isolates and emphasizes
- Aligned elements feel organized
- Proximity groups related items

**5. Positioning and Layout**
- Top-left gets most attention (F-pattern)
- Center gets attention on hero sections
- Bottom-right gets least attention

**6. Direction and Movement**
- Eyes follow arrows, gaze direction, and motion
- Animated elements capture attention
- Scroll-linked motion creates focus

**7. Repetition and Consistency**
- Repeated patterns create expectation
- Breaking pattern creates emphasis
- Consistent hierarchy builds trust

### Eye Tracking Patterns
- **F-pattern**: Text-heavy pages (blogs, articles)
- **Z-pattern**: Visual pages (landing pages, portfolios)
- **Gutenberg Diagram**: Balanced layouts (four quadrants)

### Your Current Hierarchy Problems
1. Everything is the same size — no dramatic contrast
2. Six identical card grids compete for attention
3. Every section has the same animation — nothing stands out
4. Accent color used everywhere — loses emphasis power
5. No focal points — eyes have nowhere to rest

---

## 6. COMPONENT DESIGN PATTERNS {#components}

### Card Patterns (Alternatives to Identical Grids)

**1. Bento Grid**
- Asymmetric cells of different sizes
- Largest cell = most important content
- Used by Apple, Google, Spotify

**2. Expand-on-Hover**
- Cards show title only, expand on hover to reveal description
- Creates discovery, saves space

**3. List Format**
- Horizontal rows instead of cards
- Better for scanning, less visual weight

**4. Inline Narrative**
- Content flows as prose, not cards
- Better for storytelling

**5. Stacked/Accordion**
- Cards stack vertically, expand on click
- Good for FAQ, features with details

**6. Masonry**
- Pinterest-style layout
- Natural visual flow, varies card heights

### Button Patterns

**Hierarchy:**
1. Primary: Filled, accent color, prominent
2. Secondary: Outlined, muted, smaller
3. Tertiary: Text-only, subtle

**States:**
- Default → Hover → Active → Focus → Disabled → Loading

**Micro-interactions:**
- Scale on hover (1.02-1.05)
- Shadow lift on hover
- Loading spinner on click
- Success checkmark after submit

### Navigation Patterns

**1. Fixed Navbar**
- Always visible, minimal, functional
- Background appears on scroll

**2. Sticky Navbar**
- Scrolls with page, disappears on down, reappears on up

**3. Hidden Navbar**
- Appears only on scroll up
- Maximizes content space

**4. Sidebar Navigation**
- For complex sites with many sections
- Always visible, collapsible

### Form Design

**Best Practices:**
- Single column on mobile
- Labels above inputs (not placeholders)
- Inline validation (real-time)
- Clear error messages
- Progressive disclosure (don't show everything at once)

### Your Current Component Problems
1. Six identical card grids — need variety
2. All cards have same hover effect — need unique interactions
3. Form has glassmorphism — should be flat
4. Submit button is white while all other CTAs are gold — inconsistent
5. FAQ accordion animates maxHeight — should use grid trick

---

## 7. MICRO-INTERACTIONS & MOTION {#motion}

### The 2026 Motion Rules

**Motion has replaced microcopy as the primary brand layer.**
- Spring physics, scroll-linked timelines, haptic-style feedback
- Products that treat motion as polish read as dated

### Animation Timing

**Standard durations:**
- Micro: 120-220ms (button hover, toggle)
- Small: 200-300ms (card expand, dropdown)
- Medium: 300-500ms (page transition, reveal)
- Large: 500-800ms (hero entrance, complex sequence)

**Easing functions:**
- `ease-out` — fast start, slow finish (elements entering)
- `ease-in` — slow start, fast finish (elements leaving)
- `ease-in-out` — smooth both ends (state toggles)
- `cubic-bezier(0.34, 1.56, 0.64, 1)` — overshoot bounce (playful)

### The 5 Micro-Interaction Patterns of 2026

**1. Spring Physics**
- Elements feel physical, not mechanical
- Use `stiffness: 150, damping: 15` for buttons
- Use `stiffness: 100, damping: 20` for cards

**2. Scroll-Linked Timelines**
- Animation progress tied to scrollbar position
- User controls the experience
- Feels like manipulating a physical object

**3. Haptic-Style Feedback**
- Subtle scale + color change on interaction
- Confirms action without text
- Creates "feel" in a digital interface

**4. Choreographed State Transitions**
- Multiple elements animate together
- Loading → Success → Done feels like one fluid motion
- Reduces perceived wait time

**5. Magnetic Elements**
- Buttons pull toward cursor as it approaches
- Creates physical connection
- Signature of premium sites

### When to Use Motion

| Context | Recommendation |
|---------|---------------|
| SaaS dashboards | Essential — status, loading, state changes |
| Creative portfolios | Showcase capability — use generously |
| eCommerce | Key conversion interactions only |
| Landing pages | CTA hover, form validation only |
| B2B services | Subtle — premium but not playful |
| Healthcare | Minimal — functional feedback only |

### Your Current Motion Problems
1. Same animation on 10 sections — no variety
2. Same hover effect on every card — no uniqueness
3. FAQ animates maxHeight — performance issue
4. TrustedBy has 110 lines of animation for 4 cards — disproportionate
5. No spring physics — all animations feel mechanical

---

## 8. PHOTOGRAPHY & IMAGE TREATMENT {#images}

### 2026 Photography Trends

**Authenticity Over Perfection**
- Real moments, not stock poses
- Imperfect framing, motion blur, grain
- Candid > posed

**Cinematic Style**
- Teal and orange color grading
- Anamorphic lens flare
- Soft contrast, moody atmosphere

**Mobile-First Composition**
- Vertical framing for social
- Handheld angles
- Let imperfections stay

### Image Treatment on Dark Backgrounds

**Desaturation**
- Reduce saturation by 20-40% on dark backgrounds
- Creates cohesion with dark UI

**Grain/Texture**
- Subtle noise overlay (2% opacity)
- Adds "film" quality, anti-AI signal

**Color Grading**
- Warm tones (yellow/orange) for luxury
- Cool tones (blue/teal) for tech
- Match accent color

**Cropping**
- Tight crops > wide shots
- Focus on subject, remove distractions
- Rule of thirds or center symmetry

### Your Current Image Problems
1. Unsplash stock images for case studies — biggest AI tell
2. Unsplash stock images for services — same problem
3. No consistent color treatment across images
4. No grain/texture overlay on images
5. Images don't match the gold accent color palette

---

## 9. COPYWRITING & CONTENT {#copy}

### AI-Generated Copy Red Flags

**Banned Words:**
- unlock, empower, seamless, leverage, streamline
- robust, cutting-edge, elevate, harness, delve
- innovative, world-class, next-generation
- transformative, revolutionary

**Banned Patterns:**
- "We Turn Your [X] Into A Y"
- "Everything your business needs to..."
- "Partner with us to deploy..."
- "Our structured roadmap to..."

### Premium Copy Principles

**1. Specificity Over Generality**
- Bad: "Boost your online presence"
- Good: "From zero leads to 500+ in 6 weeks"

**2. Outcome Over Feature**
- Bad: "We build custom websites"
- Good: "We engineer the exact systems your business needs to dominate"

**3. Active Over Passive**
- Bad: "Your business will be transformed"
- Good: "We engineer growth"

**4. One Sentence Max for Subtitles**
- If it takes two sentences, it's too long
- Cut until it hurts

**5. CTAs That Describe the Action**
- Bad: "Learn more"
- Good: "Get a free audit"
- Bad: "Submit Inquiry"
- Good: "Tell us about your project"

### Section Title Patterns

**Avoid:**
- "Our Services"
- "Why Choose Us"
- "Our Process"
- "How We Work"

**Use:**
- "What we build" (direct)
- "The Reverbex standard" (brand-specific)
- "From idea to launch" (narrative)
- "Numbers that matter" (evidence)

### Your Current Copy Problems
1. "Everything your business needs to attract customers, streamline operations, and increase revenue" — generic
2. "Submit Inquiry" — weakest CTA possible
3. "How We Work" — generic section title
4. "We Don't Disappear After Launch" — used twice
5. Testimonials lack specifics — "500+ leads in weeks" without context

---

## 10. RESPONSIVE DESIGN {#responsive}

### Mobile-First Principles

**1. Content Priority**
- What does mobile user need most?
- Hide secondary content on mobile
- Progressive disclosure

**2. Touch Targets**
- Minimum 44×44px for interactive elements
- 48×48px preferred
- Generous padding around targets

**3. Typography Scaling**
- Don't just缩小 desktop text
- Mobile headlines: 2rem-3rem (not 7rem)
- Mobile body: 16px minimum

**4. Navigation**
- Bottom nav on mobile (thumb zone)
- Hamburger menu alternative
- Swipe gestures for galleries

**5. Performance**
- Lazy load below-fold images
- Reduce animation complexity
- Optimize for 3G connections

### Breakpoint Strategy
```
Mobile: 0-639px (default)
Tablet: 640px-1023px (sm)
Desktop: 1024px-1279px (md)
Large: 1280px+ (lg)
```

### Your Current Responsive Problems
1. Hero marquee at 10px on mobile — barely legible
2. Contact section clamp goes from 52px to 224px — too aggressive
3. StickyServices cards at 65vh on mobile — content may overflow
4. Mobile bottom nav padding applied to all pages — even those without it
5. No reduced animation complexity on mobile

---

## 11. PERFORMANCE & ACCESSIBILITY {#performance}

### Core Web Vitals

**LCP (Largest Contentful Paint)**
- Target: < 2.5s
- Hero image/video should load fast
- Use `preload` for critical assets

**FID (First Input Delay)**
- Target: < 100ms
- Minimize JavaScript execution
- Defer non-critical scripts

**CLS (Cumulative Layout Shift)**
- Target: < 0.1
- Set explicit width/height on images
- Use `font-display: swap`
- Avoid inserting content above existing content

### Font Loading Best Practices

**Self-host fonts**
- Faster than Google Fonts (no third-party connection)
- Subset to Latin only (60-80% size reduction)
- Use WOFF2 format

**font-display: swap**
- Text visible immediately with fallback
- Swaps to web font when loaded
- Add `size-adjust` to prevent layout shift

### Accessibility Requirements

**Color Contrast**
- Body text: 4.5:1 minimum (WCAG AA)
- Large text: 3:1 minimum
- Interactive elements: 3:1 against background

**Keyboard Navigation**
- Visible focus indicators
- Logical tab order
- Skip-to-content link

**Screen Readers**
- Semantic HTML (headings, landmarks, lists)
- Alt text on images
- ARIA labels on interactive elements

**Motion**
- Respect `prefers-reduced-motion`
- Provide alternative for essential animations
- No flashing content (3 flashes per second max)

### Your Current Performance Problems
1. Fonts not self-hosted — loading from external source
2. No `font-display: swap` configured
3. Inline styles bypass Tailwind's optimization
4. GSAP animations not optimized for mobile
5. Duplicate `prefers-reduced-motion` blocks in CSS

---

## 12. THE 2026 ANTI-AI AESTHETIC {#anti-ai}

### What Makes a Site Look AI-Generated

**Visual Tells:**
1. Purple-to-blue gradients
2. Glassmorphism everywhere
3. 3-column identical card grids
4. Centered-everything layout
5. Gradient text on headings
6. Neon glow shadows
7. Letter avatars (first letter in circle)
8. Stock photos from Unsplash
9. Same hover effect copy-pasted
10. Scroll-reveal on every section

**Copy Tells:**
1. "Unlock your potential"
2. "Seamless integration"
3. "Cutting-edge technology"
4. "World-class solutions"
5. "Empower your business"

**Layout Tells:**
1. Every section follows: heading → subtitle → card grid
2. Same padding/margin on every section
3. Fullscreen hero + 2 CTAs
4. Cards nested inside cards
5. No visual variety between sections

### What Premium Sites Do Instead

**Colors:**
- One solid base + one accent. That's it.
- Flat-color buttons. No gradients.
- Borders over shadows.
- Off-white (#FAFAF8) not pure white.

**Typography:**
- Display font for headings
- Clean sans for body
- Dramatic size contrast: 16px body → 80px+ display
- Tight letter-spacing on large text (-0.03em)

**Layout:**
- Mix 1-col, 2-col, asymmetric, and list layouts
- Left-align by default
- Vary visual structure between every section
- Bento grids with different cell sizes

**Motion:**
- One consistent motion language per page
- Scroll-bound, not time-based
- Physics-based easing (spring, power2)
- Max 3 sections with entrance animation

**Copy:**
- Specific numbers: "Under 1s load times"
- Concrete verbs: calculate, compare, build, track
- One-sentence subtitles max
- CTAs that describe the action

### The Dirty Minimalism Movement

**Characteristics:**
- Grain/noise texture overlay (2% opacity)
- Off-white backgrounds (#FAFAF8, #F5F3EE)
- Hand-drawn or irregular SVG icons
- Asymmetric or deliberately imperfect elements
- Variable-width strokes or organic shapes

**Why it works:**
- Signals human craft over AI generation
- Creates warmth in digital interfaces
- Differentiates from clean/corporate aesthetic
- Feels authentic and intentional

---

## IMPLEMENTATION PRIORITY

### Tier 1: Quick Wins (1-2 hours each)
1. Replace Space Grotesk + Inter with Syne + DM Sans
2. Remove all inline `style={{ fontFamily }}` overrides
3. Add Tailwind design tokens from DESIGN.md
4. Remove gradient text from hero and navbar
5. Fix globals.css to match DESIGN.md colors

### Tier 2: Structural (Half day each)
6. Replace identical card grids with varied layouts
7. Fix blue color scheme in MorphingMenu and TrustedBy
8. Replace Unsplash images with real work
9. Differentiate scroll animations across sections
10. Delete dead code (OurStory.tsx)

### Tier 3: Design System (Full day)
11. Implement 8pt spacing system
12. Create modular typography scale
13. Build component library with unique interactions
14. Add grain texture overlay
15. Implement spring physics animations

### Tier 4: Polish (1-2 days)
16. Optimize all images for dark mode
17. Rewrite copy with specificity
18. Add micro-interactions to all interactive elements
19. Test and fix responsive issues
20. Run accessibility audit and fix

---

*Compiled from: GSAP docs, Awwwards patterns, Codegrid tutorials, award-winning site analysis, 2026 web design trends research, color theory guides, typography systems, spacing systems, visual hierarchy principles, component design patterns, micro-interaction guides, photography trends, copywriting best practices, responsive design principles, performance optimization, and accessibility standards.*
