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
    image: "/hero/hero-dubai.jpg?v=4",
    cta: "Explore Dubai Tours",
    link: "/destinations",
    priority: true,
  },
  {
    id: 2,
    location: "Vietnam",
    title: "Timeless Beauty of Vietnam",
    subtitle: "Ha Long Bay · Hoi An · Mekong Delta",
    image: "/hero/hero-vietnam.jpg?v=4",
    cta: "Discover Vietnam",
    link: "/destinations",
    priority: false,
  },
  // ── Domestic ───────────────────────────────────────
  {
    id: 3,
    location: "Delhi & Agra, India",
    title: "A Monument to Eternal Love",
    subtitle: "Taj Mahal · Red Fort · Qutub Minar · Fatehpur Sikri",
    image: "/hero/hero-delhi-agra.jpg?v=4",
    cta: "Explore Delhi & Agra",
    link: "/destinations",
    priority: false,
  },
  {
    id: 4,
    location: "Rajasthan, India",
    title: "The Land of Maharajas",
    subtitle: "Amer Fort · Jaisalmer · City Palace · Thar Desert",
    image: "/hero/hero-rajasthan.jpg?v=4",
    cta: "Explore Rajasthan",
    link: "/destinations",
    priority: false,
  },
  {
    id: 5,
    location: "Bangalore & Mysore, India",
    title: "Royal Heritage of the South",
    subtitle: "Mysore Palace · Brindavan Gardens · Coorg Coffee Estates",
    image: "/hero/hero-mysore.jpg?v=4",
    cta: "Discover South India",
    link: "/destinations",
    priority: false,
  },
  {
    id: 6,
    location: "Kerala, India",
    title: "God's Own Country",
    subtitle: "Alleppey Backwaters · Munnar Tea Gardens · Kovalam Beach",
    image: "/hero/hero-kerala.jpg?v=4",
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
                priority={slide.priority}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/25"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4 z-10 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black mb-4 text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                  <TranslatedText text={slide.title} />
                </h1>
                <p className="text-xl md:text-2xl mb-8 font-medium text-slate-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  <TranslatedText text={slide.subtitle} />
                </p>
                <Link href={slide.link}>
                  <Button size="lg" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold shadow-xl px-8 py-6 rounded-xl text-base">
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

