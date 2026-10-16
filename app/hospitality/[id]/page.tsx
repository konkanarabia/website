import type { Metadata } from 'next';
import dbConnect from "@/lib/mongodb";
import Hospitality from "@/lib/models/Hospitality";
import { notFound } from "next/navigation";
import DetailClient from "@/app/components/detail-client";
import { getItemDetailSchema, getBreadcrumbSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  await dbConnect();
  const hospitality = await Hospitality.findOne({ id: Number(id) }).lean();
  if (!hospitality) return { title: 'Stay Not Found' };

  const title = `${hospitality.name} | Luxury Resort & Beach Stay | KonkanArabia`;
  const description = hospitality.description ? `${hospitality.description.slice(0, 155)}...` : `Experience authentic coastal luxury at ${hospitality.name} with KonkanArabia Hospitality Group.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/hospitality/${hospitality.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://konkanarabiahospitalitygroup.com/hospitality/${hospitality.id}`,
      siteName: 'KonkanArabia Hospitality & Holiday Group',
      images: hospitality.image ? [{ url: hospitality.image, alt: hospitality.name }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: hospitality.image ? [hospitality.image] : undefined,
    },
  };
}

export default async function HospitalityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const hospitality = await Hospitality.findOne({ id: Number(id) }).lean();
  const allHospitality = await Hospitality.find().select('id name').lean();
  if (!hospitality) notFound();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Hospitality & Stays', url: '/hospitality' },
    { name: hospitality.name, url: `/hospitality/${hospitality.id}` },
  ];

  return (
    <main className="bg-white min-h-screen pt-24">
      {/* Schema.org LodgingBusiness & Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getItemDetailSchema({
            id: hospitality.id,
            name: hospitality.name,
            description: hospitality.description,
            image: hospitality.image,
            category: 'hospitality',
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
        item={JSON.parse(JSON.stringify(hospitality))} 
        allItems={JSON.parse(JSON.stringify(allHospitality))}
        category="hospitality"
        categoryTitle="Hospitality & Stays"
      />
    </main>
  );
}
