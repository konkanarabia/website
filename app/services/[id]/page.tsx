"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

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
    availabilityNotes:
      "24-hour advance booking recommended. All vehicles subject to availability.",
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
    availabilityNotes:
      "Book at least 3 months in advance for best venue options.",
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
    availabilityNotes:
      "Processing times vary by destination country and visa type.",
  },
];

export default function ServicePage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  const service = services.find((s) => s.id === id);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16 text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Service not found
        </h2>
        <p className="mb-6 md:mb-8">
          The service you're looking for doesn't exist or has been removed.
        </p>
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
    <div className="container mx-auto px-4 py-6 md:py-12">
      <div className="text-sm breadcrumbs mb-4 hidden md:block">
        <ul className="flex flex-wrap space-x-2">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>{" "}
            /
          </li>
          <li>
            <Link href="/services" className="hover:underline">
              Services
            </Link>{" "}
            /
          </li>
          <li className="font-medium">{service.name}</li>
        </ul>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-0 break-words">
          {service.name}
        </h1>
        <Badge
          variant="outline"
          className="text-sm md:text-lg py-1 md:py-1.5 self-start md:self-auto"
        >
          <span className="truncate">{service.description}</span>
        </Badge>
      </div>

      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 mb-8 md:mb-12">
        <div>
          <Image
            src={imageError ? "/placeholder.svg" : service.image}
            alt={service.name}
            width={800}
            height={600}
            className="rounded-lg shadow-md object-cover w-full h-[250px] md:h-[400px]"
            priority
            onError={handleImageError}
          />
        </div>

        <div className="mt-4 md:mt-0">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="mb-4 md:mb-6 grid grid-cols-2">
              <TabsTrigger value="details" className="text-sm md:text-base">
                Details
              </TabsTrigger>
              <TabsTrigger value="pricing" className="text-sm md:text-base">
                Pricing
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="details"
              className="text-base md:text-lg space-y-3 md:space-y-4"
            >
              <p className="break-words">{service.details}</p>
              <p className="italic text-muted-foreground mt-2 md:mt-4 text-sm md:text-base">
                {service.availabilityNotes}
              </p>
            </TabsContent>

            <TabsContent value="pricing">
              <div className="space-y-1 md:space-y-2">
                {service.pricing.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-wrap justify-between items-center border-b py-2 md:py-3"
                  >
                    <span className="font-medium text-sm md:text-base pr-2">
                      {item.type}
                    </span>
                    <span className="text-base md:text-lg">{item.price}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 md:hidden">
            <Link href="/enquiry" passHref>
              <Button className="w-full">Enquire About This Service</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t mt-8 pt-6 mb-8 hidden md:block">
        <h3 className="text-xl font-semibold mb-4">
          You might also be interested in
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services
            .filter((s) => s.id !== id)
            .slice(0, 3)
            .map((s) => (
              <Link href={`/services/${s.id}`} key={s.id} className="group">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 transition-all hover:shadow-md">
                  <h4 className="font-medium group-hover:text-primary break-words">
                    {s.name}
                  </h4>
                  <p className="text-sm text-muted-foreground truncate">
                    {s.description}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-8 md:mt-16 gap-1 sm:gap-2">
        <Button
          variant="outline"
          onClick={handlePrevService}
          size="sm"
          className="text-xs md:text-sm px-1 sm:px-2"
        >
          <span className="hidden md:inline">Previous Service</span>
          <span className="md:hidden">Previous</span>
        </Button>
        <Button
          variant="outline"
          onClick={handleNextService}
          size="sm"
          className="text-xs md:text-sm px-1 sm:px-2"
        >
          <span className="hidden md:inline">Next Service</span>
          <span className="md:hidden">Next</span>
        </Button>
      </div>

      {/* <div className="hidden md:block text-center mt-12">
        <Link href="/enquiry" passHref>
          <Button size="lg" className="px-8">
            Enquire About This Service
          </Button>
        </Link>
      </div> */}
    </div>
  );
}
