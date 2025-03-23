"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const destinations = [
  {
    id: 1,
    name: "India",
    description: "Incredible India",
    image: "/img/julian-yu-_WuPjE-MPHo-unsplash.jpg?height=200&width=300",
    details:
      "India, a country in South Asia, is known for its rich cultural heritage, diverse landscapes, and historical landmarks. From the majestic Himalayas to the serene beaches of Goa, India offers a plethora of experiences including vibrant festivals, delicious cuisine, and ancient temples.",
  },
  {
    id: 2,
    name: "Dubai",
    description: "The City of Gold",
    image: "/img/sascha-bosshard-gfMEelIy7r8-unsplash.jpg?height=200&width=300",
    details:
      "Dubai, a city in the United Arab Emirates, is known for its modern architecture, luxury shopping, and vibrant nightlife. Key attractions include the Burj Khalifa, the world's tallest building, and the Palm Jumeirah, an artificial archipelago.",
  },
  {
    id: 3,
    name: "Bali",
    description: "Island of the Gods",
    image: "/img/sara-dubler-Koei_7yYtIo-unsplash.jpg?height=200&width=300",
    details:
      "Bali, Indonesia, is a tropical paradise known for its stunning beaches, lush rice terraces, and vibrant culture. Visitors can explore ancient temples, enjoy world-class surfing, and indulge in traditional Balinese cuisine.",
  },
  {
    id: 4,
    name: "Thailand",
    description: "The Land of Smiles",
    image: "/img/jakob-owens-5F_c9i3JP0I-unsplash.jpg?height=200&width=300",
    details:
      "Thailand, a Southeast Asian country, is famous for its tropical beaches, opulent palaces, and ancient ruins. Visitors can explore bustling markets, enjoy delicious street food, and relax on beautiful islands like Phuket and Koh Samui.",
  },
  {
    id: 5,
    name: "Sri Lanka",
    description: "The Pearl of the Indian Ocean",
    image: "/img/hendrik-cornelissen-jpTT_SAU034-unsplash.jpg?height=200&width=300",
    details:
      "Sri Lanka, an island nation in South Asia, is known for its stunning beaches, lush tea plantations, and rich wildlife. Visitors can explore ancient ruins, enjoy vibrant festivals, and experience the warm hospitality of the locals.",
  },
  {
    id: 6,
    name: "Europe",
    description: "The Old Continent",
    image: "/img/joss-woodhead-3wFRlwS91yk-unsplash.jpg?height=200&width=300",
    details:
      "Europe, the world's second-smallest continent, is known for its rich history, diverse cultures, and stunning landscapes. From the fjords of Norway to the beaches of Greece, Europe offers a wide range of experiences including art, architecture, and cuisine.",
  },
  {
    id: 7,
    name: "Maldives",
    description: "Tropical Paradise",
    image: "/img/rayyu-maldives-xPsFXsbXJRg-unsplash.jpg?height=200&width=300",
    details:
      "Maldives, a tropical paradise in the Indian Ocean, is known for its stunning coral reefs, crystal-clear waters, and luxurious resorts. Visitors can enjoy snorkeling, diving, and relaxing on pristine beaches surrounded by turquoise lagoons.",
  },
];

export default function DestinationPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const destination = destinations.find((d) => d.id === id);

  if (!destination) {
    return (
      <div className="container mx-auto px-4 py-8">Destination not found</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{destination.name}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={destination.image}
            alt={destination.name}
            width={800}
            height={600}
            className="rounded-lg shadow-md"
          />
        </div>
        <div>
          <p className="text-xl mb-4">{destination.description}</p>
          <p className="mb-6">{destination.details}</p>
          <Link href="/contact" passHref>
            <Button>Book This Trip</Button>
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <Link href="/" passHref>
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
