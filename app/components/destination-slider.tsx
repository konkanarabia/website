'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const destinations = [
  { id: 1, name: 'Paris', image: '/placeholder.svg?height=400&width=600', description: 'The City of Light' },
  { id: 2, name: 'Bali', image: '/placeholder.svg?height=400&width=600', description: 'Island of the Gods' },
  { id: 3, name: 'New York', image: '/placeholder.svg?height=400&width=600', description: 'The Big Apple' },
  { id: 4, name: 'Tokyo', image: '/placeholder.svg?height=400&width=600', description: 'Where tradition meets future' },
  { id: 5, name: 'Rome', image: '/placeholder.svg?height=400&width=600', description: 'The Eternal City' },
]

export default function DestinationSlider() {
  const swiperRef = useRef(null)

  return (
    <div className="relative">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={false}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="mySwiper"
      >
        {destinations.map((destination) => (
          <SwiperSlide key={destination.id}>
            <div className="relative h-[400px] group overflow-hidden rounded-lg">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                <p className="text-sm mb-4">{destination.description}</p>
                <Link href={`/destinations/${destination.id}`} passHref>
                  <Button variant="secondary" className="w-full">
                    Explore
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
    </div>
  )
}

