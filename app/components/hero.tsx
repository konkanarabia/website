'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import type { SwiperRef } from 'swiper/react'
import { ChevronLeft, ChevronRight, Star, ShieldCheck, Sparkles, Car } from 'lucide-react'
import { Button } from "@/components/ui/button"
import TranslatedText from "@/components/TranslatedText"
import { ease, spring, maskWord, fadeUp } from "@/lib/motion"

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
    image: "/hero/hero-dubai.webp?v=4",
    cta: "Explore Dubai Tours",
    link: "/destinations",
    badge: "Signature International Experience",
    priority: true,
  },
  {
    id: 2,
    location: "Vietnam",
    title: "Timeless Beauty of Vietnam",
    subtitle: "Ha Long Bay · Hoi An · Mekong Delta",
    image: "/hero/hero-vietnam.webp?v=4",
    cta: "Discover Vietnam",
    link: "/destinations",
    badge: "Trending Exotic Getaway",
    priority: false,
  },
  // ── Domestic ───────────────────────────────────────
  {
    id: 3,
    location: "Delhi & Agra, India",
    title: "A Monument to Eternal Love",
    subtitle: "Taj Mahal · Red Fort · Qutub Minar · Fatehpur Sikri",
    image: "/hero/hero-delhi-agra.webp?v=4",
    cta: "Explore Delhi & Agra",
    link: "/destinations",
    badge: "Golden Triangle Heritage",
    priority: false,
  },
  {
    id: 4,
    location: "Rajasthan, India",
    title: "The Land of Maharajas",
    subtitle: "Amer Fort · Jaisalmer · City Palace · Thar Desert",
    image: "/hero/hero-rajasthan.webp?v=4",
    cta: "Explore Rajasthan",
    link: "/destinations",
    badge: "Royal Palaces & Forts",
    priority: false,
  },
  {
    id: 5,
    location: "Bangalore & Mysore, India",
    title: "Royal Heritage of the South",
    subtitle: "Mysore Palace · Brindavan Gardens · Coorg Coffee Estates",
    image: "/hero/hero-mysore.webp?v=4",
    cta: "Discover South India",
    link: "/destinations",
    badge: "Coffee Hills & Heritage",
    priority: false,
  },
  {
    id: 6,
    location: "Kerala, India",
    title: "God's Own Country",
    subtitle: "Alleppey Backwaters · Munnar Tea Gardens · Kovalam Beach",
    image: "/hero/hero-kerala.webp?v=4",
    cta: "Explore Kerala",
    link: "/destinations",
    badge: "Backwaters & Green Hills",
    priority: false,
  },
]

/** Floating chip orbiting the hero, adapted from freshcart-landing motion system. */
function HeroFloatChip({
  children,
  className,
  delay = 0,
  drift = 8,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  drift?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ ...spring, delay }}
      className={className}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -drift, 0] }}
        transition={{
          duration: 4.5 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex items-center gap-2 rounded-2xl border border-white/20 bg-slate-900/80 px-3.5 py-2 shadow-2xl backdrop-blur-md text-white text-xs sm:text-sm font-semibold"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();

  const handlePrevSlide = () => {
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      swiper.slidePrev();
    }
  };
  
  const handleNextSlide = () => {
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      swiper.slideNext();
    }
  };

  return (
    <section className="relative h-[380px] sm:h-[460px] md:h-[600px] overflow-hidden bg-slate-950">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={false}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        effect="fade"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full"
      >
        {heroSlides.map((slide, sIdx) => {
          const isActive = sIdx === activeIndex;
          const words = slide.title.split(" ");

          return (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full select-none">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover scale-105 transition-transform duration-1000 ease-out"
                  priority={slide.priority}
                />
                {/* Cinematic multi-tier gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4 sm:p-6 z-10 max-w-4xl mx-auto">
                  {/* Category Pill with entrance */}
                  <motion.div
                    key={`badge-${slide.id}-${isActive}`}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-sm shadow-lg"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <TranslatedText text={slide.badge} />
                  </motion.div>

                  {/* Masked Headline Words — freshcart-landing signature style */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black mb-4 text-white tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
                    {words.map((word, wIdx) => (
                      <span
                        key={`${word}-${wIdx}`}
                        className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-bottom"
                      >
                        <motion.span
                          key={`word-${slide.id}-${wIdx}-${isActive}`}
                          initial={reduce ? { opacity: 0 } : { y: "110%" }}
                          animate={reduce ? { opacity: 1 } : { y: "0%" }}
                          transition={{
                            duration: 0.65,
                            ease,
                            delay: 0.08 * wIdx,
                          }}
                          className={
                            wIdx === words.length - 1
                              ? "inline-block text-amber-400"
                              : "inline-block"
                          }
                        >
                          <TranslatedText text={word} />
                        </motion.span>
                      </span>
                    ))}
                  </h1>

                  {/* Subtitle with soft fadeUp */}
                  <motion.p
                    key={`sub-${slide.id}-${isActive}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.25 }}
                    className="text-base sm:text-xl md:text-2xl mb-8 font-medium text-slate-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] max-w-2xl text-balance"
                  >
                    <TranslatedText text={slide.subtitle} />
                  </motion.p>

                  {/* CTA Buttons with spring physics */}
                  <motion.div
                    key={`cta-${slide.id}-${isActive}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.35 }}
                    className="flex flex-wrap items-center justify-center gap-3.5"
                  >
                    <Link href={slide.link}>
                      <motion.div
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        transition={spring}
                      >
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold shadow-xl shadow-amber-500/20 px-7 sm:px-9 py-5 sm:py-6 rounded-2xl text-sm sm:text-base cursor-pointer"
                        >
                          <TranslatedText text={slide.cta} />
                        </Button>
                      </motion.div>
                    </Link>

                    <Link href="/pednecar">
                      <motion.div
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        transition={spring}
                      >
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-white/30 bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-md shadow-lg px-6 py-5 sm:py-6 rounded-2xl text-sm sm:text-base cursor-pointer"
                        >
                          <Car className="w-4 h-4 mr-2 text-amber-400" />
                          <TranslatedText text="PedneCar Taxi Goa" />
                        </Button>
                      </motion.div>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Floating orbital chips inspired by freshcart-landing */}
      <HeroFloatChip
        delay={0.4}
        drift={6}
        className="hidden md:block absolute bottom-8 left-8 z-20 pointer-events-none"
      >
        <span className="flex items-center gap-1.5 text-amber-400">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="font-bold text-white">4.9/5</span>
        </span>
        <span className="text-slate-300 font-medium">10,000+ Journeys Hosted</span>
      </HeroFloatChip>

      <HeroFloatChip
        delay={0.6}
        drift={7}
        className="hidden lg:block absolute bottom-8 right-8 z-20 pointer-events-none"
      >
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span className="text-slate-200">Verified Chauffeurs & 24/7 Airport Support</span>
      </HeroFloatChip>

      {/* Navigation arrows with spring hover */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={spring}
        className="absolute top-1/2 left-4 z-20 -translate-y-1/2 hidden sm:block"
      >
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/80 hover:bg-white border-none shadow-lg text-slate-800"
          onClick={handlePrevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={spring}
        className="absolute top-1/2 right-4 z-20 -translate-y-1/2 hidden sm:block"
      >
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/80 hover:bg-white border-none shadow-lg text-slate-800"
          onClick={handleNextSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </motion.div>
    </section>
  )
}
