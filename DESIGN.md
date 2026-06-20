# DESIGN.md — Reverbex Technologies

## Design Overview

Dark, editorial, premium. Not "AI startup." Not "tech agency."
Business growth partner that helps companies get more customers through websites, ads, automation, and AI.

---

## Color Palette

### Primary

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#050505` | Page background |
| `--bg-secondary` | `#0A0A0A` | Card/section background |
| `--bg-tertiary` | `#111111` | Elevated surfaces |
| `--text-primary` | `#F5F5F0` | Headlines, primary text |
| `--text-secondary` | `#A0A0A0` | Body text, descriptions |
| `--text-muted` | `#666666` | Captions, labels |
| `--accent` | `#EAB308` | CTAs, links, highlights |
| `--accent-hover` | `#CA8A04` | Accent hover state |
| `--accent-muted` | `#EAB30820` | Accent background tint |

### Semantic

| Token | Value | Usage |
|-------|-------|-------|
| `--success` | `#22C55E` | Positive results, success states |
| `--error` | `#EF4444` | Error states, destructive actions |
| `--warning` | `#F59E0B` | Warnings, attention needed |
| `--border` | `#1A1A1A` | Default borders |
| `--border-subtle` | `#111111` | Subtle dividers |

### Rules

- Accent color (`#EAB308`) ONLY for CTAs, active states, links
- Never use accent for decorative backgrounds
- Status colors are reserved — never repurpose for decoration
- Dark mode uses surface elevation, not inverted colors
- No random hex values — use only defined tokens

---

## Typography

### Font Stack

| Role | Font | Fallback |
|------|------|----------|
| Headings | Syne | system-ui |
| Body | DM Sans | system-ui |
| Monospace | JetBrains Mono | monospace |

### Type Scale (8pt grid)

| Name | Size | Line Height | Letter Spacing | Weight |
|------|------|-------------|----------------|--------|
| `display` | 72px / 4.5rem | 1.0 | -0.03em | 900 |
| `h1` | 56px / 3.5rem | 1.05 | -0.02em | 800 |
| `h2` | 40px / 2.5rem | 1.1 | -0.02em | 700 |
| `h3` | 32px / 2rem | 1.2 | -0.01em | 700 |
| `h4` | 24px / 1.5rem | 1.3 | 0 | 600 |
| `body-lg` | 20px / 1.25rem | 1.6 | 0 | 400 |
| `body` | 16px / 1rem | 1.6 | 0 | 400 |
| `body-sm` | 14px / 0.875rem | 1.5 | 0 | 400 |
| `caption` | 12px / 0.75rem | 1.4 | 0.02em | 500 |
| `overline` | 12px / 0.75rem | 1.4 | 0.08em | 600 |

### Rules

- Headlines: tight tracking (-0.02em to -0.03em)
- Body: relaxed tracking (0), line-height 1.5-1.7
- Accent font weight for emphasis, not size
- Never use Inter, Roboto, Arial, or Open Sans
- Text flows through three levels: primary → muted → faint

---

## Spacing (8pt Grid)

All spacing values land on the 8pt grid:

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight gaps |
| `--space-2` | 8px | Small gaps |
| `--space-3` | 12px | Icon gaps |
| `--space-4` | 16px | Standard gaps |
| `--space-5` | 20px | Medium gaps |
| `--space-6` | 24px | Section gaps |
| `--space-8` | 32px | Large gaps |
| `--space-10` | 40px | Section padding |
| `--space-12` | 48px | Section padding |
| `--space-16` | 64px | Large sections |
| `--space-20` | 80px | Hero spacing |
| `--space-24` | 96px | Major sections |
| `--space-32` | 128px | Full sections |

### Rules

- Never use arbitrary pixel values
- Section isolation: surface shift, whitespace, divider, border, or color fill
- Never stack two same-surface sections without separation
- Premium = more space, not more elements

---

## Shadows & Elevation

### Shadow System

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 1px 2px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.15);
--shadow-lg: 0 1px 2px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 2px 4px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.15), 0 16px 32px rgba(0, 0, 0, 0.1), 0 32px 64px rgba(0, 0, 0, 0.1);
```

### Rules

- Layered shadows, not single drop shadows
- Shadow intensity correlates with elevation
- No shadows on flat elements
- Border + shadow = redundant. Pick one.

---

## Component Styles

### Buttons

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| Primary | `#EAB308` | `#050505` | none | `#CA8A04` |
| Secondary | `transparent` | `#F5F5F0` | `#1A1A1A` | `#111111` |
| Ghost | `transparent` | `#A0A0A0` | none | `#F5F5F0` bg |
| Link | `transparent` | `#EAB308` | none | underline |

**States:** Default → Hover → Focus (2px ring `#EAB308`) → Active (scale 0.98) → Disabled (opacity 0.5) → Loading (spinner)

### Cards

- Background: `#0A0A0A`
- Border: `1px solid #1A1A1A`
- Border-radius: `12px` (or `0` for editorial feel)
- Padding: `24px` / `32px`
- No card nesting — flatten hierarchy
- Use whitespace, not borders, for separation

### Form Inputs

- Background: `#0A0A0A`
- Border: `1px solid #1A1A1A`
- Border-radius: `8px`
- Padding: `12px 16px`
- Focus: `border-color: #EAB308`, `box-shadow: 0 0 0 2px #EAB30820`
- States: Default → Focus → Error (red border) → Disabled → Success (green border)

---

## Layout & Spacing

### Grid System

- Max width: `1280px`
- Gutter: `24px` mobile, `32px` desktop
- Columns: 4 mobile, 8 tablet, 12 desktop

### Breakpoints

| Name | Width |
|------|-------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

### Section Spacing

- Between sections: `96px` mobile, `128px` desktop
- Section padding: `48px` mobile, `80px` desktop
- Content max-width: `720px` for text, `1280px` for full-bleed

---

## Motion & Animation

### Timing

| Type | Duration | Easing |
|------|----------|--------|
| Hover | 200ms | `ease-out` |
| Transition | 300ms | `ease-out` |
| Page | 500ms | `ease-out` |
| Scroll reveal | 800ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Exit | 300ms | `ease-in` |

### Rules

- Animate ONLY `transform` and `opacity` (GPU-composited)
- NEVER animate `width`, `height`, `top`, `left`, `margin`, `padding`
- Respect `prefers-reduced-motion: reduce`
- Every animation must guide attention or confirm action
- NO decorative animations

---

## Design Guardrails

### DO

- Use Syne for headings, DM Sans for body
- Use editorial layouts: left-aligned, asymmetric, generous whitespace
- Use bento grid, expand-on-hover, or lists instead of card grids
- Use real screenshots, real stats, real case study names
- Use 8pt grid spacing
- Use layered shadows
- Use subtle grain texture on backgrounds
- Animate only transform and opacity

### DON'T

- Never use Inter, Roboto, Arial, or Open Sans
- Never center-align body text
- Never use 3-column identical feature grids
- Never use glassmorphism on text-heavy sections
- Never use purple-to-blue gradients
- Never use gradient text on numbers
- Never nest cards inside cards
- Never use lorem ipsum or placeholder content
- Never use stock images
- Never use particles or WebGL for decoration
- Never use neon glows
- Never use rounded-corner-with-left-border cards
- Never invent tokens — use only defined values

---

## Accessibility

- WCAG 2.1 AA minimum
- Contrast ratio: 4.5:1 for body text, 3:1 for large text
- Focus visible on all interactive elements (2px ring)
- Skip to content link
- Semantic HTML
- ARIA labels on all icon-only buttons
- `prefers-reduced-motion` respected
- Keyboard navigation for all interactive elements

---

*Document Version: 1.0*
*Last Updated: June 2026*
