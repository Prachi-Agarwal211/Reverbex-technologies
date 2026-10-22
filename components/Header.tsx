'use client';
import Link from 'next/link';
import Image from 'next/image';
import { WA, AUDIT_MESSAGE } from '@/lib/site';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const nav = [['Services', '/services'], ['Work', '/work'], ['Pricing', '/pricing'], ['About', '/about']];
export function Header() {
  const path = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  const [hide, setHide] = useState(false); const [top, setTop] = useState(true); const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); setHide(false); setTop(scrollY < 40); }, [path]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); } };
    addEventListener('keydown', close); return () => removeEventListener('keydown', close);
  }, [open]);
  useEffect(() => {
    let last = scrollY;
    const on = () => { const y = scrollY; setTop(y < 40); if (Math.abs(y - last) > 6) { setHide(y > last && y > 160); last = y; } };
    addEventListener('scroll', on, { passive: true }); return () => removeEventListener('scroll', on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 transition-transform duration-700 [transition-timing-function:cubic-bezier(.16,1,.3,1)] md:pt-5 ${hide && !open ? '-translate-y-[130%]' : ''}`}>
      <div className={`glass-pill relative flex w-full max-w-[1080px] items-center justify-between gap-4 rounded-full py-2 pl-5 pr-2 text-ivory transition-[background-color,box-shadow] duration-500 ${top ? '' : 'is-scrolled'}`}>
        <Link href="/" className="flex items-center gap-2.5 font-display text-[14px] font-semibold tracking-[.08em]" aria-label="Reverbex Technology, home">
          <Image src="/brand/mark-white.webp" alt="" aria-hidden width={20} height={22} className="logo-glow h-[22px] w-auto" />REVERBEX
        </Link>
        <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 text-[13.5px] text-ivory/75 md:flex">
          {nav.map(([l, h]) => <Link key={h} href={h} aria-current={path === h || path.startsWith(`${h}/`) ? 'page' : undefined} className="rounded-full px-3 py-2 transition-colors hover:bg-white/[.07] hover:text-ivory aria-[current=page]:text-glowlt lg:px-4">{l}</Link>)}
        </nav>
        <div className="flex items-center gap-1">
          <a href={WA(AUDIT_MESSAGE)} target="_blank" rel="noopener" className="hidden btn-grad rounded-full px-5 py-2.5 font-display text-[13px] font-semibold text-white sm:block">Book a free audit</a>
          <button ref={menuButton} type="button" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)} className="grid min-h-[44px] min-w-[44px] place-items-center rounded-full text-[13px] md:hidden">{open ? 'Close' : 'Menu'}</button>
        </div>
        {open && (
          <nav id="mnav" aria-label="Mobile" className="glass-pill absolute inset-x-0 top-[calc(100%+8px)] grid gap-1 rounded-[24px] p-4 md:hidden">
            {[...nav, ['Contact', '/contact']].map(([l, h]) => <Link key={h} href={h} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 font-display text-[22px] font-semibold tracking-[-0.03em]">{l}</Link>)}
          </nav>
        )}
      </div>
    </header>
  );
}
