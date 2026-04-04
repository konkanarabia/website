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

