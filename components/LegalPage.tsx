import Link from 'next/link';
import { PageHead } from '@/components/PageHead';
import { EMAIL } from '@/lib/site';

export type LegalSection = { title: string; content: React.ReactNode };

export function LegalPage({ title, path, intro, sections }: { title: string; path: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHead name={title} path={path} crumb="Legal" title={title} intro={intro} />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16 md:py-20">
        <aside className="min-w-0 self-start rounded-3xl border border-paper/10 bg-paper/[0.03] p-6 md:sticky md:top-32">
          <p className="mono-label text-cobaltlt">Updated 22 October 2026</p>
          <p className="mt-5 text-sm leading-relaxed text-mute">Questions about this policy? Contact Reverbex Technology in Jaipur, India.</p>
          <a href={`mailto:${EMAIL}`} className="mt-4 inline-block break-words text-sm font-semibold underline underline-offset-4">{EMAIL}</a>
          <nav aria-label="Legal pages" className="mt-6 flex flex-wrap gap-4 border-t border-paper/10 pt-6 text-sm">
            <Link href="/privacy" aria-current={path === '/privacy' ? 'page' : undefined} className="underline underline-offset-4">Privacy</Link>
            <Link href="/terms" aria-current={path === '/terms' ? 'page' : undefined} className="underline underline-offset-4">Terms</Link>
            <Link href="/contact" className="underline underline-offset-4">Contact</Link>
          </nav>
        </aside>
        <article className="min-w-0 space-y-10">
          {sections.map((section, i) => <section key={section.title} data-reveal className="border-b border-paper/10 pb-10 last:border-0 last:pb-0"><p className="mono-label text-cobaltlt">0{i + 1}</p><h2 className="mt-3 font-display text-[clamp(1.3rem,2.5vw,1.8rem)] font-semibold tracking-[-0.04em]">{section.title}</h2><div className="mt-4 space-y-4 leading-relaxed text-paper/75">{section.content}</div></section>)}
        </article>
      </div>
    </>
  );
}
