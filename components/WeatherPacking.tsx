'use client'

import React, { useEffect, useState } from 'react';
import { Sun, CheckCircle2, Lightbulb, ThermometerSun } from 'lucide-react';
import { getTravelWeatherAndPacking } from '@/app/actions/gemini';

export default function WeatherPacking({ destination }: { destination: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  useEffect(() => {
    async function fetchAdvice() {
      const res = await getTravelWeatherAndPacking(destination, currentMonth);
      if (res.success) {
        setData(res.data);
      }
      setLoading(false);
    }
    fetchAdvice();
  }, [destination, currentMonth]);

  if (loading) {
    return (
      <div className="animate-pulse rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 md:p-8">
        <div className="mb-4 h-4 w-1/3 max-w-[140px] rounded bg-slate-100" />
        <div className="mb-4 h-20 rounded bg-slate-50" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-slate-50" />
          <div className="h-3 w-5/6 rounded bg-slate-50" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  const essentials: string[] = Array.isArray(data.essentials) ? data.essentials : [];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 md:p-8">
      <div className="pointer-events-none absolute -right-4 -top-4 p-4 opacity-[0.06] transition-transform duration-500 group-hover:scale-110 sm:right-0 sm:top-0 sm:p-8 sm:opacity-5">
        <Sun className="h-20 w-20 text-orange-500 sm:h-28 sm:w-28 md:h-32 md:w-32" />
      </div>

      <div className="relative z-10 min-w-0">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="min-w-0 flex-1">
            <span className="mb-2 inline-block rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-600 sm:px-3">
              {currentMonth} forecast
            </span>
            <h3 className="text-balance text-xl font-black leading-tight text-slate-900 sm:text-2xl md:text-3xl">
              Destination <span className="text-[#0066a1]">outlook</span>
            </h3>
          </div>
          <div className="shrink-0 border-t border-slate-100 pt-4 sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0 md:pl-8">
            <div className="flex flex-wrap items-center gap-2 text-2xl font-black tabular-nums text-slate-900 sm:text-right sm:text-3xl">
              <ThermometerSun className="h-6 w-6 shrink-0 text-orange-500 sm:h-7 sm:w-7" aria-hidden />
              <span className="min-w-0 break-words">{data.temp}</span>
            </div>
            <p className="mt-1 max-w-full text-sm font-bold text-slate-400 sm:text-right sm:text-base">
              <span className="break-words">{data.condition}</span>
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:mb-8 sm:p-6">
          <p className="text-pretty text-sm font-medium italic leading-relaxed text-slate-600 sm:text-base">
            &ldquo;{data.advice}&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div className="min-w-0">
            <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" aria-hidden />
              Essential packing
            </h4>
            <ul className="space-y-3">
              {essentials.map((item: string, i: number) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm font-medium leading-snug text-slate-500 sm:text-[15px]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-200" aria-hidden />
                  <span className="min-w-0 break-words">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 rounded-2xl border border-blue-100/50 bg-blue-50/50 p-4 sm:p-6">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#0066a1]">
              <Lightbulb className="h-4 w-4 shrink-0" aria-hidden />
              Aura&apos;s pro tip
            </h4>
            <p className="text-pretty text-xs font-semibold italic leading-relaxed text-blue-800 sm:text-sm">
              {data.proTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
