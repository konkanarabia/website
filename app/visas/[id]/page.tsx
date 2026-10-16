import type { Metadata } from 'next';
import dbConnect from "@/lib/mongodb";
import Visa from "@/lib/models/Visa";
import { notFound } from "next/navigation";
import DetailClient from "@/app/components/detail-client";
import { getItemDetailSchema, getBreadcrumbSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  await dbConnect();
  const visa = await Visa.findOne({ id: Number(id) }).lean();
  if (!visa) return { title: 'Visa Service Not Found' };

  const title = `${visa.name} Visa Assistance | KonkanArabia Travel Services`;
  const description = visa.description ? `${visa.description.slice(0, 155)}...` : `Fast and hassle-free visa processing for ${visa.name} with complete document support by KonkanArabia.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/visas/${visa.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://konkanarabiahospitalitygroup.com/visas/${visa.id}`,
      siteName: 'KonkanArabia Hospitality & Holiday Group',
      images: visa.image ? [{ url: visa.image, alt: visa.name }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: visa.image ? [visa.image] : undefined,
    },
  };
}

export default async function VisaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const visa = await Visa.findOne({ id: Number(id) }).lean();
  const allVisas = await Visa.find().select('id name').lean();
  if (!visa) notFound();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Visa Processing', url: '/visas' },
    { name: visa.name, url: `/visas/${visa.id}` },
  ];

  return (
    <main className="bg-white min-h-screen pt-24">
      {/* Schema.org Service & Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getItemDetailSchema({
            id: visa.id,
            name: visa.name,
            description: visa.description,
            image: visa.image,
            category: 'visas',
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
        item={JSON.parse(JSON.stringify(visa))} 
        allItems={JSON.parse(JSON.stringify(allVisas))}
        category="visas"
        categoryTitle="Visa Processing"
      />
    </main>
  );
}
