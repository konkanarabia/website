import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header section with logo and title */}
      <div className="flex flex-col items-center mb-12">
        <Image 
          src="/KonkanArabia-logo.jpg" 
          alt="KonkanArabia Hospitality & Holiday Group" 
          width={160} 
          height={160}
          className="rounded-full shadow-lg mb-6 border-4 border-white"
          priority
        />
        <h1 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">About Us</h1>
        <div className="w-20 h-1 bg-primary rounded mb-6"></div>
        <p className="text-lg text-center text-gray-600 max-w-2xl">
          Discover our journey, mission, and what makes KonkanArabia Hospitality & Holiday Group your ideal travel partner.
        </p>
      </div>

      {/* Content section with cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="overflow-hidden border-none shadow-lg">
          <div className="bg-primary h-2"></div>
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              KonkanArabia is a combine word with the name of two different
              Places in the world map. One is Konkan from Konkan Region of
              Maharashtra India & second is Arabia from the Gulf country United
              Arab Emirates. And it's not just a word but a complete reflection
              of a journey from one nation to another nation in search of new
              business opportunities. And its journey of business progress from
              one country to another country.
            </p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-none shadow-lg">
          <div className="bg-primary h-2"></div>
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              The responsibility to encourage, promote, and develop tourism as a
              major socioeconomic activity to generate foreign currency and
              employment and to spread the benefits of tourism to both the
              private and public sector.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="md:col-span-2 overflow-hidden border-none shadow-lg">
        <div className="bg-primary h-2"></div>
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Why Choose Us</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Expertly Curated Travel</h3>
                <p className="text-sm text-gray-600">Experiences tailored to your preferences</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">24/7 Customer Support</h3>
                <p className="text-sm text-gray-600">Always available to assist you</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Competitive Pricing</h3>
                <p className="text-sm text-gray-600">Flexible booking options available</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Sustainable Tourism</h3>
                <p className="text-sm text-gray-600">Responsible travel practices</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Local Insights</h3>
                <p className="text-sm text-gray-600">Authentic experiences</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
