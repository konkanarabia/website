import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Globe, HeartHandshake, Utensils, Plane, ArrowRight } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Service from "@/lib/models/Service";

// Helper to get the correct icon component
const getIcon = (iconName: string | undefined, className: string) => {
  switch (iconName) {
    case 'Globe': return <Globe className={className} />;
    case 'Car': return <Car className={className} />;
    case 'Plane': return <Plane className={className} />;
    case 'HeartHandshake': return <HeartHandshake className={className} />;
    case 'Utensils': return <Utensils className={className} />;
    default: return <Globe className={className} />;
  }
};

export default async function ServicesList() {
  await dbConnect();
  // Fetch services sorted by id ascending
  const servicesData = await Service.find().sort({ id: 1 }).lean();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {servicesData.map((service: any) => (
        <Card key={service.id} className="group border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-3xl overflow-hidden bg-white">
          <CardContent className="p-8">
            <div className={`w-16 h-16 ${service.listColor || 'bg-blue-50 text-blue-600'} rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
              {getIcon(service.listIcon, 'w-8 h-8')}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.name}</h3>
            <p className="text-slate-500 mb-8 leading-relaxed font-medium">
              {service.description}
            </p>
            <Link href={service.isCustomLink ? (service.customLinkUrl || "#") : `/services/${service.id}`}>
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
