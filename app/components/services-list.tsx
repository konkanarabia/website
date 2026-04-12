import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Globe, HeartHandshake, Utensils, Plane, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Holiday Packages",
    description: "Handpicked domestic and international tours curated for luxury and comfort.",
    icon: <Globe className="w-8 h-8" />,
    link: "/destinations",
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Vehicle Rental",
    description: "Premium fleet of luxury cars and coaches for your travel needs in Konkan & beyond.",
    icon: <Car className="w-8 h-8" />,
    link: "/services/1",
    color: "bg-amber-50 text-amber-600"
  },
  {
    title: "Visa Services",
    description: "Expert assistance for visa processing and international travel documentation.",
    icon: <Plane className="w-8 h-8" />,
    link: "/services/3",
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    title: "Event Management",
    description: "Seamless planning for destination weddings, corporate retreats, and special events.",
    icon: <HeartHandshake className="w-8 h-8" />,
    link: "/services/2",
    color: "bg-purple-50 text-purple-600"
  },
  {
    title: "Hospitality & Dining",
    description: "Authentic local flavors and premium beachside stays at our managed units.",
    icon: <Utensils className="w-8 h-8" />,
    link: "/#hospitality-dining",
    color: "bg-red-50 text-red-600"
  }
];

export default function ServicesList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <Card key={index} className="group border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-3xl overflow-hidden bg-white">
          <CardContent className="p-8">
            <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
            <p className="text-slate-500 mb-8 leading-relaxed font-medium">
              {service.description}
            </p>
            <Link href={service.link}>
              <Button variant="ghost" className="p-0 h-auto hover:bg-transparent text-[#0066a1] font-bold flex items-center gap-2 group/btn">
                Discover More
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
