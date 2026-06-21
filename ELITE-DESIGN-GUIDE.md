# ELITE WEB DESIGN GUIDE — From AI Slop to Award-Winning

## THE CORE INSIGHT

The difference between "AI-generated" and "award-winning" isn't better prompts — it's a completely different paradigm:

- **AI builds**: Static layouts with CSS transitions
- **Elite agencies**: Kinetic, mathematically driven, scroll-linked experiences

---

## PART 1: THE TECH STACK (Non-Negotiable)

### The Holy Trinity
```bash
npm install gsap @gsap/react lenis split-type
```

1. **GSAP + ScrollTrigger** — The industry standard for scroll-driven animation
2. **Lenis** — Smooth scrolling (makes GSAP scrub animations look buttery)
3. **SplitType** — Breaks text into individual characters/words for kinetic typography

### Optional but Powerful
```bash
npm install three @react-three/fiber @react-three/drei  # For 3D
npm install framer-motion  # For React-native animations
```

---

## PART 2: THE 7 ELITE ANIMATIONS TO IMPLEMENT

### Animation 1: The Slit Reveal (You Already Have This)
**What**: A thin vertical slit grows to reveal content behind it
**Where**: Between Hero and Features section
**Status**: ✅ Already implemented in TrustedBy.tsx

### Animation 2: Kinetic Typography Hero
**What**: Letters animate in individually with stagger
**Why**: Makes the hero feel cinematic, not static

```tsx
// Install split-type first
import SplitType from 'split-type';

useGSAP(() => {
  const headline = new SplitType('.hero-headline', { types: 'chars, words' });
  
  gsap.from(headline.chars, {
    y: 100,
    opacity: 0,
    rotateX: -90,
    stagger: 0.03,
    duration: 1.2,
    ease: 'expo.out',
  });
}, { scope: containerRef });
```

### Animation 3: Scroll-Pinned Sticky Section
**What**: An image stays fixed while text scrolls past it
**Why**: Creates a "magazine" feel, forces user attention

```tsx
useGSAP(() => {
  gsap.to('.feature-image', {
    scrollTrigger: {
      trigger: '.sticky-section',
      start: 'top top',
      end: 'bottom bottom',
      pin: true,
      scrub: 1,
    },
  });
}, { scope: sectionRef });
```

### Animation 4: 3D Card Flip on Scroll
**What**: Cards that flip to reveal content as user scrolls
**Why**: Creates discovery, makes users feel like they're uncovering something

```tsx
// CSS required
perspective: 1000px on container
transform-style: preserve-3d on card
backface-visibility: hidden on front/back

// GSAP
gsap.to('.card', {
  rotateY: 180,
  scrollTrigger: {
    trigger: '.card-section',
    start: 'top 60%',
    end: 'bottom 40%',
    scrub: 1,
  },
});
```

### Animation 5: Horizontal Scroll Gallery
**What**: Vertical scroll triggers horizontal movement
**Why**: Breaks the vertical monotony, feels premium

```tsx
useGSAP(() => {
  const sections = gsap.utils.toArray('.panel');
  
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.horizontal-wrapper',
      pin: true,
      scrub: 1,
      snap: 1 / (sections.length - 1),
      end: () => '+=' + document.querySelector('.horizontal-wrapper').offsetWidth,
    },
  });
});
```

### Animation 6: Parallax Layering
**What**: Different elements move at different speeds
**Why**: Creates depth, makes the page feel alive

```tsx
gsap.to('.bg-layer', {
  y: -200,
  scrollTrigger: {
    trigger: '.section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
});

gsap.to('.fg-layer', {
  y: -100,
  scrollTrigger: {
    trigger: '.section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
});
```

### Animation 7: Text Mask Reveal
**What**: Text reveals through an expanding shape
**Why**: Cinematic, feels like a movie title sequence

```tsx
gsap.from('.masked-text', {
  clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
  scrollTrigger: {
    trigger: '.text-section',
    start: 'top 70%',
    end: 'top 30%',
    scrub: 1,
  },
  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
});
```

---

## PART 3: EDITORIAL LAYOUT PRINCIPLES

### Rule 1: Overlap and Z-Index Layering
Elements should intersect, not sit neatly next to each other.

```css
.hero-text {
  z-index: 10;
  position: relative;
}

.hero-image {
  z-index: 20;
  position: absolute;
  bottom: -100px; /* Overlaps the text */
}

.hero-caption {
  z-index: 30;
  position: absolute;
  bottom: -50px;
  right: 20px; /* Overlaps the image */
}
```

### Rule 2: Extreme Scale Contrast
AI makes all text roughly the same size. Elite sites treat typography like imagery.

```css
/* Massive headline */
.headline {
  font-size: clamp(5rem, 12vw, 12rem);
  line-height: 0.9;
  letter-spacing: -0.04em;
}

/* Tiny body text */
.body-text {
  font-size: 0.875rem;
  line-height: 1.6;
  max-width: 40ch;
}
```

### Rule 3: Asymmetrical Anchoring
Never center everything.

```css
/* Push main visual to center */
.main-visual {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

/* Pin text to far left */
.text-block {
  position: absolute;
  left: 5vw;
  top: 30vh;
}

/* Caption on far right */
.caption {
  position: absolute;
  right: 5vw;
  bottom: 20vh;
}
```

### Rule 4: The Sticky Scroll Reveal
Pin the image, let text scroll past.

```css
.sticky-container {
  position: relative;
  height: 300vh; /* 3x viewport for scroll space */
}

.sticky-image {
  position: sticky;
  top: 20vh;
  height: 60vh;
}

.scrolling-text {
  position: relative;
  z-index: 10;
}
```

---

## PART 4: THE GSAP MINDSET

### The Mistake Most Developers Make
Using standard timelines:
```js
// ❌ BAD — Animation plays based on time
const tl = gsap.timeline();
tl.to('.box', { x: 500, duration: 1 });
tl.to('.box', { rotation: 360, duration: 1 });
```

### The Elite Approach
Using onUpdate mathematical loop:
```js
// ✅ GOOD — Animation tied to scroll position
ScrollTrigger.create({
  trigger: '.section',
  start: 'top top',
  end: 'bottom bottom',
  onUpdate: (self) => {
    // self.progress = 0.0 to 1.0
    const x = gsap.utils.interpolate(-100, 100, self.progress);
    const rotation = gsap.utils.interpolate(0, 360, self.progress);
    
    gsap.set('.box', { x, rotation });
  },
});
```

### Why This Works
- Animation feels physically tethered to scrollbar
- User controls the experience
- Feels like manipulating a physical object
- No timing issues (fast/slow scroll)

---

## PART 5: PROMPTS TO GENERATE THIS CODE

### Prompt 1: Kinetic Typography Hero
```
Build a hero section with kinetic typography. The headline "The architecture of scale" should:
1. Use SplitType to break into individual characters
2. Animate each character from y: 100, opacity: 0, rotateX: -90
3. Stagger: 0.03, duration: 1.2, ease: expo.out
4. Background: dark (#050505) with subtle grain texture
5. Typography: font-size clamp(3.5rem, 8vw, 7rem), letter-spacing: -0.04em
6. Add a subtle parallax effect on the background

No gradient text. No glassmorphism. No centered-everything.
```

### Prompt 2: Scroll-Pinned Feature Section
```
Build a scroll-pinned feature section where:
1. An image is pinned in the center (position: sticky, top: 20vh)
2. Three text blocks scroll past on the right side
3. As each text block hits the center, the image changes (crossfade or filter change)
4. Use GSAP ScrollTrigger with scrub: 1
5. Pin the section for 300vh of scroll space
6. Add a subtle scale animation on the image (1.0 to 1.05)

The image should feel like it's "reacting" to the scrolling text.
```

### Prompt 3: 3D Card Flip
```
Build a 3D card flip animation that triggers on scroll:
1. Three cards initially appear as a single panoramic image
2. As user scrolls, the image splits into three separate cards
3. Cards separate with gap animation (0px to 20px)
4. Border-radius animates from 0 to 20px
5. Cards flip 180 degrees on Y-axis, staggered
6. Add slight rotateZ (-15deg, 0deg, 15deg) for fanning effect
7. Use CSS perspective: 1000px and transform-style: preserve-3d
8. Scrub: 1, pin the section

Cards should feel like physical objects being manipulated by scroll.
```

### Prompt 4: Horizontal Scroll Gallery
```
Build a horizontal scroll gallery:
1. Vertical scroll triggers horizontal movement
2. Pin the section while horizontal scroll happens
3. Snap to each panel (snap: 1 / (panels.length - 1))
4. Each panel is 100vw wide
5. Add parallax on images within panels (different speeds)
6. Smooth transitions between panels
7. Mobile: stack vertically with scroll-snap

The horizontal scroll should feel like swiping through a gallery.
```

### Prompt 5: Editorial Layout
```
Build an editorial-style layout:
1. Main headline: clamp(5rem, 12vw, 12rem), left-aligned, tight letter-spacing
2. Body text: 0.875rem, max-width: 40ch, positioned far left
3. Image: absolute positioned, overlapping the headline by 100px
4. Caption: absolute positioned, overlapping the image
5. Use z-index layering (10, 20, 30)
6. Add subtle parallax on each layer
7. Asymmetric spacing (not centered)

The layout should feel like a magazine spread, not a webpage.
```

---

## PART 6: INTEGRATION INTO REVERBEX

### Current State
- ✅ Slit reveal animation (TrustedBy)
- ✅ Hero entrance animation
- ✅ Lenis smooth scroll
- ❌ No kinetic typography
- ❌ No scroll-pinned sections
- ❌ No 3D card flips
- ❌ No horizontal scroll
- ❌ No editorial layouts

### Priority Implementation Order

#### Phase 1: Quick Wins (1-2 hours each)
1. **Kinetic Typography Hero** — Use SplitType on the headline
2. **Text Mask Reveal** — Add clip-path animation to section headings

#### Phase 2: Structural (Half day each)
3. **Scroll-Pinned Feature Section** — Replace card grid with sticky image + scrolling text
4. **Horizontal Scroll Gallery** — For case studies or portfolio

#### Phase 3: Complex (Full day)
5. **3D Card Flip** — For services or features
6. **Editorial Layout** — Restructure hero and feature sections

---

## PART 7: REFERENCE SITES TO STUDY

### Award-Winning GSAP Sites (2026)
1. **Casa di Solare** (9.30/10) — Scroll-driven storytelling
2. **Pixel Matters 8 Years** (8.80/10) — Editorial layout
3. **Maxime's Portfolio** (7.90/10) — Kinetic typography
4. **Lusion** — 3D interactive experiences
5. **Elva by Lazarev** — SOTD Jun 2026, clean motion

### What to Study From Each
- **Casa di Solare**: How they use scroll to guide narrative
- **Pixel Matters**: How they break grid without breaking UX
- **Lusion**: How they use 3D and WebGL meaningfully
- **Elva**: How they balance motion with readability

---

## PART 8: THE ONE-SHOT MASTER PROMPT

Use this prompt to transform your entire site:

```
You are a senior frontend architect at a world-class design studio.

My website currently looks AI-generated. I need you to transform it into
an award-winning experience.

CURRENT STATE:
- Dark theme (#050505 background, #EAB308 gold accent)
- GSAP + ScrollTrigger + Lenis already installed
- Hero with video background
- TrustedBy section with slit reveal animation
- Card grid sections (identical pattern)

WHAT I NEED:
1. Replace the hero headline with kinetic typography (SplitType)
2. Replace card grids with scroll-pinned sticky sections
3. Add horizontal scroll for case studies
4. Add 3D card flips for services
5. Implement editorial layouts (asymmetric, overlapping)
6. Add text mask reveals for section headings

DESIGN RULES:
- No gradient text (except logo)
- No glassmorphism
- No centered-everything
- No identical card grids
- No purple/blue gradients
- Typography: massive headlines (8vw+), tiny body (0.875rem)
- Colors: #050505 bg, #EAB308 accent, #0A1628 dark blue
- Animations: only transform and opacity
- Scroll-linked, not time-based

REFERENCE SITES:
- Linear.app (clean motion)
- Stripe.com (editorial layout)
- Apple.com (kinetic typography)
- Awwwards.com (interactive elements)

OUTPUT:
- Complete component files
- GSAP animation code
- CSS for editorial layouts
- Mobile responsive versions
- prefers-reduced-motion support
```

---

## QUICK REFERENCE: Animation Patterns

### Pattern 1: Reveal on Scroll
```js
gsap.from('.element', {
  scrollTrigger: { trigger: '.element', start: 'top 80%' },
  opacity: 0, y: 40, duration: 0.8, ease: 'expo.out'
});
```

### Pattern 2: Stagger Reveal
```js
gsap.from('.card', {
  scrollTrigger: { trigger: '.cards', start: 'top 80%' },
  opacity: 0, y: 40, stagger: 0.1, duration: 0.8, ease: 'expo.out'
});
```

### Pattern 3: Parallax
```js
gsap.to('.bg', {
  y: -200,
  scrollTrigger: { trigger: '.section', start: 'top bottom', end: 'bottom top', scrub: true }
});
```

### Pattern 4: Pin + Scrub
```js
gsap.to('.pinned', {
  x: 500,
  scrollTrigger: { trigger: '.section', pin: true, scrub: 1, start: 'top top', end: '+=500' }
});
```

### Pattern 5: Horizontal Scroll
```js
gsap.to('.panels', {
  x: () => -(document.querySelector('.panels').scrollWidth - window.innerWidth),
  ease: 'none',
  scrollTrigger: { trigger: '.wrapper', pin: true, scrub: 1, end: () => '+=' + document.querySelector('.panels').scrollWidth }
});
```

---

*Guide compiled from: GSAP docs, Awwwards patterns, Codegrid tutorials, award-winning site analysis, 2026 web design trends research.*
