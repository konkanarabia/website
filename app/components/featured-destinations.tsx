import { getDestinations } from "@/app/actions/destinations";
import FeaturedDestinationsClient from "./featured-destinations-client";

export default async function FeaturedDestinations() {
  const destinations = await getDestinations();
  
  // Define preferred popular names to prioritize on the homepage
  const preferredIntNames = ['dubai', 'thailand', 'vietnam', 'bali', 'maldives', 'japan'];
  const preferredDomNames = ['goa', 'kerala', 'kash', 'rajasthan', 'konkan', 'lakshadweep'];
  
  // Separate and prioritize preferred international destinations
  const international = destinations
    .filter((d: any) => d.type === 'International' || !d.type)
    .sort((a: any, b: any) => {
      const aIndex = preferredIntNames.findIndex(name => a.name.toLowerCase().includes(name));
      const bIndex = preferredIntNames.findIndex(name => b.name.toLowerCase().includes(name));
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return 0;
    });

  // Separate and prioritize preferred domestic destinations
  const domestic = destinations
    .filter((d: any) => d.type === 'Domestic')
    .sort((a: any, b: any) => {
      const aIndex = preferredDomNames.findIndex(name => a.name.toLowerCase().includes(name));
      const bIndex = preferredDomNames.findIndex(name => b.name.toLowerCase().includes(name));
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return 0;
    });
  
  const featuredInt = international.slice(0, 3);
  const featuredDom = domestic.slice(0, 3);
  
  // Combine them: first 3 international, then remaining 3 domestic
  const featured_destinations = [...featuredInt, ...featuredDom].map((d: any) => ({
    id: String(d.id || d._id),
    name: String(d.name || ''),
    description: String(d.description || ''),
    duration: d.duration ? String(d.duration) : undefined,
    image: String(d.image || '/hero/hero-dubai.webp'),
    type: d.type ? String(d.type) : undefined,
  }));

  return <FeaturedDestinationsClient destinations={featured_destinations} />;
}
