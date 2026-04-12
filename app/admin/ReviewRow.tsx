'use client'

import React, { useState } from 'react';
import { Star, Trash2, Loader2 } from 'lucide-react';
import { deleteReview } from '@/app/actions/reviews';
import { toast } from 'sonner';

export default function ReviewRow({ rev }: { rev: any }) {
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    const res = await deleteReview(rev._id);
    if (res.success) {
      toast.success('Review deleted');
      window.location.reload();
    } else {
      toast.error('Failed to delete');
    }
    setDeleting(false);
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="font-bold text-gray-800 text-sm">{rev.userName}</div>
        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Verified Traveler</div>
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
            ))}
        </div>
        <p className="text-xs text-gray-600 line-clamp-2 max-w-md font-medium">"{rev.comment}"</p>
      </td>
      <td className="px-6 py-4 text-right">
        {showConfirm ? (
            <div className="flex items-center justify-end gap-2">
                <button onClick={() => setShowConfirm(false)} className="text-xs font-bold text-slate-400 hover:text-slate-600">Cancel</button>
                <button 
                    disabled={deleting}
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 transition-all"
                >
                    {deleting ? <Loader2 className="w-3 h-4 animate-spin" /> : 'Confirm Delete'}
                </button>
            </div>
        ) : (
            <button 
                onClick={() => setShowConfirm(true)}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        )}
      </td>
    </tr>
  );
}
