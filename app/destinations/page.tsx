import type { Metadata } from 'next';
import OurServices from "../components/services";

export const metadata: Metadata = {
  title: 'Luxury Holiday Packages | Domestic & International Tours',
  description: 'Explore our handpicked collection of luxury holiday packages. From the serene beaches of Konkan to international dream destinations, plan your perfect getaway with KonkanArabia.',
  keywords: 'holiday packages, honeymoon tours, family vacation, international travel, domestic tours, Konkan tourism',
};

export default function DestinationsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
          Handpicked <span className="text-[#0066a1]">Holiday Packages</span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Embark on a journey of a lifetime with our carefully curated travel experiences. 
          Whether it's a relaxing escape, a cultural immersion, or a thrill-seeking adventure, 
          we have the perfect package waiting for you.
        </p>
      </div>
      <OurServices />
    </div>
  );
}
