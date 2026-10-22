import { products, SITE } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import Image from 'next/image';
import PointCloudLazy from '@/components/PointCloudLazy';
import LoopVideo from '@/components/LoopVideo';
import { AuditButton, WhatsAppButton } from '@/components/ui';
import { Sections } from '@/components/home/Sections';

export const metadata = pageMetadata('AI Agents, MCP Servers & Automation', 'Custom AI agents, MCP servers and business automation from Jaipur, India. Next.js websites, Flutter apps and CRMs you own. Monthly plans from Rs 15,000.', '/');

export default function Home() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': products.map((product) => ({ '@type': 'Service', '@id': `${SITE}/#service-${product.id}`, name: product.name, description: product.desc, serviceType: product.name, url: `${SITE}${product.href}`, provider: { '@id': `${SITE}/#org` }, areaServed: { '@type': 'Country', name: 'India' } })) }} />
      <PointCloudLazy />
      <section data-scene="hero" data-hero className="relative flex min-h-[100svh] items-end overflow-hidden supports-[height:100dvh]:min-h-[100dvh]">
        <LoopVideo src="/video/hero" mobileSrc="/video/hero-m" poster="/video/hero-poster.jpg" minWidth={0} className="hero-video absolute inset-x-0 -top-[8%] h-[116%] w-full [mask-image:linear-gradient(to_bottom,#000_55%,transparent_98%)]" />
        <div aria-hidden data-hero-veil className="hero-veil absolute inset-0" />
                <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-10 px-6 pb-16 pt-40 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:px-10 md:pb-20">
          <div>
            <p data-reveal className="mono-label flex items-center gap-3 text-ivory/70"><span className="h-1.5 w-1.5 rounded-full bg-ice shadow-[0_0_12px_#5EE7FF]" />AI agents · MCP servers · Jaipur</p>
            <h1 data-hero-h1 className="mt-6 max-w-[16ch] font-display text-[clamp(2.5rem,5.4vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ivory">
              <span data-split>AI agents that do</span> <span data-split className="grad-text">real work</span> <span data-split>for your business.</span>
            </h1>
            <p data-reveal className="mt-7 max-w-[44ch] text-[clamp(1rem,1.2vw,1.125rem)] leading-relaxed text-ivory/70">
              Custom MCP servers and agents wired into your WhatsApp, CRM and data. You own the code.
            </p>
            <div data-reveal data-hero-cta className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"><AuditButton /><WhatsAppButton /></div>
          </div>
          <p data-reveal className="mono-label hidden max-w-[22ch] text-right leading-relaxed text-ivory/50 md:block">Scroll<br />to meet the core ↓</p>
        </div>
      </section>

      {/* Particle interlude — the shared fixed canvas (above) forms the logo here; this section is only a transparent spacer + caption */}
      <section data-scene="core" aria-labelledby="core-h" className="relative z-[2] flex h-[100svh] items-end">
        <Image src="/brand/mark-white.webp" alt="" aria-hidden width={160} height={170} className="rm-only absolute left-1/2 top-1/2 h-auto w-40 -translate-x-1/2 -translate-y-1/2 opacity-60" />
        <div className="mx-auto flex w-full max-w-[1280px] items-end justify-between gap-6 px-6 pb-12 md:px-10">
          <div><p data-reveal className="mono-label text-ivory/50">00 — The core</p>
            <h2 id="core-h" data-split className="mt-3 max-w-[20ch] font-display text-[clamp(1.4rem,2.2vw,2rem)] font-semibold leading-tight tracking-[-0.03em] text-ivory">One AI core. Every tool your team already uses.</h2></div>
          <p data-reveal className="mono-label hidden text-ivory/40 md:block">Reverbex / signal → system</p>
        </div>
      </section>
      <div className="relative z-[2]"><Sections products={products} /></div>
    </>
  );
}
