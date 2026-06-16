'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import type { SwiperRef } from 'swiper/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import TranslatedText from "@/components/TranslatedText"


// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const heroSlides = [
  // ── International ──────────────────────────────────
  {
    id: 1,
    location: "Dubai, UAE",
    title: "Experience the Peak of Luxury",
    subtitle: "Burj Khalifa · Desert Safaris · World-Class Shopping",
    image: "/hero/hero-dubai.png?v=3",
    cta: "Explore Dubai Tours",
    link: "/destinations",
    priority: true,
  },
  {
    id: 2,
    location: "Thailand",
    title: "Land of Smiles & Temples",
    subtitle: "Grand Palace · Phi Phi Islands · Floating Markets",
    image: "/hero/hero-thailand.png?v=3",
    cta: "Discover Thailand",
    link: "/destinations",
    priority: false,
  },
  {
    id: 3,
    location: "Sri Lanka",
    title: "The Pearl of the Indian Ocean",
    subtitle: "Sigiriya · Ceylon Tea Hills · Pristine Beaches",
    image: "/hero/hero-srilanka.png?v=3",
    cta: "Explore Sri Lanka",
    link: "/destinations",
    priority: false,
  },
  {
    id: 4,
    location: "Vietnam",
    title: "Timeless Beauty of Vietnam",
    subtitle: "Ha Long Bay · Hoi An · Mekong Delta",
    image: "/hero/hero-vietnam.png?v=3",
    cta: "Discover Vietnam",
    link: "/destinations",
    priority: false,
  },
  {
    id: 5,
    location: "Cambodia",
    title: "Temples of the Ancient World",
    subtitle: "Angkor Wat · Siem Reap · Tonlé Sap Lake",
    image: "/hero/hero-cambodia.png?v=3",
    cta: "Explore Cambodia",
    link: "/destinations",
    priority: false,
  },
  {
    id: 6,
    location: "Bali, Indonesia",
    title: "Island of the Gods",
    subtitle: "Tegallalang Rice Terraces · Uluwatu · Sacred Temples",
    image: "/hero/hero-bali.png?v=3",
    cta: "Discover Bali",
    link: "/destinations",
    priority: false,
  },
  // ── Domestic ───────────────────────────────────────
  {
    id: 7,
    location: "Kashmir, India",
    title: "Heaven on Earth",
    subtitle: "Dal Lake · Gulmarg Ski Resort · Pahalgam Valley",
    image: "/hero/hero-kashmir.png?v=3",
    cta: "Explore Kashmir",
    link: "/destinations",
    priority: false,
  },
  {
    id: 8,
    location: "Himachal Pradesh, India",
    title: "The Himalayan Escape",
    subtitle: "Spiti Valley · Manali · Dharamshala · Rohtang Pass",
    image: "/hero/hero-himachal.png?v=3",
    cta: "Discover Himachal",
    link: "/destinations",
    priority: false,
  },
  {
    id: 9,
    location: "Delhi & Agra, India",
    title: "A Monument to Eternal Love",
    subtitle: "Taj Mahal · Red Fort · Qutub Minar · Fatehpur Sikri",
    image: "/hero/hero-delhi-agra.png?v=3",
    cta: "Explore Delhi & Agra",
    link: "/destinations",
    priority: false,
  },
  {
    id: 10,
    location: "Nainital, India",
    title: "Queen of Kumaon Hills",
    subtitle: "Naini Lake · Snow View Point · Jim Corbett National Park",
    image: "/hero/hero-nainital.png?v=3",
    cta: "Discover Nainital",
    link: "/destinations",
    priority: false,
  },
  {
    id: 11,
    location: "Rajasthan, India",
    title: "The Land of Maharajas",
    subtitle: "Amer Fort · Jaisalmer · City Palace · Thar Desert",
    image: "/hero/hero-rajasthan.jpg?v=3",
    cta: "Explore Rajasthan",
    link: "/destinations",
    priority: false,
  },
  {
    id: 12,
    location: "Bangalore & Mysore, India",
    title: "Royal Heritage of the South",
    subtitle: "Mysore Palace · Brindavan Gardens · Coorg Coffee Estates",
    image: "/hero/hero-mysore.jpg?v=3",
    cta: "Discover South India",
    link: "/destinations",
    priority: false,
  },
  {
    id: 13,
    location: "Kerala, India",
    title: "God's Own Country",
    subtitle: "Alleppey Backwaters · Munnar Tea Gardens · Kovalam Beach",
    image: "/hero/hero-kerala.jpg?v=3",
    cta: "Explore Kerala",
    link: "/destinations",
    priority: false,
  },
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
                priority={slide.id === 7} // Only prioritize the first image (Dubai)
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  <TranslatedText text={slide.title} />
                </h1>
                <p className="text-xl md:text-2xl mb-8">
                  <TranslatedText text={slide.subtitle} />
                </p>
                <Link href={slide.link}>
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <TranslatedText text={slide.cta} />
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

