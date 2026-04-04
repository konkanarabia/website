import { MetadataRoute } from 'next';
import { destinations } from '@/lib/destinations-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://konkanarabiahospitalitygroup.com';

  // Base static routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/enquiry',
    '/destinations',
    '/services',
    '/partners',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic destination routes from data
  const destinationRoutes = destinations.map((destination) => ({
    url: `${baseUrl}/destinations/${destination.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic service routes (hardcoded IDs based on services page)
  const serviceRoutes = [1, 2, 3, 4, 5].map((id) => ({
    url: `${baseUrl}/services/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...destinationRoutes, ...serviceRoutes];
}
