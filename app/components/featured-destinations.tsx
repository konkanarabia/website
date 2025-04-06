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
    image: "/img/kashmir.jpg?height=200&width=300",
    details:
      "Kashmir, with its breathtaking landscapes, snow-capped mountains, and serene lakes, truly lives up to its nickname 'Paradise on Earth'. Explore the Dal Lake in Srinagar, visit the beautiful gardens, or enjoy skiing in Gulmarg's snow-covered slopes.",
  },
  {
    id: 4,
    name: "Goa",
    description: "Pearl of the Orient",
    image: "/img/goa.jpg?height=200&width=300",
    details:
      "Goa offers the perfect blend of sun, sand, and sea with a unique Portuguese-influenced culture. Enjoy its pristine beaches, vibrant nightlife, delicious seafood, water sports, and historic churches and forts that dot this coastal paradise.",
  },
  {
    id: 6,
    name: "Kerala",
    description: "God's Own Country",
    image: "/img/kerala.jpg?height=200&width=300",
    details:
      "Kerala dazzles with its backwaters, lush hill stations, pristine beaches, and vibrant culture. Experience houseboat cruises through the backwaters, Ayurvedic treatments, wildlife sanctuaries, and the unique blend of traditional arts, cuisine, and festivals.",
  },
  {
    id: 11,
    name: "Dubai",
    description: "The City of Gold",
    image: "/img/dubai.jpg?height=200&width=300",
    details:
      "Dubai, a city in the United Arab Emirates, is known for its ultramodern architecture, luxury shopping, and vibrant nightlife. Home to Burj Khalifa, the world's tallest building, and artificial islands like Palm Jumeirah.",
  },
  {
    id: 12,
    name: "Thailand",
    description: "The Land of Smiles",
    image: "/img/thailand.jpg?height=200&width=300",
    details:
      "Thailand offers beautiful tropical beaches, opulent royal palaces, ancient ruins and temples. Experience Bangkok's vibrant street life, explore Chiang Mai's mountains, or relax on the islands of Phuket and Koh Samui.",
  },
  {
    id: 16,
    name: "Maldives",
    description: "Tropical Paradise",
    image: "/img/maldives.jpg?height=200&width=300",
    details:
      "The Maldives is known for its crystal clear waters, overwater bungalows, and pristine beaches. This archipelago of 1,000+ coral islands offers world-class diving, snorkeling, and the ultimate luxury retreat.",
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explore Popular Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <Card key={dest.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">{dest.name}</CardTitle>
                <CardDescription>{dest.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Link href={`/destinations/${dest.id}`} passHref>
                  <Button className="w-full">Explore</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
