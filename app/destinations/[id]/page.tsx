"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, PhoneCall, ArrowLeft, CheckCircle2, XCircle, Clock } from "lucide-react";

import { destinations } from "@/lib/destinations-data";


export default function DestinationPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const destination = destinations.find((d) => d.id === id);

  if (!destination) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Destination Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find the destination you're looking for.</p>
        <Link href="/destinations" passHref>
          <Button className="bg-primary">View All Destinations</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative h-[60vh] md:h-[70vh] min-h-[500px]">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 md:px-20 lg:px-32">
            <div className="max-w-4xl">
               <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6 border border-white/20">
                  <MapPin className="h-3 w-3" /> {destination.name}
               </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
                {destination.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-lg max-w-2xl leading-relaxed">
                {destination.description}
              </p>
            </div>
          </div>
        </div>

        {/* Floating Info Bar */}
        <div className="absolute left-1/2 -bottom-12 -translate-x-1/2 w-full max-w-4xl px-4 z-20">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 flex divide-x divide-slate-100 py-6 px-4 md:px-10">
            <div className="flex-1 px-4 md:px-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0066a1]/10 flex items-center justify-center text-[#0066a1] shrink-0">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Duration</p>
                <p className="text-sm md:text-base font-bold text-slate-900 leading-tight">{destination.duration || "5-7 days"}</p>
              </div>
            </div>
            <div className="flex-1 px-4 md:px-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0066a1]/10 flex items-center justify-center text-[#0066a1] shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Location</p>
                <p className="text-sm md:text-base font-bold text-slate-900 leading-tight truncate max-w-[200px]">{destination.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-20 pt-32 pb-20">
        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Explore <span className="text-[#0066a1]">{destination.name}</span></h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-8">{destination.details}</p>
            </div>
            
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-[#0066a1]/10 flex items-center justify-center mr-3">
                  <CheckCircle2 className="h-5 w-5 text-[#0066a1]" />
                </span>
                Experience Highlights
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
              {(destination.highlights || [
                  "Experience the local culture and traditions",
                  "Visit popular attractions and landmarks",
                  "Enjoy authentic local cuisine",
                  "Explore natural beauty and landscapes",
                ]).map((highlight: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-[#0066a1]"></div>
                    <span className="text-slate-700 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            {(destination.inclusions || destination.exclusions) && (
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {destination.inclusions && (
                  <div className="bg-green-50/50 rounded-2xl p-6 border border-green-100">
                    <h3 className="text-xl font-bold mb-4 flex items-center text-green-800">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" /> Inclusions
                    </h3>
                    <ul className="space-y-3">
                      {destination.inclusions.map((item: string, index: number) => (
                        <li key={index} className="flex items-start text-sm text-green-800/80">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {destination.exclusions && (
                  <div className="bg-red-50/50 rounded-2xl p-6 border border-red-100">
                    <h3 className="text-xl font-bold mb-4 flex items-center text-red-800">
                      <XCircle className="mr-2 h-5 w-5 text-red-600" /> Exclusions
                    </h3>
                    <ul className="space-y-3">
                      {destination.exclusions.map((item: string, index: number) => (
                        <li key={index} className="flex items-start text-sm text-red-800/80">
                          <XCircle className="mr-2 h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Itinerary Section */}
            {destination.itinerary && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-8 flex items-center">
                  <Clock className="mr-3 h-6 w-6 text-[#0066a1]" /> Tour Itinerary
                </h3>
                <div className="space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {destination.itinerary.map((item: any, index: number) => (
                    <div key={index} className="relative pl-12">
                      <div className="absolute left-0 top-0 w-9 h-9 rounded-full bg-white border-4 border-[#0066a1] flex items-center justify-center z-10">
                        <span className="text-xs font-bold text-[#0066a1]">{item.day}</span>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <h4 className="text-lg font-bold text-slate-900 mb-2">Day {item.day}: {item.title}</h4>
                        <p className="text-slate-600 leading-relaxed text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <Link href="/destinations" className="inline-flex items-center text-primary hover:underline mb-8">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to all destinations
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4 pb-4 border-b">Book This Trip</h3>
              
              <div className="space-y-6 mb-6">
                <p className="text-gray-700">
                  Ready to experience the beauty of {destination.name}? Contact our travel experts to create your perfect itinerary.
                </p>
                
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center">
                    <PhoneCall className="h-4 w-4 text-primary mr-2" />
                    <span className="font-medium text-sm">+91-9370528517</span>
                  </div>
                  <div className="flex items-center">
                    <PhoneCall className="h-4 w-4 text-primary mr-2" />
                    <span className="font-medium text-sm">+971-555995260</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Link href="/contact" passHref>
                  <Button className="w-full bg-primary hover:bg-primary/90 mb-4">Enquire Now</Button>
                </Link>
                <Link href="/destinations" passHref>
                  <Button variant="outline" className="w-full">View Other Destinations</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Destinations Section (Optional) */}
      {/* You could add related destinations here */}
    </div>
  );
}
