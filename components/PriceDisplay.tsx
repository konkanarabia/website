'use client'

import React, { useState } from 'react';
import { IndianRupee, DollarSign, Coins } from 'lucide-react';

interface PriceDisplayProps {
  priceINR: number;
}

const RATES = {
  INR: 1,
  USD: 0.012,
  AED: 0.044
};

const SYMBOLS: Record<string, string> = {
  INR: '₹',
  USD: '$',
  AED: 'د.إ'
};

export default function PriceDisplay({ priceINR }: PriceDisplayProps) {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'AED'>('INR');

  const convertedPrice = Math.round(priceINR * RATES[currency]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit">
            {Object.keys(RATES).map((curr) => (
                <button
                    key={curr}
                    onClick={() => setCurrency(curr as any)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${
                        currency === curr 
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
                <span className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
                    {SYMBOLS[currency]}{convertedPrice.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{currency}</span>
            </div>
        </div>
      </div>
      <p className="text-[10px] text-slate-400 font-medium">
        *Actual price may vary based on travel dates and availability.
      </p>
    </div>
  );
}
