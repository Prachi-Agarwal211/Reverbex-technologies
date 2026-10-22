import { pageMetadata } from '@/lib/seo';
import { PageHead } from '@/components/PageHead';
import { JsonLd } from '@/components/JsonLd';
import { WhatsAppButton, CallButton } from '@/components/ui';
import { SITE } from '@/lib/site';

export const metadata = pageMetadata('AI Agents, MCP Servers & Development', 'Custom AI agents, Model Context Protocol (MCP) servers, n8n and WhatsApp AI automation, RAG chatbots, plus Next.js, Flutter, Python and CRM development from Jaipur, India.', '/services');

const services = [
  { id: 'ai-agents', name: 'AI Agents', lead: 'Agents that answer, decide and act inside your business.',
    points: ['WhatsApp AI agents that reply, qualify and book leads 24×7', 'Sales and support agents grounded in your catalogue and policies', 'Internal ops agents (reports, follow-ups, data lookups)', 'Human hand-off and audit logs so you stay in control'],
    fit: 'Coaching institutes, D2C brands, clinics, B2B manufacturers, logistics operators.' },
  { id: 'mcp-servers', name: 'Custom MCP Servers', lead: 'Give AI safe, structured access to your tools and data.',
    points: ['Model Context Protocol servers for your CRM, ERP, inventory, orders and documents', 'Typed tools with permissions, read vs write, per role', 'Works with MCP-compatible assistants and your own agents', 'Domain MCP experience: we run our own MCP tools for logistics waybills and research in production work'],
    fit: 'Teams who want AI assistants to use real business systems instead of copy-pasted context.' },
  { id: 'ai-automation', name: 'AI Automation', lead: 'Remove the copy-paste between your apps.',
    points: ['n8n workflows across WhatsApp, Google Sheets, CRM, email and payments', 'RAG chatbots trained on your PDFs, SOPs and website', 'Lead routing, auto-follow-ups and reminders', 'Invoice, order and report automation'],
    fit: 'Any business where people spend hours moving data between tools.' },
  { id: 'web-app', name: 'Web & App Development', lead: 'The systems your AI runs on, custom-coded, owned by you.',
    points: ['Next.js websites and web apps, server-rendered and SEO/AI-search ready', 'Flutter apps for Android and iOS', 'Python (FastAPI) backends, APIs and integrations', 'Custom CRMs and financial dashboards', 'Production e-commerce with Razorpay/UPI and inventory integrity'],
    fit: 'Businesses that need a website, app, CRM or dashboard, with AI built in from day one.' },
];

export default function Services() {
  return (
    <>
      {services.map((s) => <JsonLd key={s.id} data={{ '@context': 'https://schema.org', '@type': 'Service', name: s.name, serviceType: s.name, description: s.lead, provider: { '@id': `${SITE}/#org` }, areaServed: ['IN', 'Worldwide'], url: `${SITE}/services#${s.id}` }} />)}
      <PageHead name="Services" path="/services" crumb="Services" title={<>Four things we do, properly.</>} intro="AI agents and MCP servers are the core. Automation connects them. Web and app development gives them a home." />
      <div className="mx-auto max-w-6xl px-5 py-4 md:py-10">
        {services.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="grid scroll-mt-28 gap-8 border-b border-paper/10 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-14 md:py-16">
            <div data-reveal className="min-w-0"><p className="mono-label text-cobaltlt">0{i + 1} / Service</p><h2 id={`${s.id}-title`} className="mt-4 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.12] tracking-[-0.05em]">{s.name}</h2><p className="mt-4 max-w-[34ch] text-lg leading-relaxed text-paper/70">{s.lead}</p></div>
            <div className="min-w-0 rounded-3xl border border-paper/10 bg-midnight/70 p-6 text-ivory md:p-8">
              <ul className="space-y-4">{s.points.map((p) => <li data-reveal key={p} className="flex items-start gap-3 border-b border-ivory/10 pb-4 leading-relaxed"><span aria-hidden className="shrink-0 text-icelt">→</span><span className="min-w-0">{p}</span></li>)}</ul>
              <p className="mt-6 text-sm leading-relaxed text-ivory/65"><strong className="text-brand">Best for:</strong> {s.fit}</p>
              <div className="mt-6"><WhatsAppButton text={`Hi Reverbex, I'm interested in ${s.name}.`} label={`Discuss ${s.name}`} className="max-w-full text-sm" /></div>
            </div>
          </section>
        ))}
        <div className="flex flex-wrap gap-3 py-12"><CallButton /></div>
      </div>
    </>
  );
}
