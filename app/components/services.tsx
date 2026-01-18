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

const international_destinations = [
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
    id: 13,
    name: "Sri Lanka",
    description: "Pearl of the Indian Ocean",
    image: "/destinations/international/Sri Lanka.png",
    details:
      "Sri Lanka features endless beaches, timeless ruins, welcoming people, and abundant wildlife. Explore ancient Buddhist ruins, hike through tea plantations, and witness elephants in their natural habitat.",
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

const domestic_destinations = [
  {
    id: 1,
    name: "Kashmir",
    description: "Paradise on Earth",
    image: "/destinations/domestic/Kashmir.png",
    details:
      "Kashmir, with its breathtaking landscapes, snow-capped mountains, and serene lakes, truly lives up to its nickname 'Paradise on Earth'. Explore the Dal Lake in Srinagar, visit the beautiful gardens, or enjoy skiing in Gulmarg's snow-covered slopes.",
  },
  {
    id: 2,
    name: "Himachal",
    description: "Land of Gods",
    image: "/destinations/domestic/Himachal.png",
    details:
      "Himachal Pradesh offers stunning Himalayan landscapes, lush valleys, and charming hill stations. From the vibrant culture of Shimla to the spiritual atmosphere of Dharamshala, experience adventure sports, ancient temples, and pristine natural beauty.",
  },
  {
    id: 3,
    name: "Golden Triangle",
    description: "Amritsar, Delhi & Agra",
    image: "/destinations/domestic/Golden Triangle.png",
    details:
      "The Golden Triangle circuit connects the iconic cities of Delhi, Agra, and Amritsar. Experience India's rich heritage through historic monuments like the Taj Mahal, Red Fort, and the spiritual Golden Temple.",
  },
  {
    id: 9,
    name: "Rajasthan",
    description: "The Land of Kings",
    image: "/destinations/domestic/Rajasthan.jpg",
    details:
      "Rajasthan is a land of vibrant culture, majestic forts, and opulent palaces. From the pink city of Jaipur to the golden sands of Jaisalmer, experience the royal heritage and warm hospitality of the desert state.",
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
    id: 10,
    name: "Kanyakumari",
    description: "The Southernmost Tip",
    image: "/destinations/domestic/Kanyakumari.jpg",
    details:
      "Kanyakumari, at the southernmost tip of India, is where the Arabian Sea, Bay of Bengal, and Indian Ocean meet. Witness breathtaking sunrises and sunsets over the three oceans and visit the iconic Vivekananda Rock Memorial.",
  },
  {
    id: 5,
    name: "Konkan",
    description: "Coastal Haven",
    image: "/destinations/domestic/Konkan.png",
    details:
      "The Konkan coast stretches along the western coastline of India, featuring pristine beaches, quaint fishing villages, and lush green landscapes. Explore ancient temples, enjoy authentic coastal cuisine, and experience the rich cultural heritage of this region.",
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
    id: 7,
    name: "Mysore",
    description: "The City of Palaces",
    image: "/destinations/domestic/Mysore.jpg",
    details:
      "Mysore is renowned for its heritage buildings and palaces, including the majestic Mysore Palace. Experience the rich culture, grand Dussehra celebrations, and famous Mysore silk sarees.",
  },
  {
    id: 8,
    name: "Bangalore",
    description: "Silicon Valley of India",
    image: "/destinations/domestic/Bangalore.png",
    details:
      "Bangalore, the capital of Karnataka, offers a blend of modern IT parks and lush gardens. Explore its vibrant nightlife, pleasant climate, and historical sites like Bangalore Palace.",
  },
  {
    id: 21,
    name: "Ooty",
    description: "Queen of Hill Stations",
    image: "/destinations/domestic/Ooty.jpg",
    details:
      "Ooty, nestled in the Nilgiri hills, is famous for its tea plantations, serene lakes, and the charming Nilgiri Mountain Railway. A perfect retreat for nature lovers and honeymooners.",
  },
];

export default function OurServices() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center tracking-tight">
            Domestic <span className="text-[#0066a1]">Destinations</span>
          </h2>
          <div className="w-24 h-1.5 bg-[#0066a1] rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domestic_destinations.map((dest) => (
            <Card key={dest.id} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-xl bg-slate-50">
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

      <div className="container mx-auto px-4 mt-24">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center tracking-tight">
            International <span className="text-[#0066a1]">Destinations</span>
          </h2>
          <div className="w-24 h-1.5 bg-[#0066a1] rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {international_destinations.map((dest) => (
            <Card key={dest.id} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-xl bg-slate-50">
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
