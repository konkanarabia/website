'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Car,
  Utensils,
  ShieldCheck,
  Plane,
  Award,
  Sparkles,
  Users,
  Hotel,
  ArrowRight,
  CheckCircle2,
  CalendarCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import TranslatedText from '@/components/TranslatedText';
import { ease, fadeUp, inView, spring, stagger } from '@/lib/motion';

type CategoryId = 'all' | 'tours' | 'pednecar' | 'hospitality' | 'logistics';

interface SkillItem {
  id: string;
  category: CategoryId;
  title: string;
  badge: string;
  description: string;
  features: string[];
  icon: any;
  link: string;
  ctaText: string;
}

const categories = [
  { id: 'all' as const, label: 'All Capabilities' },
  { id: 'tours' as const, label: 'Curated Tours' },
  { id: 'pednecar' as const, label: 'PedneCar Taxi & Fleet' },
  { id: 'hospitality' as const, label: 'Hospitality & Dining' },
  { id: 'logistics' as const, label: 'VIP Logistics & Visas' },
];

const skills: SkillItem[] = [
  {
    id: 'dubai-luxury',
    category: 'tours',
    title: 'Dubai & International Bespoke Holidays',
    badge: 'Flagship Tour Craft',
    description: 'Expertly designed itineraries across Dubai, UAE, Vietnam, and global destinations with 5-star desert safaris, yacht charters, and private guides.',
    features: ['Burj Khalifa Sky Access', 'Private Desert Safari', 'VIP Yacht Charter', 'Curated Dining'],
    icon: Sparkles,
    link: '/destinations',
    ctaText: 'Explore Packages',
  },
  {
    id: 'pednecar-transfers',
    category: 'pednecar',
    title: 'PedneCar Tourist Taxi & Airport Transfers',
    badge: 'Signature Goa Fleet',
    description: 'Premier tourist taxi service across Goa, featuring pristine Toyota Rumion 7-seater MUVs, executive sedans, and luxury Tempo Travelers with professional chauffeurs.',
    features: ['MOPA & Dabolim 24/7', 'Clean AC Fleet', 'Fixed Transparent Fares', 'Verified Drivers'],
    icon: Car,
    link: '/pednecar',
    ctaText: 'Book PedneCar Taxi',
  },
  {
    id: 'mumbai-malabar-express',
    category: 'hospitality',
    title: 'Mumbai to Malabar Food Express',
    badge: 'Franchise Opportunity',
    description: 'A celebrated culinary franchise celebrating the coastal gastronomic belt from CST Mumbai to Malabar Kerala. Multi-format franchise models for entrepreneurs.',
    features: ['High-ROI Model', 'Authentic Coastal Flavors', 'Turnkey Setup Support', 'India & UAE Expansion'],
    icon: Utensils,
    link: '/franchise',
    ctaText: 'View Franchise Deck',
  },
  {
    id: 'resorts-villas',
    category: 'hospitality',
    title: 'Luxury Resorts & Heritage Stays',
    badge: 'Hospitality Management',
    description: 'End-to-end management and verified booking partnerships with handpicked beachfront properties, heritage villas, and luxury boutique retreats.',
    features: ['Direct Owner Tariffs', 'Beachfront Locations', 'Private Pool Villas', 'Corporate Retreats'],
    icon: Hotel,
    link: '/hospitality',
    ctaText: 'Explore Stays',
  },
  {
    id: 'uae-visas',
    category: 'logistics',
    title: 'Certified UAE Visa Processing',
    badge: 'Government Certified',
    description: 'Swift, reliable visa consultation and document processing for Dubai tourist, transit, and business travel with near-100% approval rates.',
    features: ['30 & 60-Day Visas', 'Express 24h Processing', 'Hassle-Free Documentation', 'Group Visa Rates'],
    icon: Plane,
    link: '/visas',
    ctaText: 'Apply for Visa',
  },
  {
    id: 'events-logistics',
    category: 'logistics',
    title: 'Destination Weddings & Event Management',
    badge: 'Turnkey Ground Ops',
    description: 'Seamless ground mobility, venue coordination, and guest concierge for grand destination weddings, corporate summits, and cultural celebrations.',
    features: ['Multi-Coach Logistics', 'VIP Guest Shuttles', 'Goa & Dubai Venues', 'On-Site Fleet Marshals'],
    icon: CalendarCheck,
    link: '/events',
    ctaText: 'Plan Your Event',
  },
];

const metrics = [
  { value: '10,000+', label: 'Happy Guests Hosted' },
  { value: '100%', label: 'Verified & Insured Fleet' },
  { value: '24 / 7', label: 'Airport Dispatch Desk' },
  { value: '4.9 / 5', label: 'Verified Traveler Reviews' },
];

export default function SkillsShowcase() {
  const [activeTab, setActiveTab] = useState<CategoryId>('all');

  const filteredSkills = activeTab === 'all' 
    ? skills 
    : skills.filter(item => item.category === activeTab);

  return (
    <section id="capabilities-skills" className="py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      {/* Ambient background blur elements matching freshcart-landing design */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-28 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-28 w-96 h-96 rounded-full bg-sky-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-bold uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <TranslatedText text="Core Expertise & Specializations" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 tracking-tight leading-tight mb-5">
            <TranslatedText text='Our Dedicated <span className="text-amber-600">Skills & Services</span>' isHtml />
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-sans">
            <TranslatedText text="From Dubai luxury travel design to PedneCar tourist taxis in Goa and culinary franchising, we blend regional authenticity with royal hospitality." />
          </p>
        </div>

        {/* Animated Filter Tabs with shared layoutId pill — freshcart-landing signature pattern */}
        <div className="flex items-center justify-center mb-12 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 shadow-inner">
            {categories.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    isSelected ? 'text-slate-950' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="skills-tab-pill"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 32,
                      }}
                      className="absolute inset-0 bg-white rounded-xl shadow-md border border-slate-200/60"
                    />
                  )}
                  <span className="relative z-10">
                    <TranslatedText text={tab.label} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Capability Cards Grid with Framer Motion layout & whileHover */}
        <motion.div
          layout
          variants={stagger(0.08, 0.1)}
          {...inView}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const Icon = skill.icon;

              return (
                <motion.div
                  key={skill.id}
                  layout
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -6 }}
                  transition={spring}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 shadow-soft transition-all duration-300 hover:shadow-lift hover:border-amber-500/40 overflow-hidden"
                >
                  {/* Subtle wash of accent color on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-amber-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div>
                    {/* Top row: Icon with rotate spring + Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <motion.div
                        whileHover={{ rotate: -8, scale: 1.08 }}
                        transition={spring}
                        className="w-13 h-13 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shadow-sm"
                      >
                        <Icon className="w-6 h-6" />
                      </motion.div>
                      <span className="text-[11px] font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200 uppercase tracking-wider">
                        <TranslatedText text={skill.badge} />
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                      <TranslatedText text={skill.title} />
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
                      <TranslatedText text={skill.description} />
                    </p>

                    {/* Key features bullet pills */}
                    <div className="space-y-2 mb-8">
                      {skill.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>
                            <TranslatedText text={feature} />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA button with tactile spring */}
                  <Link href={skill.link} className="w-full mt-auto block">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={spring}
                    >
                      <Button className="w-full bg-slate-900 hover:bg-amber-600 text-white font-bold py-5 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer">
                        <span><TranslatedText text={skill.ctaText} /></span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Metrics Banner Strip at bottom of skills section */}
        <motion.div
          variants={fadeUp}
          {...inView}
          className="mt-16 rounded-3xl bg-slate-900 text-white p-8 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10 pointer-events-none" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center relative z-10">
            {metrics.map((metric, mIdx) => (
              <div key={mIdx} className="space-y-1">
                <div className="text-2xl sm:text-4xl font-serif font-black text-amber-400">
                  {metric.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium">
                  <TranslatedText text={metric.label} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
