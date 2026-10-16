import type { Metadata } from 'next';
import dbConnect from "@/lib/mongodb";
import Restaurant from "@/lib/models/Restaurant";
import { notFound } from "next/navigation";
import DetailClient from "@/app/components/detail-client";
import { getItemDetailSchema, getBreadcrumbSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  await dbConnect();
  const res = await Restaurant.findOne({ id: Number(id) }).lean();
  if (!res) return { title: 'Restaurant Not Found' };

  const title = `${res.name} | Authentic Malvani & Coastal Dining | KonkanArabia`;
  const description = res.description ? `${res.description.slice(0, 155)}...` : `Savor fresh seafood and traditional coastal recipes at ${res.name} with KonkanArabia.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/restaurants/${res.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://konkanarabiahospitalitygroup.com/restaurants/${res.id}`,
      siteName: 'KonkanArabia Hospitality & Holiday Group',
      images: res.image ? [{ url: res.image, alt: res.name }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: res.image ? [res.image] : undefined,
    },
  };
}

export default async function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const res = await Restaurant.findOne({ id: Number(id) }).lean();
  const allRes = await Restaurant.find().select('id name').lean();
  if (!res) notFound();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Food & Restaurants', url: '/restaurants' },
    { name: res.name, url: `/restaurants/${res.id}` },
  ];

  return (
    <main className="bg-white min-h-screen pt-24">
      {/* Schema.org FoodEstablishment & Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getItemDetailSchema({
            id: res.id,
            name: res.name,
            description: res.description,
            image: res.image,
            category: 'restaurants',
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
        item={JSON.parse(JSON.stringify(res))} 
        allItems={JSON.parse(JSON.stringify(allRes))}
        category="restaurants"
        categoryTitle="Food & Restaurants"
      />
    </main>
  );
}
