import type { Metadata } from 'next';
import VisaEnquiryForm from '@/app/components/visa-enquiry-form';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Visa Assistance Enquiry | Travel Documentation | KonkanArabia',
  description: 'Hassle-free visa assistance and documentation for international travel. Expert guidance for tourist and business visas.',
};

export default function VisaServicesEnquiryPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Visa Assistance Enquiry</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Hassle-free documentation and processing for international travel. Tell us about your destination and we'll guide you through.
          </p>
        </div>
        <VisaEnquiryForm />
      </div>
    </div>
  );
}
