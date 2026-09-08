import type { Metadata } from 'next';
import FranchiseContent from '../components/franchise-content';

export const metadata: Metadata = {
  title: 'Mumbai to Malabar Food Express — Franchise & Partnership Opportunities | KonkanArabia Hospitality Group',
  description: 'Explore high-growth franchise & business partnership opportunities with Mumbai to Malabar Food Express. An authentic coastal culinary concept across India, UAE, and South East Asia by KonkanArabia Hospitality Group.',
  keywords: 'Mumbai to Malabar Food Express, Franchise Opportunities, Restaurant Franchise, KonkanArabia Hospitality Group, Indian Coastal Food Franchise, QSR Franchise India, UAE Food Franchise, Cloud Kitchen Franchise, Malvani Food Franchise, Coastal Dining Franchise',
  openGraph: {
    title: 'Mumbai to Malabar Food Express — Franchise & Business Opportunities',
    description: 'Multi-format coastal culinary franchise opportunities across India, UAE & SE Asia. Partner with KonkanArabia Hospitality Group.',
    images: ['/services/franchise/the-mumbai-to-malabar-food-express-train.webp'],
  },
};

export default function FranchisePage() {
  return (
    <main>
      <FranchiseContent />
    </main>
  );
}
