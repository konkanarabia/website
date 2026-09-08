import type { Metadata } from 'next';
import Image from "next/image";
import { Card } from "@/components/ui/card";
import CertificateShowcase from "../components/certificate-showcase";
import { Globe, Heart, Anchor, Utensils, Hotel, Compass, Quote, Award } from "lucide-react";
import TranslatedText from "@/components/TranslatedText";

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
        <div className="absolute inset-0 opacity-80">
          <Image
            src="/hero/about-hero.webp"
            alt="About KonkanArabia"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 tracking-tight">
            <TranslatedText text="Our Story" />
          </h1>
          <p className="text-xl text-slate-200 font-serif italic max-w-2xl mx-auto drop-shadow-sm">
            <TranslatedText text='"A journey between two unique regions, connecting nations through hospitality."' />
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
                src="/logo/KonkanArabia-New-Logo.webp" 
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
                <TranslatedText text='Connecting Cultures <br/> <span className="text-[#0066a1]">Through Hospitality</span>' isHtml />
              </h2>
              <div className="w-24 h-1 bg-[#0066a1] rounded-full"></div>
            </div>
            
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
              <p className="text-slate-900 font-medium text-xl font-serif">
                <TranslatedText text="KonkanArabia Hospitality & Holiday Mgmt. Pvt. Ltd. was born from a simple yet powerful idea: to bridge two unique worlds." />
              </p>
              
              <div className="grid gap-8 pt-4">
                <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0066a1]/10 flex items-center justify-center text-[#0066a1]">
                        <Anchor className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-xl mb-2 font-serif">
                          <TranslatedText text="The Konkan Essence" />
                        </h4>
                        <p className="text-slate-600">
                          <TranslatedText text="India’s untouched coastline—rich with coconut groves, turquoise waters, Malvani spices, and a tradition of heartfelt warmth." />
                        </p>
                    </div>
                </div>
                
                <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0066a1]/10 flex items-center justify-center text-[#0066a1]">
                        <Globe className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-xl mb-2 font-serif">
                          <TranslatedText text="The Arabian Spirit" />
                        </h4>
                        <p className="text-slate-600">
                          <TranslatedText text="The visionary ambition of Dubai and the UAE—known for refined luxury, world-class service, and the royal art of welcoming the world." />
                        </p>
                    </div>
                </div>
              </div>

              <p className="pt-6 border-t border-slate-100 italic">
                <TranslatedText text="Beyond service, we offer a responsibility. We bring the authenticity of Konkan together with the global mindset of Dubai to create something truly exceptional." />
              </p>
            </div>
          </div>
        </div>

        {/* Journey Comes Full Circle Poster Section */}
        <section className="relative rounded-[4rem] px-8 py-20 md:p-24 mb-32 overflow-hidden shadow-2xl bg-gradient-to-b from-[#e0f2fe] via-[#bae6fd] to-white text-slate-800 border border-sky-100">
          <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="text-center max-w-3xl mb-12">
              <span className="text-[#0066a1] font-bold tracking-[0.2em] text-sm uppercase block mb-3 font-serif">
                <TranslatedText text="OUR STORY" />
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
                <TranslatedText text="The Journey Comes Full Circle" />
              </h2>
              <div className="w-24 h-1 bg-[#0066a1] rounded-full mx-auto mt-4"></div>
            </div>

            {/* Poster Showcase */}
            <div className="w-full max-w-5xl mx-auto bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/85 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="relative w-full aspect-[16/10] md:aspect-[1.58] overflow-hidden rounded-2xl shadow-inner bg-slate-50">
                <Image
                  src="/story/journey-poster.webp"
                  alt="Our Story - The Journey Comes Full Circle Poster"
                  fill
                  className="object-contain"
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 90vw, 80vw"
                  priority
                />
              </div>
            </div>
            
            <div className="mt-8 text-center max-w-2xl text-slate-700 italic font-serif">
              <p className="text-lg">
                <TranslatedText text="Today, every guest who travels with us becomes part of our story, and every journey inspires us to do more." />
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy - Warm Light Luxury Theme */}
        <section className="bg-gradient-to-br from-amber-50/80 via-white to-amber-100/50 border border-amber-200 rounded-[4rem] px-8 py-20 md:p-24 mb-32 text-slate-900 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-500/5 blur-[120px] -z-0"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-amber-500/10 blur-[100px] -z-0"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col items-center mb-20">
              <Quote className="w-12 h-12 text-amber-600 mb-6 opacity-80" />
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-12 uppercase tracking-wider text-center text-slate-900">
                <TranslatedText text="Our Values" />
              </h2>
              
              <div className="max-w-4xl mx-auto mb-12 border-y border-amber-200/80 py-12 px-6 md:px-12 w-full">
                <ul className="space-y-6 text-slate-800 text-lg md:text-2xl font-serif italic leading-relaxed mb-8">
                  <li className="flex items-start gap-4">
                    <span className="text-amber-600 mt-1.5 flex-shrink-0 text-xl md:text-2xl">✦</span>
                    <p>
                      <TranslatedText text="A Guest is the most important visitor to our premises." />
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-amber-600 mt-1.5 flex-shrink-0 text-xl md:text-2xl">✦</span>
                    <p>
                      <TranslatedText text="He is not dependent on us, we are dependent on him." />
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-amber-600 mt-1.5 flex-shrink-0 text-xl md:text-2xl">✦</span>
                    <p>
                      <TranslatedText text="He is not an interruption in our work, he is the purpose of it." />
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-amber-600 mt-1.5 flex-shrink-0 text-xl md:text-2xl">✦</span>
                    <p>
                      <TranslatedText text="He is not an outsider in our business, he is part of it." />
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-amber-600 mt-1.5 flex-shrink-0 text-xl md:text-2xl">✦</span>
                    <p>
                      <TranslatedText text="We are not doing any favor by serving him, he is doing us a favor by giving us an opportunity to do so." />
                    </p>
                  </li>
                </ul>
                <p className="text-amber-800 font-bold text-xl md:text-2xl uppercase tracking-widest font-serif text-center mt-8">
                  <TranslatedText text="— Thoughts of Mahatma Gandhi" />
                </p>
              </div>
              
              <div className="text-center w-full">
                <p className="text-slate-800 text-xl md:text-2xl font-serif italic max-w-3xl mx-auto">
                  <TranslatedText text='"Hospitality is not a service—it is a responsibility."' />
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <div className="group">
                <div className="mb-6 inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-900 border border-amber-300 text-xs font-bold tracking-widest uppercase shadow-sm">
                  <TranslatedText text="Indian Heritage" />
                </div>
                <h3 className="text-3xl font-serif font-bold mb-6 text-slate-900 group-hover:text-amber-700 transition-colors">
                  <TranslatedText text="Atithi Devo Bhava" />
                </h3>
                <p className="text-slate-700 leading-relaxed text-xl font-medium">
                  <TranslatedText text="The guest is God. We honor this ancient value through the authenticity and unfiltered warmth of the Konkan coast." />
                </p>
              </div>
              <div className="group">
                <div className="mb-6 inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-900 border border-amber-300 text-xs font-bold tracking-widest uppercase shadow-sm">
                  <TranslatedText text="Arabian Excellence" />
                </div>
                <h3 className="text-3xl font-serif font-bold mb-6 text-slate-900 group-hover:text-amber-700 transition-colors">
                  <TranslatedText text="Visionary Welcome" />
                </h3>
                <p className="text-slate-700 leading-relaxed text-xl font-medium">
                  <TranslatedText text="Hospitality as honor and pride. We adopt the professionalism and scale that has made Dubai a global benchmark." />
                </p>
              </div>
            </div>
            
            <div className="mt-24 text-center">
              <p className="text-slate-700 max-w-2xl mx-auto font-serif italic text-lg font-medium">
                <TranslatedText text="We move people with experiences, connect them with culture, and leave them with memories that last a lifetime." />
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio - What We Create */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
                <TranslatedText text="What We Create" />
              </h2>
              <p className="text-slate-500 text-xl font-light">
                <TranslatedText text="Designing experiences that tell the story of land, sea, and people." />
              </p>
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
                <h4 className="text-2xl font-serif font-bold text-slate-900 mb-4">
                  <TranslatedText text={item.title} />
                </h4>
                <p className="text-slate-500 leading-relaxed font-light text-lg">
                  <TranslatedText text={item.desc} />
                </p>
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
                <h3 className="text-sm font-bold tracking-[0.3em] uppercase mb-6 opacity-80">
                  <TranslatedText text="The Vision" />
                </h3>
                <h4 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-8">
                  <TranslatedText text='Positioning Konkan on the <span className="opacity-70 italic">world stage</span>' isHtml />
                </h4>
                <p className="text-xl md:text-2xl font-light leading-relaxed opacity-90">
                  <TranslatedText text="Our goal is to transform the Konkan coast into a globally admired destination, powered by the operational excellence and international outlook of Dubai." />
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
