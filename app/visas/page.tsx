import type { Metadata } from 'next';
import ItemList from "../components/item-list";
import { getVisas } from "../actions/visas";
import dbConnect from "@/lib/mongodb";

export const metadata: Metadata = {
  title: 'Hassle-Free Visa Processing | KonkanArabia Travel Services',
  description: 'Fast and reliable visa processing services for your international travel. We handle everything from documentation to submission for all major destinations.',
};

export default async function VisasPage() {
  await dbConnect();
  const visas = await getVisas();
  
  return (
    <main className="bg-slate-50 min-h-screen pt-24 pb-20">
      <ItemList 
        items={JSON.parse(JSON.stringify(visas))}
        category="visas"
        title="Visa Processing"
        description="Simplifying your global travel dreams. Our expert team ensures your visa documentation is perfect, providing end-to-end support for professional, leisure, and student visas across the globe."
        icon="Plane"
        accentColor="text-emerald-600"
      />
    </main>
  );
}
