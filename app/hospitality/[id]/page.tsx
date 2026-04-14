import dbConnect from "@/lib/mongodb";
import Hospitality from "@/lib/models/Hospitality";
import { notFound } from "next/navigation";
import DetailClient from "@/app/components/detail-client";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const hospitality = await Hospitality.findOne({ id: Number(id) }).lean();
  if (!hospitality) return { title: 'Stay Not Found' };
  return { title: `${hospitality.name} | Luxury Stay | KonkanArabia` };
}

export default async function HospitalityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const hospitality = await Hospitality.findOne({ id: Number(id) }).lean();
  const allHospitality = await Hospitality.find().select('id name').lean();
  if (!hospitality) notFound();

  return (
    <main className="bg-white min-h-screen pt-24">
      <DetailClient 
        item={JSON.parse(JSON.stringify(hospitality))} 
        allItems={JSON.parse(JSON.stringify(allHospitality))}
        category="hospitality"
        categoryTitle="Hospitality & Stays"
      />
    </main>
  );
}
