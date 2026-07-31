import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { getDestinations } from "@/app/actions/destinations";

export default async function OurServices() {
  const allDestinations = await getDestinations();

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center tracking-tight font-serif">
            Our <span className="text-amber-600">Destinations</span>
          </h2>
          <div className="w-24 h-1.5 bg-amber-500 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allDestinations.map((dest: any) => {
            const optImage = dest.image?.includes("/upload/") 
                ? dest.image.replace("/upload/", "/upload/q_auto,f_auto,w_800/") 
                : dest.image;
            
            return(
            <Card key={dest.id} className="group overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 rounded-xl bg-slate-50">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={optImage}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-bold text-slate-900 mb-1 font-serif">{dest.name}</h3>
                <p className="text-sm text-slate-500 font-medium mb-4 line-clamp-2">{dest.description}</p>
                <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-slate-600 bg-slate-200/60 w-fit px-2.5 py-1 rounded-md">
                   <Calendar className="w-3.5 h-3.5 text-amber-600" /> {dest.duration}
                </div>
                <Link href={`/destinations/${dest.id}`} passHref>
                  <Button className="bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 px-5 py-4 text-sm font-bold rounded-lg transition-all h-auto">
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
