# 🧠 SHINZU CORE — UNIVERSAL ENGINEERING PRINCIPLES

## Core Philosophy
**Simplicity > Complexity** — Every line of code must justify its existence.

---

## 🎯 THE SHINZU CORE (7 Principles)

### 1. **Simplicity is the Ultimate Sophistication**
- Every component must have a single, clear purpose
- If it can be removed without breaking functionality, remove it
- Prefer boring, proven solutions over clever ones
- **Test**: Can you explain this component's purpose in one sentence?

### 2. **Performance is a Feature, Not an Afterthought**
- Every animation must have a performance budget
- Measure before optimizing (LCP, INP, CLS)
- Lazy load everything non-critical
- **Rule**: If it's not measurable, it's not optimizable

### 3. **Accessibility is Non-Negotiable**
- Semantic HTML first, ARIA only when necessary
- Keyboard navigation must work everywhere
- Reduced motion support is mandatory
- **Test**: Can you navigate the entire site with Tab only?

### 4. **Mobile-First is the Only First**
- Design for 320px width, then scale up
- Touch targets minimum 44x44px
- No hover-dependent interactions
- **Rule**: If it doesn't work on mobile, it doesn't work

### 5. **Documentation is Code**
- Every pattern must be documented in `.qwen/patterns/`
- Every bug fix must be recorded in `.qwen/bugs/fixed.md`
- Every architectural decision must have a rationale in `.qwen/decisions/`
- **Rule**: If it's not documented, it doesn't exist

### 6. **Compound Knowledge**
- Every session must make the `.qwen/` brain smarter
- Never solve the same problem twice
- Patterns must be reusable and sourced
- **Test**: Could another engineer solve this using only `.qwen/`?

### 7. **Verify, Never Assume**
- Never guess library APIs — use `context7` or `researcher`
- Never assume code works — test it
- Never assume patterns are correct — verify against docs
- **Rule**: Trust but verify, then verify again

---

## 🚫 ANTI-PATTERNS (NEVER DO THESE)

❌ **Memory Leaks**: GSAP tickers without cleanup, event listeners without removal
❌ **Inline Styles**: Use CSS classes with Tailwind or CSS modules
❌ **useEffect for Animations**: Always use `useGSAP` hook
❌ **gsap.registerPlugin in Every Component**: Only in one central location
❌ **Hardcoded Values**: Use CSS variables or constants
❌ **Premature Optimization**: Measure first, optimize second
❌ **Over-Engineering**: Simple solutions for simple problems
❌ **Ignoring TypeScript Strict Mode**: No `any`, proper types always

---

## ✅ VERIFIED PATTERNS (ALWAYS USE THESE)

### GSAP Animation Pattern (React 19)
```typescript
// ✅ CORRECT: Named function reference + useGSAP + cleanup
const MyComponent = () => {
  const { contextSafe } = useGSAP();
  
  useGSAP(() => {
    const animation = gsap.to(element, { x: 100 });
    return () => animation.kill(); // Cleanup
  }, { scope: 'component-name' });
  
  return <div ref={element}>Content</div>;
};
```

### IntersectionObserver Pattern
```typescript
// ✅ CORRECT: Cleanup + callback ref
const useIntersectionObserver = (callback: IntersectionObserverCallback) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(callback);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect(); // Cleanup
  }, [callback]);
  
  return ref;
};
```

### Font Loading Pattern
```typescript
// ✅ CORRECT: next/font + display swap
import { Syne, DM_Sans } from 'next/font/google';

export const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  preload: true,
});

export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
});
```

---

## 📏 QUALITY GATES (MUST PASS BEFORE COMMIT)

### Code Quality
- [ ] TypeScript strict mode: no errors, no `any`
- [ ] ESLint: no warnings, no errors
- [ ] No console.log in production code
- [ ] All functions have return types

### Performance
- [ ] LCP < 2.5s (measured via Lighthouse)
- [ ] INP < 200ms
- [ ] CLS < 0.1
- [ ] Bundle size < 200KB initial

### Accessibility
- [ ] All images have alt text
- [ ] All buttons have aria-label or visible text
- [ ] Focus indicators visible everywhere
- [ ] Reduced motion supported

### Mobile
- [ ] Touch targets ≥ 44x44px
- [ ] No horizontal scroll
- [ ] Font sizes readable (≥ 16px body)
- [ ] Safe area insets respected

---

## 🔄 SESSION LIFECYCLE

### Start
1. Read `.qwen/SHINZU.md` (once per session)
2. Read `.qwen/AGENTS.md` (every session)
3. Check `memory.get("session:last")`
4. Review relevant `.qwen/patterns/` and `.qwen/bugs/`

### Execute
1. Delegate to specialists or act directly
2. Apply SHINZU CORE principles
3. Use verified patterns from `.qwen/patterns/`
4. Verify APIs via `context7` or `researcher`

### End
1. Capture new patterns → `.qwen/patterns/`
2. Record bug fixes → `.qwen/bugs/fixed.md`
3. Document decisions → `.qwen/decisions/`
4. Update memory → `memory.add("session:last", ...)`

---

## 🎯 DECISION FRAMEWORK

When facing any technical decision:

1. **Simplicity Check**: What's the simplest solution?
2. **Performance Impact**: How does this affect LCP/INP/CLS?
3. **Accessibility**: Does this work for everyone?
4. **Mobile**: Does this work on a 320px screen?
5. **Documentation**: Where will this be recorded?
6. **Pattern Potential**: Can this be reused?

---

## 📚 KNOWLEDGE COMPOUNDING

The `.qwen/` brain must grow richer every session:

- **Patterns**: Verified, sourced, reusable code snippets
- **Bugs**: Root cause, solution, prevention notes
- **Decisions**: Architectural choices with rationale
- **Learnings**: Session insights and discoveries

**Rule**: If you solve it once, document it. If you solve it twice without documenting, you've failed.

---

*Last Updated: Session 1 — Reverbex Technologies Award-Winning Rebuild*
*Version: 1.0.0*
