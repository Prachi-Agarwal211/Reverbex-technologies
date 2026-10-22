import Link from 'next/link';
import { WA, AUDIT_MESSAGE, BOOK_CALL, plans, faqs } from '@/lib/site';
import { JsonLd } from './JsonLd';

export function Label({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`mono-label text-mute ${className}`}>{children}</p>;
}
export function WhatsAppButton({ text, label = 'WhatsApp us', className = '' }: { text?: string; label?: string; className?: string }) {
  return <a href={WA(text)} target="_blank" rel="noopener" className={`inline-flex min-h-[48px] items-center gap-3 rounded-full border border-white/20 bg-white/[.06] px-6 font-semibold text-ivory backdrop-blur transition-colors duration-300 hover:border-ice/60 hover:bg-white/[.12] ${className}`}>{label}<span aria-hidden>↗</span></a>;
}
export function AuditButton({ className = '' }: { className?: string }) {
  return <a href={WA(AUDIT_MESSAGE)} target="_blank" rel="noopener" className={`inline-flex min-h-[48px] items-center gap-3 btn-grad rounded-full px-6 font-semibold text-white ${className}`}>Free AI audit<span aria-hidden>↗</span></a>;
}
export function CallButton({ className = '' }: { className?: string }) {
  return <a href={BOOK_CALL} target="_blank" rel="noopener" className={`inline-flex min-h-[48px] items-center font-semibold underline decoration-1 underline-offset-[6px] hover:decoration-brand ${className}`}>Book a 20-minute call</a>;
}

export function PricingTable() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr_1fr]">
      {plans.map((p) => (
        <article key={p.id} id={p.id} className={`plan relative flex min-w-0 scroll-mt-28 flex-col gap-6 rounded-[24px] p-7 md:p-8 ${p.featured ? 'plan-featured' : ''}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"><h3 className="font-display text-[22px] font-bold">{p.name}</h3><span className={`text-[13px] ${p.featured ? 'rounded-full bg-white/15 px-3 py-1 text-white' : 'text-mute'}`}>{p.tag}</span></div>
          <p className="grid gap-2"><span className={`whitespace-nowrap font-display text-[clamp(2.25rem,3.4vw,3.1rem)] font-bold leading-none tracking-[-0.04em] ${p.featured ? 'text-white' : 'grad-text'}`}>₹{p.price.toLocaleString('en-IN')}</span><span className={`text-[15px] ${p.featured ? 'text-white/80' : 'text-mute'}`}>per month</span></p>
          <ul className="grid flex-1 content-start gap-3 text-[15px] leading-snug">{p.items.map((it) => <li key={it} className="hairline bg-bottom pb-3">{it}</li>)}</ul>
          <a href={WA(`Hi Reverbex, I'm interested in the ${p.name} plan (Rs ${p.price.toLocaleString('en-IN')}/month).`)} target="_blank" rel="noopener"
             className={`grid min-h-[48px] place-items-center rounded-full font-semibold ${p.featured ? 'bg-ivory text-navy' : 'btn-grad text-white'}`}>Start {p.name}</a>
        </article>
      ))}
    </div>
  );
}
export function FAQ() {
  return (
    <div className="grid">
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }} />
      {faqs.map((f) => (
        <details key={f.q} className="hairline group bg-top py-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-8 text-[clamp(1.05rem,1.6vw,1.3rem)] font-semibold">
            <h3>{f.q}</h3><span aria-hidden className="font-display text-[22px] text-signal transition-transform duration-500 [transition-timing-function:cubic-bezier(.16,1,.3,1)] group-open:rotate-[135deg]">+</span></summary>
          <p className="mt-4 max-w-[62ch] leading-relaxed text-mute">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
export function AuditForm() {
  const inp = 'min-h-[48px] min-w-0 w-full rounded-2xl bg-paper/[.06] px-4 py-3 text-ivory outline-none ring-1 ring-paper/20 transition-shadow duration-300 focus:ring-2 focus:ring-brand';
  return (
    <form id="audit-form" action="/api/audit" method="post" target="_blank" rel="noopener" aria-label="Free AI audit" className="grid min-w-0 scroll-mt-28 gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-[14px] text-mute">Name<input required maxLength={100} name="name" autoComplete="name" className={inp} /></label>
        <label className="grid gap-2 text-[14px] text-mute">WhatsApp number<input required name="phone" type="tel" autoComplete="tel" pattern="[0-9+ ]{8,16}" className={inp} /></label>
      </div>
      <label className="grid gap-2 text-[14px] text-mute">Business or website<input name="business" maxLength={200} className={inp} /></label>
      <label className="grid gap-2 text-[14px] text-mute">What eats your team&apos;s time?
        <textarea name="pain" rows={3} maxLength={1000} placeholder="Answering the same WhatsApp questions, copying orders into sheets…" className={inp} /></label>
      <button className="btn-grad min-h-[52px] rounded-full px-6 font-semibold text-white">Send for a free AI audit →</button>
      <p className="text-[13px] leading-relaxed text-mute">Opens WhatsApp in a new tab with your answers. You choose whether to send the message. See our <Link href="/privacy" className="underline underline-offset-4">Privacy Policy</Link>.</p>
      <a href={WA('Hi Reverbex, I want a free AI audit. I am contacting you from the website enquiry form.')} target="_blank" rel="noopener" className="text-sm text-icelt underline underline-offset-4">Form not working? Continue directly on WhatsApp ↗</a>
    </form>
  );
}
export { Link };
