import type { Metadata } from 'next';
import dbConnect from "@/lib/mongodb";
import Vehicle from "@/lib/models/Vehicle";
import { notFound } from "next/navigation";
import DetailClient from "@/app/components/detail-client";
import { getItemDetailSchema, getBreadcrumbSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  await dbConnect();
  const vehicle = await Vehicle.findOne({ id: Number(id) }).lean();
  if (!vehicle) return { title: 'Vehicle Not Found' };

  const title = `${vehicle.name} Rental | KonkanArabia Luxury Transport`;
  const description = vehicle.description ? `${vehicle.description.slice(0, 155)}...` : `Rent ${vehicle.name} with professional chauffeur for executive transfers and tourist trips.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/vehicles/${vehicle.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://konkanarabiahospitalitygroup.com/vehicles/${vehicle.id}`,
      siteName: 'KonkanArabia Hospitality & Holiday Group',
      images: vehicle.image ? [{ url: vehicle.image, alt: vehicle.name }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: vehicle.image ? [vehicle.image] : undefined,
    },
  };
}

export default async function VehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const vehicle = await Vehicle.findOne({ id: Number(id) }).lean();
  const allVehicles = await Vehicle.find().select('id name').lean();
  if (!vehicle) notFound();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Vehicle Rentals', url: '/vehicles' },
    { name: vehicle.name, url: `/vehicles/${vehicle.id}` },
  ];

  return (
    <main className="bg-white min-h-screen pt-24">
      {/* Schema.org Product & Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getItemDetailSchema({
            id: vehicle.id,
            name: vehicle.name,
            description: vehicle.description,
            image: vehicle.image,
            category: 'vehicles',
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)),
        }}
      />
      <DetailClient 
        item={JSON.parse(JSON.stringify(vehicle))} 
        allItems={JSON.parse(JSON.stringify(allVehicles))}
        category="vehicles"
        categoryTitle="Vehicle Rentals"
      />
    </main>
  );
}
