import { pageMetadata } from '@/lib/seo';
import { PageHead } from '@/components/PageHead';
import { CaseStack } from '@/components/CaseStack';
export const metadata = pageMetadata('Client Projects & Case Studies', 'Real Reverbex Technology client results: 500+ leads for MAAC Animation Jaipur, ₹4L+ first-month revenue for Aarya Clothing, 200% more B2B inquiries for Khemji Wire.', '/work');
export default function Work() {
  return (<>
    <PageHead name="Work" path="/work" crumb="Case studies" title={<>Numbers we can point to.</>} intro="Education, D2C fashion, industrial B2B, statutory licensing and security services, live systems, not mockups." />
    <section aria-label="Selected case studies" className="py-12 md:py-20"><div className="mx-auto max-w-6xl px-5"><div data-reveal className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-paper/10 pb-6"><h2 className="font-display text-2xl font-semibold tracking-[-0.04em]">Selected work</h2><p className="max-w-[40ch] text-sm leading-relaxed text-mute">Explore the systems, integrations and outcomes behind each project.</p></div><CaseStack /></div></section>
  </>);
}
