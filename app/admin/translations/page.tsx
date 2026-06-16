'use client';

import React, { useState, useEffect } from 'react';
import {
  Globe,
  RefreshCw,
  Trash2,
  Play,
  Loader2,
  Database,
  CheckCircle2
} from 'lucide-react';
import {
  getTranslationStats,
  clearTranslationCache,
  runPreTranslateScriptAction
} from '@/app/actions/translate';
import { toast } from 'sonner';

export default function TranslationsAdminPage() {
  const [stats, setStats] = useState<{ count: number } | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [runMessage, setRunMessage] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoadingStats(true);
    const res = await getTranslationStats();
    if (res.success) {
      setStats({ count: res.count });
    } else {
      toast.error('Failed to load translation stats: ' + res.error);
    }
    setLoadingStats(false);
  };

  const handleClearCache = async () => {
    if (!confirm('Are you sure you want to clear the entire translation cache in the database? This will reset all pre-translated texts.')) {
      return;
    }

    try {
      const res = await clearTranslationCache();
      if (res.success) {
        toast.success('Translation cache cleared successfully.');
        setRunMessage('Translations cleared.');
        fetchStats();
      } else {
        toast.error('Failed to clear translations: ' + res.error);
      }
    } catch (err: any) {
      toast.error('Error: ' + err.message);
    }
  };

  const triggerPreTranslation = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setRunMessage('Initializing translation crawler on the server...');

    try {
      const res = await runPreTranslateScriptAction();
      if (res.success) {
        toast.success('Pre-translation script started in the background!');
        setRunMessage('The translation crawler is currently running in the background on the server. Please wait a few minutes, then click "Refresh Stats" to view the updated counts.');
      } else {
        toast.error('Failed to start script: ' + res.error);
        setRunMessage('Failed to start translation script: ' + res.error);
      }
    } catch (err: any) {
      toast.error('Error starting script: ' + err.message);
      setRunMessage('Error: ' + err.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Globe className="w-8 h-8 text-blue-600 animate-pulse" />
          AI Translation Cache Manager
        </h1>
        <p className="text-gray-500 mt-1">
          Pre-translate dynamic database content and static UI fields to prevent Gemini API rate limit problems.
        </p>
      </div>

      {/* Stats and Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-100 p-4 rounded-full mr-5 text-blue-600">
              <Database className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Total Translations</p>
              <h2 className="text-3xl font-black text-gray-800">
                {loadingStats ? (
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                ) : (
                  stats?.count ?? 0
                )}
              </h2>
            </div>
          </div>
          <button
            onClick={fetchStats}
            disabled={loadingStats}
            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh stats"
          >
            <RefreshCw className={`w-5 h-5 ${loadingStats ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between col-span-1 md:col-span-2 gap-4">
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Cache Actions</h3>
            <p className="text-sm text-gray-500 mt-1">
              Purge translation cache, or pre-translate all available items.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handleClearCache}
              disabled={isRunning}
              className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cache
            </button>
            <button
              onClick={triggerPreTranslation}
              disabled={isRunning}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm text-sm"
            >
              {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              Run Pre-Translation Script
            </button>
          </div>
        </div>
      </div>

      {/* Runner Feedback Section */}
      {runMessage && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            Background Task Status
          </h3>
          <p className="text-gray-600 text-sm bg-gray-50 border border-gray-100 rounded-lg p-4 font-medium leading-relaxed">
            {runMessage}
          </p>
        </div>
      )}

      {/* Guide Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 shadow-sm">
        <h3 className="font-bold text-blue-900 text-lg">How it works</h3>
        <ul className="mt-3 space-y-2.5 text-blue-800 text-sm">
          <li className="flex items-start gap-2.5">
            <span className="font-bold text-blue-600 shrink-0">1.</span>
            <span>
              <strong>Zero-AI Runtime:</strong> Live page requests check the static translation dictionary and the database cache in MongoDB. If not found, they fall back to English immediately with absolutely no runtime Gemini API calls.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-bold text-blue-600 shrink-0">2.</span>
            <span>
              <strong>Pre-Translation Crawl:</strong> Clicking the script button above queries all destinations, event packages, stays, dining configurations, visas, vehicle offerings, and guest testimonials. It also scans client component files for static labels.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-bold text-blue-600 shrink-0">3.</span>
            <span>
              <strong>Rate Limiting & Safety:</strong> Translations are processed in batches with a 12-second delay between Gemini API calls to stay under the 5 RPM rate limit, saving strings incrementally directly to the database so progress is never lost.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
