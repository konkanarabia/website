import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Car, Plane, HeartHandshake, Hotel, Utensils } from "lucide-react";
import TranslatedText from "@/components/TranslatedText";


interface ItemListProps {
  items: any[];
  category: 'vehicles' | 'visas' | 'events' | 'hospitality' | 'restaurants';
  title: string;
  description: string;
  icon: 'Car' | 'Plane' | 'HeartHandshake' | 'Hotel' | 'Utensils';
  accentColor: string;
}

export default function ItemList({ items, category, title, description, icon: IconType, accentColor }: ItemListProps) {
  const getIcon = () => {
    switch (IconType) {
      case 'Car': return <Car className="w-8 h-8" />;
      case 'Plane': return <Plane className="w-8 h-8" />;
      case 'HeartHandshake': return <HeartHandshake className="w-8 h-8" />;
      case 'Hotel': return <Hotel className="w-8 h-8" />;
      case 'Utensils': return <Utensils className="w-8 h-8" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 ${accentColor.replace('text-', 'bg-').split(' ')[0]}/10 ${accentColor.split(' ')[0]} rounded-full text-sm font-bold tracking-wide uppercase mb-6`}>
           {getIcon()}
           <TranslatedText text={title} />
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">
          <TranslatedText text="Premium" /> <span className={accentColor.split(' ')[0]}><TranslatedText text={title} /></span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed font-medium">
          <TranslatedText text={description} />
        </p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item: any) => (
            <Card key={item.id} className="group border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-3xl overflow-hidden bg-white">
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${item.listColor || 'bg-blue-50 text-blue-600'} rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  {getIcon()}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  <TranslatedText text={item.name} />
                </h3>
                <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                  <TranslatedText text={item.description} />
                </p>
                <Link href={item.isCustomLink ? (item.customLinkUrl || "#") : `/${category}/${item.id}`}>
                  <Button variant="ghost" className={`p-0 h-auto hover:bg-transparent ${accentColor.split(' ')[0]} font-bold flex items-center gap-2 group/btn`}>
                    <TranslatedText text="Discover More" />
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
           <p className="text-slate-400 font-bold italic">
             <TranslatedText text={`No ${title.toLowerCase()} available at the moment. Please check back later!`} />
           </p>
        </div>
      )}
    </div>
  );
}
