import type { Metadata } from 'next';
import ServicesList from "../components/services-list";
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Premium Services | KonkanArabia Hospitality & Holiday Group',
  description: 'Explore the wide range of services offered by KonkanArabia, including international and domestic holiday packages, luxury vehicle rentals, and more.',
  keywords: 'holiday packages, vehicle rental, premium travel services, KonkanArabia services',
};

export default function ServicesPage() {
  return (
    <main className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold tracking-wide uppercase mb-6">
            <Sparkles className="w-4 h-4" />
            Full Hospitality Suite
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">
            Our Premium <span className="text-[#0066a1]">Services</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            Beyond just tours, we provide a complete ecosystem for the modern traveler. 
            From luxury transport and visa processing to managing world-class beach resorts and authentic dining experiences.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <ServicesList />
      </div>
    </main>
  );
}

