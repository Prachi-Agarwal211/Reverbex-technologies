import { MetadataRoute } from 'next';
import { servicesData } from '../lib/servicesData';
import { caseStudiesData } from '../lib/caseStudiesData';
import { industriesData } from '../lib/industriesData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://reverbex.in';

  // Base routes
  const routes = [
    '',
    '/about',
    '/pricing',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/services',
    '/work',
    '/industries'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic Service routes
  const serviceRoutes = Object.keys(servicesData).map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Dynamic Case Study routes
  const caseStudyRoutes = Object.keys(caseStudiesData).map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic Industry routes
  const industryRoutes = Object.keys(industriesData).map((slug) => ({
    url: `${baseUrl}/industries/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...serviceRoutes, ...caseStudyRoutes, ...industryRoutes];
}
