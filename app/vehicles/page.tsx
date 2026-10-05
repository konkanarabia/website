import type { Metadata } from 'next';
import ItemList from "../components/item-list";
import { getVehicles } from "../actions/vehicles";
import dbConnect from "@/lib/mongodb";
import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, MessageCircle, ShieldCheck, Clock, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TranslatedText from "@/components/TranslatedText";

export const metadata: Metadata = {
  title: 'PedneCar Tourist Vehicle Rental | Goa Travel Partner',
  description: 'Rent premium vehicles, tourist taxis, Toyota Innova Crysta, and luxury Tempo Travelers in Goa with PedneCar (EST. 2010). Airport transfers, sightseeing tours & destination events.',
};

export default async function VehiclesPage() {
  await dbConnect();
  const vehicles = await getVehicles();
  
  return (
    <main className="bg-slate-50 min-h-screen pt-24 pb-20">
      {/* Branded PedneCar Goa Partner Header Banner */}
      <div className="container mx-auto px-4 max-w-7xl mb-8">
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-amber-200/80 bg-slate-900 group">
          <div className="relative h-64 sm:h-80 md:h-96 w-full">
            <Image
              src="/vehicles/pednecar-banner.png"
              alt="PedneCar Goa Tourist Vehicle Service - Your Goa Travel Partner"
              fill
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 text-slate-950 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                  <Award className="w-3.5 h-3.5" />
                  <TranslatedText text="PedneCar • Your Goa Travel Partner (EST. 2010)" />
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                  <TranslatedText text="Goa Tourist Fleet & Rental Division" />
                </h1>
                <p className="text-slate-200 text-sm sm:text-base max-w-2xl mt-1">
                  <TranslatedText text="Authorized Tourist Taxis, Executive Sedans, Innova Crysta & Luxury Tempo Travelers in Mapusa and across all of Goa." />
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a href="tel:+918625807465">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-5 rounded-xl shadow-lg flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+91 8625807465</span>
                  </Button>
                </a>
                <a
                  href="https://wa.me/918625807465?text=Hello%20PedneCar%2C%20I%20would%20like%20to%20enquire%20about%20vehicle%20rental%20in%20Goa."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-5 rounded-xl shadow-lg flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline"><TranslatedText text="WhatsApp" /></span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ItemList 
        items={JSON.parse(JSON.stringify(vehicles))}
        category="vehicles"
        title="Vehicle Rental"
        description="Experience the journey as much as the destination. We offer a curated fleet of premium vehicles for every travel requirement—from airport transfers and coastal sightseeing to family holidays and grand destination events."
        icon="Car"
        accentColor="text-amber-600"
      />

      {/* Mapusa Goa Office & Booking Contact Card */}
      <div className="container mx-auto px-4 max-w-7xl mt-12">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-widest">
              <MapPin className="w-4 h-4" />
              <TranslatedText text="Mapusa, Goa Branch" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              <TranslatedText text="PedneCar Tourist Vehicle Service Division" />
            </h3>
            <p className="text-slate-600 text-sm">
              <strong><TranslatedText text="Address:" /></strong> Flat No.203, Magic Marvel, Peddem, Mapusa, Goa 403507
            </p>
            <p className="text-slate-600 text-sm">
              <strong><TranslatedText text="Phone Lines:" /></strong> +91 8625807465 | 09326380922 | 9370528517
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link href="/enquiry/vehicle-rental" className="w-full md:w-auto">
              <Button className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-6 rounded-2xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2">
                <TranslatedText text="Book Rental Enquiry" />
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
