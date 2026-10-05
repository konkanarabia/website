import FeaturedDestinations from './components/featured-destinations'
import Hero from './components/hero'
import Testimonials from './components/testimonials'
import CertificateShowcase from './components/certificate-showcase'
import Partners from './components/partners'
import SpecializedServices from './components/specialized-services'
import LocalSeoSection from './components/local-seo-section'
import VehicleRentalSection from './components/vehicle-rental-section'

export default function Home() {
  return (
    <div className="min-h-screen">
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

