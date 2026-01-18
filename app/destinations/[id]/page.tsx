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
    image: "/destinations/domestic/Kashmir.png",
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
    name: "Himachal",
    description: "Land of Gods",
    image: "/destinations/domestic/Himachal.png",
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
    description: "Amritsar, Delhi & Agra",
    image: "/destinations/domestic/Golden Triangle.png",
    details:
      "The Golden Triangle circuit connects the iconic cities of Delhi, Agra, and Amritsar. Experience India's rich heritage through historic monuments like the Taj Mahal, Red Fort, and the spiritual Golden Temple.",
    highlights: [
      "Visit the iconic Taj Mahal in Agra",
      "Explore the historic Red Fort in Delhi",
      "Visit the spiritual Golden Temple in Amritsar",
      "Shop at Chandni Chowk in Delhi",
      "Witness the Wagah Border ceremony"
    ],
    duration: "5-7 days",
    bestTime: "October to March"
  },
  {
    id: 9,
    name: "Rajasthan",
    description: "The Land of Kings",
    details: "Experience the royal grandeur of the 'Land of Kings'. Rajasthan is a symphony of vibrant colors, majestic forts, and opulent palaces. From the pink-hued streets of Jaipur to the golden sands of Jaisalmer, every corner tells a story of chivalry and romance. Immerse yourself in the rich culture, spicy cuisine, and majestic landscapes of India's most regal state.",
    image: "/destinations/domestic/Rajasthan.jpg",
    priceMin: 25000,
    priceMax: 85000,
    highlights: ["Majestic Amber Fort", "Hawa Mahal (Palace of Winds)", "Golden Desert Safari", "Lakes of Udaipur", "Royal City Palace"],
    duration: "7-10 days",
    bestTime: "October to March"
  },
  {
    id: 6,
    name: "Kerala",
    description: "God's Own Country",
    image: "/destinations/domestic/Kerala.png",
    details:
      "Kerala dazzles with its backwaters, lush hill stations, pristine beaches, and vibrant culture. Experience houseboat cruises through the backwaters, Ayurvedic treatments, wildlife sanctuaries, and the unique blend of traditional arts, cuisine, and festivals.",
    highlights: [
      "Cruise the backwaters in a traditional houseboat",
      "Visit the tea plantations of Munnar",
      "Relax on the beaches of Varkala or Kovalam",
      "Watch a Kathakali performance",
      "Explore the Periyar Wildlife Sanctuary"
    ],
    duration: "6-8 days",
    bestTime: "September to March"
  },
  {
    id: 10,
    name: "Kanyakumari",
    description: "The Southernmost Tip",
    image: "/destinations/domestic/Kanyakumari.jpg",
    details:
      "Kanyakumari, at the southernmost tip of India, is where the Arabian Sea, Bay of Bengal, and Indian Ocean meet. Witness breathtaking sunrises and sunsets over the three oceans and visit the iconic Vivekananda Rock Memorial.",
    highlights: [
      "Visit the Vivekananda Rock Memorial",
      "See the giant Thiruvalluvar Statue",
      "Witness the meeting of three oceans",
      "Watch the spectacular sunset and sunrise",
      "Visit the Kumari Amman Temple"
    ],
    duration: "2-3 days",
    bestTime: "October to March"
  },
  {
    id: 5,
    name: "Konkan",
    description: "Coastal Haven",
    image: "/destinations/domestic/Konkan.png",
    details:
      "The Konkan coast stretches along the western coastline of India, featuring pristine beaches, quaint fishing villages, and lush green landscapes. Explore ancient temples, enjoy authentic coastal cuisine, and experience the rich cultural heritage of this region.",
    highlights: [
      "Visit Ganpatipule beach and temple",
      "Explore the historic Sindhudurg Fort",
      "Enjoy authentic Malvani cuisine",
      "Relax on the pristine beaches of Tarkarli",
      "Experience the lush mango orchards"
    ],
    duration: "4-6 days",
    bestTime: "October to March"
  },
  {
    id: 4,
    name: "Goa",
    description: "Pearl of the Orient",
    image: "/destinations/domestic/Goa.png",
    details:
      "Goa offers the perfect blend of sun, sand, and sea with a unique Portuguese-influenced culture. Enjoy its pristine beaches, vibrant nightlife, delicious seafood, water sports, and historic churches and forts that dot this coastal paradise.",
    highlights: [
      "Relax on the famous beaches of North and South Goa",
      "Explore the UNESCO World Heritage churches in Old Goa",
      "Experience the vibrant nightlife and shacks",
      "Enjoy water sports like parasailing and scuba diving",
      "Visit the beautiful Dudhsagar Waterfalls"
    ],
    duration: "4-7 days",
    bestTime: "November to February"
  },
  {
    id: 7,
    name: "Mysore",
    description: "The City of Palaces",
    details: "Known as the Cultural Capital of Karnataka, Mysore is a city of royal elegance and heritage. Famous for its dazzling Mysore Palace, fragrant sandalwood, and Mysore Silk, the city offers a blend of historical grandeur and modern charm. Witness the spectacular illumination of the Palace and explore the bustling Devaraja Market.",
    image: "/destinations/domestic/Mysore.jpg",
    priceMin: 12000,
    priceMax: 35000,
    highlights: ["Royal Mysore Palace", "Chamundi Hill & Temple", "Brindavan Gardens", "Philomenas Cathedral"],
    duration: "2-3 days",
    bestTime: "October to February"
  },
  {
    id: 8,
    name: "Bangalore",
    description: "Silicon Valley of India",
    details: "The 'Silicon Valley of India', Bangalore (Bengaluru) is a dynamic metropolis that seamlessly blends its colonial heritage with modern technology. Known for its pleasant weather and lush green parks like Cubbon Park and Lalbagh, it is a city of gardens, vibrant nightlife, and architectural marvels like the Vidhana Soudha.",
    image: "/destinations/domestic/Bangalore.png",
    priceMin: 15000,
    priceMax: 45000,
    highlights: ["Vidhana Soudha Architecture", "Lalbagh Botanical Garden", "Cubbon Park", "Bangalore Palace", "Bannerghatta National Park"],
    duration: "2-4 days",
    bestTime: "All Year Round"
  },
  {
    id: 21,
    name: "Ooty",
    description: "Queen of Hill Stations",
    details: "The 'Queen of Hill Stations', Ooty (Udhagamandalam) is a picturesque retreat nestled in the Nilgiri Hills. Famous for its rolling tea gardens, colonial bungalows, and the UNESCO heritage Toy Train, Ooty offers a refreshing escape with its mist-covered peaks and serene lakes. It's the perfect destination for nature lovers and honeymooners.",
    image: "/destinations/domestic/Ooty.jpg",
    priceMin: 18000,
    priceMax: 55000,
    highlights: ["Nilgiri Mountain Railway", "Ooty Lake & Boating", "Botanical Gardens", "Doddabetta Peak View", "Tea Garden Walk"],
    duration: "3-5 days",
    bestTime: "April to June & September to November"
  },
  {
    id: 11,
    name: "Dubai",
    description: "The City of Gold",
    image: "/destinations/international/Dubai.png",
    details: "Dubai is a city and emirate in the United Arab Emirates luxury shopping, ultramodern architecture and a lively nightlife scene. Burj Khalifa, an 830m-tall tower, dominates the skyscraper-filled skyline. At its foot lies Dubai Fountain, with jets and lights choreographed to music. On artificial islands just offshore is Atlantis, The Palm, a resort with water and marine-animal parks.",
    highlights: ["Burj Khalifa Top View", "Desert Safari with Dinner", "Dubai Mall & Fountain Show", "Palm Jumeirah Island", "Traditional Gold Souk"],
    duration: "4-6 days",
    bestTime: "November to March"
  },
  {
    id: 12,
    name: "Thailand",
    description: "The Land of Smiles",
    image: "/destinations/international/Thailand.png",
    details: "Thailand is a Southeast Asian country known for tropical beaches, opulent royal palaces, ancient ruins and ornate temples displaying figures of Buddha. In Bangkok, the capital, an ultramodern cityscape rises next to quiet canalside communities and the iconic temples of Wat Arun, Wat Pho and the Emerald Buddha Temple (Wat Phra Kaew).",
    highlights: ["Bangkok Grand Palace", "Phuket Beach Escape", "Chiang Mai Temples", "Phi Phi Island Tour", "Authentic Thai Street Food"],
    duration: "6-10 days",
    bestTime: "November to February"
  },
  {
    id: 13,
    name: "Sri Lanka",
    description: "Pearl of the Indian Ocean",
    image: "/destinations/international/Sri Lanka.png",
    details: "Sri Lanka is an island nation south of India in the Indian Ocean. Its diverse landscapes range from rainforest and arid plains to highlands and sandy beaches. It’s famed for its ancient Buddhist ruins, including the 5th-century citadel Sigiriya, with its palace and frescoes. The city of Anuradhapura, Sri Lanka's ancient capital, has many ruins dating back more than 2,000 years.",
    highlights: ["Sigiriya Rock Fortress", "Kandy Tooth Relic Temple", "Ella Tea Plantations", "Galle Dutch Fort", "Yala National Park Safari"],
    duration: "7-10 days",
    bestTime: "December to March"
  },
  {
    id: 15,
    name: "Vietnam",
    description: "The Hidden Charm",
    image: "/destinations/international/Vietnam.png",
    details: "Vietnam is a Southeast Asian country known for its beaches, rivers, Buddhist pagodas and bustling cities. Hanoi, the capital, pays homage to the nation’s iconic Communist-era leader, Ho Chi Minh, via a huge marble mausoleum. Ho Chi Minh City (formerly Saigon) has French colonial landmarks, plus Vietnamese War history museums and the Củ Chi tunnels, used by Viet Cong soldiers.",
    highlights: ["Ha Long Bay Cruise", "Hoi An Ancient Town", "Ho Chi Minh City Tour", "Cu Chi Tunnels", "Mekong Delta Boat Trip"],
    duration: "8-12 days",
    bestTime: "February to April & August to October"
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
      <div className="relative h-[65vh] md:h-[75vh]">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 md:px-20">
            <div className="max-w-2xl">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight drop-shadow-2xl">
                {destination.name}
              </h1>
              <p className="text-2xl md:text-3xl text-white font-medium drop-shadow-lg">
                {destination.description}
              </p>
            </div>
          </div>
        </div>

        {/* Floating Info Bar */}
        <div className="absolute left-1/2 -bottom-12 -translate-x-1/2 w-full max-w-5xl px-4 z-20">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100 py-6">
            <div className="flex-1 px-8 py-2 flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0066a1]">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-0.5">Duration</p>
                <p className="text-xl font-bold text-slate-900">{destination.duration || "5-7 days"}</p>
              </div>
            </div>
            <div className="flex-1 px-8 py-2 flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0066a1]">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-0.5">Location</p>
                <p className="text-xl font-bold text-slate-900">{destination.name}</p>
              </div>
            </div>
            <div className="flex-1 px-8 py-2 flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0066a1]">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-0.5">Best Time to Visit</p>
                <p className="text-xl font-bold text-slate-900">{destination.bestTime || "March to October"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Main Content */}

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
                
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center">
                    <PhoneCall className="h-4 w-4 text-primary mr-2" />
                    <span className="font-medium text-sm">+91-9370528517</span>
                  </div>
                  <div className="flex items-center">
                    <PhoneCall className="h-4 w-4 text-primary mr-2" />
                    <span className="font-medium text-sm">+971-555995260</span>
                  </div>
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
