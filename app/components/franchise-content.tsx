"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Utensils,
  Train,
  Store,
  DollarSign,
  TrendingUp,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  Building2,
  Sparkles,
  Award,
  ChevronRight,
  Send,
  Loader2,
  Layers,
  ChefHat,
  Users,
  Compass
} from "lucide-react";
import TranslatedText from "@/components/TranslatedText";

const STATIONS = [
  {
    code: "CST",
    station: "C.S.T. Mumbai",
    state: "Maharashtra",
    image: "/services/franchise/c-s-t-mumbai-station-board.jpg",
    tagline: "The Bustling Street Flavors of Bombay",
    dishes: ["Bombay Vada Pav & Misal", "Pav Bhaji & Bun Maska", "Coastal Street Chaat", "Cutting Chai & Frankie"],
    color: "from-amber-500 to-orange-600",
  },
  {
    code: "SND",
    station: "Sindhudurg",
    state: "Konkan Maharashtra",
    image: "/services/franchise/sindhudurg-konkan-station-board.jpg",
    tagline: "Authentic Malvani Coastal Soul",
    dishes: ["Malvani Surmai & Prawn Thali", "Kombdi Vade with Coconut Rassa", "Fresh Solkadhi & Tisrya Masala", "Ukadiche Modak"],
    color: "from-red-500 to-amber-600",
  },
  {
    code: "MAO",
    station: "Madgaon",
    state: "Goa",
    image: "/services/franchise/madgaon-goa-station-board.jpg",
    tagline: "Portuguese-Goan Heritage Flavors",
    dishes: ["Authentic Goan Fish Curry Thali", "Prawn Balchão & Xacuti", "Goan Poi Sandwiches", "Bebinca & Dodol Desserts"],
    color: "from-amber-400 to-yellow-600",
  },
  {
    code: "MAQ",
    station: "Mangaluru",
    state: "Karnataka",
    image: "/services/franchise/mangaluru-karnataka-station-board.jpg",
    tagline: "Tulu Coastal Gastronomy & Ghee Roasts",
    dishes: ["Kundapura Chicken & Prawn Ghee Roast", "Neer Dosa with Kori Rotti", "Mangalore Fish Pulimunchi", "Mangalore Buns & Filter Coffee"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    code: "ERS",
    station: "Ernakulam",
    state: "Kerala",
    image: "/services/franchise/ernakulam-kerala-station-board.jpg",
    tagline: "God's Own Country Spice Trail",
    dishes: ["Malabar Porotta & Roast", "Appam with Coconut Milk Stew", "Karimeen Pollichathu (Banana Leaf)", "Thalassery Biryani & Payasam"],
    color: "from-teal-500 to-cyan-600",
  },
];

const FORMATS = [
  {
    id: "cart",
    name: "Food Cart & Mobile Kiosk",
    tag: "High Footfall / Quick Turnaround",
    space: "60 – 120 sq. ft.",
    investment: "₹8L – ₹15L (India) / $15K – $25K (Intl)",
    idealFor: "Metro Stations, Tech Parks, College Zones, Transit Hubs",
    payback: "8 – 14 Months",
    highlights: ["Minimal Capex & Fast Setup", "Grab-and-Go Coastal Snacks", "Single / Dual Operator Staffing"],
    icon: Store,
  },
  {
    id: "stall",
    name: "Outdoor Food Stall / Container",
    tag: "Casual & Festival Magnet",
    space: "120 – 250 sq. ft.",
    investment: "₹15L – ₹25L (India) / $25K – $40K (Intl)",
    idealFor: "Beach Fronts, Food Streets, Drive-In Plazas, Events",
    payback: "10 – 16 Months",
    highlights: ["Thematic Railway & Coastal Aesthetic", "Hot Live-Cooking Counter", "High Evening & Weekend Volume"],
    icon: Utensils,
  },
  {
    id: "qsr",
    name: "QSR in Mall Food Court",
    tag: "High Volume / Rapid Service",
    space: "250 – 500 sq. ft.",
    investment: "₹25L – ₹45L (India) / $40K – $75K (Intl)",
    idealFor: "Shopping Malls, Airport Terminals, Highway Plazas",
    payback: "12 – 18 Months",
    highlights: ["Standardized Combo Thalis", "Centralized Prep & Fast Turnaround", "High Margin Beverages & Snacks"],
    icon: TrendingUp,
  },
  {
    id: "casual",
    name: "Casual Dining Restaurant",
    tag: "Family & Destination Dining",
    space: "800 – 1,500 sq. ft.",
    investment: "₹50L – ₹85L (India) / $80K – $140K (Intl)",
    idealFor: "Urban High Streets, Residential Hubs, Commercial Centers",
    payback: "18 – 24 Months",
    highlights: ["40–70 Seater Air-Conditioned Dining", "Full 5-Region Coastal Menu", "Strong Delivery & Dine-In Blend"],
    icon: Users,
  },
  {
    id: "fine",
    name: "Fine Dining Coastal Bistro",
    tag: "Premium Experiential Dining",
    space: "1,500 – 3,000 sq. ft.",
    investment: "₹90L – ₹1.5Cr (India) / $150K – $250K (Intl)",
    idealFor: "Upscale Neighborhoods, 5-Star Hotel Hubs, Waterfronts",
    payback: "20 – 28 Months",
    highlights: ["Gourmet Coastal Plating & Bar", "Private Dining Rooms (PDR)", "High Average Order Value (AOV)"],
    icon: ChefHat,
  },
  {
    id: "theme",
    name: "Theme Flagship Restaurant",
    tag: "Immersive Railway Dining Experience",
    space: "3,000+ sq. ft.",
    investment: "₹1.5Cr – ₹3Cr (India) / $250K – $500K (Intl)",
    idealFor: "City Landmark Spots, Tourism Corridors, Entertainment Zones",
    payback: "24 – 36 Months",
    highlights: ["Vintage Train Dining Coach Architecture", "Live Station-Themed Food Hubs", "Iconic Culinary Tourism Attraction"],
    icon: Train,
  },
];

const ADVANTAGES = [
  {
    icon: ChefHat,
    title: "Proprietary Masalas & Central Sourcing",
    description: "Standardized spice blends and secret recipes supplied from our central commissary ensure 100% taste consistency across all locations.",
  },
  {
    icon: Layers,
    title: "Turnkey Kitchen & Design SOPs",
    description: "Complete 3D store layouts, kitchen equipment specifications, POS software setup, and operational checklists delivered from day one.",
  },
  {
    icon: Users,
    title: "Master Chef & Staff Training",
    description: "Comprehensive 4-week training program for your kitchen and service team, along with continuous operational auditing and backup staffing.",
  },
  {
    icon: Compass,
    title: "Multi-Country & Multi-Format Scalability",
    description: "Flexible models suitable for tier-1 cities, highway corridors, tourist destinations, and international markets (UAE, Singapore, Malaysia).",
  },
  {
    icon: TrendingUp,
    title: "High ROI & Low Wastage Model",
    description: "Streamlined menu engineering and portion controls maximize gross margins (65%+ on food) and ensure rapid capital recovery.",
  },
  {
    icon: ShieldCheck,
    title: "Backed by KonkanArabia Group",
    description: "Over 15 years of proven excellence in coastal resorts, restaurants, event management, and international joint ventures.",
  },
];

export default function FranchiseContent() {
  const [activeStation, setActiveStation] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState<string>("QSR in Food Court");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    fname: "",
    company: "",
    email: "",
    phone: "",
    country: "India",
    itype: "Individual Investor",
    format: "QSR in Food Court",
    budget: "₹15L-45L / AED 200K-500K / $40K-75K",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectFormatFromCards = (formatName: string) => {
    setSelectedFormat(formatName);
    setFormData((prev) => ({ ...prev, format: formatName }));
    const element = document.getElementById("enquiry-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/franchise-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setIsSuccess(true);
      const element = document.getElementById("enquiry-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err: any) {
      console.error("Franchise enquiry error:", err);
      setErrorMsg(err.message || "An unexpected error occurred. Please try again or reach out on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-slate-800 min-h-screen font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 bg-gradient-to-b from-amber-50/60 via-slate-50/80 to-white border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(245,158,11,0.12),rgba(255,255,255,0))] pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-900 text-xs sm:text-sm font-bold tracking-wider uppercase shadow-sm animate-fade-in">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>A KonkanArabia Hospitality Group Concept</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-slate-900 leading-tight">
              MUMBAI TO MALABAR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">
                FOOD EXPRESS
              </span>
            </h1>

            <p className="text-lg sm:text-2xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
              Franchise &amp; Business Partnership Opportunities across India, UAE &amp; South East Asia. An authentic coastal culinary journey across 5 iconic regions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#enquiry-section"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 rounded-2xl font-bold text-lg shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                <span>Partner With Us / Apply</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#formats-section"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 rounded-2xl font-bold text-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Explore Formats</span>
                <ChevronRight className="w-5 h-5 text-amber-600" />
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 max-w-3xl mx-auto text-left">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-md shadow-slate-900/5">
                <div className="text-2xl sm:text-3xl font-black text-amber-600 font-serif">5</div>
                <div className="text-xs sm:text-sm text-slate-600 font-semibold">Coastal Regions</div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-md shadow-slate-900/5">
                <div className="text-2xl sm:text-3xl font-black text-amber-600 font-serif">6</div>
                <div className="text-xs sm:text-sm text-slate-600 font-semibold">Scalable Formats</div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-md shadow-slate-900/5">
                <div className="text-2xl sm:text-3xl font-black text-amber-600 font-serif">65%+</div>
                <div className="text-xs sm:text-sm text-slate-600 font-semibold">Gross Margins</div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-md shadow-slate-900/5">
                <div className="text-2xl sm:text-3xl font-black text-amber-600 font-serif">Turnkey</div>
                <div className="text-xs sm:text-sm text-slate-600 font-semibold">SOP &amp; Supply Support</div>
              </div>
            </div>

            {/* Concept Artwork Showcase */}
            <div className="pt-8 max-w-4xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-900/5 bg-white p-3">
                <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden">
                  <Image
                    src="/services/franchise/mumbai-to-malabar-food-express-journey-t.jpg"
                    alt="Mumbai to Malabar Food Express — Journey through Indian coastal food culture"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Train Route Visual Banner */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden border border-amber-200/70 bg-gradient-to-br from-amber-50/50 via-white to-white shadow-xl shadow-amber-900/5 p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-amber-800 text-xs font-bold tracking-widest uppercase bg-amber-100/90 px-3 py-1.5 rounded-full border border-amber-300">
                  <Train className="w-4 h-4 text-amber-700" />
                  <span>The Grand Coastal Train Route</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight">
                  One Express. Five Culinary Civilizations.
                </h2>
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                  Inspired by the legendary railway line that hugs the Arabian Sea, Mumbai to Malabar Food Express curates the most celebrated street foods, home-style thalis, and coastal seafood treasures into a single powerhouse restaurant brand.
                </p>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {["Mumbai Street", "Sindhudurg Malvani", "Goan Heritage", "Mangaluru Ghee Roast", "Kerala Spice"].map((tag, idx) => (
                    <span key={idx} className="px-3.5 py-1.5 rounded-xl bg-white border border-amber-200 text-amber-800 text-xs font-bold shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <Image
                  src="/services/franchise/the-mumbai-to-malabar-food-express-train.jpg"
                  alt="Mumbai to Malabar Food Express Train"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 shadow-md text-xs text-slate-800 font-bold flex items-center justify-between">
                  <span>Track Line: CST → SND → MAO → MAQ → ERS</span>
                  <span className="text-emerald-700 flex items-center gap-1">● Route Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Station-by-Station Showcase */}
      <section id="stations-section" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h3 className="text-amber-700 font-bold text-xs uppercase tracking-[0.25em]">The Coastal Flavor Rail</h3>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900">5 Station Flavors on One Menu</h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Click through the stations along our coastal railway route to explore the authentic culinary specialties.
            </p>
          </div>

          {/* Station Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {STATIONS.map((st, idx) => (
              <button
                key={st.code}
                onClick={() => setActiveStation(idx)}
                className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center gap-2 border ${
                  activeStation === idx
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/25 scale-105"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50/50 hover:border-amber-300"
                }`}
              >
                <span className="text-xs px-2 py-0.5 rounded-md bg-slate-200/80 font-mono font-black text-slate-800">{st.code}</span>
                <span>{st.station}</span>
              </button>
            ))}
          </div>

          {/* Active Station Card */}
          <div className="max-w-5xl mx-auto bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden shadow-xl shadow-slate-900/5 p-6 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 relative h-56 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <Image
                  src={STATIONS[activeStation].image}
                  alt={STATIONS[activeStation].station}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                    {STATIONS[activeStation].state}
                  </span>
                  <h4 className="text-2xl font-bold text-white font-serif">{STATIONS[activeStation].station}</h4>
                </div>
              </div>

              <div className="md:col-span-7 space-y-6">
                <div>
                  <div className="text-amber-800 font-serif italic text-lg sm:text-xl mb-1">
                    "{STATIONS[activeStation].tagline}"
                  </div>
                  <div className="text-slate-600 text-sm">
                    Signature dishes curated and supplied with proprietary spices from KonkanArabia Group.
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="text-xs uppercase font-bold tracking-wider text-slate-700">Signature Specialties:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {STATIONS[activeStation].dishes.map((dish, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-white border border-slate-200/90 text-sm text-slate-800 shadow-sm">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span className="font-medium">{dish}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <a
                    href="#enquiry-section"
                    className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors"
                  >
                    <span>Inquire about this station's menu franchise</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formats Section */}
      <section id="formats-section" className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h3 className="text-amber-700 font-bold text-xs uppercase tracking-[0.25em]">Scalable Business Models</h3>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900">6 Investment Formats</h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Tailored for food courts, high streets, highways, airports, and luxury hospitality destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {FORMATS.map((fmt) => {
              const IconComp = fmt.icon;
              const isSelected = selectedFormat === fmt.name;

              return (
                <div
                  key={fmt.id}
                  className={`rounded-3xl border transition-all duration-300 p-8 flex flex-col justify-between ${
                    isSelected
                      ? "bg-white border-2 border-amber-500 shadow-2xl shadow-amber-500/15 scale-[1.02]"
                      : "bg-white border-slate-200/90 hover:border-amber-300 hover:shadow-lg shadow-sm"
                  }`}
                >
                  <div className="space-y-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="p-3.5 rounded-2xl bg-amber-100 border border-amber-300 text-amber-800 shadow-sm">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-wider">
                        {fmt.tag}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2 font-serif">{fmt.name}</h4>
                      <div className="space-y-2 text-sm text-slate-700">
                        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                          <span className="text-slate-500">Space:</span>
                          <span className="font-bold text-slate-900">{fmt.space}</span>
                        </div>
                        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                          <span className="text-slate-500">Est. Investment:</span>
                          <span className="font-bold text-amber-700">{fmt.investment}</span>
                        </div>
                        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                          <span className="text-slate-500">Est. Payback:</span>
                          <span className="font-bold text-emerald-700">{fmt.payback}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs uppercase font-bold text-slate-500 tracking-wider">Key Highlights:</div>
                      <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                        {fmt.highlights.map((hl, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8">
                    <button
                      onClick={() => handleSelectFormatFromCards(fmt.name)}
                      className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                        isSelected
                          ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                          : "bg-slate-100 hover:bg-amber-50 text-slate-800 border border-slate-200 hover:border-amber-300"
                      }`}
                    >
                      <span>Select This Format</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h3 className="text-amber-700 font-bold text-xs uppercase tracking-[0.25em]">Strategic Advantage</h3>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900">Why Franchise With KonkanArabia?</h2>
            <p className="text-slate-600 text-base sm:text-lg">
              We provide an end-to-end ecosystem so franchise owners can focus on revenue and hospitality while we handle recipes, supply chains, and staff training.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {ADVANTAGES.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-amber-400/80 hover:bg-amber-50/20 transition-all duration-300 space-y-4 hover:shadow-xl hover:shadow-slate-900/5 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 font-serif">{adv.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{adv.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section id="enquiry-section" className="py-24 bg-gradient-to-b from-slate-50 via-white to-amber-50/40 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Send className="w-3.5 h-3.5 text-amber-700" />
                <span>Confidential Franchise Prospectus</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900">Apply for Franchise Partnership</h2>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
                Fill out the application below. Our business development team will review your profile and share our full Investment Deck &amp; Financial Model.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-12 shadow-2xl shadow-slate-900/10 relative overflow-hidden">
              {isSuccess ? (
                <div className="text-center py-12 space-y-6 animate-fade-in">
                  <div className="w-20 h-20 bg-emerald-100 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-serif font-bold text-slate-900">Franchise Application Received!</h3>
                    <p className="text-slate-600 max-w-lg mx-auto text-base">
                      Thank you, <strong className="text-amber-700">{formData.fname}</strong>. Our Franchise Development team has received your enquiry for the{" "}
                      <strong className="text-amber-700">{formData.format}</strong> format.
                    </p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-sm text-slate-700 space-y-2 shadow-inner">
                    <p>
                      A confirmation email has been dispatched to <strong className="text-slate-900">{formData.email}</strong>.
                    </p>
                    <p className="text-xs text-slate-500">
                      Our business manager will reach out within 24 hours via Phone / WhatsApp.
                    </p>
                  </div>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href={`https://wa.me/919370528517?text=Hi%20KonkanArabia%20Team%2C%20I%20just%20submitted%20a%20franchise%20enquiry%20for%20Mumbai%20to%20Malabar%20Food%20Express.%20My%20name%20is%20${encodeURIComponent(
                        formData.fname
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp (+91-9370528517)</span>
                    </a>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          fname: "",
                          company: "",
                          email: "",
                          phone: "",
                          country: "India",
                          itype: "Individual Investor",
                          format: "QSR in Food Court",
                          budget: "₹15L-45L / AED 200K-500K / $40K-75K",
                          message: "",
                        });
                      }}
                      className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-sm border border-slate-200 transition-all"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Full Name <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="fname"
                        required
                        value={formData.fname}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all text-sm font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. RS Ventures Pvt Ltd"
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Email Address <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. rahul@example.com"
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all text-sm font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Phone / WhatsApp <span className="text-amber-600">*</span> <span className="text-slate-400 font-normal">(with code)</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 / +971 / +65 ..."
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Country / Target Region <span className="text-amber-600">*</span>
                      </label>
                      <select
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all text-sm font-medium"
                      >
                        <option value="India">India</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Thailand">Thailand</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Other">Other International</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Investor Profile <span className="text-amber-600">*</span>
                      </label>
                      <select
                        name="itype"
                        required
                        value={formData.itype}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all text-sm font-medium"
                      >
                        <option value="Individual Investor">Individual Investor</option>
                        <option value="MSME / Business Owner">MSME / Business Owner</option>
                        <option value="Franchise Operator / Multi-Unit">Franchise Operator / Multi-Unit</option>
                        <option value="F&B Corporate Group">F&B Corporate Group</option>
                        <option value="Property Owner / Space Provider">Property Owner / Space Provider</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Preferred Format <span className="text-amber-600">*</span>
                      </label>
                      <select
                        name="format"
                        required
                        value={formData.format}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all text-sm font-medium"
                      >
                        <option value="Food Cart & Mobile Kiosk">Food Cart &amp; Mobile Kiosk (60–120 sq ft)</option>
                        <option value="Outdoor Food Stall">Outdoor Food Stall / Container (120–250 sq ft)</option>
                        <option value="QSR in Food Court">QSR in Food Court (250–500 sq ft)</option>
                        <option value="Casual Dining">Casual Dining (800–1,500 sq ft)</option>
                        <option value="Fine Dining">Fine Dining (1,500–3,000 sq ft)</option>
                        <option value="Theme Restaurant (Flagship)">Theme Restaurant Flagship (3,000+ sq ft)</option>
                        <option value="Master Franchise / Multiple Units">Master Franchise / Multiple Units</option>
                        <option value="Not Sure Yet">Not Sure Yet (Need Advisory)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Investment Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all text-sm font-medium"
                      >
                        <option value="Under ₹15L / AED 200K / $40K">Under ₹15L / AED 200K / $40K</option>
                        <option value="₹15L-45L / AED 200K-500K / $40K-75K">₹15L – 45L / AED 200K – 500K / $40K – 75K</option>
                        <option value="₹45L-1.2Cr / AED 500K-1.5M / $75K-150K">₹45L – 1.2Cr / AED 500K – 1.5M / $75K – 150K</option>
                        <option value="₹1.2Cr+ / AED 1.5M+ / $150K+">₹1.2Cr+ / AED 1.5M+ / $150K+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Message / Proposed Location / Questions
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your preferred city/location, current business background, or questions you have..."
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all text-sm font-medium resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 rounded-2xl font-bold text-lg shadow-xl shadow-amber-500/25 hover:shadow-amber-500/35 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Franchise Application</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-500 font-medium">
                    Your details are held strictly confidential and used solely to evaluate franchise suitability.
                  </p>
                </form>
              )}
            </div>

            {/* Direct Connect Options */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="font-bold text-slate-900 text-sm">India Hotline</div>
                <a href="tel:+919370528517" className="text-amber-700 hover:underline text-xs block font-mono font-bold">
                  +91-9370528517 / 9326380922
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="font-bold text-slate-900 text-sm">Dubai / International</div>
                <a href="tel:+971557337618" className="text-amber-700 hover:underline text-xs block font-mono font-bold">
                  +971-557337618 / 0555995260
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="font-bold text-slate-900 text-sm">Email Inquiries</div>
                <a href="mailto:bookings@konkanarabiahospitalitygroup.com" className="text-amber-700 hover:underline text-xs block break-all font-bold">
                  bookings@konkanarabiahospitalitygroup.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
