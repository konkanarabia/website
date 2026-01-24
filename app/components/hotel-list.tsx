"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Star, MapPin, Wifi, Coffee, Utensils } from "lucide-react";
import { Price } from "@/components/ui/price";

// Define hotel type for type safety
interface Hotel {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  location: string;
  price: string;
  amenities: string[];
  details: string;
}

const hotels = [
  {
    id: 1,
    name: "Luxury Palace Hotel",
    description: "Experience ultimate luxury in the heart of the city",
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
    location: "Paris, France",
    price: "$300",
    amenities: ["Free Wi-Fi", "Spa", "Restaurant"],
    details:
      "The Luxury Palace Hotel offers an unforgettable stay with its opulent rooms, world-class spa, and michelin-starred restaurant. Enjoy breathtaking views of the city skyline and impeccable service.",
  },
  {
    id: 2,
    name: "Seaside Resort",
    description: "Relax by the beach in our comfortable resort",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4,
    location: "Bali, Indonesia",
    price: "$150",
    amenities: ["Beachfront", "Pool", "Free Wi-Fi"],
    details:
      "Seaside Resort provides a perfect tropical getaway. With direct beach access, a large infinity pool, and spacious rooms with ocean views, you'll never want to leave this paradise.",
  },
  {
    id: 3,
    name: "Urban Boutique Hotel",
    description: "Stylish accommodation in a vibrant neighborhood",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4,
    location: "New York, USA",
    price: "$200",
    amenities: ["Free Wi-Fi", "Fitness Center", "Rooftop Bar"],
    details:
      "Urban Boutique Hotel combines modern design with comfort. Located in a trendy district, it's perfect for exploring the city. Don't miss the spectacular views from our rooftop bar!",
  },
];

export default function HotelList() {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels.map((hotel) => (
        <Card key={hotel.id} className="overflow-hidden">
          <CardHeader className="p-0">
            <Image
              src={hotel.image}
              alt={hotel.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
              style={{ height: "auto" }}
            />
          </CardHeader>
          <CardContent className="p-6">
            <CardTitle className="flex justify-between items-center mb-2">
              <span>{hotel.name}</span>
              <span className="flex items-center">
                {[...Array(hotel.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-current text-yellow-400"
                  />
                ))}
              </span>
            </CardTitle>
            <CardDescription>{hotel.description}</CardDescription>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{hotel.location}</span>            </div>            <div className="mt-2 text-lg font-semibold">
              <Price amount={hotel.price} sourceCurrency="USD" showConversion={true} showOriginal={false} /> per night
            </div>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="w-full"
                  onClick={() => setSelectedHotel(hotel)}
                >
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{selectedHotel?.name}</DialogTitle>
                </DialogHeader>
                <DialogDescription asChild>
                  <div>
                    {selectedHotel && (
                      <>
                        <Image
                          src={selectedHotel.image}
                          alt={selectedHotel.name}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover rounded-md mb-4"
                          style={{ height: "auto" }}
                        />
                        <p className="mb-4">{selectedHotel.details}</p>
                        <div className="flex items-center mb-2">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{selectedHotel.location}</span>
                        </div>                        <p className="mb-4 text-lg font-semibold">
                          <Price amount={selectedHotel.price} sourceCurrency="USD" showConversion={true} showOriginal={false} /> per night
                        </p>
                        <h4 className="font-semibold mb-2">Amenities:</h4>
                        <ul className="list-disc list-inside">
                          {selectedHotel.amenities.map((amenity, index) => (
                            <li key={index} className="flex items-center">
                              {amenity.includes("Wi-Fi") && (
                                <Wifi className="mr-2 h-4 w-4" />
                              )}
                              {amenity.includes("Spa") && (
                                <Coffee className="mr-2 h-4 w-4" />
                              )}
                              {amenity.includes("Restaurant") && (
                                <Utensils className="mr-2 h-4 w-4" />
                              )}
                              {amenity}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
