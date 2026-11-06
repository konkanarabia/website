"use client";

import React from "react";
import { motion } from "framer-motion";
import TranslatedText from "@/components/TranslatedText";
import { fadeUp, inView, spring, stagger } from "@/lib/motion";

const LOGO_DEV_TOKEN = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN;

const partners = {
  hotels: [
    { name: "Hyatt Group", logo: `https://img.logo.dev/hyatt.com?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "Park Regis", logo: `https://img.logo.dev/parkregishotels.com?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "Hilton", logo: `https://img.logo.dev/hilton.com?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "Radisson", logo: `https://img.logo.dev/radisson.com?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "Crowne Plaza", logo: `https://img.logo.dev/crowneplaza.com?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "Grand Excelsior", logo: `https://img.logo.dev/gehotels.com?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "Arabian Courtyard", logo: `https://img.logo.dev/arabiancourtyard.com?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "Knight Castle Hotel", logo: `https://img.logo.dev/knightcastlehotel.com?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "City Max", logo: `https://img.logo.dev/citymaxhotels.com?token=${LOGO_DEV_TOKEN}&format=webp` },
  ],
  airlines: [
    { name: "IndiGo", logo: `https://img.logo.dev/goindigo.in?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "SpiceJet", logo: `https://img.logo.dev/spicejet.com?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "Air India", logo: "/partners/air-india.svg" },
    { name: "Fly91", logo: `https://img.logo.dev/fly91.in?token=${LOGO_DEV_TOKEN}&format=webp` },
  ],
  tour: [
    { name: "Akbar Travels", logo: `https://img.logo.dev/akbartravels.com?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "Rayna Tours", logo: `https://img.logo.dev/raynatours.com?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "IRCTC", logo: `https://img.logo.dev/irctc.co.in?token=${LOGO_DEV_TOKEN}&format=webp` },
  ],
  booking: [
    { name: "Booking.com", logo: `https://img.logo.dev/booking.com?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "Agoda", logo: `https://img.logo.dev/agoda.com?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "MakeMyTrip", logo: "/partners/makemytrip.svg" },
    { name: "Goibibo", logo: `https://img.logo.dev/goibibo.com?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "Expedia", logo: `https://img.logo.dev/expedia.com?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "Trip.com", logo: `https://img.logo.dev/trip.com?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "Airbnb", logo: `https://img.logo.dev/airbnb.com?token=${LOGO_DEV_TOKEN}&format=webp` },
  ],
  payment: [
    { name: "MasterCard", logo: `https://img.logo.dev/mastercard.com?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "Visa", logo: `https://img.logo.dev/visa.com?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "Diners Club", logo: `https://img.logo.dev/dinersclub.com?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "Amex", logo: `https://img.logo.dev/americanexpress.com?token=${LOGO_DEV_TOKEN}&format=webp` },
    { name: "Razorpay", logo: `https://img.logo.dev/razorpay.com?token=${LOGO_DEV_TOKEN}&format=webp` },
  ],
};

const PartnerSection = ({ title, items }: { title: string; items: { name: string; logo: string }[] }) => (
  <motion.div variants={fadeUp} {...inView} className="mb-14">
    <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center text-slate-800 font-serif">
      <TranslatedText text={title} />
    </h3>
    <motion.div
      variants={stagger(0.04, 0.05)}
      className="flex flex-wrap justify-center gap-4 sm:gap-6 items-center"
    >
      {items.map((partner) => (
        <motion.div
          key={partner.name}
          variants={fadeUp}
          whileHover={{ y: -4, scale: 1.04 }}
          transition={spring}
          className="group relative flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-soft hover:shadow-lift transition-shadow duration-300 w-28 h-28 sm:w-32 sm:h-32 border border-slate-200/80"
        >
          <div className="relative w-20 h-14 sm:w-24 sm:h-16 mb-2 flex items-center justify-center transition-all duration-300 group-hover:scale-108">
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('ui-avatars')) {
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(partner.name)}&background=f3f4f6&color=4b5563&size=128&bold=true`;
                }
              }}
            />
          </div>
          <span className="text-[10px] font-bold text-slate-500 text-center uppercase tracking-wider truncate max-w-full px-1">
            {partner.name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

export default function Partners() {
  return (
    <section className="py-20 bg-slate-50/60 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          variants={fadeUp}
          {...inView}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-black text-slate-900 mb-4 tracking-tight">
            <TranslatedText text="Our Strategic Partners" />
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-4" />
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
            <TranslatedText text="We collaborate with the world's leading airline, hotel, and travel brands to ensure exceptional standards for every journey." />
          </p>
        </motion.div>

        <PartnerSection title="Hotel Partners" items={partners.hotels} />
        <PartnerSection title="Airline Partners" items={partners.airlines} />
        <PartnerSection title="Booking Partners" items={partners.booking} />
        <PartnerSection title="Tour Partners" items={partners.tour} />

        <motion.div
          variants={fadeUp}
          {...inView}
          className="mt-20 pt-16 border-t border-slate-200"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-3 tracking-tight">
              <TranslatedText text="How to Make Payment?" />
            </h2>
            <p className="text-slate-600">
              <TranslatedText text="Secure, encrypted, and flexible payment options across international cards & EMI." />
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-soft hover:shadow-lift transition-shadow duration-300 overflow-hidden border border-slate-200/80">
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <h4 className="text-xl font-bold mb-3 text-slate-900 font-serif">
                    <TranslatedText text="Accepted Methods" />
                  </h4>
                  <p className="text-slate-600 mb-6 font-medium text-sm leading-relaxed">
                    <TranslatedText text="We Accept Mastercard, Visa, Diners, Amex, Debit & Credit Cards through Razorpay secure links." />
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    {partners.payment.map((p) => (
                      <motion.div
                        key={p.name}
                        whileHover={{ scale: 1.1 }}
                        transition={spring}
                        className="h-10 w-16 relative"
                      >
                        <img 
                          src={p.logo} 
                          alt={p.name} 
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (!target.src.includes('ui-avatars')) {
                              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=f3f4f6&color=4b5563&size=128&bold=true`;
                            }
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="bg-amber-50/80 p-8 rounded-2xl border border-amber-200/80">
                  <h4 className="text-xl font-serif font-bold mb-3 text-slate-900">
                    <TranslatedText text="Installment Options" />
                  </h4>
                  <p className="text-slate-700 leading-relaxed font-medium text-sm">
                    <TranslatedText text="Flexible installment options are available based on your Credit Card approvals. Plan your dream trip now and pay at your own pace!" />
                  </p>
                  <div className="mt-5 flex items-center text-amber-700 font-bold text-sm">
                    <span className="text-2xl mr-2 text-amber-600">✓</span>
                    <span>
                      <TranslatedText text="Easy EMI Available on Major Credit Cards" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
