'use client'

import React, { useEffect, useState } from 'react';
import { Cloud, Sun, Umbrella, Wind, CheckCircle2, Lightbulb, ThermometerSun, Loader2 } from 'lucide-react';
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

  if (loading) return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm animate-pulse">
      <div className="h-4 bg-slate-100 rounded w-1/4 mb-4"></div>
      <div className="h-20 bg-slate-50 rounded mb-4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-slate-50 rounded w-full"></div>
        <div className="h-3 bg-slate-50 rounded w-5/6"></div>
      </div>
    </div>
  );

  if (!data) return null;

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 transform translate-x-4 -translate-y-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
        <Sun className="w-32 h-32 text-orange-500" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
            <div>
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                    {currentMonth} Forecast
                </span>
                <h3 className="text-2xl font-black text-slate-900">Destination <span className="text-[#0066a1]">Outlook</span></h3>
            </div>
            <div className="text-right">
                <div className="flex items-center gap-2 text-3xl font-black text-slate-900">
                    <ThermometerSun className="w-6 h-6 text-orange-500" />
                    {data.temp}
                </div>
                <p className="text-sm font-bold text-slate-400">{data.condition}</p>
            </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
            <p className="text-slate-600 font-medium italic">"{data.advice}"</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-4">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Essential Packing
                </h4>
                <ul className="space-y-3">
                    {data.essentials.map((item: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50">
                <h4 className="flex items-center gap-2 text-sm font-bold text-[#0066a1] mb-3">
                    <Lightbulb className="w-4 h-4" />
                    Aura's Pro Tip
                </h4>
                <p className="text-xs text-blue-700 leading-relaxed font-semibold italic">
                    {data.proTip}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
