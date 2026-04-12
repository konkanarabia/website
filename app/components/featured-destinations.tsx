import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Calendar } from "lucide-react";
import { getDestinations } from "@/app/actions/destinations";

export default async function FeaturedDestinations() {
  const destinations = await getDestinations();
  const featured_destinations = destinations.slice(0, 6);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explore Popular Destinations
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
                <h3 className="text-xl font-bold text-slate-900 mb-1">{dest.name}</h3>
                <p className="text-sm text-slate-400 font-medium mb-4 line-clamp-2">{dest.description}</p>
                <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-slate-500 bg-slate-50 w-fit px-2 py-1 rounded">
                   <Calendar className="w-3 h-3" /> {dest.duration}
                </div>
                <Link href={`/destinations/${dest.id}`} passHref>
                  <Button className="bg-[#0066a1] hover:bg-[#00558a] text-white px-5 py-4 text-sm font-bold rounded-lg transition-all h-auto">
                    Explore
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
