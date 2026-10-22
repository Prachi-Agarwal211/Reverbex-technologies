import type { MetadataRoute } from 'next';
import { SITE, cases } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date('2026-10-22');
  return [
    { url: SITE, lastModified: updated, priority: 1 },
    ...['/services', '/pricing', '/work', '/about', '/contact', '/privacy', '/terms'].map((p) => ({ url: `${SITE}${p}`, lastModified: updated, priority: 0.8 })),
    ...cases.map((c) => ({ url: `${SITE}/work/${c.slug}`, lastModified: updated, priority: 0.7 })),
  ];
}
