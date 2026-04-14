import { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import Destination from '@/lib/models/Destination';
import Event from '@/lib/models/Event';
import Vehicle from '@/lib/models/Vehicle';
import Hospitality from '@/lib/models/Hospitality';
import Restaurant from '@/lib/models/Restaurant';
import Visa from '@/lib/models/Visa';
import path from 'path';
import { readdir } from 'fs/promises';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://konkanarabiahospitalitygroup.com';

  const now = new Date();

  const appDir = path.join(process.cwd(), 'app');

  const shouldExcludeRouteSegment = (segment: string) =>
    segment === 'admin' ||
    segment === 'api' ||
    segment.startsWith('(') || // route groups
    segment.startsWith('_') || // private conventions
    segment.startsWith('@'); // parallel routes

  const isDynamicSegment = (segment: string) => segment.startsWith('[') && segment.endsWith(']');

  const getStaticRoutesFromAppDir = async (): Promise<string[]> => {
    const routes: string[] = [];

    const walk = async (dirAbs: string, relFromApp: string) => {
      const entries = await readdir(dirAbs, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.name === 'node_modules') continue;
        if (entry.isDirectory()) {
          if (shouldExcludeRouteSegment(entry.name)) continue;
          if (isDynamicSegment(entry.name)) continue; // static-only here
          await walk(path.join(dirAbs, entry.name), path.join(relFromApp, entry.name));
          continue;
        }

        if (!entry.isFile()) continue;
        if (!/^page\.(tsx|ts|jsx|js)$/.test(entry.name)) continue;

        const routePath = relFromApp.split(path.sep).filter(Boolean);
        if (routePath.some((seg) => shouldExcludeRouteSegment(seg) || isDynamicSegment(seg))) continue;

        const route = `/${routePath.join('/')}`.replace(/\/+/g, '/');
        routes.push(route === '/' ? '' : route);
      }
    };

    await walk(appDir, '');
    return Array.from(new Set(routes)).sort((a, b) => a.localeCompare(b));
  };

  const staticRoutes = await getStaticRoutesFromAppDir();

  const urlEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  await dbConnect();
  const [
    destinations,
    events,
    vehicles,
    hospitality,
    restaurants,
    visas,
  ] = await Promise.all([
    Destination.find().select('id').lean(),
    Event.find().select('id').lean(),
    Vehicle.find().select('id').lean(),
    Hospitality.find().select('id').lean(),
    Restaurant.find().select('id').lean(),
    Visa.find().select('id').lean(),
  ]);

  const destinationRoutes = destinations.map((d: any) => ({
    url: `${baseUrl}/destinations/${d.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const eventRoutes = events.map((e: any) => ({
    url: `${baseUrl}/events/${e.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const vehicleRoutes = vehicles.map((v: any) => ({
    url: `${baseUrl}/vehicles/${v.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const hospitalityRoutes = hospitality.map((h: any) => ({
    url: `${baseUrl}/hospitality/${h.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const restaurantRoutes = restaurants.map((r: any) => ({
    url: `${baseUrl}/restaurants/${r.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const visaRoutes = visas.map((v: any) => ({
    url: `${baseUrl}/visas/${v.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...urlEntries,
    ...destinationRoutes,
    ...eventRoutes,
    ...vehicleRoutes,
    ...hospitalityRoutes,
    ...restaurantRoutes,
    ...visaRoutes,
  ];
}
