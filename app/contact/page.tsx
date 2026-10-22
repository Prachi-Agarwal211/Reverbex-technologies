import { pageMetadata } from '@/lib/seo';
import { PageHead } from '@/components/PageHead';
import { AuditForm, WhatsAppButton, CallButton } from '@/components/ui';
import { EMAIL, PHONE, PHONE_E164 } from '@/lib/site';
export const metadata = pageMetadata('Contact & Free AI Audit', 'Get a free AI audit from Reverbex Technology, Jaipur. WhatsApp +91 99299 86743, email hello@reverbex.in or book a 20-minute call.', '/contact');
export default function Contact() {
  return (<>
    <PageHead name="Contact" path="/contact" crumb="Contact" title={<>Let&apos;s find what AI can take off your plate.</>} intro="WhatsApp is fastest. Use the audit form to prepare your brief, then send it to us in WhatsApp." />
    <section className="relative"><div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-14 md:py-20">
      <div className="min-w-0 space-y-8">
        <div data-reveal><p className="mono-label mb-3 text-cobaltlt">WhatsApp or call</p><a href={`tel:${PHONE_E164}`} className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.04em] transition-colors hover:text-cobaltlt">{PHONE}</a></div>
        <div data-reveal><p className="mono-label mb-3 text-cobaltlt">Email</p><a href={`mailto:${EMAIL}`} className="break-words font-display text-[clamp(1.3rem,2.4vw,1.9rem)] font-bold tracking-[-0.04em] transition-colors hover:text-cobaltlt">{EMAIL}</a></div>
        <div data-reveal><p className="mono-label mb-3 text-cobaltlt">Based in</p><p className="font-display text-[clamp(1.3rem,2.4vw,1.9rem)] font-bold tracking-[-0.04em]">Jaipur, Rajasthan, India</p></div>
        <div className="flex flex-wrap gap-3 pt-2"><WhatsAppButton /><CallButton /></div>
      </div>
      <div className="min-w-0 rounded-3xl border border-paper/15 bg-paper/[0.03] p-6 md:p-8"><h2 data-reveal className="font-display text-2xl font-semibold tracking-[-0.04em]">Start with your biggest bottleneck.</h2><p className="mb-8 mt-3 text-sm leading-relaxed text-mute">A few details help us understand your workflow before we talk.</p><AuditForm /></div>
    </div></section>
  </>);
}
