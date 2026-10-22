import { NextResponse } from 'next/server';
import { WA } from '@/lib/site';
// Progressive enhancement: no browser JavaScript required. Never log enquiry contents.
export async function POST(req: Request) {
  let f: FormData;
  const fallback = () => NextResponse.redirect(WA('Hi Reverbex, I want a free AI audit. I need help completing the website enquiry form.'), 303);
  try { f = await req.formData(); } catch { return fallback(); }
  const g = (k: string, max: number) => typeof f.get(k) === 'string' ? String(f.get(k)).trim().slice(0, max) : '';
  const lead = { name: g('name', 100), phone: g('phone', 16), business: g('business', 200), pain: g('pain', 1000), at: new Date().toISOString() };
  if (!lead.name || !/^[0-9+ ]{8,16}$/.test(lead.phone)) return fallback();
  const hook = process.env.AUDIT_WEBHOOK_URL;
  if (hook) {
    try {
      const response = await fetch(hook, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(lead), signal: AbortSignal.timeout(2500) });
      if (!response.ok) console.error('[audit-webhook] Enquiry forwarding failed; WhatsApp remains available.');
    } catch { console.error('[audit-webhook] Enquiry forwarding unavailable; WhatsApp remains available.'); }
  }
  const text = `Hi Reverbex, I'd like a free AI audit.\nName: ${lead.name}\nPhone: ${lead.phone}\nBusiness: ${lead.business}\nPain: ${lead.pain}`;
  return NextResponse.redirect(WA(text), 303);
}
