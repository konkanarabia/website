import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function ThankYouPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-6">Thank You for Your Enquiry!</h1>
      <p className="text-xl mb-8">We've received your message and will get back to you shortly.</p>
      <Link href="/">
        <Button>Return to Home</Button>
      </Link>
    </div>
  )
}

