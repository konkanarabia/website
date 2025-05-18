/**
 * Date formatting utilities using the Intl.DateTimeFormat API for internationalization
 */
import { DEFAULT_LOCALE } from './currency';

/**
 * Format a date based on the locale
 * 
 * @param date - The date to format (Date object or ISO string)
 * @param options - Formatting options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string, 
  options?: {
    locale?: string;
    dateStyle?: 'full' | 'long' | 'medium' | 'short';
    timeStyle?: 'full' | 'long' | 'medium' | 'short';
    showTime?: boolean;
  }
) {
  const {
    locale = DEFAULT_LOCALE,
    dateStyle = 'medium',
    timeStyle = 'short',
    showTime = false,
  } = options || {};

  // Convert string date to Date object if needed
  const dateObject = typeof date === 'string' ? new Date(date) : date;

  // Initialize formatter options
  const formatterOptions: Intl.DateTimeFormatOptions = {
    dateStyle,
  };

  // Add time if requested
  if (showTime) {
    formatterOptions.timeStyle = timeStyle;
  }

  return new Intl.DateTimeFormat(locale, formatterOptions).format(dateObject);
}

/**
 * Format a date range
 * 
 * @param startDate - Start date (Date object or ISO string)
 * @param endDate - End date (Date object or ISO string)
 * @param options - Formatting options
 * @returns Formatted date range string
 */
export function formatDateRange(
  startDate: Date | string,
  endDate: Date | string,
  options?: Parameters<typeof formatDate>[1] & {
    separator?: string;
  }
) {
  const { separator = ' - ', ...restOptions } = options || {};

  const formattedStartDate = formatDate(startDate, restOptions);
  const formattedEndDate = formatDate(endDate, restOptions);

  return `${formattedStartDate}${separator}${formattedEndDate}`;
}

/**
 * Format a relative time (e.g., "2 days ago", "in 3 months")
 * 
 * @param date - Target date
 * @param options - Formatting options
 * @returns Formatted relative time string
 */
export function formatRelativeTime(
  date: Date | string,
  options?: {
    locale?: string;
    now?: Date;
    style?: 'long' | 'short' | 'narrow';
  }
) {
  const {
    locale = DEFAULT_LOCALE,
    now = new Date(),
    style = 'long',
  } = options || {};

  const targetDate = typeof date === 'string' ? new Date(date) : date;
  
  // Calculate the difference in seconds
  const diffInSeconds = (targetDate.getTime() - now.getTime()) / 1000;
  
  // Determine the appropriate unit and value
  let unit: Intl.RelativeTimeFormatUnit;
  let value: number;
  
  if (Math.abs(diffInSeconds) < 60) {
    unit = 'second';
    value = Math.round(diffInSeconds);
  } else if (Math.abs(diffInSeconds) < 3600) {
    unit = 'minute';
    value = Math.round(diffInSeconds / 60);
  } else if (Math.abs(diffInSeconds) < 86400) {
    unit = 'hour';
    value = Math.round(diffInSeconds / 3600);
  } else if (Math.abs(diffInSeconds) < 2592000) {
    unit = 'day';
    value = Math.round(diffInSeconds / 86400);
  } else if (Math.abs(diffInSeconds) < 31536000) {
    unit = 'month';
    value = Math.round(diffInSeconds / 2592000);
  } else {
    unit = 'year';
    value = Math.round(diffInSeconds / 31536000);
  }
  
  return new Intl.RelativeTimeFormat(locale, { style }).format(value, unit);
}

/**
 * Format a duration (e.g., trip duration)
 * 
 * @param durationInDays - Duration in days
 * @param options - Formatting options
 * @returns Formatted duration string
 */
export function formatDuration(
  durationInDays: number,
  options?: {
    locale?: string;
    style?: 'long' | 'short' | 'narrow';
    unit?: 'day' | 'night';
    includeNights?: boolean;
  }
) {
  const {
    locale = DEFAULT_LOCALE,
    style = 'long',
    unit = 'day',
    includeNights = false,
  } = options || {};

  const daysFormatter = new Intl.PluralRules(locale);
  const nightsFormatter = new Intl.PluralRules(locale);
  
  // Format the number of days
  const daysPlural = daysFormatter.select(durationInDays);
  const nightsPlural = nightsFormatter.select(durationInDays - 1);
  
  // Define the plural forms (this should ideally come from translations)
  const dayForms: Record<Intl.LDMLPluralRule, string> = {
    zero: 'days',
    one: 'day',
    two: 'days',
    few: 'days',
    many: 'days',
    other: 'days',
  };
  
  const nightForms: Record<Intl.LDMLPluralRule, string> = {
    zero: 'nights',
    one: 'night',
    two: 'nights',
    few: 'nights',
    many: 'nights',
    other: 'nights',
  };
  
  if (includeNights && durationInDays > 1) {
    return `${durationInDays} ${dayForms[daysPlural]}, ${durationInDays - 1} ${nightForms[nightsPlural]}`;
  }
  
  if (unit === 'night' && durationInDays > 1) {
    return `${durationInDays - 1} ${nightForms[nightsPlural]}`;
  }
  
  return `${durationInDays} ${dayForms[daysPlural]}`;
}

/**
 * Get a date formatted for specific purposes (e.g., itinerary dates, booking dates)
 * 
 * @param date - The date to format
 * @param format - The purpose-specific format to use
 * @param options - Additional formatting options
 * @returns Formatted date string
 */
export function getFormattedDate(
  date: Date | string,
  format: 'itinerary' | 'booking' | 'receipt' | 'compact' | 'verbose',
  options?: { locale?: string }
): string {
  const { locale = DEFAULT_LOCALE } = options || {};
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  switch (format) {
    case 'itinerary':
      // For itineraries, show day and month (e.g., "12 Jan")
      return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).format(dateObj);
    
    case 'booking':
      // For bookings, show full date (e.g., "January 12, 2023")
      return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(dateObj);
    
    case 'receipt':
      // For receipts, show date and time (e.g., "12 Jan 2023, 14:30")
      return new Intl.DateTimeFormat(locale, { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(dateObj);
    
    case 'compact':
      // For compact display (e.g., "12/01/2023")
      return new Intl.DateTimeFormat(locale, { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric'
      }).format(dateObj);
    
    case 'verbose':
      // For verbose display (e.g., "Thursday, January 12, 2023")
      return new Intl.DateTimeFormat(locale, { 
        weekday: 'long',
        day: 'numeric', 
        month: 'long', 
        year: 'numeric'
      }).format(dateObj);
    
    default:
      return new Intl.DateTimeFormat(locale).format(dateObj);
  }
}
