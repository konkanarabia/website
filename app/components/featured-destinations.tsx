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
    name: "India",
    description: "Incredible India",
    image: "/img/chetan-kolte-E43T1qjXtQM-unsplash.jpg?height=200&width=300",
    details:
      "India, a country in South Asia, is known for its rich cultural heritage, diverse landscapes, and historical landmarks. From the majestic Himalayas to the serene beaches of Goa, India offers a plethora of experiences including vibrant festivals, delicious cuisine, and ancient temples.",
  },
  {
    id: 2,
    name: "Dubai",
    description: "The City of Gold",
    image: "/img/david-rodrigo-Fr6zexbmjmc-unsplash.jpg?height=200&width=300",
    details:
      "Dubai, a city in the United Arab Emirates, is known for its modern architecture, luxury shopping, and vibrant nightlife. Key attractions include the Burj Khalifa, the world's tallest building, and the Palm Jumeirah, an artificial archipelago.",
  },
  {
    id: 3,
    name: "Bali",
    description: "Island of the Gods",
    image: "/img/kharl-anthony-paica-7sqY83ONLMU-unsplash.jpg?height=200&width=300",
    details:
      "Bali, Indonesia, is a tropical paradise known for its stunning beaches, lush rice terraces, and vibrant culture. Visitors can explore ancient temples, enjoy world-class surfing, and indulge in traditional Balinese cuisine.",
  },
  {
    id: 4,
    name: "Thailand",
    description: "The Land of Smiles",
    image: "/img/alfiano-sutianto-exFdOWkYBQw-unsplash.jpg?height=200&width=300",
    details:
      "Thailand, a Southeast Asian country, is famous for its tropical beaches, opulent palaces, and ancient ruins. Visitors can explore bustling markets, enjoy delicious street food, and relax on beautiful islands like Phuket and Koh Samui.",
  },
  {
    id: 5,
    name: "Sri Lanka",
    description: "The Pearl of the Indian Ocean",
    image: "/img/daniele-franchi-S9LN3vb47gw-unsplash.jpg?height=200&width=300",
    details:
      "Sri Lanka, an island nation in South Asia, is known for its stunning beaches, lush tea plantations, and rich wildlife. Visitors can explore ancient ruins, enjoy vibrant festivals, and experience the warm hospitality of the locals.",
  },
  {
    id: 6,
    name: "Europe",
    description: "The Old Continent",
    image: "/img/alex-vasey-3lxrM5yvkcI-unsplash.jpg?height=200&width=300",
    details:
      "Europe, the world's second-smallest continent, is known for its rich history, diverse cultures, and stunning landscapes. From the fjords of Norway to the beaches of Greece, Europe offers a wide range of experiences including art, architecture, and cuisine.",
  },
  {
    id: 7,
    name: "Maldives",
    description: "Tropical Paradise",
    image: "/img/mike-swigunski-k9Zeq6EH_bk-unsplash.jpg?height=200&width=300",
    details:
      "Maldives, a tropical paradise in the Indian Ocean, is known for its stunning coral reefs, crystal-clear waters, and luxurious resorts. Visitors can enjoy snorkeling, diving, and relaxing on pristine beaches surrounded by turquoise lagoons.",
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
