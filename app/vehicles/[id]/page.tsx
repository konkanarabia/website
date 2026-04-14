import dbConnect from "@/lib/mongodb";
import Vehicle from "@/lib/models/Vehicle";
import { notFound } from "next/navigation";
import DetailClient from "@/app/components/detail-client";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const vehicle = await Vehicle.findOne({ id: Number(id) }).lean();
  if (!vehicle) return { title: 'Vehicle Not Found' };
  return { title: `${vehicle.name} | Premium Rental | KonkanArabia` };
}

export default async function VehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const vehicle = await Vehicle.findOne({ id: Number(id) }).lean();
  const allVehicles = await Vehicle.find().select('id name').lean();
  if (!vehicle) notFound();

  return (
    <main className="bg-white min-h-screen pt-24">
      <DetailClient 
        item={JSON.parse(JSON.stringify(vehicle))} 
        allItems={JSON.parse(JSON.stringify(allVehicles))}
        category="vehicles"
        categoryTitle="Vehicle Rentals"
      />
    </main>
  );
}
