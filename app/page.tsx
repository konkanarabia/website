import FeaturedDestinations from './components/featured-destinations'
import Hero from './components/hero'
import Testimonials from './components/testimonials'
import CertificateShowcase from './components/certificate-showcase'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedDestinations />
      <CertificateShowcase />
      {/* <Testimonials /> */}
    </div>
  )
}

