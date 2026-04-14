import dbConnect from "@/lib/mongodb";
import Restaurant from "@/lib/models/Restaurant";
import { notFound } from "next/navigation";
import DetailClient from "@/app/components/detail-client";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const res = await Restaurant.findOne({ id: Number(id) }).lean();
  if (!res) return { title: 'Restaurant Not Found' };
  return { title: `${res.name} | Authentic Dining | KonkanArabia Swad` };
}

export default async function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const res = await Restaurant.findOne({ id: Number(id) }).lean();
  const allRes = await Restaurant.find().select('id name').lean();
  if (!res) notFound();

  return (
    <main className="bg-white min-h-screen pt-24">
      <DetailClient 
        item={JSON.parse(JSON.stringify(res))} 
        allItems={JSON.parse(JSON.stringify(allRes))}
        category="restaurants"
        categoryTitle="Food & Restaurants"
      />
    </main>
  );
}
