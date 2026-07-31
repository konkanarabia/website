import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Globe, Pin, Sparkles } from "lucide-react";
import { getDestinations } from "@/app/actions/destinations";
import { Price } from "@/components/ui/price";
import TranslatedText from "@/components/TranslatedText";

export default async function DestinationList() {
  const allDestinations = await getDestinations();
  
  // Deduplicate by name if multiple entries exist in DB
  const uniqueMap = new Map();
  allDestinations.forEach((d: any) => {
    if (!uniqueMap.has(d.name)) {
      uniqueMap.set(d.name, d);
    }
  });
  const destinations = Array.from(uniqueMap.values());
  
  const domestic = destinations.filter((dest: any) => dest.type === 'Domestic');
  const international = destinations.filter((dest: any) => dest.type === 'International' || !dest.type);

  const renderSection = (title: string, subtitle: string, icon: React.ReactNode, items: any[], accentColor: string) => (
    <div className="mb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-slate-100 pb-8">
        <div>
          <div className={`inline-flex items-center gap-2 px-3 py-1 ${accentColor} bg-opacity-10 rounded-full text-xs font-bold uppercase tracking-wider mb-4`}>
            {icon}
            {title}
          </div>
          <h2 className="text-4xl font-serif font-black text-slate-900 tracking-tight">{title} <span className="text-amber-600">Escapes</span></h2>
          <p className="text-slate-500 mt-2 font-medium">{subtitle}</p>
        </div>
        <div className="text-sm font-bold text-slate-600 bg-amber-50 px-4 py-2 rounded-full border border-amber-200/60">
            {items.length} Packages Available
        </div>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((dest: any) => {
            const optImage = dest.image?.includes("/upload/") 
                ? dest.image.replace("/upload/", "/upload/q_auto,f_auto,w_800/") 
                : dest.image;

            return (
              <Card key={dest.id} className="group overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 rounded-3xl bg-white relative">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={optImage || '/placeholder.jpg'}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                     <div className="flex items-center gap-2 text-white/90 text-[10px] font-bold uppercase tracking-widest mb-1">
                        <Calendar className="w-3 h-3 text-amber-400" /> {dest.duration}
                     </div>
                     <h3 className="text-xl font-bold text-white drop-shadow-md"><TranslatedText text={dest.name} /></h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-2 font-medium"><TranslatedText text={dest.description} /></p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Starting from</span>
                        {dest.priceMin ? (
                          <Price
                            amount={dest.priceMin}
                            sourceCurrency="INR"
                            showConversion={true}
                            className="text-lg font-black text-slate-900"
                          />
                        ) : (
                          <span className="text-lg font-black text-slate-900">Call for Price</span>
                        )}
                    </div>
                    <Link href={`/destinations/${dest.id}`} passHref>
                      <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 px-6 py-6 rounded-2xl transition-all shadow-md flex items-center gap-2 font-bold group/btn">
                        Details
                        <Sparkles className="w-4 h-4 transition-transform group-hover/btn:rotate-12" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
           <p className="text-slate-400 font-bold italic">New Curated Packages Coming Soon...</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      {renderSection(
        "International", 
        "Luxury global travel experiences curated for the discerning traveler.",
        <Globe className="w-3 h-3" />, 
        international, 
        "text-blue-600 bg-blue-600"
      )}

      {renderSection(
        "Domestic", 
        "Explore the incredible beauty of Incredible India, from heritage sites to coastal retreats.",
        <Pin className="w-3 h-3" />, 
        domestic, 
        "text-emerald-600 bg-emerald-600"
      )}
    </div>
  );
}
