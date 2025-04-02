'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
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
    title: "Discover Your Next Adventure",
    subtitle: "Explore the world's most beautiful destinations",
    image: "/img/luca-bravo-O453M2Liufs-unsplash.jpg?height=800&width=1200",
    cta: "Start Exploring",
    link: "/services"
  },
  {
    id: 2,
    title: "Experience Unforgettable Journeys",
    subtitle: "Create memories that last a lifetime",
    image: "/img/jennvmy_-uWpggIb3iHs-unsplash.jpg?height=800&width=1200",
    cta: "Plan Your Trip",
    link: "/contact"
  },
  {
    id: 3,
    title: "Uncover Hidden Gems",
    subtitle: "Travel off the beaten path",
    image: "/img/zq-lee-VbDjv8-8ibc-unsplash.jpg?height=800&width=1200",
    cta: "Find Unique Destinations",
    link: "/services"
  }
]

export default function Hero() {
  const swiperRef = useRef(null)

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
        onClick={() => swiperRef.current.swiper.slidePrev()}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 z-10 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={() => swiperRef.current.swiper.slideNext()}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </section>
  )
}

