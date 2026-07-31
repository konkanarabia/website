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
        <section className="py-24 bg-slate-50 overflow-hidden relative border-y border-slate-200">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <Quote className="w-96 h-96 text-slate-400 absolute -top-20 -left-20 rotate-12" />
                <Quote className="w-96 h-96 text-slate-400 absolute -bottom-20 -right-20 -rotate-12" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-[10px] font-bold text-[#00558a] uppercase tracking-[0.3em] mb-4 block">
                        <TranslatedText text="Traveler Voices" />
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif font-black text-slate-900 tracking-tighter">
                        <TranslatedText text='What Our <span className="text-[#00558a]">Travelers Say</span>' isHtml />
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((rev: any) => (
                        <div key={rev._id} className="bg-white border border-slate-200 p-8 rounded-3xl shadow-md hover:shadow-lg transition-all group">
                            <div className="flex gap-1 mb-4 text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-200'}`} />
                                ))}
                            </div>
                            <p className="text-slate-700 leading-relaxed font-medium italic mb-6 line-clamp-4">
                                "<TranslatedText text={rev.comment} />"
                            </p>
                            <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                                <div className="w-12 h-12 rounded-full bg-[#00558a] flex items-center justify-center text-white font-black">
                                    {rev.userName.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-slate-900 font-bold text-sm">{rev.userName}</h4>
                                    <p className="text-[#00558a] text-[10px] font-bold uppercase tracking-widest">
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
