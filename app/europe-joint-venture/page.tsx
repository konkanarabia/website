import type { Metadata } from 'next';
import EuropeJVContent from '../components/europe-jv-content';

export const metadata: Metadata = {
  title: 'Our Europe Joint Venture | KonkanArabia Holidays & Travel Studio by Eva Pérez',
  description: 'Explore the strategic joint expansion project of KonkanArabia Holidays and European Partner Eva Pérez (Travel Studio). Setting new benchmarks in Destination Management, bespoke luxury travel, Ayurveda wellness retreats, safaris, and European holiday planning.',
  keywords: 'Europe Joint Venture, Eva Pérez, Travel Studio, KonkanArabia Europe Division, Destination Management Company, DMC Europe, Madrid travel office, Warsaw travel office, bespoke European luxury travel, Ayurveda retreats',
  openGraph: {
    title: 'Our Europe Joint Venture | KonkanArabia Holidays & Travel Studio by Eva Pérez',
    description: 'Strategic collaboration between KonkanArabia Holidays & Eva Pérez establishing a premier Destination Management Company (DMC) for luxury travel and authentic experiences.',
    images: ['/partners/europe-jv-hero.png'],
  },
};

export default function EuropeJointVenturePage() {
  return (
    <main>
      <EuropeJVContent />
    </main>
  );
}
