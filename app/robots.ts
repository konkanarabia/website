import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/thank-you'],
    },
    sitemap: 'https://konkanarabiahospitalitygroup.com/sitemap.xml',
    host: 'https://konkanarabiahospitalitygroup.com',
  };
}
