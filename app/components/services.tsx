"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Calendar } from "lucide-react";
import { destinations } from "@/lib/destinations-data";

// International: Dubai (3), Vietnam (2), Thailand (3), Sri Lanka (2), Bali (2), Cambodia, Japan, Maldives, Mauritius, Kazakhstan, Georgia, Budapest
const international_ids = [11, 22, 23, 15, 31, 12, 32, 33, 13, 34, 40, 41, 42, 43, 44, 45, 46, 47, 48];
const international_destinations = destinations.filter(d => international_ids.includes(d.id));

// Domestic: Kashmir (2), Himachal, Golden Triangle, Rajasthan, Kerala (2), Konkan, Goa, Mysore+Bengaluru, Ooty, Kanyakumari, Mysore, Bangalore, Lakshadweep, NorthEast, Dehradun-Mussoorie-Nainital, Kulu-Leh (2), MP
const domestic_ids = [1, 35, 2, 3, 9, 6, 36, 5, 4, 37, 21, 10, 7, 8, 50, 51, 52, 53, 54, 55];
const domestic_destinations = destinations.filter(d => domestic_ids.includes(d.id));


export default function OurServices() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center tracking-tight">
            Domestic <span className="text-[#0066a1]">Destinations</span>
          </h2>
          <div className="w-24 h-1.5 bg-[#0066a1] rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domestic_destinations.map((dest) => (
            <Card key={dest.id} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-xl bg-slate-50">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{dest.name}</h3>
                <p className="text-sm text-slate-400 font-medium mb-4">{dest.description}</p>
                <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-slate-500 bg-slate-100 w-fit px-2 py-1 rounded">
                   <Calendar className="w-3 h-3" /> {dest.duration}
                </div>
                <Link href={`/destinations/${dest.id}`} passHref>
                  <Button className="bg-[#0066a1] hover:bg-[#00558a] text-white px-5 py-4 text-sm font-bold rounded-lg transition-all h-auto">
                    Explore
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-24">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center tracking-tight">
            International <span className="text-[#0066a1]">Destinations</span>
          </h2>
          <div className="w-24 h-1.5 bg-[#0066a1] rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {international_destinations.map((dest) => (
            <Card key={dest.id} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-xl bg-slate-50">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{dest.name}</h3>
                <p className="text-sm text-slate-400 font-medium mb-4">{dest.description}</p>
                <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-slate-500 bg-slate-100 w-fit px-2 py-1 rounded">
                   <Calendar className="w-3 h-3" /> {dest.duration}
                </div>
                <Link href={`/destinations/${dest.id}`} passHref>
                  <Button className="bg-[#0066a1] hover:bg-[#00558a] text-white px-5 py-4 text-sm font-bold rounded-lg transition-all h-auto">
                    Explore
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>


  );
}
