import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
export default function robots(): MetadataRoute.Robots {
  const disallow = ['/api/', '/admin/'];
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      { userAgent: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'], allow: '/', disallow },
    ],
    sitemap: `${SITE}/sitemap.xml`, host: SITE,
  };
}
