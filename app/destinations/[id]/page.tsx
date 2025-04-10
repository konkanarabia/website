"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, PhoneCall, ArrowLeft } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Kashmir",
    description: "Paradise on Earth",
    image: "/img/kashmir.jpg?height=200&width=300",
    details:
      "Kashmir, with its breathtaking landscapes, snow-capped mountains, and serene lakes, truly lives up to its nickname 'Paradise on Earth'. Explore the Dal Lake in Srinagar, visit the beautiful gardens, or enjoy skiing in Gulmarg's snow-covered slopes.",
    highlights: [
      "Take a Shikara ride on Dal Lake",
      "Visit the beautiful Mughal Gardens",
      "Enjoy skiing in Gulmarg",
      "Experience local Kashmiri cuisine",
      "Shop for authentic Kashmiri handicrafts"
    ],
    duration: "5-7 days",
    bestTime: "March to October"
  },
  {
    id: 2,
    name: "Himachal Pradesh",
    description: "Land of Gods",
    image: "/img/himachal.jpg?height=200&width=300",
    details:
      "Himachal Pradesh offers stunning Himalayan landscapes, lush valleys, and charming hill stations. From the vibrant culture of Shimla to the spiritual atmosphere of Dharamshala, experience adventure sports, ancient temples, and pristine natural beauty.",
    highlights: [
      "Explore the colonial architecture of Shimla",
      "Visit the residence of Dalai Lama in Dharamshala",
      "Adventure activities in Manali",
      "Trek in the scenic Parvati Valley",
      "Experience the unique culture of Spiti Valley"
    ],
    duration: "6-8 days",
    bestTime: "March to June, September to November"
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
    highlights: [
      "Explore the ancient streets of Tbilisi",
      "Visit traditional wine cellars in Kakheti",
      "Discover the cave city of Uplistsikhe",
      "Hike in the stunning Caucasus mountains",
      "Experience traditional Georgian supra (feast)"
    ],
    duration: "7-10 days",
    bestTime: "May to October"
  },
];

export default function DestinationPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const destination = destinations.find((d) => d.id === id);

  if (!destination) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Destination Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find the destination you're looking for.</p>
        <Link href="/destinations" passHref>
          <Button className="bg-primary">View All Destinations</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section with Large Image */}
      <div className="relative h-[40vh] md:h-[60vh]">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">{destination.name}</h1>
            <p className="text-xl md:text-2xl text-white/90">{destination.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12 -mt-16 md:-mt-24 relative z-10 mx-4 md:mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Calendar className="text-primary h-6 w-6 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{destination.duration || "5-10 days"}</p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="text-primary h-6 w-6 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{destination.name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="text-primary h-6 w-6 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Best Time to Visit</p>
                <p className="font-medium">{destination.bestTime || "All Year"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">About {destination.name}</h2>
            <p className="text-gray-700 leading-relaxed mb-8">{destination.details}</p>
            
            <h3 className="text-xl font-bold mb-4">Highlights</h3>
            <ul className="space-y-3 mb-8">
              {(destination.highlights || [
                "Experience the local culture and traditions",
                "Visit popular attractions and landmarks",
                "Enjoy authentic local cuisine",
                "Explore natural beauty and landscapes",
                "Engage with friendly locals"
              ]).map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-primary/10 text-primary p-1 rounded-full mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link href="/destinations" className="inline-flex items-center text-primary hover:underline mb-8">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to all destinations
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4 pb-4 border-b">Book This Trip</h3>
              
              <div className="space-y-6 mb-6">
                <p className="text-gray-700">
                  Ready to experience the beauty of {destination.name}? Contact our travel experts to create your perfect itinerary.
                </p>
                
                <div className="flex items-center">
                  <PhoneCall className="h-5 w-5 text-primary mr-2" />
                  <span className="font-medium">+971-55 155 6238</span>
                </div>
              </div>

              <div className="space-y-4">
                <Link href="/contact" passHref>
                  <Button className="w-full bg-primary hover:bg-primary/90 mb-4">Enquire Now</Button>
                </Link>
                <Link href="/destinations" passHref>
                  <Button variant="outline" className="w-full">View Other Destinations</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Destinations Section (Optional) */}
      {/* You could add related destinations here */}
    </div>
  );
}
