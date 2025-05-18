"use client";

import React from "react";
import { useDateFormatter } from "@/hooks/use-date";

interface DateProps {
  date: Date | string;
  className?: string;
  dateStyle?: 'full' | 'long' | 'medium' | 'short';
  timeStyle?: 'full' | 'long' | 'medium' | 'short';
  showTime?: boolean;
  format?: 'itinerary' | 'booking' | 'receipt' | 'compact' | 'verbose';
  relative?: boolean;
}

/**
 * Date component that automatically formats dates based on the application's locale settings
 */
export function FormattedDate({
  date,
  className,
  dateStyle = 'medium',
  timeStyle,
  showTime,
  format,
  relative = false,
}: DateProps) {
  const { formatDate, formatRelativeTime, getFormattedDate } = useDateFormatter();
  
  // If date is undefined or null, return nothing
  if (!date) {
    return null;
  }
  
  // For relative time (e.g., "2 days ago")
  if (relative) {
    return (
      <span className={className}>
        {formatRelativeTime(date)}
      </span>
    );
  }
  
  // For specific format patterns
  if (format) {
    return (
      <span className={className}>
        {getFormattedDate(date, format)}
      </span>
    );
  }
  
  // Default date formatting
  return (
    <span className={className}>
      {formatDate(date, { dateStyle, timeStyle, showTime })}
    </span>
  );
}

interface DateRangeProps extends Omit<DateProps, 'date'> {
  startDate: Date | string;
  endDate: Date | string;
  separator?: string;
  showDuration?: boolean;
}

/**
 * DateRange component that displays a formatted date range
 */
export function DateRange({
  startDate,
  endDate,
  className,
  dateStyle = 'medium',
  timeStyle,
  showTime,
  format,
  separator = " - ",
  showDuration = false,
}: DateRangeProps) {
  const { formatDateRange, formatDuration } = useDateFormatter();
  
  // Calculate the duration in days if needed
  const durationInDays = showDuration 
    ? Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1
    : 0;
  
  // For specific format patterns
  if (format) {
    return (
      <span className={className}>
        <FormattedDate date={startDate} format={format} />
        {separator}
        <FormattedDate date={endDate} format={format} />
        {showDuration && durationInDays > 0 && (
          <span className="ml-2">({formatDuration(durationInDays)})</span>
        )}
      </span>
    );
  }
  
  // Default date range formatting
  return (
    <span className={className}>
      {formatDateRange(startDate, endDate, { 
        dateStyle, 
        timeStyle, 
        showTime,
        separator
      })}
      {showDuration && durationInDays > 0 && (
        <span className="ml-2">({formatDuration(durationInDays)})</span>
      )}
    </span>
  );
}

interface DurationProps {
  days: number;
  className?: string;
  style?: 'long' | 'short' | 'narrow';
  unit?: 'day' | 'night';
  includeNights?: boolean;
}

/**
 * Duration component for displaying trip durations
 */
export function Duration({
  days,
  className,
  style = 'long',
  unit = 'day',
  includeNights = false
}: DurationProps) {
  const { formatDuration } = useDateFormatter();
  
  if (!days || days <= 0) {
    return null;
  }
  
  return (
    <span className={className}>
      {formatDuration(days, { style, unit, includeNights })}
    </span>
  );
}
