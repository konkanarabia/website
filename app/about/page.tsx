import type { Metadata } from 'next';
import Image from "next/image";
import { Card } from "@/components/ui/card";
import CertificateShowcase from "../components/certificate-showcase";
import { Globe, Heart, Anchor, Utensils, Hotel, Compass, Quote, Award } from "lucide-react";

export const metadata: Metadata = {
  title: 'About Us | Connecting Konkan with Arabian Hospitality',
  description: 'Learn about the story of KonkanArabia. We bridge the unique cultures of Indias Konkan coast and the visionary hospitality of Dubai to create exceptional travel experiences.',
  keywords: 'KonkanArabia story, about us, Konkan hospitality, Dubai travel management, cultural bridge',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Refined About Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-60">
          <Image
            src="/hero/hero-2.jpg"
            alt="About KonkanArabia"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 tracking-tight">
            Our Story
          </h1>
          <p className="text-xl text-slate-200 font-serif italic max-w-2xl mx-auto drop-shadow-sm">
            "A journey between two unique regions, connecting nations through hospitality."
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-24 lg:px-20">
        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#0066a1]/5 rounded-[3rem] -z-10 transition-transform group-hover:scale-105 duration-700"></div>
            <div className="relative h-[400px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image 
                src="/logo/KonkanArabia-logo.png" 
                alt="KonkanArabia Logo" 
                fill
                className="object-contain bg-white p-12 transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#0066a1] rounded-2xl -z-20"></div>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
                Connecting Cultures <br/>
                <span className="text-[#0066a1]">Through Hospitality</span>
              </h2>
              <div className="w-24 h-1 bg-[#0066a1] rounded-full"></div>
            </div>
            
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
              <p className="text-slate-900 font-medium text-xl font-serif">
                KonkanArabia Hospitality & Holiday Mgmt. Pvt. Ltd. was born from a simple yet powerful idea: to bridge two unique worlds.
              </p>
              
              <div className="grid gap-8 pt-4">
                <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0066a1]/10 flex items-center justify-center text-[#0066a1]">
                        <Anchor className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-xl mb-2 font-serif">The Konkan Essence</h4>
                        <p className="text-slate-600">
                            India’s untouched coastline—rich with coconut groves, turquoise waters, Malvani spices, 
                            and a tradition of heartfelt warmth.
                        </p>
                    </div>
                </div>
                
                <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0066a1]/10 flex items-center justify-center text-[#0066a1]">
                        <Globe className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-xl mb-2 font-serif">The Arabian Spirit</h4>
                        <p className="text-slate-600">
                            The visionary ambition of Dubai and the UAE—known for refined luxury, 
                            world-class service, and the royal art of welcoming the world.
                        </p>
                    </div>
                </div>
              </div>

              <p className="pt-6 border-t border-slate-100 italic">
                Beyond service, we offer a responsibility. We bring the authenticity of Konkan together 
                with the global mindset of Dubai to create something truly exceptional.
              </p>
            </div>
          </div>
        </div>

        {/* Philosophy - Premium Dark Theme */}
        <section className="bg-slate-950 rounded-[4rem] px-8 py-20 md:p-24 mb-32 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0066a1]/5 blur-[120px] -z-0"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-[#0066a1]/10 blur-[100px] -z-0"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col items-center text-center mb-20">
              <Quote className="w-12 h-12 text-[#0066a1] mb-6 opacity-50" />
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 uppercase tracking-wider">Our Values</h2>
              <div className="max-w-4xl mx-auto mb-12 border-y border-white/10 py-10 px-6">
                <p className="text-slate-200 text-lg md:text-2xl font-serif italic leading-relaxed mb-6">
                  "A Guest is the most important visitor on our premises. He is not dependent on us. We are dependent on him. 
                  He is not an interruption in our work. He is the purpose of it. He is not an outsider in our business. 
                  He is part of it. We are not doing him a favor by serving him. He is doing us a favor by giving us an opportunity to do so."
                </p>
                <p className="text-[#0066a1] font-bold text-xl uppercase tracking-widest font-serif">
                  — Thoughts of Mahatma Gandhi
                </p>
              </div>
              <p className="text-slate-400 text-xl md:text-2xl font-serif italic max-w-3xl">
                "Hospitality is not a service—it is a responsibility."
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <div className="group">
                <div className="mb-6 inline-block px-4 py-1 rounded bg-[#0066a1]/20 text-[#0066a1] text-sm font-bold tracking-widest uppercase">
                  Indian Heritage
                </div>
                <h3 className="text-3xl font-serif font-bold mb-6 group-hover:text-[#0066a1] transition-colors">Atithi Devo Bhava</h3>
                <p className="text-slate-400 leading-relaxed text-xl font-light">
                  The guest is God. We honor this ancient value through the authenticity and 
                  unfiltered warmth of the Konkan coast.
                </p>
              </div>
              <div className="group">
                <div className="mb-6 inline-block px-4 py-1 rounded bg-[#0066a1]/20 text-[#0066a1] text-sm font-bold tracking-widest uppercase">
                  Arabian Excellence
                </div>
                <h3 className="text-3xl font-serif font-bold mb-6 group-hover:text-[#0066a1] transition-colors">Visionary Welcome</h3>
                <p className="text-slate-400 leading-relaxed text-xl font-light">
                  Hospitality as honor and pride. We adopt the professionalism and scale 
                  that has made Dubai a global benchmark.
                </p>
              </div>
            </div>
            
            <div className="mt-24 text-center">
              <p className="text-slate-500 max-w-2xl mx-auto font-serif italic text-lg">
                We move people with experiences, connect them with culture, and leave 
                them with memories that last a lifetime.
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio - What We Create */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">What We Create</h2>
              <p className="text-slate-500 text-xl font-light">Designing experiences that tell the story of land, sea, and people.</p>
            </div>
            <div className="h-[2px] flex-grow bg-slate-100 mb-4 hidden md:block"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                title: "Boutique Stays", 
                icon: Hotel, 
                desc: "Beachfront resorts that blend coastal tranquility with refined luxury." 
              },
              { 
                title: "Traditional Dining", 
                icon: Utensils, 
                desc: "Authentic Malvani cuisine and destination dining rooted in deep culture." 
              },
              { 
                title: "Coastal Adventure", 
                icon: Compass, 
                desc: "Water sports and scuba diving that explore the untouched beauty of the coast." 
              },
              { 
                title: "Experiential Tourism", 
                icon: Globe, 
                desc: "Curated journeys that connect travelers with the local soul of the region." 
              },
              { 
                title: "Global Standards", 
                icon: Award, 
                desc: "Operational excellence and innovation inspired by Dubai's global outlook." 
              },
              { 
                title: "Strategic Impact", 
                icon: Anchor, 
                desc: "Positioning Konkan as a globally admired destination through regional collaborations." 
              }
            ].map((item, i) => (
              <div key={i} className="group p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0066a1] mb-8 group-hover:bg-[#0066a1] group-hover:text-white transition-all duration-500 shadow-inner">
                  <item.icon className="h-8 w-8" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-slate-900 mb-4">{item.title}</h4>
                <p className="text-slate-500 leading-relaxed font-light text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision Section */}
        <div className="mb-32">
          <div className="bg-[#0066a1] rounded-[3rem] p-12 md:p-20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/3">
                <div className="aspect-square rounded-full border-2 border-white/20 p-4 animate-spin-slow">
                    <div className="w-full h-full rounded-full border border-white/40 border-dashed flex items-center justify-center">
                        <Compass className="w-16 h-16 text-white" />
                    </div>
                </div>
              </div>
              <div className="md:w-2/3 text-center md:text-left text-white">
                <h3 className="text-sm font-bold tracking-[0.3em] uppercase mb-6 opacity-80">The Vision</h3>
                <h4 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-8">
                  Positioning Konkan on the <span className="opacity-70 italic">Global Map</span>
                </h4>
                <p className="text-xl md:text-2xl font-light leading-relaxed opacity-90">
                  Our goal is to transform the Konkan coast into a globally admired destination, 
                  powered by the operational excellence and international outlook of Dubai.
                </p>
              </div>
            </div>
          </div>
        </div>

        <CertificateShowcase />
      </div>
    </div>
  );
}
