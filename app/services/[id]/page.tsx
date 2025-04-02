"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const services = [
  {
    id: 1,
    name: "Vehicle Rental",
    description: "Car Rental & Bike Rental",
    image: "/img/vehicle-rental.jpg",
    details:
      "Explore destinations at your own pace with our comprehensive vehicle rental services. Choose from a wide range of cars, from economy to luxury options, or rent bikes for adventure trips and city exploration. All vehicles are well-maintained with competitive rates and flexible pickup/drop-off locations.",
    pricing: [
      { type: "Economy Car", price: "$45/day" },
      { type: "Mid-size Car", price: "$65/day" },
      { type: "Luxury Car", price: "$120/day" },
      { type: "Mountain Bike", price: "$20/day" },
      { type: "City Bike", price: "$15/day" },
    ],
    availabilityNotes: "24-hour advance booking recommended. All vehicles subject to availability."
  },
  {
    id: 2,
    name: "Event Management",
    description: "Destination Events & Parties",
    image: "/img/event-management.jpg",
    details:
      "Make your special occasions truly memorable with our destination event management services. From beach weddings to corporate retreats, anniversary celebrations to birthday parties at exotic locations - our team handles everything from venue selection to catering, decorations, entertainment, and accommodations.",
    pricing: [
      { type: "Small Events (up to 50 people)", price: "Starting from $2,000" },
      { type: "Medium Events (50-150 people)", price: "Starting from $5,000" },
      { type: "Large Events (150+ people)", price: "Custom quote" },
      { type: "Wedding Package", price: "Starting from $7,500" },
    ],
    availabilityNotes: "Book at least 3 months in advance for best venue options."
  },
  {
    id: 3,
    name: "Visa Services",
    description: "Hassle-free Travel Documentation",
    image: "/img/visa-services.jpg",
    details:
      "Navigate complex visa requirements with ease through our comprehensive visa assistance services. Our experts provide guidance on documentation, application preparation, appointment scheduling, and follow-ups. We assist with tourist visas, business visas, work permits, and more for destinations worldwide.",
    pricing: [
      { type: "Tourist Visa Assistance", price: "$100" },
      { type: "Business Visa Assistance", price: "$150" },
      { type: "Work Permit Assistance", price: "$250" },
      { type: "Express Processing", price: "+$75" },
    ],
    availabilityNotes: "Processing times vary by destination country and visa type."
  },
];

export default function ServicePage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  const service = services.find((s) => s.id === id);
  const [date, setDate] = useState<Date | undefined>(undefined);

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Service not found</h2>
        <p className="mb-8">The service you're looking for doesn't exist or has been removed.</p>
        <Link href="/services" passHref>
          <Button>View All Services</Button>
        </Link>
      </div>
    );
  }

  const handlePrevService = () => {
    const prevId = id > 1 ? id - 1 : services.length;
    router.push(`/services/${prevId}`);
  };

  const handleNextService = () => {
    const nextId = id < services.length ? id + 1 : 1;
    router.push(`/services/${nextId}`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-wrap items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">{service.name}</h1>
        <Badge variant="outline" className="text-lg py-1.5">
          {service.description}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 mb-12">
        <div>
          <Image
            src={service.image}
            alt={service.name}
            width={800}
            height={600}
            className="rounded-lg shadow-md object-cover w-full h-[400px]"
          />
        </div>
        
        <div>
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
              <TabsTrigger value="pricing" className="flex-1">Pricing</TabsTrigger>
              {/* <TabsTrigger value="booking" className="flex-1">Booking</TabsTrigger> */}
            </TabsList>
            
            <TabsContent value="details" className="text-lg space-y-4">
              <p>{service.details}</p>
              <p className="italic text-muted-foreground mt-4">{service.availabilityNotes}</p>
            </TabsContent>
            
            <TabsContent value="pricing">
              <div className="space-y-2">
                {service.pricing.map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b py-3">
                    <span className="font-medium">{item.type}</span>
                    <span className="text-lg">{item.price}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* <TabsContent value="booking" className="space-y-6">
              <p className="text-lg">Select your preferred date:</p>
              <div className="flex justify-center mb-6">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
              </div>
              <Link href="/enquiry" passHref>
                <Button className="w-full">Make Enquiry</Button>
              </Link>
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-16">
        <Button variant="outline" onClick={handlePrevService}>
          Previous Service
        </Button>
        <Link href="/services" passHref>
          <Button variant="secondary">All Services</Button>
        </Link>
        <Button variant="outline" onClick={handleNextService}>
          Next Service
        </Button>
      </div>
    </div>
  );
}
