import { pageMetadata } from '@/lib/seo';
import { PageHead } from '@/components/PageHead';
import { PricingTable, FAQ } from '@/components/ui';
import { plans } from '@/lib/site';

export const metadata = pageMetadata('Monthly Plans & Pricing in India', 'Transparent monthly plans: ₹15,000, ₹30,000 and ₹70,000 per month for AI agents, MCP servers, automations, websites, Android/iOS apps and CRMs.', '/pricing');

const rows: [string, boolean | string, boolean | string, boolean | string][] = [
  ['Custom Next.js website / web app', true, true, true],
  ['AI automation (n8n) / RAG chatbot', '1', true, true],
  ['WhatsApp lead capture', true, true, true],
  ['WhatsApp commerce + WhatsApp AI agent', false, true, true],
  ['Android app (Flutter)', false, true, true],
  ['iOS app (Flutter)', false, false, true],
  ['Custom CRM', false, false, true],
  ['Financial dashboards', false, false, true],
  ['AI agents + custom MCP servers', false, false, true],
];
const cell = (v: boolean | string) => v === true ? <><span aria-hidden className="text-cobaltlt">●</span><span className="sr-only">Included</span></> : v === false ? <><span aria-hidden className="text-paper/40">—</span><span className="sr-only">Not included</span></> : v;

export default function Pricing() {
  return (
    <>
      <PageHead name="Pricing" path="/pricing" crumb="Pricing" title={<>₹15k, ₹30k or ₹70k a month. That&apos;s it.</>} intro="Monthly plans that include building, running and improving your systems. Bigger custom builds are quoted after a free audit." />
      <section aria-labelledby="monthly-plans-h" className="mx-auto max-w-6xl px-5 py-12 md:py-16"><h2 id="monthly-plans-h" className="sr-only">Monthly plans</h2><PricingTable /></section>
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <h2 data-reveal className="mb-6 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-bold tracking-[-0.05em]">Compare plans</h2>
        <div className="rounded-3xl border border-paper/15 bg-paper/[0.02]">
          <table className="w-full table-fixed text-left text-xs leading-relaxed sm:text-sm">
            <caption className="sr-only">Features included in each monthly plan. Prices in Indian rupees.</caption>
            <colgroup><col className="w-[43%] sm:w-[46%]" />{plans.map((p) => <col key={p.id} />)}</colgroup>
            <thead className="text-paper"><tr><th scope="col" className="px-3 py-5 sm:p-5">Included</th>{plans.map((p) => <th scope="col" key={p.id} className="px-1 py-5 text-center sm:p-5">{p.name}<br /><span className="font-normal text-paper/60"><span className="sm:hidden">₹{p.price / 1000}k</span><span className="hidden sm:inline">₹{p.price.toLocaleString('en-IN')}</span><span className="hidden lg:inline">/mo</span></span></th>)}</tr></thead>
            <tbody>{rows.map(([l, ...v]) => <tr key={l} className="border-t border-paper/10"><th scope="row" className="break-words px-3 py-4 font-normal sm:p-5">{l}</th>{v.map((x, i) => <td key={i} className="px-1 py-4 text-center sm:p-5">{cell(x)}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-paper/60">Prices in INR per month. Scope, taxes, any setup costs and commitment are agreed in your proposal before work begins.</p>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-20"><h2 data-reveal className="mb-6 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-bold tracking-[-0.05em]">Questions before we start</h2><FAQ /></section>
    </>
  );
}
