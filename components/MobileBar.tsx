import { WA, AUDIT_MESSAGE } from '@/lib/site';

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a9 9 0 0 1-13.3 7.9L3 21l1.5-4.6A9 9 0 1 1 21 11.5Z" /><path d="M8 7.5c-.5.5-.5 2 .6 3.8s2.6 3.3 4.4 4c1.2.4 2.5-.2 2.7-1l-2.3-1.4-.9 1c-1.4-.6-2.5-1.7-3.1-3.1l.8-1L9 7.5Z" /></svg>;
}
export function MobileBar() {
  return (
    <>
    <div className="fixed inset-x-3 bottom-[max(.75rem,env(safe-area-inset-bottom))] z-40 grid grid-cols-2 gap-2 rounded-2xl bg-midnight/95 p-2 shadow-[0_10px_40px_-10px_rgb(0_0_0/.6)] ring-1 ring-cobalt/30 md:hidden">
      <a href={WA()} target="_blank" rel="noopener" className="flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-cobaltlt/40 bg-navy font-semibold text-ivory"><WhatsAppIcon />WhatsApp</a>
      <a href={WA(AUDIT_MESSAGE)} target="_blank" rel="noopener" className="grid min-h-[48px] place-items-center btn-grad rounded-lg font-semibold text-white">Free AI audit</a>
    </div>
    <a href={WA()} target="_blank" rel="noopener" title="Chat on WhatsApp" aria-label="Chat with Reverbex Technology on WhatsApp (opens in a new tab)" className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full border border-cobaltlt/50 bg-navy text-glowlt shadow-[0_8px_32px_rgb(47_107_255/.25)] transition-colors hover:bg-cobaltdk hover:text-ivory md:flex"><WhatsAppIcon /></a>
    </>
  );
}
