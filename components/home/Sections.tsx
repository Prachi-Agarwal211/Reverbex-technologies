import Link from 'next/link';
import Image from 'next/image';
import LoopVideo from '../LoopVideo';
import type { Product } from '@/lib/site';
import { cases } from '@/lib/site';
import { PricingTable, AuditButton, WhatsAppButton, FAQ } from '../ui';

const wrap = 'mx-auto w-full max-w-[1280px] px-6 md:px-10';
const h2 = 'font-display text-[clamp(2rem,3.8vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.045em]';

/* Real clients, named in Reverbex docs (lib/site.ts cases + docs.zip). Logos fetched from each client's live site, recoloured white. */
const clients = [
  { n: 'MAAC Animation Jaipur', f: 'maac', w: 360, h: 117 },
  { n: 'Khemji Wire Company', f: 'khemji', w: 360, h: 125 },
  { n: 'PSARA Consultant India', f: 'psara', w: 127, h: 160 },
  { n: 'Silbar Security', f: 'silbar', w: 142, h: 160 },
  { n: 'Aarya Clothing', f: 'aarya', w: 166, h: 160 },
];
const tech = [['openai', 'OpenAI'], ['anthropic', 'Anthropic'], ['nextdotjs', 'Next.js'], ['vercel', 'Vercel'], ['flutter', 'Flutter']];
const bento = ['lg:col-span-2 lg:row-span-2', 'lg:col-span-2', '', '', 'lg:col-span-2', ''];
const order = ['ai-agents', 'mcp-servers', 'ai-automation', 'crm-dashboards', 'websites', 'mobile-apps'];
const media: Record<string, string> = { 'ai-agents': 'card-chrome', 'mcp-servers': 'card-wave', 'ai-automation': 'card-flow', 'crm-dashboards': 'card-dash', websites: 'card-web', 'mobile-apps': 'card-app' };

/** Tiny mono label + large statement (masked reveal) + one supporting line. */
export function SectionIntro({ i, label: l, title, hl, line, id, children, center = false }: { i: string; label: string; title: string; hl?: string; line?: string; id: string; children?: React.ReactNode; center?: boolean }) {
  const pre = hl && title.endsWith(hl) ? title.slice(0, -hl.length).trim() : title;
  return (
    <div data-intro className={`grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end ${center ? 'justify-items-center text-center md:grid-cols-1' : ''}`}>
      <div>
        <p data-reveal className={`mono-label flex items-center gap-3 text-ivory/55 ${center ? 'justify-center' : ''}`}><span className="grad-text font-semibold">{i}</span><span className="h-px w-8 bg-gradient-to-r from-ice via-cobaltlt to-glow" />{l}</p>
        <h2 id={id} className={`${h2} mt-6 ${center ? 'mx-auto max-w-[20ch]' : 'max-w-[18ch]'}`}><span data-split>{pre}</span>{pre !== title && <> <span data-split className="grad-text">{hl}</span></>}</h2>
        {line && <p data-reveal className={`relative mt-7 max-w-[46ch] text-[1.05rem] leading-relaxed text-mute ${center ? 'mx-auto' : ''}`}>{line}</p>}
      </div>
      {children}
    </div>
  );
}

/** Light line that continues the particle wave into the next scene; drawn on scroll. */
function Sweep() {
  return (
    <svg aria-hidden viewBox="0 0 1440 120" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 h-[120px] w-full">
      <defs><linearGradient id="sw" x1="0" x2="1"><stop offset="0" stopColor="#2F6BFF" stopOpacity="0" /><stop offset=".35" stopColor="#5B8CFF" /><stop offset=".55" stopColor="#5EE7FF" /><stop offset=".75" stopColor="#3D8BFF" /><stop offset=".9" stopColor="#F2D88A" /><stop offset="1" stopColor="#3D8BFF" stopOpacity="0" /></linearGradient>
        <filter id="swb"><feGaussianBlur stdDeviation="6" /></filter></defs>
      <path data-draw d="M0 60 C 240 10, 480 110, 720 60 S 1200 10, 1440 60" fill="none" stroke="url(#sw)" strokeWidth="10" filter="url(#swb)" opacity=".55" />
      <path data-draw d="M0 60 C 240 10, 480 110, 720 60 S 1200 10, 1440 60" fill="none" stroke="url(#sw)" strokeWidth="1.5" />
    </svg>
  );
}

const ins = [['WhatsApp', 90], ['CRM', 200], ['Sheets', 310], ['Orders', 420]] as const;
const outs = [['Reply sent', 140], ['Lead created', 255], ['Dashboard line', 370]] as const;
function McpDiagram() {
  const inP = (y: number) => `M170 ${y} C 320 ${y}, 330 255, 440 255`;
  const outP = (y: number) => `M560 255 C 670 255, 680 ${y}, 830 ${y}`;
  return (
    <svg viewBox="0 0 1000 510" className="mcp-svg w-full" role="img" aria-label="Diagram: WhatsApp, CRM, Sheets and Orders connect through an MCP server to one AI core, which sends replies, creates leads and updates dashboards.">
      <defs>
        <linearGradient id="ln" x1="0" x2="1"><stop offset="0" stopColor="#5B8CFF" stopOpacity=".3" /><stop offset="1" stopColor="#7FD4FF" /></linearGradient>
        <linearGradient id="lo" x1="0" x2="1"><stop offset="0" stopColor="#FFB547" /><stop offset="1" stopColor="#F2D88A" stopOpacity=".7" /></linearGradient>
        <radialGradient id="core"><stop offset="0" stopColor="#5EE7FF" stopOpacity=".6" /><stop offset=".4" stopColor="#3D8BFF" stopOpacity=".45" /><stop offset="1" stopColor="#2F6BFF" stopOpacity="0" /></radialGradient>
      </defs>
      {ins.map(([, y], i) => <path key={i} id={`mi${i}`} data-draw-scrub="0" d={inP(y)} fill="none" stroke="url(#ln)" strokeWidth="1.5" />)}
      {outs.map(([, y], i) => <path key={i} id={`mo${i}`} data-draw-scrub="1" d={outP(y)} fill="none" stroke="url(#lo)" strokeWidth="1.5" />)}
      <g className="mcp-pulses">
        {ins.map((_, i) => <circle key={i} r="3" fill="#7FD4FF"><animateMotion dur={`${2.2 + i * .3}s`} repeatCount="indefinite" begin={`${i * .4}s`}><mpath href={`#mi${i}`} /></animateMotion></circle>)}
        {outs.map((_, i) => <circle key={i} r="3" fill="#FFB547"><animateMotion dur={`${2 + i * .3}s`} repeatCount="indefinite" begin={`${1 + i * .4}s`}><mpath href={`#mo${i}`} /></animateMotion></circle>)}
      </g>
      <circle data-core cx="500" cy="255" r="150" fill="url(#core)" />
      <circle cx="500" cy="255" r="58" fill="#0A0F2C" stroke="rgba(61,139,255,.8)" />
      <image href="/brand/mark-white.webp" x="474" y="226" width="52" height="58" />
      <text x="500" y="345" textAnchor="middle" className="mcp-t" fill="#F5F7FA">MCP server + AI core</text>
      {ins.map(([t, y]) => <g key={t} data-node="0"><rect x="40" y={y - 22} width="130" height="44" rx="22" fill="#0A0F2C" stroke="rgba(94,231,255,.55)" /><text x="105" y={y + 5} textAnchor="middle" className="mcp-t" fill="#F5F7FA">{t}</text></g>)}
      {outs.map(([t, y]) => <g key={t} data-node="1"><rect x="830" y={y - 22} width="150" height="44" rx="22" fill="#0A0F2C" stroke="rgba(255,243,196,.6)" /><text x="905" y={y + 5} textAnchor="middle" className="mcp-t" fill="#FFF3C4">{t}</text></g>)}
    </svg>
  );
}

function Reform() {
  return (
    <div aria-hidden className="cta-emblem relative mx-auto grid place-items-center">
      <div className="cta-emblem-glow absolute inset-[-35%] rounded-full" />
      <div data-reform className="reform-mark h-full w-full" />
    </div>
  );
}

export function Sections({ products: all }: { products: Product[] }) {
  const products = order.map((id) => all.find((p) => p.id === id)!).filter(Boolean);
  return (
    <>
      {/* 2. Services — wave arrives as a light sweep */}
      <section data-scene="services" id="products" aria-labelledby="products-h" className="relative">
        <Sweep />
        <div className={`${wrap} py-36 md:py-48`}>
          <SectionIntro i="01" label="What we build" id="products-h" title="Six systems. All custom-coded." hl="All custom-coded." line="From the AI layer down to the website it runs on. Every line written for your business, and yours to keep." />
          <ul className="mt-20 grid gap-4 [perspective:1400px] sm:grid-cols-2 lg:auto-rows-[minmax(260px,auto)] lg:grid-cols-4">
            {products.map((p, i) => (
              <li key={p.id} data-depth={[0, 40, 90, 20, 60, 110][i]} className={bento[i] ?? ''}>
                <Link href={p.href} data-tilt data-hue={i} className={`card group relative isolate flex h-full min-h-[280px] flex-col justify-between gap-10 overflow-hidden p-7 md:p-8 ${i < 2 ? 'min-h-[320px] lg:min-h-0' : ''}`}>
                  <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
                    <div data-inner className="absolute inset-x-0 -top-[12%] h-[124%]"><LoopVideo src={`/video/${media[p.id]}`} poster={`/video/${media[p.id]}.jpg`} className="h-full w-full opacity-75 transition-[opacity,transform] duration-700 group-hover:scale-[1.05] group-hover:opacity-95" /></div>
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,11,.05)_0%,rgba(7,8,11,.5)_50%,rgba(7,8,11,.94)_100%)]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="mono-label rounded-full border border-ivory/15 bg-eclipse/60 px-3 py-1.5 text-ivory/75">{p.n} · {p.short}</span>
                    <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full border border-ivory/15 bg-eclipse/50 text-ivory/75 transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-transparent group-hover:bg-glow group-hover:text-eclipse">→</span>
                  </div>
                  <div>
                    <h3 className={`font-display font-semibold leading-[1.05] tracking-[-0.035em] text-ivory ${i === 0 ? 'text-[clamp(2rem,3.2vw,3rem)]' : i === 1 || i === 4 ? 'text-[clamp(1.5rem,2.2vw,2rem)]' : 'text-[1.4rem]'}`}>{p.name}</h3>
                    <p className={`mt-3 leading-relaxed text-ivory/65 ${i === 0 ? 'max-w-[40ch] text-[1.05rem]' : 'max-w-[36ch] text-[15px]'}`}>{p.desc}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. MCP — lines draw into the core (pinned scrub on desktop) */}
      <section data-scene="mcp" aria-labelledby="mcp-h" className="sheet relative isolate">
        <div aria-hidden className="mesh mesh-mcp" />
        <div data-pin className="relative flex min-h-[100svh] items-center">
          <div className={`${wrap} grid gap-14 py-24 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:items-center`}>
            <div>
              <SectionIntro i="02" label="How MCP works" id="mcp-h" title="Your tools, plugged into one AI core." hl="one AI core." />
              <ol className="mt-12 grid gap-1">
                {[['Your tools stay put', 'WhatsApp, CRM, Sheets, orders, docs.'],
                  ['We expose them as typed tools', 'An MCP server decides what the AI may read or change.'],
                  ['The agent uses them', 'Checks an order, creates a lead, books a demo.'],
                  ['Results land with people', 'A WhatsApp reply, a CRM row, a dashboard line.']].map(([t, d], i) => (
                  <li key={t} data-step={i} className="mcp-step grid grid-cols-[2.5rem_1fr] gap-3 rounded-2xl px-4 py-4">
                    <span className="grad-text font-display text-[13px] font-semibold">0{i + 1}</span>
                    <div><p className="text-[1.05rem] font-semibold">{t}</p><p className="mt-1 text-[15px] text-mute">{d}</p></div>
                  </li>))}
              </ol>
            </div>
            <div className="card relative p-4 md:p-8"><McpDiagram /></div>
          </div>
        </div>
      </section>

      {/* 4. Results — core glow becomes numbers */}
      <section data-scene="results" data-slide aria-labelledby="work-h" className={`sheet ${wrap} relative isolate py-36 md:py-48`}>
        <div aria-hidden className="mesh mesh-results" />
        <SectionIntro i="03" label="Results" id="work-h" title="Numbers from live systems." hl="live systems.">
          <Link href="/work" className="font-semibold underline decoration-1 underline-offset-[6px] hover:decoration-ice">All case studies</Link>
        </SectionIntro>
        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {cases.slice(0, 3).map((c) => (
            <Link key={c.slug} href={`/work/${c.slug}`} data-depth="30" data-hue={cases.indexOf(c) + 2} className="card group grid content-start gap-5 p-8 md:p-10">
              <p className="metric font-display text-[clamp(3rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.05em]">{c.metric}</p>
              <p className="font-semibold">{c.metricLabel}</p>
              <p className="text-mute">{c.client}</p>
              <span className="mt-6 text-[14px] text-ivory/70 transition-colors group-hover:text-glow">Read case study →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Trusted by */}
      <section data-scene="clients" aria-labelledby="clients-h" className={`${wrap} relative pb-36 md:pb-48`}>
        <SectionIntro i="04" label="Trusted by" id="clients-h" title="Businesses running on our code." hl="our code." />
        <ul data-sweep className="sweep mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] bg-ivory/10 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((c, i) => (
            <li key={c.f} data-reveal className="logo-cell grid min-h-[150px] place-items-center bg-eclipse/85 p-6">
              <Image src={`/partners/${c.f}.png`} alt={c.n} width={c.w} height={c.h} className="h-auto max-h-16 w-auto max-w-[80%] object-contain" />
            </li>
          ))}
        </ul>
        <div data-reveal className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
          <p className="mono-label text-ivory/60">Tech we build with</p>
          {tech.map(([f, n]) => <span key={f} className="flex items-center gap-2 text-[14px] text-ivory/80"><Image src={`/partners/tech-${f}.svg`} alt="" width={18} height={18} className="h-[18px] w-[18px]" />{n}</span>)}
        </div>
      </section>

      {/* 6. Pricing */}
      <section data-scene="pricing" data-slide id="pricing" aria-labelledby="pricing-h" className={`sheet ${wrap} relative isolate pb-36 pt-16 md:pb-48`}>
        <div aria-hidden className="mesh mesh-pricing" />
        <SectionIntro i="05" label="Pricing" id="pricing-h" title="Three monthly plans." hl="monthly plans." line="A fixed monthly fee. Pick the scope you need.">
          <Link href="/pricing" className="font-semibold underline decoration-1 underline-offset-[6px] hover:decoration-ice">Compare features</Link>
        </SectionIntro>
        <div data-depth="0" className="mt-16"><PricingTable /></div>
      </section>

      <section aria-labelledby="faq-h" className={`${wrap} pb-24 md:pb-36`}>
        <SectionIntro i="06" label="Questions & answers" id="faq-h" title="What should you know before we build?" />
        <div className="mt-10"><FAQ /></div>
      </section>

      {/* 7. CTA — the logo reforms */}
      <section data-scene="cta" id="audit" aria-labelledby="cta-h" className="final-cta relative isolate">
        <div className={`${wrap} cta-content grid justify-items-center text-center`}>
          <Reform />
          <h2 id="cta-h" data-reveal className="max-w-[19ch] font-display text-[clamp(2.1rem,4.6vw,4.25rem)] font-semibold leading-[1.08] tracking-[-0.05em]">
            Tell us what eats <span className="grad-text">your team&apos;s time.</span>
          </h2>
          <p data-reveal className="max-w-[44ch] text-mute">Free AI audit. A short written plan within 48 hours.</p>
          <div data-reveal className="flex flex-wrap justify-center gap-x-6 gap-y-4"><AuditButton /><WhatsAppButton /></div>
        </div>
      </section>
    </>
  );
}
