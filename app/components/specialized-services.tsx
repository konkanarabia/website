import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, Hotel, ArrowRight } from "lucide-react";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Hospitality from "@/lib/models/Hospitality";
import Restaurant from "@/lib/models/Restaurant";

export default async function SpecializedServices() {
  await dbConnect();
  
  // Fetch up to 1 item from each category for the spotlight section
  const [stay] = await Hospitality.find().limit(1).lean();
  const [food] = await Restaurant.find().limit(1).lean();

  const services = [];
  if (stay) {
    services.push({
      ...stay,
      type: 'hospitality',
      title: 'Hospitality / Hotels',
      icon: <Hotel className="w-6 h-6" />,
      link: `/hospitality/${stay.id}`
    });
  }
  if (food) {
    services.push({
      ...food,
      type: 'restaurants',
      title: 'Food & Beverages',
      icon: <Utensils className="w-6 h-6" />,
      link: `/restaurants/${food.id}`
    });
  }

  return (
    <section id="hospitality-dining" className="py-24 bg-slate-50 overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-[#0066a1]/30"></div>
            <span className="text-[#0066a1] font-bold tracking-[0.3em] uppercase text-xs sm:text-sm animate-fade-in font-sans">
              Our Extensions
            </span>
            <div className="h-[1px] w-8 bg-[#0066a1]/30"></div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-serif font-black text-slate-900 mb-8 tracking-tight leading-tight">
            Hospitality, <span className="text-[#0066a1]">Food & Beverages</span>
          </h2>

          <div className="w-full max-w-lg relative group">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#0066a1]/20 to-transparent"></div>
            <div className="relative inline-block px-12 py-6 bg-white shadow-xl shadow-blue-900/5 rounded-3xl border border-slate-100">
               <div className="text-[10px] sm:text-xs font-bold text-[#0066a1] uppercase tracking-[0.2em] mb-3 opacity-80 font-sans">
                Our Managed Units
              </div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-slate-800 tracking-tight leading-relaxed">
                Hospitality/Hotels, <br className="sm:hidden" /> Food & Beverages / Restaurants
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {services.map((service: any, index) => (
            <div
              key={`${service.type}-${service.id}`}
              className={`transition-all duration-700 scroll-mt-24`}
            >
              <Card className="group h-full overflow-hidden border-none shadow-2xl hover:shadow-blue-900/15 transition-all duration-500 bg-white rounded-3xl">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={service.image || '/placeholder.svg'}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                  <div className="absolute top-6 left-6 p-3 bg-white/95 backdrop-blur-sm rounded-2xl text-[#0066a1] shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    {service.icon}
                  </div>
                  <div className="absolute bottom-6 left-8 right-8">
                    <h4 className="text-white/90 font-bold text-xs mb-2 uppercase tracking-[0.15em]">{service.title}</h4>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">{service.name}</h3>
                  </div>
                </div>
                <CardContent className="p-8">
                  <p className="text-slate-600 mb-8 leading-relaxed text-lg font-medium">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.features?.map((feature: string, i: number) => (
                      <span 
                        key={i} 
                        className="text-[11px] font-bold px-4 py-2 bg-slate-50 text-slate-500 rounded-xl group-hover:bg-[#0066a1] group-hover:text-white transition-all duration-300 border border-slate-100 uppercase tracking-wider"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Link href={service.link} className="inline-block w-full">
                    <Button className="w-full bg-[#0066a1] hover:bg-[#00558a] text-white py-6 rounded-2xl text-lg font-bold group/btn flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-blue-900/20 active:scale-[0.98]">
                      View Details
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
