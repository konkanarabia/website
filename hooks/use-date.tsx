"use client";

import { useI18n } from "@/lib/i18n-provider";
import {
  formatDate as formatDateUtil,
  formatDateRange as formatDateRangeUtil,
  formatRelativeTime as formatRelativeTimeUtil,
  formatDuration as formatDurationUtil,
  getFormattedDate as getFormattedDateUtil
} from "@/lib/date-format";

/**
 * A client component hook for date formatting that uses the I18nProvider context
 * to get the current locale settings
 */
export function useDateFormatter() {
  const { locale } = useI18n();

  // Wrap the utility functions with the current locale
  const formatDate = (
    date: Date | string,
    options?: Parameters<typeof formatDateUtil>[1]
  ) => {
    return formatDateUtil(date, {
      locale,
      ...options,
    });
  };

  const formatDateRange = (
    startDate: Date | string,
    endDate: Date | string,
    options?: Parameters<typeof formatDateRangeUtil>[2]
  ) => {
    return formatDateRangeUtil(startDate, endDate, {
      locale,
      ...options,
    });
  };

  const formatRelativeTime = (
    date: Date | string,
    options?: Parameters<typeof formatRelativeTimeUtil>[1]
  ) => {
    return formatRelativeTimeUtil(date, {
      locale,
      ...options,
    });
  };

  const formatDuration = (
    durationInDays: number,
    options?: Parameters<typeof formatDurationUtil>[1]
  ) => {
    return formatDurationUtil(durationInDays, {
      locale,
      ...options,
    });
  };

  const getFormattedDate = (
    date: Date | string,
    format: Parameters<typeof getFormattedDateUtil>[1],
    options?: { locale?: string }
  ) => {
    return getFormattedDateUtil(date, format, {
      locale,
      ...options,
    });
  };

  return {
    formatDate,
    formatDateRange,
    formatRelativeTime,
    formatDuration,
    getFormattedDate,
    currentLocale: locale,
  };
}
