import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Car, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Hotel, 
  CalendarCheck, 
  Compass, 
  Users, 
  MessageCircle,
  Award
} from "lucide-react";
import TranslatedText from "@/components/TranslatedText";

export default function VehicleRentalSection() {
  const services = [
    {
      icon: <Car className="w-6 h-6 text-amber-600" />,
      title: "Tourist Taxi & Tempo Traveler",
      description: "Clean, well-maintained Toyota Rumion 7-seater MUV, AC sedans, and 12 / 17 / 26 seater luxury tempo travelers with experienced chauffeurs.",
      tag: "Fleet & Taxi",
    },
    {
      icon: <Hotel className="w-6 h-6 text-amber-600" />,
      title: "Hotels Booking",
      description: "Exclusive partner rates and handpicked selections for luxury beachside resorts, heritage boutique villas, and stays across Goa.",
      tag: "Stays & Resorts",
    },
    {
      icon: <CalendarCheck className="w-6 h-6 text-amber-600" />,
      title: "Events Booking",
      description: "Comprehensive transport logistics and guest transfers for destination weddings, corporate summits, conferences, and private celebrations.",
      tag: "Events & Weddings",
    },
    {
      icon: <Compass className="w-6 h-6 text-amber-600" />,
      title: "Tours & Sightseeing",
      description: "Tailor-made day tours covering North Goa beaches, Old Goa cathedrals, South Goa heritage, Dudhsagar waterfalls, and backwater cruises.",
      tag: "Excursions",
    },
  ];

  const fleetHighlights = [
    {
      name: "Toyota Rumion (7-Seater)",
      models: "Toyota Rumion 7-Seater MUV",
      capacity: "6 - 7 Passengers + Chauffeur",
      features: "Spacious 3-row comfort, whisper-quiet AC vents, ample luggage room, ideal for Goan roads",
      image: "/vehicles/pednecar-toyota-rumion.jpg",
      badge: "Signature Goa Tourist Vehicle",
      link: "/pednecar"
    },
    {
      name: "Luxury Tempo Traveler",
      models: "Force Traveler • Executive Mini Coach",
      capacity: "12, 17 & 26 Seater Options",
      features: "High-roof AC, pushback luxury seating, mic system & oversized luggage hold",
      image: "/vehicles/vehicle-2.webp",
      badge: "Ideal for Groups, Weddings & Corporate Trips",
      link: "/pednecar"
    },
    {
      name: "Executive Sedans",
      models: "Swift Dzire • Toyota Etios • Honda City",
      capacity: "4 Passengers + Chauffeur",
      features: "Chilled AC, clean interior, airport transfers, couple sightseeing",
      image: "/vehicles/vehicle-1.webp",
      badge: "Most Popular for Couples & Small Families",
      link: "/pednecar"
    },
  ];

  return (
    <section id="vehicle-rentals" className="py-24 bg-gradient-to-b from-white via-amber-50/30 to-slate-50 relative overflow-hidden scroll-mt-20">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100/80 text-amber-900 border border-amber-300/60 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Award className="w-4 h-4 text-amber-600" />
            <TranslatedText text="PedneCar • Your Goa Travel Partner (EST. 2010)" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-slate-900 tracking-tight leading-tight max-w-4xl mb-6">
            <TranslatedText text="Goa Tourist Vehicle Service & Rental Division" />
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed font-medium">
            <TranslatedText text="Experience premier travel across Goa with PedneCar. Featuring the Toyota Rumion 7-seater MUV, 24/7 airport pickups at MOPA & Dabolim, full-day beach excursions, and luxury group Tempo Travelers." />
          </p>
        </div>

        {/* Featured Banner Hero Card */}
        <div className="mb-20 rounded-3xl overflow-hidden shadow-2xl border border-amber-200/60 bg-slate-900 text-white relative group">
          <div className="relative h-72 sm:h-96 md:h-[460px] w-full overflow-hidden">
            <Image
              src="/vehicles/pednecar-hero-banner.jpg"
              alt="PedneCar Goa Tourist Vehicle Service - Your Goa Travel Partner"
              fill
              priority
              className="object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 brightness-95"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            {/* Overlay content badge on banner */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
              <div className="max-w-2xl bg-slate-950/70 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
                <span className="inline-block px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-md mb-2">
                  <TranslatedText text="Official Goa Tourist Fleet • Toyota Rumion" />
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                  <TranslatedText text="PedneCar Tourist Vehicle Service" />
                </h3>
                <p className="text-slate-200 text-sm sm:text-base font-medium leading-relaxed">
                  <TranslatedText text="Authorized yellow-plate tourist taxis, Toyota Rumion 7-seater MUVs, and luxury Tempo Travelers stationed in Mapusa and serving all destinations in North Goa, South Goa, and Maharashtra borders." />
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/pednecar">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-6 rounded-xl shadow-lg shadow-amber-500/30 flex items-center gap-2 group/btn">
                    <TranslatedText text="View PedneCar Details" />
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a href="tel:+918625807465">
                  <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md px-6 py-6 rounded-xl font-bold flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>+91 8625807465</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Services Grid */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
              <TranslatedText text="Our Comprehensive Goa Travel Services" />
            </h3>
            <p className="text-slate-600 text-base max-w-2xl mx-auto">
              <TranslatedText text="Everything you need for a seamless holiday, wedding, or business itinerary in Goa." />
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl bg-white group hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <span className="text-[11px] font-bold tracking-wider text-amber-700 uppercase mb-1">
                    <TranslatedText text={service.tag} />
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                    <TranslatedText text={service.title} />
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium mt-auto">
                    <TranslatedText text={service.description} />
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Fleet Showcase Cards */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-amber-700 font-bold uppercase tracking-widest text-xs">
                <TranslatedText text="Curated Vehicle Fleet" />
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight mt-1">
                <TranslatedText text="Featuring the Toyota Rumion Across Goa" />
              </h3>
            </div>
            <Link href="/pednecar" className="inline-flex items-center gap-2 text-amber-700 font-bold hover:text-amber-800 transition-colors">
              <TranslatedText text="Explore full PedneCar page" />
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fleetHighlights.map((fleet, index) => (
              <Card key={index} className="overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-500 rounded-3xl bg-white flex flex-col group">
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={fleet.image}
                    alt={fleet.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    <TranslatedText text={fleet.badge} />
                  </div>
                </div>

                <CardContent className="p-6 flex flex-col flex-grow">
                  <h4 className="text-xl font-bold text-slate-900 mb-1">
                    <TranslatedText text={fleet.name} />
                  </h4>
                  <p className="text-xs font-bold text-amber-700 mb-3 tracking-wide uppercase">
                    <TranslatedText text={fleet.models} />
                  </p>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <Users className="w-4 h-4 text-amber-600 shrink-0" />
                    <span><TranslatedText text={fleet.capacity} /></span>
                  </div>

                  <p className="text-sm text-slate-600 mb-6 leading-relaxed font-medium">
                    <TranslatedText text={fleet.features} />
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <Link href={fleet.link} className="w-full">
                      <Button variant="outline" className="w-full border-amber-300 hover:bg-amber-50 hover:text-amber-900 text-slate-800 font-bold rounded-xl py-2.5 text-sm transition-colors">
                        <TranslatedText text="View Details & Pricing" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/80 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900"><TranslatedText text="Verified Chauffeurs" /></p>
              <p className="text-xs text-slate-500"><TranslatedText text="Safe & background-checked" /></p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900"><TranslatedText text="24/7 Airport Service" /></p>
              <p className="text-xs text-slate-500"><TranslatedText text="MOPA (GOX) & Dabolim (GOI)" /></p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900"><TranslatedText text="100% Sanitized AC Fleet" /></p>
              <p className="text-xs text-slate-500"><TranslatedText text="Spotless comfort guaranteed" /></p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900"><TranslatedText text="Transparent Rates" /></p>
              <p className="text-xs text-slate-500"><TranslatedText text="No hidden charges or surge" /></p>
            </div>
          </div>
        </div>

        {/* Office & Direct Contact Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-amber-500/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <MapPin className="w-3.5 h-3.5" />
                <TranslatedText text="Mapusa, Goa Branch • PedneCar Office" />
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif font-black tracking-tight mb-3">
                <TranslatedText text="Book Your Goa Ride or Get Instant Quote" />
              </h3>
              <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed">
                <TranslatedText text="Reach our direct transport desk in Mapusa for instant bookings, airport transfers, destination wedding fleets, and customized Goa sightseeing packages." />
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 text-slate-200 text-sm">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong><TranslatedText text="Office Address:" /></strong> Flat No.203, Magic Marvel, Peddem, Mapusa, Goa 403507
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-200 text-sm">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                  <span className="font-medium">
                    <strong><TranslatedText text="Direct Call Lines:" /></strong>{" "}
                    <a href="tel:+918625807465" className="hover:text-amber-400 transition-colors underline font-semibold">+91 8625807465</a> •{" "}
                    <a href="tel:09326380922" className="hover:text-amber-400 transition-colors underline font-semibold">09326380922</a> •{" "}
                    <a href="tel:9370528517" className="hover:text-amber-400 transition-colors underline font-semibold">9370528517</a>
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4">
              <a
                href="https://wa.me/918625807465?text=Hello%20PedneCar%2C%20I%20would%20like%20to%20enquire%20about%20Toyota%20Rumion%20vehicle%20rental%20in%20Goa."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 rounded-2xl text-base shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all">
                  <MessageCircle className="w-5 h-5" />
                  <TranslatedText text="Instant WhatsApp Booking" />
                </Button>
              </a>

              <Link href="/pednecar" className="w-full">
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-6 rounded-2xl text-base shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all">
                  <TranslatedText text="Visit Dedicated PedneCar Page" />
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
