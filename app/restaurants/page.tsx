import type { Metadata } from 'next';
import ItemList from "../components/item-list";
import { getRestaurants } from "../actions/restaurants";
import dbConnect from "@/lib/mongodb";

export const metadata: Metadata = {
  title: 'Authentic Malvani & Goan Cuisine | Konkan Swad Restaurant',
  description: 'Savor the freshest seafood and traditional flavors of the Konkan coast. Our managed restaurants bring you the best of Malvani and Goan culinary heritage.',
};

export default async function RestaurantsPage() {
  await dbConnect();
  const restaurants = await getRestaurants();
  
  return (
    <main className="bg-slate-50 min-h-screen pt-24 pb-20">
      <ItemList 
        items={JSON.parse(JSON.stringify(restaurants))}
        category="restaurants"
        title="Food & Restaurants"
        description="A journey of taste through the heart of Konkan. From fresh catch-of-the-day seafood to secret family recipes, our authentic dining experiences define Malvani hospitality."
        icon="Utensils"
        accentColor="text-red-600"
      />
    </main>
  );
}
