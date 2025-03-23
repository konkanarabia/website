import EnquiryForm from '../components/enquiry-form'

export default function EnquiryPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-primary text-center">Plan Your Dream Trip</h1>
        <p className="text-lg mb-8 text-gray-600 text-center">Fill out the form below and our travel experts will create a personalized itinerary just for you.</p>
        <EnquiryForm />
      </div>
    </div>
  )
}

