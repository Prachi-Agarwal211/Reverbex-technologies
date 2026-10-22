import Link from 'next/link';
import { EMAIL, LINKEDIN, WA } from '@/lib/site';
import { LogoMark } from './LogoMark';

export { Header } from './Header';
const groups = [
  { title: 'Products / Services', links: [['AI agents', '/services#ai-agents'], ['MCP servers', '/services#mcp-servers'], ['AI automation', '/services#ai-automation'], ['Web & app development', '/services#web-app']] },
  { title: 'Company', links: [['About', '/about'], ['Work', '/work'], ['Pricing', '/pricing'], ['Contact', '/contact']] },
  { title: 'Legal', links: [['Privacy', '/privacy'], ['Terms', '/terms']] },
];
export function Footer() {
  return (
    <footer className="company-footer relative z-[2] border-t border-ivory/10">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="grid gap-x-10 gap-y-12 py-16 sm:grid-cols-3 lg:grid-cols-[minmax(0,2fr)_1.2fr_.8fr_.7fr] lg:py-20">
          <div className="min-w-0 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 font-display text-lg font-semibold tracking-[-.04em]">
              <LogoMark size={36} className="logo-glow shrink-0 text-glowlt" /><span>Reverbex Technology</span>
            </Link>
            <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-mute">AI agents, MCP servers, custom web &amp; app development.</p>
            <address className="mt-6 grid justify-items-start gap-2 text-[14px] not-italic">
              <span className="text-mute">Jaipur, India</span>
              <a href={`mailto:${EMAIL}`} className="break-all">{EMAIL}</a>
              <a href={WA()} target="_blank" rel="noopener noreferrer">WhatsApp <span aria-hidden>↗</span></a>
            </address>
          </div>
          {groups.map((group) => <nav key={group.title} aria-label={`Footer ${group.title}`}>
            <h2 className="mono-label mb-5 text-ivory/55">{group.title}</h2>
            <ul className="grid gap-3 text-[14px] leading-relaxed">{group.links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
          </nav>)}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-ivory/10 py-6 text-xs text-mute">
          <p>© 2026 Reverbex Technology</p>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden>↗</span></a>
        </div>
      </div>
    </footer>
  );
}
