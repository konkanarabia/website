'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Compass, ArrowRight } from "lucide-react";
import TranslatedText from "@/components/TranslatedText";
import { fadeUp, inView, spring, stagger } from "@/lib/motion";

interface DestinationItem {
  id: string;
  name: string;
  description: string;
  duration?: string;
  image: string;
  type?: string;
}

export default function FeaturedDestinationsClient({
  destinations,
}: {
  destinations: DestinationItem[];
}) {
  return (
    <section className="py-20 lg:py-24 bg-slate-50/70 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-bold uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <TranslatedText text="Handpicked Holidays" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 tracking-tight leading-tight mb-4">
            <TranslatedText text='Explore Popular <span className="text-amber-600">Destinations</span>' isHtml />
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-sans">
            <TranslatedText text="Immerse yourself in handpicked luxury packages spanning Dubai, Goa, Kerala backwaters, and royal Rajasthan." />
          </p>
        </div>

        <motion.div
          variants={stagger(0.08, 0.1)}
          {...inView}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {destinations.map((dest) => {
            const optImage = dest.image?.includes("/upload/")
              ? dest.image.replace("/upload/", "/upload/q_auto,f_auto,w_800/")
              : dest.image;

            return (
              <motion.div
                key={dest.id}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={spring}
              >
                <Card className="group h-full flex flex-col overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-lift transition-all duration-300 rounded-3xl bg-white">
                  <div className="relative h-56 sm:h-60 overflow-hidden">
                    <Image
                      src={optImage}
                      alt={dest.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {dest.type && (
                      <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-white/90 text-slate-900 backdrop-blur-sm shadow-sm">
                        {dest.type}
                      </span>
                    )}
                  </div>

                  <CardContent className="p-6 flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                        <TranslatedText text={dest.name} />
                      </h3>

                      <p className="text-sm text-slate-500 font-medium mb-4 line-clamp-2 leading-relaxed">
                        <TranslatedText text={dest.description} />
                      </p>
                    </div>

                    <div>
                      {dest.duration && (
                        <div className="flex items-center gap-2 mb-5 text-xs font-semibold text-slate-600 bg-slate-100/90 w-fit px-3 py-1.5 rounded-xl border border-slate-200/60">
                          <Calendar className="w-3.5 h-3.5 text-amber-600" />
                          <TranslatedText text={dest.duration} />
                        </div>
                      )}

                      <Link href={`/destinations/${dest.id}`} passHref className="block">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={spring}
                        >
                          <Button className="w-full bg-[#0066a1] hover:bg-[#00558a] text-white py-5 text-sm font-bold rounded-xl transition-all shadow-md group/btn flex items-center justify-center gap-2 cursor-pointer">
                            <span><TranslatedText text="Explore Destination" /></span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                          </Button>
                        </motion.div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
