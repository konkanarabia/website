'use client';

import React, { useState } from 'react';
import { Sparkles, Mail, Loader2, Send } from 'lucide-react';
import { updateEnquiryStatus } from '@/app/actions/enquiries';
import { draftEnquiryReply } from '@/app/actions/gemini';
import { sendAdminLeadEmail } from '@/app/actions/admin-email';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function EnquiryRow({ enq }: { enq: any }) {
  const [loading, setLoading] = useState(false);
  const [drafting, setDrafting] = useState(false);
  const [sending, setSending] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [markContacted, setMarkContacted] = useState(true);

  const defaultSubject = `Re: Your ${enq.destination || 'travel'} enquiry — KonkanArabia`;

  const openEmailDialog = () => {
    setSubject(defaultSubject);
    setBody('');
    setMarkContacted(true);
    setDialogOpen(true);
  };

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

  const loadAiDraftIntoBody = async () => {
    setDrafting(true);
    const res = await draftEnquiryReply(enq);
    setDrafting(false);
    if (res.success && res.text) {
      setBody(res.text);
      toast.success('Draft ready — review and send');
    } else {
      toast.error('Could not generate draft');
    }
  };

  const openEmailDialogWithAi = async () => {
    setSubject(defaultSubject);
    setBody('');
    setMarkContacted(true);
    setDialogOpen(true);
    await loadAiDraftIntoBody();
  };

  const handleSendResend = async () => {
    if (!subject.trim() || !body.trim()) {
      toast.error('Add a subject and message before sending');
      return;
    }
    setSending(true);
    const res = await sendAdminLeadEmail({
      to: enq.email,
      subject: subject.trim(),
      body: body.trim(),
      enquiryId: enq._id,
      markContacted,
    });
    setSending(false);
    if (res.success) {
      toast.success('Email sent with Resend');
      setDialogOpen(false);
    } else {
      toast.error(res.error || 'Send failed');
    }
  };

  const handleMailtoDraft = async () => {
    setDrafting(true);
    const res = await draftEnquiryReply(enq);
    setDrafting(false);
    if (res.success && res.text) {
      const sub = encodeURIComponent(defaultSubject);
      const b = encodeURIComponent(res.text);
      window.location.href = `mailto:${enq.email}?subject=${sub}&body=${b}`;
    } else {
      toast.error('Failed to generate draft');
    }
  };

  return (
    <>
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
              enq.status === 'New'
                ? 'text-green-600 bg-green-50'
                : enq.status === 'Contacted'
                  ? 'text-blue-600 bg-blue-50'
                  : enq.status === 'Booked'
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-gray-600 bg-gray-100'
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
              type="button"
              onClick={openEmailDialog}
              title="Send email (Resend)"
              className="p-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={openEmailDialogWithAi}
              disabled={drafting || sending}
              title="Reply with Resend (AI draft)"
              className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
            >
              {drafting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={handleMailtoDraft}
              disabled={drafting}
              title="Open mail app with AI draft"
              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {new Date(enq.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </td>
      </tr>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Email {enq.name}</DialogTitle>
            <DialogDescription>
              Sends from your Resend domain (<span className="font-mono text-xs">EMAIL_FROM</span>) to{' '}
              <span className="font-medium text-foreground">{enq.email}</span>.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="space-y-2">
              <Label htmlFor={`sub-${enq._id}`}>Subject</Label>
              <Input
                id={`sub-${enq._id}`}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject line"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor={`body-${enq._id}`}>Message</Label>
                <Button type="button" variant="outline" size="sm" onClick={loadAiDraftIntoBody} disabled={drafting}>
                  {drafting ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
                  Insert AI draft
                </Button>
              </div>
              <Textarea
                id={`body-${enq._id}`}
                rows={10}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your reply…"
                className="resize-y min-h-[180px]"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={markContacted}
                onChange={(e) => setMarkContacted(e.target.checked)}
                className="rounded border-gray-300"
              />
              Mark enquiry as Contacted after send
            </label>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSendResend} disabled={sending} className="bg-emerald-600 hover:bg-emerald-700">
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send with Resend
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
