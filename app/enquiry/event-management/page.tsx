import type { Metadata } from 'next';
import EventEnquiryForm from '@/app/components/event-enquiry-form';
import { PartyPopper } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Event Management Enquiry | Destination Events | KonkanArabia',
  description: 'Plan your dream destination wedding, corporate retreat, or private party with our expert event management team.',
};

export default function EventManagementEnquiryPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
            <PartyPopper className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Event Management Enquiry</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            From weddings to corporate retreats, we make it happen. Share your vision with us and let's plan something unforgettable.
          </p>
        </div>
        <EventEnquiryForm />
      </div>
    </div>
  );
}
