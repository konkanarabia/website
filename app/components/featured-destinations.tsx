"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const destinations = [
  {
    id: 1,
    name: "Kashmir",
    description: "Paradise on Earth",
    image: "/destinations/domestic/Kashmir.png",
    details:
      "Kashmir, with its breathtaking landscapes, snow-capped mountains, and serene lakes, truly lives up to its nickname 'Paradise on Earth'. Explore the Dal Lake in Srinagar, visit the beautiful gardens, or enjoy skiing in Gulmarg's snow-covered slopes.",
  },
  {
    id: 4,
    name: "Goa",
    description: "Pearl of the Orient",
    image: "/destinations/domestic/Goa.png",
    details:
      "Goa offers the perfect blend of sun, sand, and sea with a unique Portuguese-influenced culture. Enjoy its pristine beaches, vibrant nightlife, delicious seafood, water sports, and historic churches and forts that dot this coastal paradise.",
  },
  {
    id: 6,
    name: "Kerala",
    description: "God's Own Country",
    image: "/destinations/domestic/Kerala.png",
    details:
      "Kerala dazzles with its backwaters, lush hill stations, pristine beaches, and vibrant culture. Experience houseboat cruises through the backwaters, Ayurvedic treatments, wildlife sanctuaries, and the unique blend of traditional arts, cuisine, and festivals.",
  },
  {
    id: 11,
    name: "Dubai",
    description: "The City of Gold",
    image: "/destinations/international/Dubai.png",
    details:
      "Dubai, a city in the United Arab Emirates, is known for its ultramodern architecture, luxury shopping, and vibrant nightlife. Home to Burj Khalifa, the world's tallest building, and artificial islands like Palm Jumeirah.",
  },
  {
    id: 12,
    name: "Thailand",
    description: "The Land of Smiles",
    image: "/destinations/international/Thailand.png",
    details:
      "Thailand offers beautiful tropical beaches, opulent royal palaces, ancient ruins and temples. Experience Bangkok's vibrant street life, explore Chiang Mai's mountains, or relax on the islands of Phuket and Koh Samui.",
  },
  {
    id: 15,
    name: "Vietnam",
    description: "The Hidden Charm",
    image: "/destinations/international/Vietnam.png",
    details:
      "Vietnam features dramatic landscapes, from the lush rice terraces of Sapa to the limestone islands of Halong Bay. Experience bustling cities, tranquil villages, and incredible food culture throughout this diverse country.",
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explore Popular Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Card key={dest.id} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-xl">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{dest.name}</h3>
                <p className="text-sm text-slate-400 font-medium mb-4">{dest.description}</p>
                <Link href={`/destinations/${dest.id}`} passHref>
                  <Button className="bg-[#0066a1] hover:bg-[#00558a] text-white px-5 py-4 text-sm font-bold rounded-lg transition-all h-auto">
                    Explore
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
