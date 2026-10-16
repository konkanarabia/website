import type { Metadata } from 'next';
import FeaturedDestinations from './components/featured-destinations'
import Hero from './components/hero'
import Testimonials from './components/testimonials'
import CertificateShowcase from './components/certificate-showcase'
import Partners from './components/partners'
import SpecializedServices from './components/specialized-services'
import LocalSeoSection from './components/local-seo-section'
import VehicleRentalSection from './components/vehicle-rental-section'
import { getHomeFAQSchema, getLocalBusinessSchema } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'KonkanArabia Hospitality & Holiday Group | Luxury Tours, Goa Taxi & Travel',
  description: 'Premier hospitality and travel management in India and UAE. Curated Dubai luxury holidays, PedneCar Goa tourist taxi rentals, visa processing, resort bookings, and coastal restaurant franchises.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'KonkanArabia Hospitality & Holiday Group | Luxury Tours & Travel',
    description: 'Bespoke holiday packages, PedneCar Goa tourist taxi rentals, and international travel management.',
    url: 'https://konkanarabiahospitalitygroup.com',
    siteName: 'KonkanArabia Hospitality & Holiday Group',
    images: [
      {
        url: 'https://konkanarabiahospitalitygroup.com/logo/KonkanArabia-New-Logo.webp',
        width: 1200,
        height: 630,
        alt: 'KonkanArabia Hospitality & Holiday Group',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Schema.org FAQ and LocalBusiness structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getHomeFAQSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getLocalBusinessSchema()),
        }}
      />
      <Hero />
      <FeaturedDestinations />
      <VehicleRentalSection />
      <SpecializedServices />
      <LocalSeoSection />
      <Partners />
      <CertificateShowcase />
      <Testimonials />
    </div>
  )
}
