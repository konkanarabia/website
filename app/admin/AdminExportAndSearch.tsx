'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Download, Loader2, X } from 'lucide-react';
import { exportEnquiriesCsv } from '@/app/actions/enquiries';
import { toast } from 'sonner';

export default function AdminExportAndSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('q') || '';
  const currentFilter = searchParams.get('filter') || 'all';

  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [exporting, setExporting] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', 'enquiries');
    params.set('page', '1');
    if (searchTerm.trim()) {
      params.set('q', searchTerm.trim());
    } else {
      params.delete('q');
    }
    router.push(`/admin?${params.toString()}`);
  };

  const handleClear = () => {
    setSearchTerm('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    params.set('page', '1');
    router.push(`/admin?${params.toString()}`);
  };

  const handleExportCsv = async () => {
    setExporting(true);
    toast.info('Preparing leads export...');
    const res = await exportEnquiriesCsv(currentFilter, currentSearch);
    setExporting(false);

    if (!res.success || !res.data || res.data.length === 0) {
      toast.warning('No enquiries found to export.');
      return;
    }

    // Format CSV
    const headers = ['ID', 'Customer Name', 'Email', 'Phone', 'Service / Destination', 'Status', 'Is Spam', 'Spam Score', 'Spam Reason', 'Date'];
    const rows = res.data.map((enq: any) => [
      `"${enq._id}"`,
      `"${(enq.name || enq.fname || '').replace(/"/g, '""')}"`,
      `"${(enq.email || '').replace(/"/g, '""')}"`,
      `"${(enq.phone || '').replace(/"/g, '""')}"`,
      `"${(enq.destination || enq.travelType || '').replace(/"/g, '""')}"`,
      `"${enq.status || 'New'}"`,
      enq.isSpam ? 'YES' : 'NO',
      enq.spamScore ? `${Math.round(enq.spamScore * 100)}%` : '0%',
      `"${(enq.spamReason || '').replace(/"/g, '""')}"`,
      `"${new Date(enq.createdAt).toISOString()}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r: string[]) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `konkanarabia-leads-${currentFilter}-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${res.data.length} leads successfully!`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full sm:w-64">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search name, phone, email..."
          className="w-full pl-9 pr-8 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </form>

      {/* Export CSV Button */}
      <button
        type="button"
        onClick={handleExportCsv}
        disabled={exporting}
        title="Download filtered leads as CSV spreadsheet"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors disabled:opacity-50 shrink-0"
      >
        {exporting ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <Download className="w-3.5 h-3.5 text-emerald-600" />
        )}
        <span>Export CSV</span>
      </button>
    </div>
  );
}
