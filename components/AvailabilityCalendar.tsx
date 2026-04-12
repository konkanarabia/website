'use client'

import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Info, CheckCircle2, XCircle } from 'lucide-react';

interface AvailabilityCalendarProps {
  availableDates?: Date[] | string[];
  blackoutDates?: Date[] | string[];
}

export default function AvailabilityCalendar({ availableDates = [], blackoutDates = [] }: AvailabilityCalendarProps) {
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  // Convert to Date objects if they are strings
  const available = availableDates.map(d => new Date(d));
  const blackout = blackoutDates.map(d => new Date(d));

  // Determine if a day is available
  const modifiers = {
    available: available,
    blackout: blackout,
  };

  const modifiersStyles = {
    available: { 
      color: '#166534', 
      backgroundColor: '#f0fdf4',
      fontWeight: 'bold' 
    },
    blackout: { 
      color: '#991b1b', 
      backgroundColor: '#fef2f2',
      textDecoration: 'line-through'
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
      <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
        <CalendarIcon className="w-5 h-5 text-[#0066a1]" />
        Availability
      </h3>
      <div className="flex flex-col items-center min-h-[340px]">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          disabled={{ before: new Date() }}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          className="border-none p-0"
          styles={{
            caption: { color: '#0f172a', fontWeight: 'bold' },
            head_cell: { color: '#94a3b8', fontSize: '12px', fontWeight: 'bold' },
            day: { fontSize: '14px' },
          }}
        />
      </div>

      <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-100 border border-green-200"></div>
          <span className="text-xs font-medium text-slate-600">Available Tour Date</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-100 border border-red-200"></div>
          <span className="text-xs font-medium text-slate-600">Blackout / Fully Booked</span>
        </div>
      </div>

      {selected && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start gap-3">
             <Info className="w-4 h-4 text-blue-600 mt-0.5" />
             <div>
                <p className="text-sm font-bold text-blue-900">Selected: {format(selected, 'PPP')}</p>
                <p className="text-xs text-blue-700 mt-1">Our team will prioritize this date in your enquiry response.</p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
