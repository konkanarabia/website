import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function ThankYouPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-6">Thank You for Your Enquiry!</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 text-green-500 mx-auto mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
          
          <p className="text-lg mb-6">
            We&apos;ve received your travel enquiry and our team of experts will review it shortly.
          </p>
          
          <div className="text-left bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="font-medium text-gray-700 mb-2">What happens next?</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>You&apos;ll receive a confirmation email shortly</li>
              <li>A travel specialist will review your requirements</li>
              <li>We&apos;ll contact you within 24 hours (during business days)</li>
              <li>We&apos;ll work together to create your perfect trip</li>
            </ul>
          </div>

          {/* WhatsApp Instant Concierge Quick-Connect */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-6 mb-8 text-left shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h3 className="font-bold text-emerald-950 text-base">Want to fast-track your trip or get an instant quote?</h3>
            </div>
            <p className="text-xs text-emerald-800 mb-4">
              Our 24/7 travel desk is active on WhatsApp. Chat directly with our private travel concierge:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/919370528517?text=Hi%20KonkanArabia,%20I%20just%20submitted%20an%20enquiry%20on%20your%20website%20and%20would%20like%20to%20connect%20regarding%20my%20trip."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-900/10 transition-all hover:scale-[1.02]"
              >
                <span>💬 WhatsApp India Desk (+91-9370528517)</span>
              </a>
              <a
                href="https://wa.me/971555995260?text=Hi%20KonkanArabia,%20I%20just%20submitted%20an%20enquiry%20on%20your%20website%20and%20would%20like%20to%20connect%20regarding%20my%20trip."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md shadow-emerald-900/10 transition-all hover:scale-[1.02]"
              >
                <span>💬 WhatsApp UAE Desk (+971-555995260)</span>
              </a>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button asChild>
              <Link href="/" className="px-5 py-2">
                Return Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/destinations" className="px-5 py-2">
                Explore Destinations
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

