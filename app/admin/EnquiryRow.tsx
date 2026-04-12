'use client'

import React, { useState } from 'react';
import { Sparkles, Mail, Check, Loader2 } from 'lucide-react';
import { updateEnquiryStatus } from '@/app/actions/enquiries';
import { draftEnquiryReply } from '@/app/actions/gemini';
import { toast } from 'sonner';

export default function EnquiryRow({ enq }: { enq: any }) {
  const [loading, setLoading] = useState(false);
  const [drafting, setDrafting] = useState(false);

  const handleStatusUpdate = async (newStatus: string) => {
    setLoading(true);
    const res = await updateEnquiryStatus(enq._id, newStatus);
    if (res.success) {
      toast.success('Status updated');
    } else {
      toast.error('Failed to update status');
    }
    setLoading(false);
  };

  const handleAIDraft = async () => {
    setDrafting(true);
    const res = await draftEnquiryReply(enq);
    if (res.success && res.text) {
      // Open mail client with draft
      const subject = encodeURIComponent(`Re: Your enquiry for ${enq.destination}`);
      const body = encodeURIComponent(res.text);
      window.location.href = `mailto:${enq.email}?subject=${subject}&body=${body}`;
    } else {
      toast.error('Failed to generate draft');
    }
    setDrafting(false);
  };

  return (
    <tr className="hover:bg-blue-50/20 transition-colors group">
      <td className="px-6 py-4">
        <div className="font-bold text-gray-800">{enq.name}</div>
        <div className="text-xs text-gray-500">{enq.email}</div>
        {enq.phone && <div className="text-[10px] text-gray-400">{enq.phone}</div>}
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-700">{enq.destination}</div>
        {enq.travelType && (
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                {enq.travelType}
            </span>
        )}
      </td>
      <td className="px-6 py-4">
        <select 
          value={enq.status} 
          onChange={(e) => handleStatusUpdate(e.target.value)}
          disabled={loading}
          className={`text-xs font-bold px-2 py-1 rounded border-none appearance-none cursor-pointer outline-none ${
            enq.status === 'New' ? 'text-green-600 bg-green-50' :
            enq.status === 'Contacted' ? 'text-blue-600 bg-blue-50' :
            enq.status === 'Booked' ? 'text-emerald-700 bg-emerald-50' :
            'text-gray-600 bg-gray-100'
          }`}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Booked">Booked</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={handleAIDraft}
            disabled={drafting}
            title="AI draft reply"
            className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
          >
            {drafting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          </button>
          <a
            href={`mailto:${enq.email}`}
            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
        <div className="text-xs text-gray-400 mt-1">
            {new Date(enq.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
      </td>
    </tr>
  );
}
