import dbConnect from "@/lib/mongodb";
import Event from "@/lib/models/Event";
import { notFound } from "next/navigation";
import DetailClient from "@/app/components/detail-client";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const event = await Event.findOne({ id: Number(id) }).lean();
  if (!event) return { title: 'Event Not Found' };
  return { title: `${event.name} | Event Management | KonkanArabia` };
}

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const event = await Event.findOne({ id: Number(id) }).lean();
  const allEvents = await Event.find().select('id name').lean();
  if (!event) notFound();

  return (
    <main className="bg-white min-h-screen pt-24">
      <DetailClient 
        item={JSON.parse(JSON.stringify(event))} 
        allItems={JSON.parse(JSON.stringify(allEvents))}
        category="events"
        categoryTitle="Event Management"
      />
    </main>
  );
}
