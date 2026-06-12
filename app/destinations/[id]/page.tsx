import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pin, Calendar, PhoneCall, ArrowLeft, CheckCircle2, XCircle, Clock } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Destination from "@/lib/models/Destination";
import { notFound } from "next/navigation";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import WeatherPacking from "@/components/WeatherPacking";
import PriceDisplay from "@/components/PriceDisplay";
import ReviewSection from "@/components/ReviewSection";
import { getReviews } from "@/app/actions/reviews";
import TranslatedText from "@/components/TranslatedText";

export default async function DestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  await dbConnect();
  const destination = await Destination.findOne({ id: Number(id) }).lean();

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

  const reviews = await getReviews(Number(id));

  // Cloudinary Optimization
  const optImage = destination.image?.includes("/upload/") 
    ? destination.image.replace("/upload/", "/upload/q_auto,f_auto,w_1600/") 
    : destination.image;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ... Hero Section remains the same ... */}
      <div className="relative h-[60vh] md:h-[70vh] min-h-[500px]">
        <Image
          src={optImage}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
        <div className="absolute inset-0 flex items-center pb-20 md:pb-32">
          <div className="container mx-auto px-6 md:px-20 lg:px-32">
            <div className="max-w-5xl">
               <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6 border border-white/20">
                  <Pin className="h-3 w-3" /> {destination.name}
               </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tighter drop-shadow-2xl text-balance leading-[1.1]">
                <TranslatedText text={destination.name} />
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium drop-shadow-lg max-w-2xl leading-relaxed">
                <TranslatedText text={destination.description} />
              </p>
            </div>
          </div>
        </div>

        {/* Floating Info Bar */}
        <div className="absolute left-1/2 -bottom-20 sm:-bottom-12 -translate-x-1/2 w-full max-w-4xl px-4 z-20">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-slate-100 py-4 sm:py-6 px-4 md:px-10">
            <div className="flex-1 p-4 sm:px-8 flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0066a1]/10 flex items-center justify-center text-[#0066a1] shrink-0">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Duration</p>
                <p className="text-sm md:text-base font-bold text-slate-900 leading-tight">{destination.duration || "5-7 days"}</p>
              </div>
            </div>
            <div className="flex-1 p-4 sm:px-8 flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0066a1]/10 flex items-center justify-center text-[#0066a1] shrink-0">
                <Pin className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Best Time</p>
                <p className="text-sm md:text-base font-bold text-slate-900 leading-tight truncate max-w-[150px] sm:max-w-[200px]">{destination.bestTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-20 pt-24 sm:pt-32 pb-20">
        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Explore <span className="text-[#0066a1]"><TranslatedText text={destination.name} /></span></h2>
              <TranslatedText
                text={destination.details}
                isHtml={true}
                className="text-slate-600 leading-relaxed text-lg mb-8 prose max-w-none block"
              />
            </div>
            
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-[#0066a1]/10 flex items-center justify-center mr-3">
                  <CheckCircle2 className="h-5 w-5 text-[#0066a1]" />
                </span>
                Experience Highlights
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
              {(destination.highlights && destination.highlights.length > 0 ? destination.highlights : [
                  "Experience the local culture and traditions",
                ]).map((highlight: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm transition-all hover:border-[#0066a1]/20">
                    <div className="w-2 h-2 rounded-full bg-[#0066a1] shrink-0"></div>
                    <span className="text-slate-700 font-medium"><TranslatedText text={highlight} /></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            {(destination.inclusions?.length > 0 || destination.exclusions?.length > 0) && (
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {destination.inclusions && destination.inclusions.length > 0 && (
                  <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100">
                    <h3 className="text-xl font-bold mb-4 flex items-center text-emerald-800">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-emerald-600" /> Inclusions
                    </h3>
                    <ul className="space-y-3">
                      {destination.inclusions.map((item: string, index: number) => (
                        <li key={index} className="flex items-start text-sm text-emerald-800/80 font-medium">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                          <TranslatedText text={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {destination.exclusions && destination.exclusions.length > 0 && (
                  <div className="bg-red-50/50 rounded-2xl p-6 border border-red-100">
                    <h3 className="text-xl font-bold mb-4 flex items-center text-red-800">
                      <XCircle className="mr-2 h-5 w-5 text-red-600" /> Exclusions
                    </h3>
                    <ul className="space-y-3">
                      {destination.exclusions.map((item: string, index: number) => (
                        <li key={index} className="flex items-start text-sm text-red-800/80 font-medium">
                          <XCircle className="mr-2 h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                          <TranslatedText text={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Itinerary Section */}
            {destination.itinerary && destination.itinerary.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-8 flex items-center">
                  <Clock className="mr-3 h-6 w-6 text-[#0066a1]" /> Tour Itinerary
                </h3>
                <div className="space-y-6 sm:space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {destination.itinerary.map((item: any, index: number) => (
                    <div key={index} className="relative pl-10 sm:pl-12">
                      <div className="absolute left-0 top-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border-4 border-[#0066a1] flex items-center justify-center z-10">
                        <span className="text-[10px] sm:text-xs font-bold text-[#0066a1]">{item.day}</span>
                      </div>
                      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Day {item.day}: <TranslatedText text={item.title} /></h4>
                        <p className="text-slate-600 leading-relaxed text-xs sm:text-sm font-medium"><TranslatedText text={item.description} /></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8 lg:sticky lg:top-24">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                 <PriceDisplay priceINR={destination.priceMin || 45000} />
                 
                 <div className="h-[1px] bg-slate-100 my-8"></div>

                 <h3 className="text-lg font-black text-slate-900 mb-4">Book Your Journey</h3>
                <div className="space-y-6 mb-8">
                  <p className="text-sm text-slate-500 font-medium">
                    Experience {destination.name} with KonkanArabia. Contact us to customize your luxury itinerary.
                  </p>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center p-3 bg-slate-50 rounded-xl">
                      <PhoneCall className="h-4 w-4 text-[#0066a1] mr-3" />
                      <span className="font-bold text-xs text-slate-900">+91-9370528517</span>
                    </div>
                    <div className="flex items-center p-3 bg-slate-50 rounded-xl">
                      <PhoneCall className="h-4 w-4 text-[#0066a1] mr-3" />
                      <span className="font-bold text-xs text-slate-900">+971-555995260</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link href="/contact" passHref>
                    <Button className="w-full bg-[#0066a1] hover:bg-[#00558a] text-white py-6 rounded-2xl font-bold shadow-lg shadow-blue-900/10">Enquire Now</Button>
                  </Link>
                  <Link href="/destinations" passHref>
                    <Button variant="outline" className="w-full border-slate-200 text-slate-600 py-6 rounded-2xl font-bold">Explore More</Button>
                  </Link>
                </div>
              </div>

              <AvailabilityCalendar 
                  availableDates={destination.availableDates} 
                  blackoutDates={destination.blackoutDates} 
              />

              <WeatherPacking destination={destination.name} />
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection destinationId={Number(id)} reviews={reviews} />

        <div className="mt-16 text-center">
            <Link href="/destinations" className="inline-flex items-center text-[#0066a1] font-bold hover:underline transition-all">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to all destinations
            </Link>
        </div>
      </div>
    </div>
  );
}
