'use client'

import React, { useEffect, useState } from 'react';
import { Star, MessageSquare, Send, Sparkles, User, Loader2 } from 'lucide-react';
import { submitReview, getReviewSummary } from '@/app/actions/reviews';
import { toast } from 'sonner';

export default function ReviewSection({ destinationId, reviews: initialReviews }: { destinationId: number, reviews: any[] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [summary, setSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchSummary() {
      if (reviews.length > 0) {
        const res = await getReviewSummary(reviews);
        if (res.success) setSummary(res.text);
      }
      setLoadingSummary(false);
    }
    fetchSummary();
  }, [reviews]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const res = await submitReview(destinationId, formData);
    if (res.success) {
      toast.success('Your review has been posted! ✨');
      // Add a dummy review to state so the user sees it immediately without reload
      const newRev = {
        _id: Math.random().toString(),
        userName: formData.get('userName'),
        rating: Number(formData.get('rating')),
        comment: formData.get('comment'),
        createdAt: new Date()
      };
      setReviews(prev => [newRev, ...prev]);
      e.currentTarget.reset();
    } else {
      toast.error('Failed to submit review');
    }
    setSubmitting(false);
  };

  return (
    <div className="mt-20 border-t border-slate-100 pt-16">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          <h3 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
             <MessageSquare className="w-8 h-8 text-[#0066a1]" />
             Traveler Stories
          </h3>

          {summary && (
            <div className="bg-purple-50 border border-purple-100 p-6 rounded-2xl mb-12 flex items-start gap-4">
                <Sparkles className="w-6 h-6 text-purple-600 mt-1 shrink-0" />
                <div>
                    <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-1 block">Aura's Consensus</span>
                    <p className="text-slate-700 font-medium italic">"{summary}"</p>
                </div>
            </div>
          )}

          <div className="space-y-8">
            {reviews.length > 0 ? reviews.map((rev, i) => (
                <div key={rev._id} className="bg-white p-6 rounded-2xl border border-slate-50 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                <User className="w-5 h-5 text-slate-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">{rev.userName}</h4>
                                <span className="text-[10px] text-slate-400 font-medium">Verified traveler</span>
                            </div>
                        </div>
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, idx) => (
                                <Star key={idx} className={`w-3 h-3 ${idx < rev.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                            ))}
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{rev.comment}</p>
                </div>
            )) : (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 font-medium">
                    Be the first to share your experience!
                </div>
            )}
          </div>
        </div>

        <div className="md:w-96">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
                <h4 className="text-lg font-bold text-slate-900 mb-6">Leave a Review</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Your Name</label>
                        <input name="userName" required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Rating</label>
                        <select name="rating" required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white">
                            <option value="5">5 - Excellent</option>
                            <option value="4">4 - Very Good</option>
                            <option value="3">3 - Average</option>
                            <option value="2">2 - Poor</option>
                            <option value="1">1 - Terrible</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Comment</label>
                        <textarea name="comment" required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm h-32" placeholder="Tell us about your trip..." />
                    </div>
                    <button 
                        disabled={submitting}
                        className="w-full bg-[#0066a1] text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-blue-900/10 hover:bg-[#00558a] transition-all flex items-center justify-center gap-2"
                    >
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        Post Review
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}
