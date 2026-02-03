'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import type { SwiperRef } from 'swiper/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const heroSlides = [
  {
    id: 1,
    title: "Journey Beyond Boundaries",
    subtitle: "Handcrafted experiences in breathtaking destinations",
    image: "/hero/hero-1.jpg",
    cta: "Find Your Dream Destination",
    link: "/destinations"
  },
  {
    id: 2,
    title: "Craft Your Perfect Escape",
    subtitle: "Personalized itineraries tailored to your travel style",
    image: "/hero/hero-2.jpg",
    cta: "Design Your Journey",
    link: "/contact"
  },
  {
    id: 3,
    title: "Uncharted Territories Await",
    subtitle: "Discover secret locations cherished by locals",
    image: "/hero/hero-3.jpg",
    cta: "Explore Hidden Gems",
    link: "/destinations"
  },
  {
    id: 4,
    title: "Elevate Your Travel Experience",
    subtitle: "Immerse yourself in world-class comfort and exclusivity",
    image: "/hero/hero-4.jpg",
    cta: "Browse Premium Collections",
    link: "/destinations"
  },
  {
    id: 5,
    title: "Unforgettable Family Moments",
    subtitle: "Multi-generational adventures with something for everyone",
    image: "/hero/hero-5.jpg",
    cta: "Discover Family Adventures",
    link: "/destinations"
  },
  {
    id: 6,
    title: "Adrenaline & Inspiration",
    subtitle: "Push boundaries with curated thrill-seeking experiences",
    image: "/hero/hero-6.jpg",
    cta: "Seek Your Adventure",
    link: "/destinations"
  },
  {
    id: 7,
    title: "Experience the Peak of Luxury",
    subtitle: "Indulge in the vibrant culture and opulence of Dubai",
    image: "/hero/hero-7.png",
    cta: "Explore Dubai Tours",
    link: "/destinations"
  }
]

export default function Hero() {
  // Use a more specific type for the Swiper instance
  const swiperRef = useRef<SwiperRef>(null);

  const handlePrevSlide = () => {
    // Ensure swiper is available before accessing it
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      swiper.slidePrev();
    }
  };
  
  const handleNextSlide = () => {
    // Ensure swiper is available before accessing it
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      swiper.slideNext();
    }
  };

  return (
    <section className="relative h-[300px] md:h-[550px]">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={false}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        className="h-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={slide.id === 1} // Only prioritize the first image
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                <Link href={slide.link}>
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    {slide.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 z-10 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={handlePrevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 z-10 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={handleNextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </section>
  )
}

