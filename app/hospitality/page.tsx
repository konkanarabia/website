import type { Metadata } from 'next';
import ItemList from "../components/item-list";
import { getHospitality } from "../actions/hospitality";
import dbConnect from "@/lib/mongodb";

export const metadata: Metadata = {
  title: 'Premium Stays & Resorts | KonkanArabia Hospitality',
  description: 'Discover luxury beach resorts and comfortable family stays managed by KonkanArabia. Experience authentic hospitality in the heart of Konkan.',
};

export default async function HospitalityPage() {
  await dbConnect();
  const hospitality = await getHospitality();
  
  return (
    <main className="bg-slate-50 min-h-screen pt-24 pb-20">
      <ItemList 
        items={JSON.parse(JSON.stringify(hospitality))}
        category="hospitality"
        title="Hospitality & Stays"
        description="Experience a stay that feels like home. Our managed resorts and hotels offer the perfect blend of natural beauty, local culture, and modern premium amenities."
        icon="Hotel"
        accentColor="text-blue-600"
      />
    </main>
  );
}
