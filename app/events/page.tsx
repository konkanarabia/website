import type { Metadata } from 'next';
import ItemList from "../components/item-list";
import { getEvents } from "../actions/events";
import dbConnect from "@/lib/mongodb";

export const metadata: Metadata = {
  title: 'Premium Event Management | Weddings, Corporate & Social Events',
  description: 'Memorable events tailored to your vision. From luxury destination weddings to professional corporate retreats, KonkanArabia manages every detail with excellence.',
};

export default async function EventsPage() {
  await dbConnect();
  const events = await getEvents();
  
  return (
    <main className="bg-slate-50 min-h-screen pt-24 pb-20">
      <ItemList 
        items={JSON.parse(JSON.stringify(events))}
        category="events"
        title="Event Management"
        description="Crafting moments that last a lifetime. Whether it's a grand destination wedding, a milestone celebration, or a high-impact corporate event, we bring unmatched precision and creativity to your special occasions."
        icon="HeartHandshake"
        accentColor="text-rose-600"
      />
    </main>
  );
}
