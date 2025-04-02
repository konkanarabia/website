"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
