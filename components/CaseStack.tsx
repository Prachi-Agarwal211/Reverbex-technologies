import Link from 'next/link';
import { cases } from '@/lib/site';
import { CaseVisual } from './CaseVisual';
const num = (m: string) => (m.match(/[\d,]+/) || [''])[0];
export function CaseStack({ limit }: { limit?: number }) {
  return (
    <div className="grid gap-6">
      {cases.slice(0, limit).map((c) => {
        const n = num(c.metric); const [pre, post] = c.metric.split(n);
        return (
          <Link key={c.slug} href={`/work/${c.slug}`} data-reveal
            className="card group grid min-w-0 origin-top gap-8 overflow-hidden p-6 text-ivory md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:p-10">
            <div className="flex flex-col gap-5">
              <p className="mono-label text-mute">{c.sector}</p>
              <p className="metric font-display text-[clamp(3.4rem,8vw,7.5rem)] font-semibold leading-[1] tracking-[-0.06em]">{pre}{n}{post}</p>
              <p className="text-[17px] font-semibold">{c.metricLabel} · {c.client}</p>
              <p className="max-w-[52ch] leading-relaxed text-mute">{c.summary}</p>
              <span className="mt-auto font-semibold underline decoration-1 underline-offset-[6px] group-hover:text-ice">Read the {c.client} case study <span aria-hidden>↗</span></span>
            </div>
            <div className="aspect-[400/260] self-center overflow-hidden rounded-[10px]"><CaseVisual slug={c.slug} /></div>
          </Link>
        );
      })}
    </div>
  );
}
