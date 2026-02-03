"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, Hotel, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "hospitality",
    title: "Hospitality",
    name: "01) Siddhivinayak Devbag Beach Resort",
    description: "Beach Side Family Holiday Stay, AC & Non Ac Rooms, Water Sports, Scuba, & Event place",
    image: "/services/siddhivinayak-resort.png",
    icon: <Hotel className="w-6 h-6" />,
    features: ["Beach Side Stay", "AC & Non-Ac Rooms", "Water Sports", "Scuba Diving", "Event Space"],
    link: "/enquiry/hospitality?service=hospitality"
  },
  {
    id: "food-beverages",
    title: "Food & Beverages",
    name: "02) Konkan Swad - The Test Of Konkan",
    description: "Authentic Malvani & Goan Sea Food Restaurant",
    image: "/services/konkan-swad.png",
    icon: <Utensils className="w-6 h-6" />,
    features: ["Authentic Malvani", "Goan Sea Food", "Fresh Catch", "Traditional Recipes", "Premium Dining"],
    link: "/enquiry/hospitality?service=food-beverages"
  }
];

export default function SpecializedServices() {
  return (
    <section id="hospitality-dining" className="py-24 bg-slate-50 overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <span className="text-[#0066a1] font-bold tracking-widest uppercase text-sm mb-4 animate-fade-in">
            Our Extensions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-center tracking-tight">
            Hospitality, <span className="text-[#0066a1]">Food & Beverages</span>
          </h2>
          <div className="h-1.5 bg-[#0066a1] rounded-full w-24"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`transition-all duration-700 delay-${index * 200} scroll-mt-24`}
            >
              <Card className="group h-full overflow-hidden border-none shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 bg-white rounded-3xl">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                  <div className="absolute top-6 left-6 p-3 bg-white/90 backdrop-blur-sm rounded-2xl text-[#0066a1] shadow-lg transform transition-transform duration-500 group-hover:rotate-12">
                    {service.icon}
                  </div>
                  <div className="absolute bottom-6 left-8 right-8">
                    <h4 className="text-white/80 font-medium text-sm mb-1 uppercase tracking-wider">{service.title}</h4>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{service.name}</h3>
                  </div>
                </div>
                <CardContent className="p-8">
                  <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.features.map((feature, i) => (
                      <span 
                        key={i} 
                        className="text-xs font-semibold px-4 py-2 bg-slate-100 text-slate-600 rounded-full group-hover:bg-[#0066a1]/10 group-hover:text-[#0066a1] transition-colors duration-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Link href={service.link} className="inline-block w-full">
                    <Button className="w-full bg-[#0066a1] hover:bg-[#00558a] text-white py-6 rounded-2xl text-lg font-bold group/btn flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-blue-900/20">
                      Enquire Now
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
