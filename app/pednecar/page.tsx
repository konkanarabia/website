import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
} from 'lucide-react';
import TranslatedText from '@/components/TranslatedText';

export const metadata: Metadata = {
  title: 'PedneCar • Your Goa Travel Partner | Tourist Vehicle Service Division',
  description: 'Established in 2010. Premier Goa tourist taxi, Toyota Rumion 7-seater MUV, luxury Tempo Travelers, airport transfers (MOPA & Dabolim), hotel bookings, and sightseeing packages in Mapusa & across Goa.',
};

export default function PedneCarPage() {
  const services = [
    {
      icon: <Car className="w-7 h-7 text-amber-600" />,
      title: 'Tourist Taxi & Tempo Traveler',
      description: 'Premier fleet featuring the Toyota Rumion 7-seater MUV, executive sedans, and 12 / 17 / 26 seater luxury tempo travelers with professional chauffeurs.',
      tag: 'Core Division',
    },
    {
      icon: <Hotel className="w-7 h-7 text-amber-600" />,
      title: 'Hotels Booking',
      description: 'Partner rates for handpicked beachfront resorts, heritage Portuguese villas, and luxury boutique stays across North & South Goa.',
      tag: 'Accommodations',
    },
    {
      icon: <CalendarCheck className="w-7 h-7 text-amber-600" />,
      title: 'Events Booking',
      description: 'Comprehensive transport coordination for destination weddings, corporate delegations, music festivals, and VIP escorts across Goa.',
      tag: 'Weddings & Corporate',
    },
    {
      icon: <Compass className="w-7 h-7 text-amber-600" />,
      title: 'Tours & Sightseeing',
      description: 'Customized itineraries covering North Goa beaches, Old Goa cathedrals, Dudhsagar waterfalls, spice plantations, and backwater boat cruises.',
      tag: 'Custom Itineraries',
    },
  ];

  const fleet = [
    {
      name: 'Toyota Rumion (7-Seater)',
      tagline: 'The Signature Tourist Vehicle of PedneCar',
      badge: 'Featured Fleet Star',
      capacity: '6 - 7 Passengers + Chauffeur',
      description: 'The Toyota Rumion is our most popular and versatile family MUV. Spacious, fuel-efficient, and equipped with individual AC vents for all rows, it glides effortlessly through Goa coastal roads and historic towns.',
      features: [
        'Spacious 7-seater 3-row layout',
        'Dual-zone powerful air conditioning',
        'Large expandable luggage boot',
        'Smooth suspension for Goan roads',
        '24/7 Airport pickup (MOPA & Dabolim)',
        'Experienced verified chauffeur'
      ],
      image: '/vehicles/pednecar-toyota-rumion.jpg',
      link: '/enquiry/vehicle-rental'
    },
    {
      name: 'Luxury Tempo Traveler',
      tagline: '12 / 17 / 26 Seater Executive Coach',
      badge: 'Group & Wedding Favorite',
      capacity: '12 to 26 Seats Available',
      description: 'High-roof Force Tempo Traveler featuring pushback executive seats, surround audio system, wide aisles, and a dedicated high-capacity luggage compartment for large tour groups.',
      features: [
        'Pushback luxury reclining seats',
        'High-output twin chill AC',
        'Integrated PA system & LED screen',
        'Large dedicated luggage boot (15+ bags)',
        'Destination wedding guest shuttles',
        'Outstation & sightseeing permits'
      ],
      image: '/vehicles/vehicle-2.webp',
      link: '/enquiry/vehicle-rental'
    },
    {
      name: 'Executive Tourist Sedans',
      tagline: 'Maruti Swift Dzire • Toyota Etios',
      badge: 'Swift & Economical',
      capacity: '4 Passengers + Chauffeur',
      description: 'Comfortable, compact air-conditioned sedans ideal for couples, solo travelers, business visits, and quick point-to-point transfers across Goa.',
      features: [
        'Chilled air conditioning',
        'Fits 2-3 medium suitcases',
        'Non-smoking, spotless interiors',
        'Fast navigation through narrow village lanes',
        'Punctual airport & railway transfers',
        'Distance-based transparent rates'
      ],
      image: '/vehicles/vehicle-1.webp',
      link: '/enquiry/vehicle-rental'
    },
  ];

  return (
    <main className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Hero Banner Section */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-200/80 bg-slate-900 mb-16 group">
          <div className="relative h-80 sm:h-96 md:h-[480px] w-full">
            <Image
              src="/vehicles/pednecar-hero-banner.jpg"
              alt="PedneCar Goa Tourist Vehicle Service - Your Goa Travel Partner"
              fill
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl bg-slate-950/75 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500 text-slate-950 rounded-full text-xs font-black uppercase tracking-widest mb-3">
                  <Award className="w-4 h-4" />
                  <TranslatedText text="EST. 2010 • GOA BRANCH • GoiCar Head Office" />
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                  <TranslatedText text="PedneCar – Your Goa Travel Partner" />
                </h1>
                <p className="text-amber-400 font-bold text-sm sm:text-base mb-3 uppercase tracking-wider">
                  <TranslatedText text="Tourist Vehicle Service Division • Mapusa, Goa" />
                </p>
                <p className="text-slate-200 text-sm sm:text-base font-medium leading-relaxed">
                  <TranslatedText text="Providing yellow-plate tourist taxis, Toyota Rumion 7-seater family MUVs, and luxury Tempo Travelers with professional chauffeurs throughout North Goa, South Goa, and outstation routes." />
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a href="tel:+918625807465">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-6 rounded-2xl shadow-lg shadow-amber-500/30 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+91 8625807465</span>
                  </Button>
                </a>
                <a
                  href="https://wa.me/918625807465?text=Hello%20PedneCar%2C%20I%20would%20like%20to%20book%20a%20Toyota%20Rumion%20%2F%20tourist%20vehicle%20in%20Goa."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-6 rounded-2xl shadow-lg flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <TranslatedText text="WhatsApp Booking" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Banner with the Wooden Plaque */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl">
          <div className="lg:col-span-6 relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-amber-200 shadow-md">
            <Image
              src="/vehicles/pednecar-wood-plaque.jpg"
              alt="PedneCar Official Services Board - Tourist Taxi, Hotels, Events, Tours"
              fill
              className="object-contain bg-amber-950/10 p-2"
            />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <TranslatedText text="15+ Years of Goan Hospitality" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
              <TranslatedText text="Comprehensive Travel Logistics by PedneCar" />
            </h2>

            <p className="text-slate-600 leading-relaxed font-medium">
              <TranslatedText text="Founded in 2010 and headquartered in Mapusa, PedneCar has grown into Goa's premier travel and transport solutions partner. Whether arriving at Manohar International Airport MOPA (GOX) or Dabolim Airport (GOI), our dedicated chauffeurs ensure on-time, courteous, and safe transportation." />
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/60">
                <p className="font-bold text-amber-950 text-base">24/7 Availability</p>
                <p className="text-xs text-amber-800">MOPA, Dabolim, Thivim & Madgaon</p>
              </div>
              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/60">
                <p className="font-bold text-amber-950 text-base">Fleet Special</p>
                <p className="text-xs text-amber-800">Toyota Rumion 7-Seater MUV</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Services Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-amber-700 font-bold uppercase tracking-widest text-xs mb-2">
              <Sparkles className="w-4 h-4" />
              <TranslatedText text="Services on Record" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
              <TranslatedText text="Our Four Signature Verticals" />
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 rounded-3xl bg-white flex flex-col group hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/70 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm">
                    {service.icon}
                  </div>
                  <span className="text-[11px] font-bold tracking-widest text-amber-700 uppercase mb-1">
                    <TranslatedText text={service.tag} />
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                    <TranslatedText text={service.title} />
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium mt-auto">
                    <TranslatedText text={service.description} />
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Fleet Showcase with Toyota Rumion in the Spotlight */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-amber-700 font-bold uppercase tracking-widest text-xs mb-2">
              <Car className="w-4 h-4" />
              <TranslatedText text="PedneCar Fleet Showcase" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">
              <TranslatedText text="Featuring the Toyota Rumion & Luxury Fleet" />
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto mt-2 text-base">
              <TranslatedText text="Engineered for ultimate passenger comfort, luggage capacity, and coastal touring across Goa." />
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {fleet.map((vehicle, index) => (
              <Card key={index} className="border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl bg-white overflow-hidden flex flex-col group">
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md text-amber-400 text-xs font-black px-3.5 py-1.5 rounded-full shadow-md">
                    <TranslatedText text={vehicle.badge} />
                  </div>
                </div>

                <CardContent className="p-6 sm:p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-slate-900 mb-1">
                    <TranslatedText text={vehicle.name} />
                  </h3>
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-4">
                    <TranslatedText text={vehicle.tagline} />
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <Users className="w-4 h-4 text-amber-600 shrink-0" />
                    <span><TranslatedText text={vehicle.capacity} /></span>
                  </div>

                  <p className="text-sm text-slate-600 mb-6 leading-relaxed font-medium">
                    <TranslatedText text={vehicle.description} />
                  </p>

                  <ul className="space-y-2 mb-8 mt-auto border-t border-slate-100 pt-4">
                    {vehicle.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span><TranslatedText text={feat} /></span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/enquiry/vehicle-rental" className="w-full">
                    <Button className="w-full bg-slate-900 hover:bg-amber-600 text-white hover:text-slate-950 font-bold py-5 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2">
                      <TranslatedText text="Book This Vehicle" />
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Office & Direct Contact Card */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden border border-amber-500/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <MapPin className="w-3.5 h-3.5" />
                <TranslatedText text="Head Office • Mapusa, Goa" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight mb-4">
                <TranslatedText text="PedneCar Tourist Vehicle Service Division" />
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed">
                <TranslatedText text="Get in touch directly with our Mapusa booking desk for instant tourist taxi dispatch, Toyota Rumion 7-seater reservations, wedding guest coaches, and customized Goa sightseeing tours." />
              </p>

              <div className="space-y-3.5 mb-8">
                <div className="flex items-start gap-3 text-slate-200 text-sm sm:text-base">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong><TranslatedText text="Office Address:" /></strong> Flat No.203, Magic Marvel, Peddem, Mapusa, Goa 403507
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-200 text-sm sm:text-base flex-wrap">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>
                    <strong><TranslatedText text="Call Desk:" /></strong>{' '}
                    <a href="tel:+918625807465" className="hover:text-amber-400 transition-colors underline font-semibold">+91 8625807465</a> •{' '}
                    <a href="tel:09326380922" className="hover:text-amber-400 transition-colors underline font-semibold">09326380922</a> •{' '}
                    <a href="tel:9370528517" className="hover:text-amber-400 transition-colors underline font-semibold">9370528517</a>
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4">
              <a
                href="https://wa.me/918625807465?text=Hello%20PedneCar%2C%20I%20would%20like%20to%20book%20a%20Toyota%20Rumion%20%2F%20tourist%20vehicle%20in%20Goa."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 rounded-2xl text-base shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all">
                  <MessageCircle className="w-5 h-5" />
                  <TranslatedText text="Book on WhatsApp Now" />
                </Button>
              </a>

              <Link href="/enquiry/vehicle-rental" className="w-full">
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-6 rounded-2xl text-base shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all">
                  <TranslatedText text="Online Rental Enquiry" />
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
