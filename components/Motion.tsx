'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** v7 scroll narrative. Lenis (lerp .08, smoothWheel) driven by the GSAP ticker; every reveal is scrubbed to scroll.
 *  Only transform/opacity are animated. Desktop gets layered parallax + tilt; mobile gets light scrub reveals only. */
export default function Motion() {
  const path = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) root.dataset.scene = (e.target as HTMLElement).dataset.scene; }), { rootMargin: '-45% 0px -45% 0px' });
    document.querySelectorAll<HTMLElement>('[data-scene]').forEach((el) => io.observe(el));
    if (reduce) { document.querySelectorAll('[data-reveal],[data-split],[data-sweep]').forEach((e) => e.classList.add('in')); return () => io.disconnect(); }
    root.classList.add('motion');
    let dead = false; let off = () => {};
    Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('lenis')]).then(([{ gsap }, { ScrollTrigger }, { default: Lenis }]) => {
      if (dead) return;
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });
      const touch = matchMedia('(hover: none), (pointer: coarse)').matches;
      const lenis = touch ? null : new Lenis({ lerp: 0.08, smoothWheel: true, wheelMultiplier: 0.9, syncTouch: false });
      lenis?.on('scroll', ScrollTrigger.update);
      const tick = (t: number) => lenis?.raf(t * 1000); gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
      const S = 1.2; // scrub smoothing (s)
      const mm = gsap.matchMedia();
      const q = <T extends Element = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T>(s));
      const ctx = gsap.context(() => {
        // split headings into masked words (once)
        q('[data-split]').forEach((el) => {
          if (el.dataset.done) return;
          const words = (el.textContent || '').trim().split(/\s+/);
          el.innerHTML = words.map((w) => `<span class="word-mask"><span class="w">${w.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span></span>`).join(' ');
          el.dataset.done = '1';
        });
        // hero: intro on load (time-based, page has not scrolled yet), exit scrubbed with layered speeds
        const hero = document.querySelector<HTMLElement>('[data-hero]');
        const heroWords = hero ? Array.from(hero.querySelectorAll<HTMLElement>('[data-split] .w')) : [];
        if (hero) {
          gsap.fromTo(heroWords, { yPercent: 115 }, { yPercent: 0, duration: 1.4, ease: 'expo.out', stagger: .05, delay: .15 });
          gsap.fromTo(hero.querySelectorAll('[data-reveal]'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out', stagger: .1, delay: .5 });
          const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: S };
          // video crossfades + scales into the particle nebula that is already emerging on the shared canvas above it
          gsap.to(hero.querySelector('.hero-video'), { yPercent: 14, scale: 1.15, opacity: 0, ease: 'power1.in', scrollTrigger: { ...st, end: '90% top' } });
          gsap.to(hero.querySelector('[data-hero-veil]'), { opacity: 0, yPercent: 8, ease: 'none', scrollTrigger: st });
          // headline lines drift apart on exit: each [data-split] group moves at its own speed
          // headline lines drift apart on exit: group words by rendered line, upper lines rise faster
          const lines = new Map<number, HTMLElement[]>();
          hero.querySelectorAll<HTMLElement>('[data-hero-h1] .word-mask').forEach((w) => { const k = Math.round(w.offsetTop / 10); lines.set(k, [...(lines.get(k) || []), w]); });
          [...lines.keys()].sort((x, y) => x - y).forEach((k, i) => gsap.to(lines.get(k)!, { y: -(150 - i * 45), opacity: 0, ease: 'power1.in', scrollTrigger: st }));
          gsap.to(hero.querySelector('[data-hero-cta]'), { y: -30, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '60% top' } });
          gsap.to(hero.querySelectorAll('.mono-label'), { y: -140, opacity: 0, ease: 'none', scrollTrigger: st });
        }
        // section headings: word reveal scrubbed + slower drift than body
        q('[data-split]').filter((el) => !hero?.contains(el)).forEach((el) => {
          gsap.fromTo(el.querySelectorAll('.w'), { yPercent: 115 }, { yPercent: 0, ease: 'power3.out', stagger: .06,
            scrollTrigger: { trigger: el, start: 'top 96%', end: 'top 62%', scrub: S } });
        });
        // body copy / small items: scrubbed fade-up
        q('[data-reveal]').filter((el) => !hero?.contains(el)).forEach((el) =>
          gsap.fromTo(el, { y: 36, opacity: 0 }, { y: 0, opacity: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 97%', end: 'top 72%', scrub: S } }));
        q('[data-sweep]').forEach((el) => ScrollTrigger.create({ trigger: el, start: 'top 80%', once: true, onEnter: () => el.classList.add('in') }));
        // sweep line draws as the particle wave arrives (stroke-dashoffset is paint-only on an SVG this small)
        q<SVGPathElement>('[data-draw]').forEach((p) => {
          const L = p.getTotalLength(); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L });
          gsap.to(p, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: p.closest('section'), start: 'top 100%', end: 'top 35%', scrub: S } });
        });
        // v8: numbers are static (no count-up)
        // Keep the CTA mark inside its reserved frame throughout the reveal.
        q('[data-reform]').forEach((el) => {
          const box = el.parentElement!;
          const st = { trigger: box, start: 'top 100%', end: 'top 78%', scrub: S };
          gsap.fromTo(el, { y: 20, scale: .94, opacity: .35 }, { y: 0, scale: 1, opacity: 1, ease: 'power3.out', scrollTrigger: st });
        });

        mm.add('(min-width: 1024px) and (hover: hover) and (pointer: fine)', () => {
          // aurora drifts slower than the page
          gsap.to('.aurora-drift', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 2 } });
          // v8: intro block (label+heading+subtitle) drifts as ONE unit so heading can never slide over its subtitle
          q('[data-intro]').forEach((h) => gsap.fromTo(h, { y: -20 }, { y: 30, ease: 'none', scrollTrigger: { trigger: h, start: 'top bottom', end: 'bottom top', scrub: S } }));
          // sections slide up over the previous one
          q('[data-slide]').forEach((s) => gsap.fromTo(s, { y: 120 }, { y: 0, ease: 'power3.out', scrollTrigger: { trigger: s, start: 'top 105%', end: 'top 35%', scrub: S } }));
          // cards: per-card depth offset, enter + continuous parallax in one scrubbed timeline
          q('[data-depth]').forEach((el) => {
            const d = Number(el.dataset.depth || 0);
            const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 105%', end: 'bottom top', scrub: S } });
            tl.fromTo(el, { y: 140 + d, opacity: 0, scale: .94 }, { y: 0, opacity: 1, scale: 1, ease: 'power3.out', duration: .4 })
              .to(el, { y: -d * .4, ease: 'none', duration: .6 });
          });
          // media moves inside its frame
          q('[data-inner]').forEach((el) => gsap.fromTo(el, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: S } }));
          q('[data-float]').forEach((el) => gsap.fromTo(el, { y: -Number(el.dataset.float) }, { y: Number(el.dataset.float), ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: S } }));
          // subtle mouse tilt
          const offs: Array<() => void> = [];
          q('[data-tilt]').forEach((c) => {
            gsap.set(c, { transformPerspective: 1000 });
            const rx = gsap.quickTo(c, 'rotationX', { duration: .8, ease: 'power3.out' }), ry = gsap.quickTo(c, 'rotationY', { duration: .8, ease: 'power3.out' });
            const mv = (e: PointerEvent) => { const r = c.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - .5) * 6); rx(-((e.clientY - r.top) / r.height - .5) * 6); };
            const lv = () => { rx(0); ry(0); };
            c.addEventListener('pointermove', mv); c.addEventListener('pointerleave', lv); offs.push(() => { c.removeEventListener('pointermove', mv); c.removeEventListener('pointerleave', lv); });
          });
          // MCP pinned scene (pinSpacing on; its section is never transformed so the pin stays fixed)
          q('[data-pin]').forEach((pin) => {
            const ins = pin.querySelectorAll<SVGPathElement>('[data-draw-scrub="0"]'), outs = pin.querySelectorAll<SVGPathElement>('[data-draw-scrub="1"]');
            [...ins, ...outs].forEach((p) => { const L = p.getTotalLength(); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L }); });
            const steps = pin.querySelectorAll<HTMLElement>('[data-step]');
            const tl = gsap.timeline({ scrollTrigger: { trigger: pin, start: 'top top', end: '+=110%', scrub: S, pin: true, pinSpacing: true, anticipatePin: 1,
              onUpdate: (st) => steps.forEach((s, i) => s.classList.toggle('on', st.progress >= i / 4 - .02)) } });
            tl.fromTo(pin.querySelectorAll('[data-node="0"]'), { opacity: 0, x: -30 }, { opacity: 1, x: 0, stagger: .05, duration: .2, ease: 'power3.out' }, 0)
              .to(ins, { strokeDashoffset: 0, stagger: .05, duration: .35, ease: 'none' }, .1)
              .fromTo(pin.querySelector('[data-core]'), { scale: .3, opacity: 0, transformOrigin: '500px 255px' }, { scale: 1, opacity: 1, duration: .25, ease: 'power3.out' }, .4)
              .to(outs, { strokeDashoffset: 0, stagger: .05, duration: .3, ease: 'none' }, .6)
              .fromTo(pin.querySelectorAll('[data-node="1"]'), { opacity: 0, x: 30 }, { opacity: 1, x: 0, stagger: .05, duration: .2, ease: 'power3.out' }, .75);
          });
          return () => offs.forEach((f) => f());
        });
        mm.add('(max-width: 1023px), (hover: none), (pointer: coarse)', () => {
          q('[data-depth]').forEach((el) => gsap.fromTo(el, { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 100%', end: 'top 70%', scrub: 1 } }));
        });
      });
      const refresh = () => ScrollTrigger.refresh();
      if (document.readyState === 'complete') requestAnimationFrame(refresh); else addEventListener('load', refresh, { once: true });
      off = () => { removeEventListener('load', refresh); mm.revert(); ctx.revert(); gsap.ticker.remove(tick); lenis?.destroy(); root.classList.remove('motion'); };
    }).catch(() => { root.classList.remove('motion'); });
    return () => { dead = true; io.disconnect(); off(); delete root.dataset.scene; };
  }, [path]);
  return null;
}
