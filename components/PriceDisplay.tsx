'use client'

import React from 'react';
import { useI18n } from '@/lib/i18n-provider';
import { Price } from '@/components/ui/price';

interface PriceDisplayProps {
  priceINR: number;
}

export default function PriceDisplay({ priceINR }: PriceDisplayProps) {
  const { currency, setCurrency } = useI18n();

  const SUPPORTED = ['GBP', 'EUR', 'AED', 'INR'];
  const activeCurrency = SUPPORTED.includes(currency) ? currency : 'GBP';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit">
            {SUPPORTED.map((curr) => (
                <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${
                        activeCurrency === curr 
                        ? 'bg-white text-[#0066a1] shadow-md' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                    {curr}
                </button>
            ))}
        </div>
        
        <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-1">Starting From</span>
            <div className="flex items-baseline gap-2">
                <Price
                  amount={priceINR}
                  sourceCurrency="INR"
                  showConversion={true}
                  className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter"
                />
            </div>
        </div>
      </div>
      <p className="text-[10px] text-slate-400 font-medium">
        *Actual price may vary based on travel dates and availability.
      </p>
    </div>
  );
}
