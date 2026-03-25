import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://konkanarabiahospitalitygroup.com'

  // List of all static routes in the application
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/destinations',
    '/enquiry',
    '/events',
    '/hotels',
    '/partners',
    '/services'
  ]

  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))

  // NOTE: If you fetch dynamic destinations or hotels from a CMS or Database in the future,
  // you can fetch those here and push them into the sitemap array.
  // Example for dynamic routes:
  // const dynamicDestinations = await getDestinations();
  // const destRoutes = dynamicDestinations.map((dest) => ({
  //   url: `${baseUrl}/destinations/${dest.slug}`,
  //   lastModified: new Date(dest.updatedAt),
  //   changeFrequency: 'weekly',
  //   priority: 0.9,
  // }));
  // return [...routes, ...destRoutes];

  return routes
}
