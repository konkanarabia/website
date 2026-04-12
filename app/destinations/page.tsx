import type { Metadata } from 'next';
import OurServices from "../components/services";
import DestinationList from "../components/destination-list";
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Luxury Holiday Packages | Domestic & International Tours',
  description: 'Explore our handpicked collection of luxury holiday packages. From the serene beaches of Konkan to international dream destinations, plan your perfect getaway with KonkanArabia.',
  keywords: 'holiday packages, honeymoon tours, family vacation, international travel, domestic tours, Konkan tourism',
};

export default function DestinationsPage() {
  return (
    <main className="bg-white min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold tracking-wide uppercase mb-6">
            <Sparkles className="w-4 h-4" />
            Curated Experiences
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
            Handpicked <span className="text-[#0066a1]">Journeys</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed font-medium max-w-3xl mx-auto">
            From the mystical valleys of Japan to the sun-kissed sands of the Konkan coast. 
            Discover travel stories written just for you.
          </p>
        </div>
      </div>
      
      <DestinationList />
    </main>
  );
}
