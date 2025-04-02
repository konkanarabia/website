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
    id: 13,
    name: "Sri Lanka",
    description: "Pearl of the Indian Ocean",
    image: "/img/sri-lanka.jpg?height=200&width=300",
    details:
      "Sri Lanka features endless beaches, timeless ruins, welcoming people, and abundant wildlife. Explore ancient Buddhist ruins, hike through tea plantations, and witness elephants in their natural habitat.",
  },
  {
    id: 14,
    name: "Nepal",
    description: "Land of the Himalayas",
    image: "/img/nepal.jpg?height=200&width=300",
    details:
      "Nepal, home to Mount Everest, offers stunning Himalayan views, historic temples, and rich cultural heritage. Trek through spectacular mountain scenery or explore medieval city squares in Kathmandu Valley.",
  },
  {
    id: 15,
    name: "Vietnam",
    description: "The Hidden Charm",
    image: "/img/vietnam.jpg?height=200&width=300",
    details:
      "Vietnam features dramatic landscapes, from the lush rice terraces of Sapa to the limestone islands of Halong Bay. Experience bustling cities, tranquil villages, and incredible food culture throughout this diverse country.",
  },
  {
    id: 16,
    name: "Maldives",
    description: "Tropical Paradise",
    image: "/img/maldives.jpg?height=200&width=300",
    details:
      "The Maldives is known for its crystal clear waters, overwater bungalows, and pristine beaches. This archipelago of 1,000+ coral islands offers world-class diving, snorkeling, and the ultimate luxury retreat.",
  },
  {
    id: 17,
    name: "Indonesia",
    description: "Unity in Diversity",
    image: "/img/indonesia.jpg?height=200&width=300",
    details:
      "Indonesia spans over 17,000 islands with incredible diversity. From the spiritual Bali to the komodo dragons of Flores, experience volcanoes, jungles, pristine beaches, and vibrant cultural traditions.",
  },
  {
    id: 18,
    name: "Azerbaijan",
    description: "Land of Fire",
    image: "/img/azerbaijan.jpg?height=200&width=300",
    details:
      "Azerbaijan blends ancient culture with modern development. Explore Baku's UNESCO-listed Old City, mud volcanoes, and the burning mountain of Yanar Dag, while experiencing the country's unique East-meets-West atmosphere.",
  },
  {
    id: 19,
    name: "Armenia",
    description: "Land of Mountains",
    image: "/img/armenia.jpg?height=200&width=300",
    details:
      "Armenia boasts dramatic mountain landscapes and ancient Christian heritage. Visit centuries-old monasteries perched on hilltops, explore the vibrant capital Yerevan, and enjoy traditional hospitality and cuisine.",
  },
  {
    id: 20,
    name: "Georgia",
    description: "Cradle of Wine",
    image: "/img/georgia.jpg?height=200&width=300",
    details:
      "Georgia offers stunning mountain scenery, ancient cave cities, and 8,000 years of winemaking tradition. Experience the unique hospitality, rich folklore, delicious cuisine, and beautiful Orthodox churches.",
  },
];

const domestic_destinations = [
  {
    id: 1,
    name: "Kashmir",
    description: "Paradise on Earth",
    image: "/img/kashmir.jpg?height=200&width=300",
    details:
      "Kashmir, with its breathtaking landscapes, snow-capped mountains, and serene lakes, truly lives up to its nickname 'Paradise on Earth'. Explore the Dal Lake in Srinagar, visit the beautiful gardens, or enjoy skiing in Gulmarg's snow-covered slopes.",
  },
  {
    id: 2,
    name: "Himachal Pradesh",
    description: "Land of Gods",
    image: "/img/himachal.jpg?height=200&width=300",
    details:
      "Himachal Pradesh offers stunning Himalayan landscapes, lush valleys, and charming hill stations. From the vibrant culture of Shimla to the spiritual atmosphere of Dharamshala, experience adventure sports, ancient temples, and pristine natural beauty.",
  },
  {
    id: 3,
    name: "Golden Triangle",
    description: "Amritsar, Delhi, Agra & Rajasthan",
    image: "/img/golden-triangle.jpg?height=200&width=300",
    details:
      "The Golden Triangle circuit connects the iconic cities of Delhi, Agra, and Jaipur, with an extension to Amritsar. Experience India's rich heritage through historic monuments like the Taj Mahal, Red Fort, and Hawa Mahal, alongside the spiritual Golden Temple.",
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
    id: 5,
    name: "Konkan",
    description: "Coastal Haven",
    image: "/img/konkan.jpg?height=200&width=300",
    details:
      "The Konkan coast stretches along the western coastline of India, featuring pristine beaches, quaint fishing villages, and lush green landscapes. Explore ancient temples, enjoy authentic coastal cuisine, and experience the rich cultural heritage of this region.",
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
    id: 7,
    name: "Karnataka",
    description: "Mysore, Bangalore & Ooty",
    image: "/img/karnataka.jpg?height=200&width=300",
    details:
      "Karnataka offers diverse attractions from the tech hub of Bangalore to the royal heritage of Mysore and the hill station beauty of nearby Ooty. Explore magnificent palaces, ancient temples, lush coffee plantations, and stunning Western Ghat landscapes.",
  },
  {
    id: 8,
    name: "Lakshadweep",
    description: "Coral Paradise",
    image: "/img/lakshadweep.jpg?height=200&width=300",
    details:
      "Lakshadweep, India's smallest union territory, consists of stunning coral atolls and pristine beaches. Experience crystal-clear waters perfect for snorkeling and diving, rich marine life, and the unique culture of these remote islands in the Arabian Sea.",
  },
];

const additional_services = [
  {
    id: 1,
    name: "Vehicle Rental",
    description: "Car Rental & Bike Rental",
    image: "/img/vehicle-rental.jpg?height=200&width=300",
    details:
      "Explore destinations at your own pace with our comprehensive vehicle rental services. Choose from a wide range of cars, from economy to luxury options, or rent bikes for adventure trips and city exploration. All vehicles are well-maintained with competitive rates and flexible pickup/drop-off locations.",
  },
  {
    id: 2,
    name: "Event Management",
    description: "Destination Events & Parties",
    image: "/img/event-management.jpg?height=200&width=300",
    details:
      "Make your special occasions truly memorable with our destination event management services. From beach weddings to corporate retreats, anniversary celebrations to birthday parties at exotic locations - our team handles everything from venue selection to catering, decorations, entertainment, and accommodations.",
  },
  {
    id: 3,
    name: "Visa Services",
    description: "Hassle-free Travel Documentation",
    image: "/img/visa-services.jpg?height=200&width=300",
    details:
      "Navigate complex visa requirements with ease through our comprehensive visa assistance services. Our experts provide guidance on documentation, application preparation, appointment scheduling, and follow-ups. We assist with tourist visas, business visas, work permits, and more for destinations worldwide.",
  },
];

export default function OurServices() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {additional_services.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <Image
                  src={service.image}
                  alt={service.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
                <p className="mt-4 text-sm text-gray-600">
                  {service.details.substring(0, 120)}...
                </p>
              </CardContent>
              <CardFooter>
                <Link href={`/services/${service.id}`} passHref>
                  <Button className="w-full">Learn More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <h1 className="text-4xl font-bold text-center mb-8">Holiday Packages</h1>

      <p className="text-center text-lg mb-12">
        Explore our curated holiday packages designed to offer you the best
        travel experiences. Whether you're looking for a relaxing beach getaway,
        an adventurous mountain retreat, or a cultural city tour, we have
        something for everyone.
      </p>

      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Domestic Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {domestic_destinations.map((dest) => (
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

      <div className="container mx-auto px-4 mt-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          International Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {international_destinations.map((dest) => (
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
