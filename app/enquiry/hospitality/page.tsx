import type { Metadata } from 'next';
import SpecializedEnquiryForm from '../../components/hospitality-enquiry-form'
import { Hotel, Utensils } from 'lucide-react'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Hospitality & Dining Enquiry | KonkanArabia',
  description: 'Book your stay at Siddhivinayak Devbag Beach Resort or reserve a table at Konkan Swad Restaurant.',
};

export default function HospitalityEnquiryPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Hospitality & <span className="text-[#0066a1]">Dining Enquiry</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Experience the best of Konkan with our premium stays and authentic coastal flavors. 
            Fill out the form below to book your experience.
          </p>
          
          <div className="flex justify-center gap-8 mt-8">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-white rounded-2xl shadow-sm text-[#0066a1]">
                <Hotel className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Premium Stays</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-white rounded-2xl shadow-sm text-[#0066a1]">
                <Utensils className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Authentic Dining</span>
            </div>
          </div>
        </div>

        <Suspense fallback={<div className="text-center py-20">Loading form...</div>}>
          <SpecializedEnquiryForm />
        </Suspense>
        
        <div className="mt-12 text-center text-slate-400 text-sm">
          <p>By submitting this form, you agree to our terms and conditions.</p>
          <p className="mt-1">Our team will get back to you within 24 hours.</p>
        </div>
      </div>
    </div>
  )
}
