'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import TranslatedText from '@/components/TranslatedText';
import { fadeUp, inView, spring, stagger } from '@/lib/motion';

interface ReviewItem {
  id: string;
  userName: string;
  comment: string;
  rating: number;
  destinationName: string;
}

export default function TestimonialsClient({
  reviews,
}: {
  reviews: ReviewItem[];
}) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50 overflow-hidden relative border-y border-slate-200">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <Quote className="w-96 h-96 text-slate-400 absolute -top-20 -left-20 rotate-12" />
        <Quote className="w-96 h-96 text-slate-400 absolute -bottom-20 -right-20 -rotate-12" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <motion.div
          variants={fadeUp}
          {...inView}
          className="text-center mb-16"
        >
          <span className="text-[10px] font-bold text-[#00558a] uppercase tracking-[0.3em] mb-4 block">
            <TranslatedText text="Traveler Voices" />
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-black text-slate-900 tracking-tighter">
            <TranslatedText text='What Our <span className="text-[#00558a]">Travelers Say</span>' isHtml />
          </h2>
        </motion.div>

        <motion.div
          variants={stagger(0.08, 0.1)}
          {...inView}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reviews.map((rev) => (
            <motion.div
              key={rev.id}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={spring}
            >
              <div className="bg-white border border-slate-200/80 p-8 rounded-3xl shadow-soft hover:shadow-lift transition-all duration-300 group h-full flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-4 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium italic mb-6 line-clamp-4 text-base">
                    &ldquo;<TranslatedText text={rev.comment} />&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-slate-100 pt-6 mt-auto">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -6 }}
                    transition={spring}
                    className="w-12 h-12 rounded-full bg-[#00558a] flex items-center justify-center text-white font-black text-lg shadow-sm"
                  >
                    {rev.userName.charAt(0)}
                  </motion.div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm">
                      {rev.userName}
                    </h4>
                    <p className="text-[#00558a] text-[10px] font-bold uppercase tracking-widest">
                      <TranslatedText text="Explored" /> <TranslatedText text={rev.destinationName || 'a hidden gem'} />
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
