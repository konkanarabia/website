/**
 * Simple server-side date utilities that don't depend on the I18nProvider
 */
import { DEFAULT_LOCALE } from './currency';

/**
 * Format a date for server-side usage
 * Used for email templates
 */
export function formatServerDate(
  date: Date | string,
  options: {
    locale?: string;
    dateStyle?: 'full' | 'long' | 'medium' | 'short';
    timeStyle?: 'full' | 'long' | 'medium' | 'short';
    showTime?: boolean;
  } = {}
) {
  const { 
    locale = DEFAULT_LOCALE, 
    dateStyle = 'medium',
    timeStyle = 'short',
    showTime = false
  } = options;
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const formatterOptions: Intl.DateTimeFormatOptions = {
    dateStyle
  };
  
  if (showTime) {
    formatterOptions.timeStyle = timeStyle;
  }
  
  return new Intl.DateTimeFormat(locale, formatterOptions).format(dateObj);
}

/**
 * Format a date range for server-side use
 * Used in email templates
 */
export function formatServerDateRange(
  startDate: Date | string,
  endDate: Date | string,
  options: {
    locale?: string;
    dateStyle?: 'full' | 'long' | 'medium' | 'short';
    separator?: string;
  } = {}
) {
  const { 
    separator = " - ",
    ...restOptions
  } = options;
  
  return `${formatServerDate(startDate, restOptions)}${separator}${formatServerDate(endDate, restOptions)}`;
}

/**
 * Format a duration (e.g., trip duration) for server-side use
 * Used in email templates
 */
export function formatServerDuration(
  days: number,
  options: {
    locale?: string;
    includeNights?: boolean;
  } = {}
) {
  const { 
    locale = DEFAULT_LOCALE,
    includeNights = false
  } = options;
  
  if (includeNights && days > 1) {
    return `${days} days, ${days - 1} nights`;
  }
  
  return `${days} days`;
}
