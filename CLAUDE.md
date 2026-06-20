# CLAUDE.md — AI Development Rules

## Project Context

Reverbex Technologies website redesign. Next.js 15 (App Router), React 19, Tailwind CSS, GSAP, Lenis.
Deployed on Vercel at reverbex.in.

**Positioning:** "Websites. Ads. Automation. Built To Grow Businesses."
NOT "AI infrastructure" or "enterprise systems" or "tech agency."

---

## Reading Order

1. **CLAUDE.md** — This file. Project context, coding standards, rules.
2. **DESIGN.md** — Design tokens, components, guardrails. Read before ANY visual work.
3. **WEBSITE-REDESIGN-PROMPT.md** — Full implementation guide if building new features.
4. **package.json** — Available dependencies.

---

## Coding Standards

### TypeScript
- Strict mode. No `any`. No `@ts-ignore`.
- Explicit return types on exported functions.
- Interfaces for object shapes, types for unions/intersections.
- Use `readonly` for constants and immutables.

### React
- Server Components by default.
- Client Components only when needed (interactivity, browser APIs, GSAP, state).
- Name default exports with `function ComponentName()`.
- Destructure props in function signature.
- Keep components under 200 lines. Split into files.

### Styling
- Tailwind CSS. No inline styles except dynamic values.
- Follow the 8pt grid from DESIGN.md.
- Import from `@/components/ui/` (shadcn). Don't create new primitives.
- Use `cn()` utility from `@/lib/utils` for conditional classes.

### Animation
- CSS scroll-driven animations for simple reveals.
- GSAP + Lenis for complex scroll sequences.
- Animate ONLY `transform` and `opacity`.
- Never animate `width`, `height`, `top`, `left`, `margin`, `padding`.
- Always respect `prefers-reduced-motion`.

### File Organization
```
app/
  (routes)/
    page.tsx        — Route components (Server Components)
    layout.tsx      — Route layouts
    loading.tsx     — Loading states
    error.tsx       — Error boundaries
    not-found.tsx   — 404 pages
components/
  ui/               — shadcn primitives (Button, Card, Input, Dialog)
  sections/         — Page sections (Hero, Services, etc.)
  shared/           — Shared components (Navbar, Footer, WhatsAppButton)
  animations/       — GSAP animations, scroll triggers, Lenis
lib/
  config.ts         — Site configuration, metadata, constants
  utils.ts          — cn(), formatters, helpers
  types.ts          — Shared TypeScript types
```

---

## AI Anti-Patterns to Avoid

### Design
- NO purple-to-blue gradients (most overused AI color palette)
- NO Inter everywhere (default font = no thought)
- NO glassmorphism on everything
- NO 3-column identical feature grids
- NO centered-everything (use editorial left-aligned)
- NO card nesting (cards inside cards)
- NO gradient text on numbers
- NO decorative animations (particles, floating cubes)
- NO stock images or lorem ipsum

### Code
- NO `any` types
- NO `@ts-ignore` or `@ts-expect-error`
- NO inline styles except dynamic values
- NO `useState` when `useRef` or CSS would work
- NO large components (200+ lines)
- NO generic variable names (`data`, `item`, `temp`)
- NO console.log in production code
- NO magic numbers (use constants/tokens)
- NO deep nesting (3+ levels = refactor)
- NO barrel files for components

### Content
- NO "Build the future with AI-powered..." copy
- NO "Intelligent Architecture for Modern Enterprises"
- NO "Enterprise-grade" or "cutting-edge"
- NO placeholder text anywhere
- NO generic testimonials
- NO "Best Solutions" or "Our Process" section titles

---

## Prompt Template

When working on a feature, use this structure:

```
1. Component type (hero, card, form, navigation)
2. Visual intent (layout, hierarchy, mood)
3. Constraints (stack: Next.js + Tailwind + shadcn)
4. States (hover, focus, disabled, loading)
5. Real content (actual headlines, actual stats)

Bad: "Make me a landing page"
Good: "Hero section for Reverbex. Left-aligned. Syne font 80px weight 900.
      Dark bg #050505. Yellow accent #EAB308.
      One sentence: 'Websites. Ads. Automation. Built To Grow Businesses.'
      Single CTA button: 'Get Started'. Mobile responsive."
```

---

## Key Decisions

1. WhatsApp 9929986743 is primary CTA — floating button on ALL pages
2. Premium positioning — explain WHY custom beats cheap, math that proves ROI
3. Real content only — no lorem ipsum, no stock images, no placeholder
4. Case studies as documentary stories — hook → brand → challenge → results
5. Programmatic SEO — 77+ pages targeting specific keywords
6. AI optimization — answer blocks, fact density, schema markup

---

*Last Updated: June 2026*
