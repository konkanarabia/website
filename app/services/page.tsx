import type { Metadata } from 'next';
import OurServices from "../components/services";

export const metadata: Metadata = {
  title: 'Our Premium Services | KonkanArabia Hospitality & Holiday Group',
  description: 'Explore the wide range of services offered by KonkanArabia, including international and domestic holiday packages, luxury vehicle rentals, and more.',
  keywords: 'holiday packages, vehicle rental, premium travel services, KonkanArabia services',
};

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
          Explore Our <span className="text-[#0066a1]">Premium Services</span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Discover the best of Konkan and beyond with our handcrafted travel experiences. Whether you're looking for luxurious stays, thrilling adventures, or serene getaways, we provide end-to-end solutions tailored to your unique travel style.
        </p>
      </div>
      <OurServices />
    </div>
  )
}

