import type { Metadata } from 'next';
import { BRAND, SITE } from './site';

export const OG_IMAGE = { url: `${SITE}/og-default.png`, width: 1200, height: 630, alt: 'Reverbex Technology — AI systems studio in Jaipur, India' };

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${SITE}${path === '/' ? '' : path}`;
  const socialTitle = `${title} | ${BRAND}`;
  return {
    title, description, alternates: { canonical: url },
    openGraph: { title: socialTitle, description, url, type: 'website', siteName: BRAND, locale: 'en_IN', images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title: socialTitle, description, images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }] },
  };
}
