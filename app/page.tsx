import FeaturedDestinations from './components/featured-destinations'
import Hero from './components/hero'
import Testimonials from './components/testimonials'
import CertificateShowcase from './components/certificate-showcase'
import Partners from './components/partners'
import SpecializedServices from './components/specialized-services'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedDestinations />
      <SpecializedServices />
      <Partners />
      <CertificateShowcase />
      <Testimonials />
    </div>
  )
}

