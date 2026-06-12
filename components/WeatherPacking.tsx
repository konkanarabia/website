'use client'

import React, { useEffect, useState } from 'react';
import { Sun, CheckCircle2, Lightbulb, ThermometerSun } from 'lucide-react';
import { getTravelWeatherAndPacking } from '@/app/actions/gemini';
import { useI18n } from '@/lib/i18n-provider';

export default function WeatherPacking({ destination }: { destination: string }) {
  const { t } = useI18n();
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
        <div className="mb-6 flex flex-col gap-4 sm:mb-8">
          <div className="flex items-center justify-between">
            <span className="inline-block rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-600">
              {currentMonth} {t('forecast')}
            </span>
            <div className="flex items-center gap-1.5 text-lg font-black tabular-nums text-slate-900">
              <ThermometerSun className="h-5 w-5 text-orange-500" aria-hidden />
              <span>{data.temp}</span>
            </div>
          </div>
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-2xl font-black leading-tight text-slate-900">
              {t('destination_outlook')}
            </h3>
            <p className="mt-1 text-sm font-bold text-slate-400">
              {data.condition}
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
              {t('essential_packing')}
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
              {t('auras_pro_tip')}
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
