'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Utensils, Hotel, Store } from "lucide-react";
import TranslatedText from "@/components/TranslatedText";
import { imageOrFallback } from '@/lib/images';
import { fadeUp, inView, spring, stagger } from "@/lib/motion";

interface ServiceItem {
  id: string;
  type: string;
  name: string;
  title: string;
  description: string;
  image?: string;
  features?: string[];
  link: string;
}

export default function SpecializedServicesClient({
  services,
}: {
  services: ServiceItem[];
}) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'hospitality':
        return <Hotel className="w-6 h-6" />;
      case 'restaurants':
        return <Utensils className="w-6 h-6" />;
      case 'franchise':
      default:
        return <Store className="w-6 h-6" />;
    }
  };

  return (
    <section id="hospitality-dining" className="py-24 bg-slate-50 overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          variants={fadeUp}
          {...inView}
          className="flex flex-col items-center mb-16 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-amber-500/40" />
            <span className="text-amber-700 font-bold tracking-[0.3em] uppercase text-xs sm:text-sm font-sans">
              <TranslatedText text="Our Extensions" />
            </span>
            <div className="h-[1px] w-8 bg-amber-500/40" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-serif font-black text-slate-900 mb-8 tracking-tight leading-tight">
            <TranslatedText text='Hospitality, <span className="text-amber-600">Food & Beverages</span>' isHtml />
          </h2>

          <div className="w-full max-w-lg relative group">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="relative inline-block px-8 sm:px-12 py-5 sm:py-6 bg-white shadow-soft rounded-3xl border border-slate-100">
               <div className="text-[10px] sm:text-xs font-bold text-amber-700 uppercase tracking-[0.2em] mb-2 opacity-80 font-sans">
                <TranslatedText text="Our Managed Units" />
              </div>
              <div className="text-lg sm:text-2xl font-serif font-bold text-slate-800 tracking-tight leading-relaxed">
                <TranslatedText text='Hospitality/Hotels, <br className="sm:hidden" /> Food & Beverages / Restaurants' isHtml />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={stagger(0.08, 0.1)}
          {...inView}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={`${service.type}-${service.id}`}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={spring}
              className="scroll-mt-24 h-full"
            >
              <Card className="group h-full flex flex-col justify-between overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-lift transition-all duration-300 bg-white rounded-3xl">
                <div>
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={imageOrFallback(service.image)}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-106"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                    
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 4 }}
                      transition={spring}
                      className="absolute top-6 left-6 p-3 bg-white/95 backdrop-blur-sm rounded-2xl text-amber-600 shadow-xl"
                    >
                      {getIcon(service.type)}
                    </motion.div>

                    <div className="absolute bottom-6 left-8 right-8">
                      <h4 className="text-amber-400 font-bold text-xs mb-2 uppercase tracking-[0.15em]">
                        <TranslatedText text={service.title} />
                      </h4>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                        <TranslatedText text={service.name} />
                      </h3>
                    </div>
                  </div>

                  <CardContent className="p-8">
                    <p className="text-slate-600 mb-8 leading-relaxed text-base font-medium">
                      <TranslatedText text={service.description} />
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {service.features?.map((feature, i) => (
                        <span 
                          key={i} 
                          className="text-[11px] font-bold px-3.5 py-1.5 bg-amber-50 text-amber-800 rounded-xl border border-amber-200/80 uppercase tracking-wider shadow-xs"
                        >
                          <TranslatedText text={feature} />
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </div>

                <div className="p-8 pt-0 mt-auto">
                  <Link href={service.link} className="inline-block w-full">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={spring}
                    >
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 py-6 rounded-2xl text-base font-bold group/btn flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer">
                        <TranslatedText text="View Details" />
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
