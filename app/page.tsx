import Hero from './components/hero'
import FeaturedDestinations from './components/featured-destinations'
import Testimonials from './components/testimonials'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedDestinations />
      {/* <Testimonials /> */}
    </div>
  )
}

