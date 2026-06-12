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
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">{title} <span className="text-blue-600">Escapes</span></h2>
          <p className="text-slate-500 mt-2 font-medium">{subtitle}</p>
        </div>
        <div className="text-sm font-bold text-slate-400 bg-slate-50 px-4 py-2 rounded-full">
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
              <Card key={dest.id} className="group overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-3xl bg-white relative">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={optImage || '/placeholder.jpg'}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                     <div className="flex items-center gap-2 text-white/90 text-[10px] font-bold uppercase tracking-widest mb-1">
                        <Calendar className="w-3 h-3" /> {dest.duration}
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
                      <Button className="bg-slate-900 hover:bg-blue-600 text-white px-6 py-6 rounded-2xl transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 font-bold group/btn">
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
        "Domestic", 
        "Explore the incredible beauty of Incredible India, from heritage sites to coastal retreats.",
        <Pin className="w-3 h-3" />, 
        domestic, 
        "text-emerald-600 bg-emerald-600"
      )}
      
      {renderSection(
        "International", 
        "Luxury global travel experiences curated for the discerning traveler.",
        <Globe className="w-3 h-3" />, 
        international, 
        "text-blue-600 bg-blue-600"
      )}
    </div>
  );
}
