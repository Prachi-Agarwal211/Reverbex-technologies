import { pageMetadata } from '@/lib/seo';
import { PageHead } from '@/components/PageHead';
import { JsonLd } from '@/components/JsonLd';
import { WhatsAppButton } from '@/components/ui';
import { SITE } from '@/lib/site';
import { LogoMark } from '@/components/LogoMark';
export const metadata = pageMetadata('About the Studio & Founder', 'Anurag Singh is a bootstrapped founder from Jaipur who learned disciplined problem-solving around scientists at ISRO, taught himself full-stack systems and AI agents, and founded Reverbex Technology.', '/about');
const chapters = [
  ['After college', 'No polished roadmap, just uncertainty, curiosity and the urge to build.'],
  ['ISRO', 'Learned disciplined problem-solving around scientists: structure, patience, review, responsibility. Colleagues encouraged him to try building a company.'],
  ['Learning to build systems', 'After a short job, went deep: Next.js, backends, databases, APIs, Docker, and built his own internal AI agents, MCP tools and automations.'],
  ['First real projects', 'A college no-dues system, then a from-scratch e-commerce platform, learning that software matters when it removes a real operational problem.'],
  ['Reverbex Technology', 'Startup events led to founders and businesses needing websites, lead generation and digital systems. That work became Reverbex.'],
  ['ShipBridge', 'Co-building ShipBridge with Ashish Joshi, an AI-enabled B2B freight platform with ERP, waybills, manifests and dashboards.'],
];
export default function About() {
  return (<>
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Person', '@id': `${SITE}/about#anurag`, name: 'Anurag Singh', jobTitle: 'Founder', worksFor: { '@id': `${SITE}/#org` }, address: { '@type': 'PostalAddress', addressLocality: 'Jaipur', addressCountry: 'IN' } }} />
    <PageHead name="About" path="/about" crumb="Founder" title={<>Built by a builder, not a sales team.</>} intro="I'm Anurag Singh. I founded Reverbex Technology to help businesses build software, AI systems and growth infrastructure they own." />
    <section className="mx-auto grid max-w-6xl gap-12 px-5 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-16 md:py-20">
      <div data-reveal className="min-w-0 self-start rounded-3xl border border-cobaltlt/25 bg-gradient-to-br from-navy to-midnight p-8 text-ivory md:sticky md:top-32 md:p-10">
        <div className="flex min-h-40 items-center justify-center rounded-2xl border border-cobaltlt/15 bg-eclipse/30 py-8 text-brand"><LogoMark size={100} className="drop-shadow-[0_0_24px_rgba(61,139,255,0.6)]" /></div>
        <p className="mono-label mt-8 text-icelt">Founder</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.05em]">Anurag Singh</h2>
        <p className="mt-3 leading-relaxed text-ivory/70">Reverbex Technology<br />Jaipur, Rajasthan, India</p>
        <p className="mt-6 border-t border-ivory/10 pt-6 leading-relaxed text-ivory/70">Software, AI agents and practical systems for the people running a business.</p>
      </div>
      <div className="min-w-0">
        <p data-reveal className="text-lg leading-relaxed">&ldquo;Reverbex was not born from a branding exercise. It grew out of repeated problems businesses trusted me to solve.&rdquo;</p>
        <ol className="mt-10 space-y-10 border-l border-cobaltlt/25 pl-6">
          {chapters.map(([t, d]) => <li data-reveal key={t} className="relative before:absolute before:-left-[29px] before:top-3 before:h-2 before:w-2 before:rounded-full before:bg-cobaltlt"><h2 className="font-display text-[clamp(1.4rem,2.4vw,2rem)] font-bold tracking-[-0.04em]">{t}</h2><p className="mt-3 leading-relaxed text-paper/70">{d}</p></li>)}
        </ol>
        <h2 data-reveal className="mt-12 font-display text-[clamp(1.4rem,2.4vw,2rem)] font-bold tracking-[-0.04em]">How we work</h2>
        <p data-reveal className="mt-3 leading-relaxed text-paper/70">Build with evidence, systems, review and responsibility. Use open tools, harden them for Indian operations, and hand clients systems they own. We built our own agents and MCP tools before selling them, they are how we deliver fast.</p>
        <div className="mt-8"><WhatsAppButton text="Hi Anurag, I'd like to talk about a project." label="Talk to Anurag" /></div>
      </div>
    </section>
  </>);
}
