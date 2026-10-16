import type { Metadata } from 'next';
import FranchiseContent from '../components/franchise-content';
import { getFranchiseFAQSchema } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Mumbai to Malabar Food Express — Franchise & Partnership Opportunities | KonkanArabia Hospitality Group',
  description: 'Explore high-growth franchise & business partnership opportunities with Mumbai to Malabar Food Express. An authentic coastal culinary concept across India, UAE, and South East Asia by KonkanArabia Hospitality Group.',
  keywords: 'Mumbai to Malabar Food Express, Franchise Opportunities, Restaurant Franchise, KonkanArabia Hospitality Group, Indian Coastal Food Franchise, QSR Franchise India, UAE Food Franchise, Cloud Kitchen Franchise, Malvani Food Franchise, Coastal Dining Franchise',
  alternates: {
    canonical: '/franchise',
  },
  openGraph: {
    title: 'Mumbai to Malabar Food Express — Franchise & Business Opportunities',
    description: 'Multi-format coastal culinary franchise opportunities across India, UAE & SE Asia. Partner with KonkanArabia Hospitality Group.',
    url: 'https://konkanarabiahospitalitygroup.com/franchise',
    siteName: 'KonkanArabia Hospitality & Holiday Group',
    images: ['https://konkanarabiahospitalitygroup.com/services/franchise/the-mumbai-to-malabar-food-express-train.webp'],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mumbai to Malabar Food Express — Franchise & Business Opportunities',
    description: 'Multi-format coastal culinary franchise opportunities across India, UAE & SE Asia.',
    images: ['https://konkanarabiahospitalitygroup.com/services/franchise/the-mumbai-to-malabar-food-express-train.webp'],
  },
};

export default function FranchisePage() {
  return (
    <main>
      {/* Schema.org FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFranchiseFAQSchema()),
        }}
      />
      <FranchiseContent />
    </main>
  );
}
