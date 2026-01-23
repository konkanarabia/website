import type { Metadata } from 'next';
import VehicleEnquiryForm from '@/app/components/vehicle-enquiry-form';
import { Car } from 'lucide-react';

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
        </div>
        <VehicleEnquiryForm />
      </div>
    </div>
  );
}
