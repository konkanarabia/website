import dbConnect from "@/lib/mongodb";
import { unstable_noStore as noStore } from "next/cache";
import Hospitality from "@/lib/models/Hospitality";
import Restaurant from "@/lib/models/Restaurant";
import SpecializedServicesClient from "./specialized-services-client";

export default async function SpecializedServices() {
  noStore(); // Always fetch fresh data — no static cache
  await dbConnect();
  
  // Fetch up to 1 item from each category for the spotlight section
  const [stay] = await Hospitality.find().limit(1).lean();
  const [food] = await Restaurant.find().limit(1).lean();

  const services = [];
  if (stay) {
    services.push({
      id: String(stay.id || stay._id),
      name: String(stay.name || ''),
      type: 'hospitality',
      title: 'Hospitality / Hotels',
      description: String(stay.description || ''),
      image: stay.image ? String(stay.image) : undefined,
      features: Array.isArray(stay.features) ? stay.features.map(String) : [],
      link: `/hospitality/${stay.id || stay._id}`,
    });
  }
  if (food) {
    services.push({
      id: String(food.id || food._id),
      name: String(food.name || ''),
      type: 'restaurants',
      title: 'Food & Beverages',
      description: String(food.description || ''),
      image: food.image ? String(food.image) : undefined,
      features: Array.isArray(food.features) ? food.features.map(String) : [],
      link: `/restaurants/${food.id || food._id}`,
    });
  }

  // Mumbai to Malabar Food Express franchise opportunity card
  services.push({
    id: 'mumbai-to-malabar-express',
    type: 'franchise',
    name: 'Mumbai to Malabar Food Express',
    title: 'Franchise & Business Opportunity',
    description: 'A premier culinary concept celebrating authentic coastal flavors from CST Mumbai to Malabar Kerala. Multi-format franchise & investment opportunities across India, UAE & SE Asia.',
    image: '/services/mumbai-to-malabar-express.webp',
    features: ['Franchise Model', 'QSR & Fine Dine', 'Coastal Cuisine', 'High ROI'],
    link: '/franchise',
  });

  return <SpecializedServicesClient services={services} />;
}
