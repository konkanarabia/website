import dbConnect from "@/lib/mongodb";
import Visa from "@/lib/models/Visa";
import { notFound } from "next/navigation";
import DetailClient from "@/app/components/detail-client";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const visa = await Visa.findOne({ id: Number(id) }).lean();
  if (!visa) return { title: 'Visa Service Not Found' };
  return { title: `${visa.name} | Visa Processing | KonkanArabia` };
}

export default async function VisaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const visa = await Visa.findOne({ id: Number(id) }).lean();
  const allVisas = await Visa.find().select('id name').lean();
  if (!visa) notFound();

  return (
    <main className="bg-white min-h-screen pt-24">
      <DetailClient 
        item={JSON.parse(JSON.stringify(visa))} 
        allItems={JSON.parse(JSON.stringify(allVisas))}
        category="visas"
        categoryTitle="Visa Processing"
      />
    </main>
  );
}
