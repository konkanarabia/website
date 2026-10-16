'use client';

import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Trash2, Loader2, Sparkles } from 'lucide-react';
import { bulkScanSpamEnquiries, purgeSpamEnquiries } from '@/app/actions/enquiries';
import { toast } from 'sonner';

export default function SpamTriageBar() {
  const [scanning, setScanning] = useState(false);
  const [purging, setPurging] = useState(false);

  const handleBulkScan = async () => {
    setScanning(true);
    toast.info('AI Spam Agent is scanning recent inquiries...');
    const res = await bulkScanSpamEnquiries(20);
    setScanning(false);
    if (res.success) {
      if (res.spamCount && res.spamCount > 0) {
        toast.warning(`AI Scan Complete: Found and flagged ${res.spamCount} spam lead(s) out of ${res.scannedCount} scanned.`);
      } else {
        toast.success(`AI Scan Complete: All ${res.scannedCount} scanned inquiries are clean!`);
      }
    } else {
      toast.error('AI Spam scan failed. Check Gemini API configuration.');
    }
  };

  const handlePurgeSpam = async () => {
    if (!window.confirm('Are you sure you want to delete all flagged spam enquiries?')) {
      return;
    }
    setPurging(true);
    const res = await purgeSpamEnquiries();
    setPurging(false);
    if (res.success) {
      toast.success(`Purged ${res.deletedCount || 0} spam enquiries.`);
    } else {
      toast.error('Failed to purge spam enquiries.');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleBulkScan}
        disabled={scanning || purging}
        title="Analyze recent leads with AI Spam Agent"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors disabled:opacity-50"
      >
        {scanning ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
        )}
        <span>AI Spam Scan</span>
      </button>

      <button
        type="button"
        onClick={handlePurgeSpam}
        disabled={scanning || purging}
        title="Delete all inquiries marked as spam"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors disabled:opacity-50"
      >
        {purging ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <Trash2 className="w-3.5 h-3.5 text-red-600" />
        )}
        <span>Purge Spam</span>
      </button>
    </div>
  );
}
