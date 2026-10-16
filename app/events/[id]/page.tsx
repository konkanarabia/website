import type { Metadata } from 'next';
import dbConnect from "@/lib/mongodb";
import Event from "@/lib/models/Event";
import { notFound } from "next/navigation";
import DetailClient from "@/app/components/detail-client";
import { getItemDetailSchema, getBreadcrumbSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  await dbConnect();
  const event = await Event.findOne({ id: Number(id) }).lean();
  if (!event) return { title: 'Event Not Found' };

  const title = `${event.name} | Luxury Event Management | KonkanArabia`;
  const description = event.description ? `${event.description.slice(0, 155)}...` : `Organize ${event.name} with premium venue styling, catering, and management by KonkanArabia.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/events/${event.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://konkanarabiahospitalitygroup.com/events/${event.id}`,
      siteName: 'KonkanArabia Hospitality & Holiday Group',
      images: event.image ? [{ url: event.image, alt: event.name }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: event.image ? [event.image] : undefined,
    },
  };
}

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const event = await Event.findOne({ id: Number(id) }).lean();
  const allEvents = await Event.find().select('id name').lean();
  if (!event) notFound();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Event Management', url: '/events' },
    { name: event.name, url: `/events/${event.id}` },
  ];

  return (
    <main className="bg-white min-h-screen pt-24">
      {/* Schema.org Service & Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getItemDetailSchema({
            id: event.id,
            name: event.name,
            description: event.description,
            image: event.image,
            category: 'events',
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
        item={JSON.parse(JSON.stringify(event))} 
        allItems={JSON.parse(JSON.stringify(allEvents))}
        category="events"
        categoryTitle="Event Management"
      />
    </main>
  );
}
