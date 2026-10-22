import { pageMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cases, SITE } from '@/lib/site';
import { PageHead } from '@/components/PageHead';
import { JsonLd } from '@/components/JsonLd';
import { WhatsAppButton } from '@/components/ui';

// Unknown slugs reach notFound() cleanly instead of Next 15's static fallback error.
export const dynamicParams = true;
export function generateStaticParams() { return cases.map((c) => ({ slug: c.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const c = cases.find((x) => x.slug === slug); if (!c) notFound();
  return pageMetadata(`${c.client} Case Study`, c.summary, `/work/${slug}`);
}
export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const c = cases.find((x) => x.slug === slug); if (!c) notFound();
  return (<>
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'CreativeWork', name: `${c.client} case study`, about: { '@type': 'Organization', name: c.client }, creator: { '@id': `${SITE}/#org` }, url: `${SITE}/work/${slug}`, description: c.summary }} />
    <PageHead name={c.client} path={`/work/${slug}`} crumb={c.sector} title={c.headline} intro={c.summary} />
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-14 md:py-20">
      <div data-reveal className="min-w-0 self-start rounded-3xl border border-cobaltlt/25 bg-gradient-to-br from-navy to-midnight p-7 text-ivory md:p-10"><p className="mono-label text-icelt">Project outcome</p><p className="mt-8 break-words font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-none tracking-[-0.06em] text-brand">{c.metric}</p><p className="mt-3 leading-relaxed text-ivory/80">{c.metricLabel}</p>
        {c.url && <a href={c.url} rel="noopener noreferrer" target="_blank" className="mt-8 inline-block max-w-full break-words text-sm font-semibold text-icelt underline underline-offset-4">Visit {c.client} <span aria-hidden>↗</span></a>}</div>
      <div className="min-w-0"><h2 data-reveal className="font-display text-[clamp(1.5rem,2.6vw,2.2rem)] font-bold tracking-[-0.05em]">What we built</h2>
        <ul className="mt-6 space-y-4">{c.built.map((b) => <li data-reveal key={b} className="flex items-start gap-3 border-b border-paper/10 pb-4 leading-relaxed"><span aria-hidden className="shrink-0 text-cobaltlt">→</span><span>{b}</span></li>)}</ul>
        <div data-reveal className="mt-10 rounded-3xl border border-paper/10 p-6 md:p-8"><h2 className="font-display text-xl font-semibold">Have a similar challenge?</h2><p className="mt-3 max-w-[45ch] leading-relaxed text-mute">Tell us what your business needs. We&apos;ll help you work out the right system and scope.</p><div className="mt-6 flex flex-wrap gap-x-6 gap-y-4"><WhatsAppButton text={`Hi Reverbex, I saw the ${c.client} case study. I'd like to discuss a similar project.`} label="Discuss your project" /><Link href="/work" className="inline-flex min-h-12 items-center text-sm font-semibold underline underline-offset-4">← All work</Link></div></div>
      </div>
    </section>
  </>);
}
