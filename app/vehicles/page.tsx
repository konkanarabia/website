import type { Metadata } from 'next';
import ItemList from "../components/item-list";
import { getVehicles } from "../actions/vehicles";
import dbConnect from "@/lib/mongodb";

export const metadata: Metadata = {
  title: 'Premium Vehicle Rental | Luxury Transport by KonkanArabia',
  description: 'Rent premium vehicles for your travel needs. From luxury sedans to comfortable group travelers, we provide the best vehicles with professional drivers.',
};

export default async function VehiclesPage() {
  await dbConnect();
  const vehicles = await getVehicles();
  
  return (
    <main className="bg-slate-50 min-h-screen pt-24 pb-20">
      <ItemList 
        items={JSON.parse(JSON.stringify(vehicles))}
        category="vehicles"
        title="Vehicle Rental"
        description="Experience the journey as much as the destination. We offer a curated fleet of premium vehicles for every travel requirement—from executive transfers to family group tours."
        icon="Car"
        accentColor="text-amber-600"
      />
    </main>
  );
}
