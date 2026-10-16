import type { Metadata } from 'next';
import HotelList from '../components/hotel-list';

export const metadata: Metadata = {
  title: 'Partner Hotels & Luxury Accommodations | KonkanArabia Hospitality',
  description: 'Book handpicked luxury hotels, beachfront resorts in Goa & Konkan, and partner hotels in Dubai and across the UAE with KonkanArabia Hospitality Group.',
  keywords: 'partner hotels, luxury accommodations, Goa beach resorts, Dubai hotels, Konkan stays, family hotels, business hotels',
  alternates: {
    canonical: '/hotels',
  },
  openGraph: {
    title: 'Partner Hotels & Luxury Accommodations | KonkanArabia',
    description: 'Book luxury hotels, beachfront resorts, and boutique stays across India and UAE.',
    url: 'https://konkanarabiahospitalitygroup.com/hotels',
    siteName: 'KonkanArabia Hospitality & Holiday Group',
    type: 'website',
  },
};

export default function HotelsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Partner Hotels</h1>
      <div className="mb-8 text-center">
        <p className="text-lg mb-4 text-slate-600">Discover comfortable and luxurious accommodations for your next trip</p>
      </div>
      <HotelList />
    </div>
  );
}
