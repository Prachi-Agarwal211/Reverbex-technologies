import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { WhatsAppButton } from '@/components/ui';

export const metadata = {
  ...pageMetadata('Page not found', 'Find your next step with Reverbex Technology: explore our AI systems, pricing and work, or discuss your project.', '/'),
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <section className="page-head px-6 pb-24 pt-40 md:pb-32 md:pt-48">
    <div className="mx-auto max-w-4xl">
      <p className="mono-label text-icelt">404 / Page not found</p>
      <h1 className="mt-6 font-display text-[clamp(2.3rem,6vw,4.5rem)] font-semibold leading-tight tracking-[-.05em]">Find your next step.</h1>
      <p className="mt-6 max-w-xl leading-relaxed text-mute">This address does not lead to a page. Explore our services, see how we work, or tell us about the system you need.</p>
      <nav aria-label="Find a page" className="mt-8 flex flex-wrap gap-5 text-icelt underline underline-offset-4"><Link href="/">Home</Link><Link href="/services">Services</Link><Link href="/work">Our work</Link><Link href="/pricing">Pricing</Link><Link href="/contact">Contact</Link></nav>
      <div className="mt-10"><WhatsAppButton text="Hi Reverbex, I reached a missing page on your website and would like help with a project." label="Talk to Reverbex" /></div>
    </div>
  </section>;
}
