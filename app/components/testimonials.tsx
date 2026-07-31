import dbConnect from '@/lib/mongodb';
import Review from '@/lib/models/Review';
import Destination from '@/lib/models/Destination';
import { Star, Quote, User } from 'lucide-react';
import TranslatedText from '@/components/TranslatedText';


export default async function Testimonials() {
    await dbConnect();
    
    // Get latest 6 reviews and populate destination name if possible
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(6).lean();
    const destinations = await Destination.find({ id: { $in: reviews.map(r => r.destinationId) } }).lean();
    const destMap = new Map(destinations.map(d => [d.id, d.name]));

    if (reviews.length === 0) return null;

    return (
        <section className="py-24 bg-slate-900 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <Quote className="w-96 h-96 text-white absolute -top-20 -left-20 rotate-12" />
                <Quote className="w-96 h-96 text-white absolute -bottom-20 -right-20 -rotate-12" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-[0.3em] mb-4 block">
                        <TranslatedText text="Traveler Voices" />
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                        <TranslatedText text='What Our <span className="text-amber-400">Travelers Say</span>' isHtml />
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((rev: any) => (
                        <div key={rev._id} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group">
                            <div className="flex gap-1 mb-4 text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400' : 'text-white/20'}`} />
                                ))}
                            </div>
                            <p className="text-white/80 leading-relaxed font-medium italic mb-6 line-clamp-4">
                                "<TranslatedText text={rev.comment} />"
                            </p>
                            <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 font-black">
                                    {rev.userName.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">{rev.userName}</h4>
                                    <p className="text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                                        <TranslatedText text="Explored" /> <TranslatedText text={destMap.get(rev.destinationId) || 'a hidden gem'} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
