import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Calendar } from "lucide-react";
import { getDestinations } from "@/app/actions/destinations";
import TranslatedText from "@/components/TranslatedText";


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
  const featured_destinations = [...featuredInt, ...featuredDom];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          <TranslatedText text="Explore Popular Destinations" />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured_destinations.map((dest: any) => {
            const optImage = dest.image?.includes("/upload/") 
                ? dest.image.replace("/upload/", "/upload/q_auto,f_auto,w_800/") 
                : dest.image;

            return (
            <Card key={dest.id} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-xl bg-white">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={optImage}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  <TranslatedText text={dest.name} />
                </h3>
                <p className="text-sm text-slate-400 font-medium mb-4 line-clamp-2">
                  <TranslatedText text={dest.description} />
                </p>
                <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-slate-500 bg-slate-50 w-fit px-2 py-1 rounded">
                   <Calendar className="w-3 h-3" /> <TranslatedText text={dest.duration} />
                </div>
                <Link href={`/destinations/${dest.id}`} passHref>
                  <Button className="bg-[#0066a1] hover:bg-[#00558a] text-white px-5 py-4 text-sm font-bold rounded-lg transition-all h-auto">
                    <TranslatedText text="Explore" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )})}
        </div>
      </div>
    </section>

  );
}
