"use client";

import { useState, useEffect, useCallback } from "react";
import { useI18n } from "@/lib/i18n-provider";
import { 
  formatCurrency as formatCurrencyUtil, 
  formatPriceRange as formatPriceRangeUtil,
  parseCurrencyToNumber,
  parseComplexPriceString
} from "@/lib/currency";
import {
  convertCurrency,
  convertCurrencySync,
  getExchangeRate,
  getExchangeRateSync,
  prefetchExchangeRates
} from "@/lib/currency-conversion";

/**
 * A client component hook for currency formatting and conversion that uses the I18nProvider context
 * to get the current locale and currency settings
 */
export function useCurrencyFormatter() {
  const { locale, currency } = useI18n();
  const [isInitialized, setIsInitialized] = useState(false);
  const [conversionRates, setConversionRates] = useState<Record<string, number>>({});

  // Initialize the currency converter by prefetching rates
  useEffect(() => {
    const initCurrencyConverter = async () => {
      try {
        await prefetchExchangeRates();
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize currency converter:", error);
        // Still set initialized to avoid infinite retries
        setIsInitialized(true);
      }
    };

    if (!isInitialized) {
      initCurrencyConverter();
    }
  }, [isInitialized]);

  // Wrap the utility functions with the current context values
  const formatCurrency = (
    amount: number,
    options?: Parameters<typeof formatCurrencyUtil>[1]
  ) => {
    return formatCurrencyUtil(amount, {
      locale,
      currency,
      ...options,
    });
  };

  const formatPriceRange = (
    min: number,
    max: number,
    options?: Parameters<typeof formatCurrencyUtil>[1]
  ) => {
    return formatPriceRangeUtil(min, max, {
      locale,
      currency,
      ...options,
    });
  };

  /**
   * Convert an amount from the source currency to the current user-selected currency
   * This uses async conversion with real-time rates
   */
  const convertToUserCurrency = useCallback(async (
    amount: number, 
    sourceCurrency: string
  ): Promise<number | undefined> => {
    return await convertCurrency(amount, sourceCurrency, currency);
  }, [currency]);

  /**
   * Synchronous version that uses cached rates - use this in components
   * to avoid the complexity of handling async conversion
   */
  const convertToUserCurrencySync = useCallback((
    amount: number, 
    sourceCurrency: string
  ): number | undefined => {
    return convertCurrencySync(amount, sourceCurrency, currency);
  }, [currency]);
  /**
   * Format the price in the original currency and show conversion to user currency if different
   * Uses synchronous conversion with cached rates
   */
  const formatWithConversion = useCallback((
    amount: number,
    sourceCurrency: string,
    options?: Parameters<typeof formatCurrencyUtil>[1]
  ): string => {
    // If the source currency is the same as the user's selected currency, just format it
    if (sourceCurrency === currency) {
      return formatCurrency(amount, options);
    }

    // Try to convert the amount to the user's currency using cached rates
    const convertedAmount = convertToUserCurrencySync(amount, sourceCurrency);
    
    // Format original amount
    const formattedOriginal = formatCurrencyUtil(amount, {
      currency: sourceCurrency,
      locale,
      ...options,
    });

    // If conversion failed, return only the original
    if (convertedAmount === undefined) {
      return formattedOriginal;
    }

    // Format converted amount and return only the converted value
    const formattedConverted = formatCurrency(convertedAmount, options);
    return formattedConverted;
  }, [currency, locale, formatCurrency, convertToUserCurrencySync]);

  return {
    formatCurrency,
    formatPriceRange,
    parseCurrencyToNumber,
    parseComplexPriceString,
    convertToUserCurrency,
    convertToUserCurrencySync,
    formatWithConversion,
    getExchangeRate,
    getExchangeRateSync,
    currentLocale: locale,
    currentCurrency: currency,
    isInitialized,
  };
}
