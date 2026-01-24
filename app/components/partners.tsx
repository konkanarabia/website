"use client";

import React from "react";
import Image from "next/image";

const partners = {
  hotels: [
    { name: "Hyatt Group", logo: "https://img.logo.dev/hyatt.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "Park Regis", logo: "https://img.logo.dev/parkregis.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "Hilton", logo: "https://img.logo.dev/hilton.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "Radisson", logo: "https://img.logo.dev/radissonhotels.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "Crowne Plaza", logo: "https://img.logo.dev/ihg.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "Grand Excelsior", logo: "https://img.logo.dev/grandexcelsior.ae?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "Arabian Courtyard", logo: "https://img.logo.dev/arabiancourtyard.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "Knight Castle Hotel", logo: "https://img.logo.dev/knightcastlehotel.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "City Max", logo: "https://img.logo.dev/citymaxhotels.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
  ],
  airlines: [
    { name: "IndiGo", logo: "https://img.logo.dev/goindigo.in?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "SpiceJet", logo: "https://img.logo.dev/spicejet.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "Air India", logo: "https://img.logo.dev/airindia.in?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "Fly91", logo: "https://img.logo.dev/fly91.in?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
  ],
  tour: [
    { name: "Akbar Travels", logo: "https://img.logo.dev/akbartravels.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "Rayna Tours", logo: "https://img.logo.dev/raynatours.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "IRCTC", logo: "https://img.logo.dev/irctc.co.in?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
  ],
  booking: [
    { name: "Booking.com", logo: "https://img.logo.dev/booking.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "Agoda", logo: "https://img.logo.dev/agoda.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "MakeMyTrip", logo: "https://img.logo.dev/makemytrip.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "Goibibo", logo: "https://img.logo.dev/goibibo.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "Expedia", logo: "https://img.logo.dev/expedia.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "Trip.com", logo: "https://img.logo.dev/trip.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "Airbnb", logo: "https://img.logo.dev/airbnb.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
  ],
  payment: [
    { name: "MasterCard", logo: "https://img.logo.dev/mastercard.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "Visa", logo: "https://img.logo.dev/visa.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "Diners Club", logo: "https://img.logo.dev/dinersclub.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "Amex", logo: "https://img.logo.dev/americanexpress.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
    { name: "Razorpay", logo: "https://img.logo.dev/razorpay.com?token=pk_STV8L7vRSe-0b6Y9Z9Z9ZQ" },
  ],
};

const PartnerSection = ({ title, items }: { title: string; items: { name: string; logo: string }[] }) => (
  <div className="mb-12">
    <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">{title}</h3>
    <div className="flex flex-wrap justify-center gap-6 items-center">
      {items.map((partner) => (
        <div
          key={partner.name}
          className="group relative flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 w-32 h-32 border border-gray-100"
        >
          <div className="relative w-20 h-20 mb-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
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
          <span className="text-[10px] font-bold text-gray-500 text-center uppercase tracking-wider">
            {partner.name}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default function Partners() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Partners</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We collaborate with the world's leading brands to provide you with the best travel experiences.
          </p>
        </div>

        <PartnerSection title="Hotel Partners" items={partners.hotels} />
        <PartnerSection title="Airline Partners" items={partners.airlines} />
        <PartnerSection title="Booking Partners" items={partners.booking} />
        <PartnerSection title="Tour Partners" items={partners.tour} />

        <div className="mt-20 pt-16 border-t border-gray-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How to Make Payment?</h2>
            <p className="text-gray-600">Secure and flexible payment options for your convenience.</p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h4 className="text-xl font-bold mb-4 text-gray-800">Accepted Methods</h4>
                  <p className="text-gray-600 mb-6 font-medium">
                    We Accept Master, Visa, Diners, Amex, Debit & Credit Cards through Razorpay payment links.
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    {partners.payment.map((p: { name: string; logo: string }) => (
                      <div key={p.name} className="h-10 w-16 relative hover:scale-110 transition-all duration-300">
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
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                  <h4 className="text-xl font-bold mb-4 text-blue-900">Installment Options</h4>
                  <p className="text-blue-800 leading-relaxed font-medium">
                    Flexible installment options are available based on your Credit Card approvals. Plan your trip now and pay later!
                  </p>
                  <div className="mt-6 flex items-center text-blue-600 font-bold">
                    <span className="text-2xl mr-2">✓</span>
                    <span>Easy EMI Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
