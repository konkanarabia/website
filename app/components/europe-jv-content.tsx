"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Globe, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  MessageSquare, 
  Compass, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Plane,
  Heart,
  Ship,
  Palmtree,
  Building2,
  Users,
  Sun,
  Crown,
  Quote,
  X
} from "lucide-react";
import EnquiryForm from "./enquiry-form";
import TranslatedText from "@/components/TranslatedText";

export default function EuropeJVContent() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const capabilities = [
    {
      icon: Compass,
      title: "TAILOR-MADE JOURNEYS",
      description: "Fully customized private itineraries designed around your specific interests, preferences, and travel style across Europe and Asia.",
      accent: "from-amber-500 to-amber-700"
    },
    {
      icon: Crown,
      title: "LUXURY TRAVEL & PREMIUM HOLIDAYS",
      description: "Carefully selected 5-star hotels, exclusive VIP experiences, private transfers, and ultra-high-quality travel planning.",
      accent: "from-amber-600 to-slate-900"
    },
    {
      icon: Palmtree,
      title: "SAFARIS & WILDLIFE EXPERIENCES",
      description: "Authentic African safaris, nature reserves, guided wildlife tracking, and unforgettable wilderness adventures.",
      accent: "from-emerald-600 to-teal-800"
    },
    {
      icon: Ship,
      title: "CRUISES & VOYAGES",
      description: "Luxury ocean liners, scenic European river cruises, Mediterranean sailing, and boutique expedition cruises worldwide.",
      accent: "from-teal-700 to-slate-900"
    },
    {
      icon: Heart,
      title: "HONEYMOONS & ROMANTIC ESCAPES",
      description: "Unique celebration trips, romantic private beach dining, secluded villas, and bespoke intimate travel itineraries.",
      accent: "from-rose-500 to-pink-700"
    },
    {
      icon: Sun,
      title: "WELLNESS, AYURVEDA & RETREATS",
      description: "Luxury wellness escapes, holistic yoga retreats, authentic Indian Ayurvedic programmes, Panchakarma, and guided detox.",
      accent: "from-orange-500 to-amber-600"
    },
    {
      icon: Building2,
      title: "LUXURY RESORTS & BOUTIQUE STAYS",
      description: "Handpicked luxury castle hotels, historic boutique properties, private chalets, and exclusive eco-resorts worldwide.",
      accent: "from-indigo-600 to-purple-800"
    },
    {
      icon: Users,
      title: "FAMILY & GROUP TRAVEL",
      description: "Custom group itineraries for multi-generational families, private delegations, corporate retreats, and special interest groups.",
      accent: "from-slate-700 to-slate-900"
    }
  ];

  const offerings = [
    "India & Ayurveda Holidays",
    "Goa Wellness Retreats",
    "Kerala Backwaters & Wellness",
    "Cultural & Heritage Journeys",
    "Luxury Train Experiences",
    "Wildlife & Nature Tours",
    "Luxury Beach Holidays",
    "Spiritual & Meditation Retreats",
    "Adventure Experiences",
    "Family Holidays",
    "Honeymoon Experiences",
    "Bespoke Luxury Travel"
  ];

  const hubMarkets = [
    {
      name: "Madrid, Spain",
      role: "European Headquarters",
      img: "/partners/hub-madrid.png",
      description: "Strategic hub connecting Western Europe & Latin America with premium Asian & Global experiences."
    },
    {
      name: "Warsaw, Poland",
      role: "Upcoming Central European Hub",
      img: "/partners/hub-warsaw.png",
      description: "Expanding gateway serving Eastern & Central Europe with personalized travel concierge services."
    },
    {
      name: "London, UK",
      role: "Global Gateway Market",
      img: "/partners/hub-london.png",
      description: "Key international origin for bespoke cultural journeys and luxury wellness retreats."
    },
    {
      name: "Santorini & Mediterranean",
      role: "Luxury & Honeymoon Hub",
      img: "/partners/hub-santorini.png",
      description: "Unrivaled romantic escapes, coastal cruises, and Mediterranean luxury villas."
    },
    {
      name: "Bavaria & Central Europe",
      role: "Heritage & Expedition Hub",
      img: "/partners/hub-bavaria.png",
      description: "Alpine wellness, fairy-tale castles, and rich cultural heritage tour operations."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">
      {/* Top Passion Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white py-2 text-center text-xs md:text-sm font-semibold tracking-wider uppercase shadow-inner">
        <span className="flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <TranslatedText text="Hospitality is our Passion & Culture!" />
          <Sparkles className="w-4 h-4 animate-pulse" />
        </span>
      </div>

      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-20 lg:py-32">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/partners/europe-jv-hero.png"
            alt="Europe Joint Venture Hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs md:text-sm font-medium tracking-widest uppercase backdrop-blur-md">
              <Award className="w-4 h-4 text-amber-400" />
              <span>International Division Partnership</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-extrabold tracking-tight text-white leading-tight">
              PROJECT: EUROPE DIVISION
            </h1>

            <div className="text-xl md:text-3xl font-serif text-amber-400 font-semibold tracking-wide">
              A JOINT INITIATIVE
            </div>

            <p className="text-base md:text-xl text-slate-200 font-light leading-relaxed max-w-3xl mx-auto pt-2">
              <TranslatedText text="KonkanArabia Holidays is proud to present a joint expansion project with our trusted European Partner, Eva Pérez and her Travel Studio. This strategic collaboration is focused on establishing a comprehensive, premier Destination Management Company (DMC) with a special focus on authentic experiences." />
            </p>

            <div className="pt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Send Joint Venture Inquiry</span>
              </button>
              <a
                href="#capabilities"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/20 backdrop-blur-md transition-all duration-300 flex items-center gap-2"
              >
                <span>Explore Capabilities</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Partnership Showcase: KonkanArabia x Eva Pérez */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-14 text-white shadow-2xl relative overflow-hidden border border-slate-700">
            {/* Background Accent Graphics */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Partner Card / Photo */}
              <div className="lg:col-span-5 flex flex-col items-center text-center">
                <div className="relative group">
                  {/* Decorative frame ring */}
                  <div className="absolute -inset-2 bg-gradient-to-tr from-amber-400 via-amber-300 to-amber-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-slate-900 shadow-2xl">
                    <Image
                      src="/partners/eva-perez-portrait.png"
                      alt="Eva Pérez - Joint Venture Partner"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-semibold rounded-full tracking-wider uppercase border border-amber-400/30">
                    Joint Venture Partner
                  </span>
                  <h3 className="text-3xl font-serif font-bold text-white tracking-wide">
                    EVA PÉREZ
                  </h3>
                  <div className="text-slate-300 text-sm font-medium tracking-wide">
                    VISIONARY FOUNDER & LEAD TRAVEL DESIGNER
                  </div>
                </div>

                {/* Travel Studio Badge */}
                <div className="mt-6 bg-slate-950/80 rounded-2xl p-4 border border-amber-500/20 flex items-center justify-center w-full max-w-xs shadow-inner">
                  <div className="text-center">
                    <span className="text-[10px] text-amber-400 tracking-widest uppercase font-semibold block">
                      Partner Brand
                    </span>
                    <span className="text-lg font-serif font-bold tracking-wider text-white">
                      TRAVEL STUDIO
                    </span>
                    <span className="text-xs text-slate-400 italic block">by Eva Pérez</span>
                  </div>
                </div>
              </div>

              {/* Story & Description */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 text-amber-400 font-semibold text-sm tracking-wider uppercase">
                  <Globe className="w-4 h-4" />
                  <span>Strategic Expansion & Global Excellence</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                  Bridging European Travel Expertise with Authentic Asian Hospitality
                </h2>

                <p className="text-slate-300 leading-relaxed text-base md:text-lg font-light">
                  By pooling our expertise, KonkanArabia Holidays and Travel Studio by Eva Pérez are dedicated to setting new benchmarks in personalised travel planning, seamless communication, and dedicated support for every journey. Together, we open the world.
                </p>

                {/* Quote Box */}
                <div className="bg-slate-950/60 rounded-2xl p-6 border-l-4 border-amber-400 relative">
                  <Quote className="w-8 h-8 text-amber-400/20 absolute top-4 right-4" />
                  <p className="text-amber-200 font-serif italic text-base md:text-lg relative z-10">
                    &ldquo;Dedicated to crafting unforgettable journeys, connecting cultures, and creating memories.&rdquo;
                  </p>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-3">
                    — A Message from Eva Pérez
                  </p>
                </div>

                {/* Highlights list */}
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-sm">Personalized Bespoke Itineraries</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-sm">Direct European & Indian Offices</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-sm">24/7 Dedicated Concierge Support</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-sm">Authentic Cultural & Wellness Focus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Joint Venture Capabilities */}
      <section id="capabilities" className="py-20 bg-slate-100">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest bg-amber-100 px-4 py-1.5 rounded-full border border-amber-200">
              Core Offerings & Expertise
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900">
              JOINT VENTURE CAPABILITIES
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full"></div>
            <p className="text-slate-600 text-base md:text-lg">
              Comprehensive Destination Management Company (DMC) services crafted for discerning global travelers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, index) => {
              const IconComp = cap.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cap.accent} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <IconComp className="w-7 h-7" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 font-serif leading-snug">
                      {cap.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed font-light">
                      {cap.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600 group-hover:text-amber-700">
                    <span>Explore Option</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Details & Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left: Project Details & Specialized Offerings */}
            <div className="lg:col-span-7 bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                      PROJECT DETAILS & EXPERIENCES
                    </h3>
                    <p className="text-slate-400 text-sm">Curated specialized travel solutions</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {offerings.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedTopic(item);
                        setIsEnquiryOpen(true);
                      }}
                      className="bg-slate-800/80 hover:bg-amber-500/20 hover:border-amber-400/40 border border-slate-700 rounded-xl p-3.5 flex items-center gap-3 transition-all duration-200 cursor-pointer group"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-125 transition-transform" />
                      <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  Click any experience to send a direct inquiry to our Europe Division.
                </span>
                <button
                  onClick={() => setIsEnquiryOpen(true)}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-sm transition-colors shadow"
                >
                  Request Customized Itinerary
                </button>
              </div>
            </div>

            {/* Right: Contact & Offices */}
            <div className="lg:col-span-5 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-8 md:p-12 shadow-lg flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-200/60 px-3 py-1 rounded-full">
                    Direct Contact
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mt-2">
                    CONTACT INFORMATION
                  </h3>
                </div>

                <div className="space-y-4 text-sm text-slate-700">
                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm border border-amber-100">
                    <Crown className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block">PROJECT LEADERS</span>
                      <span>KonkanArabia Holidays & Eva Pérez</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm border border-amber-100">
                    <Globe className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block">SERVICE AREA & MARKETS</span>
                      <span>Europe | Primary Markets (Spain, Poland, UK, Central Europe, India, UAE)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm border border-amber-100">
                    <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block">PROJECT OFFICES</span>
                      <span>Madrid (Spain) | Warsaw (Poland - Upcoming)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm border border-amber-100">
                    <Phone className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block">WHATSAPP DIRECT</span>
                      <a href="https://wa.me/34661605573" target="_blank" rel="noopener noreferrer" className="text-amber-700 font-bold hover:underline">
                        +34 661 60 55 73 (Europe)
                      </a>
                      <span className="text-xs text-slate-500 block">+91 9370528517 / +971 555995260</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm border border-amber-100">
                    <Instagram className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block">INSTAGRAM</span>
                      <a href="https://www.instagram.com/travelstudio.byevaperez" target="_blank" rel="noopener noreferrer" className="text-amber-700 font-bold hover:underline">
                        @travelstudio.byevaperez
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-amber-200/80 flex flex-col gap-3">
                <a
                  href="https://wa.me/34661605573"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-center shadow transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Chat via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expansion Hub Markets Showcase */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/20 px-4 py-1.5 rounded-full border border-amber-400/30">
              European Network
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
              EXPANSION HUB MARKETS: AUTHENTIC EXPERIENCES
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full"></div>
            <p className="text-slate-300 text-base md:text-lg font-light">
              Connecting Europe with authentic cultural and luxury travel destinations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {hubMarkets.map((hub, idx) => (
              <div
                key={idx}
                className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-700 group hover:border-amber-500/50 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={hub.img}
                    alt={hub.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                      {hub.role}
                    </span>
                    <h4 className="text-base font-serif font-bold text-white">
                      {hub.name}
                    </h4>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {hub.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Closing Banner Quote */}
          <div className="mt-16 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-3xl p-8 md:p-12 text-center text-slate-950 shadow-2xl relative overflow-hidden">
            <Quote className="w-16 h-16 text-slate-950/10 absolute top-4 left-4" />
            <div className="relative z-10 max-w-4xl mx-auto space-y-4">
              <p className="text-lg md:text-2xl font-serif font-bold italic leading-relaxed text-slate-950">
                &ldquo;Connecting Europe with the authentic experiences of KonkanArabia Holidays, through the trusted expertise of Eva Pérez. A shared journey of unparalleled service and support.&rdquo;
              </p>
              <div className="pt-2 text-xs md:text-sm font-semibold uppercase tracking-widest text-slate-900">
                KonkanArabia Holidays & Travel Studio by Eva Pérez Joint Division
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Enquiry Modal */}
      {isEnquiryOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl border border-slate-200">
            <button
              onClick={() => {
                setIsEnquiryOpen(false);
                setSelectedTopic(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                Europe Joint Division Enquiry
              </span>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                {selectedTopic ? `Enquire about ${selectedTopic}` : "Europe Joint Venture Consultation"}
              </h3>
              <p className="text-xs text-slate-500">
                Directly routed to Eva Pérez & KonkanArabia Holidays Europe Desk.
              </p>
            </div>

            <EnquiryForm />
          </div>
        </div>
      )}
    </div>
  );
}
