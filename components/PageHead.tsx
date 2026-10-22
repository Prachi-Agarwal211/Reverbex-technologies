import { JsonLd } from './JsonLd';
import { SITE } from '@/lib/site';
import Link from 'next/link';
export function PageHead({ crumb, title, intro, path, name }: { crumb: string; title: React.ReactNode; intro: string; path: string; name: string }) {
  const parents = path.startsWith('/work/') ? [{ name: 'Work', path: '/work' }] : [];
  const breadcrumbs = [{ name: 'Home', path: '' }, ...parents, { name, path }];
  return (
    <section className="page-head relative isolate text-ivory">
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        ...breadcrumbs.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: `${SITE}${item.path}` }))] }} />
      <div className="mx-auto max-w-[1280px] px-6 pb-16 pt-36 md:px-10 md:pb-20 md:pt-44">
        <nav aria-label="Breadcrumb" data-reveal className="mono-label mb-8 flex flex-wrap items-center gap-3 text-ivory/60"><Link href="/" className="hover:text-ice">Home</Link>{parents.map((parent) => <span key={parent.path} className="inline-flex items-center gap-3"><span aria-hidden>/</span><Link href={parent.path} className="hover:text-ice">{parent.name}</Link></span>)}<span aria-hidden>/</span><span aria-current="page" className="text-glowlt">{crumb}</span></nav>
        <div data-reveal className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,.65fr)] lg:items-end lg:gap-16">
          <h1 className="max-w-[20ch] font-display text-[clamp(2.2rem,5.1vw,4.6rem)] font-semibold leading-[1.08] tracking-[-0.05em]">{title}</h1>
          <p className="max-w-[48ch] text-[clamp(1rem,1.25vw,1.1rem)] leading-relaxed text-ivory/75">{intro}</p>
        </div>
      </div>
    </section>
  );
}
