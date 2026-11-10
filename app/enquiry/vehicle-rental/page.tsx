import type { Metadata } from 'next';
import VehicleEnquiryForm from '@/app/components/vehicle-enquiry-form';
import { Car, Phone } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Vehicle Rental Enquiry | Car & Bike Rentals | KonkanArabia',
  description: 'Book a well-maintained car or bike for your next trip. Fast and reliable vehicle rental services with competitive rates.',
};

export default function VehicleRentalEnquiryPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 mb-2">
            <Car className="w-7 h-7 md:w-8 md:h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">Vehicle Rental Enquiry</h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Rent a car or bike for your next trip. Fast, reliable, and well-maintained vehicles at competitive rates.
          </p>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left mt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                <Car className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Looking for PedneCar Goa Tourist Taxis & Fleet?
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Direct Mapusa booking desk: Toyota Rumion 7-seaters, Tempo Travelers & airport cabs.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="tel:+918625807465"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs whitespace-nowrap shadow-sm transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                +91 86258 07465
              </a>
              <Link
                href="/pednecar"
                className="inline-flex items-center px-3.5 py-2 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-xs whitespace-nowrap transition-colors"
              >
                View Fleet
              </Link>
            </div>
          </div>
        </div>
        <VehicleEnquiryForm />
      </div>
    </div>
  );
}
