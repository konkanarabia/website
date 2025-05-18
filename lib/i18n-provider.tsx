"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { DEFAULT_LOCALE, DEFAULT_CURRENCY } from "@/lib/currency";

// Define the local storage keys
const LOCALE_STORAGE_KEY = 'user-locale';
const CURRENCY_STORAGE_KEY = 'user-currency';

// Define the type for our internationalization context
interface I18nContextType {
  locale: string;
  currency: string;
  setLocale: (locale: string) => void;
  setCurrency: (currency: string) => void;
}

// Create the context with default values
const I18nContext = createContext<I18nContextType>({
  locale: DEFAULT_LOCALE,
  currency: DEFAULT_CURRENCY,
  setLocale: () => {},
  setCurrency: () => {},
});

// Hook to use the i18n context
export const useI18n = () => useContext(I18nContext);

// Provider component
interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: string;
  initialCurrency?: string;
}

export function I18nProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
  initialCurrency = DEFAULT_CURRENCY,
}: I18nProviderProps) {
  // Initialize state with values from localStorage (if available) or fallback to defaults
  const [locale, setLocaleState] = useState(initialLocale);
  const [currency, setCurrencyState] = useState(initialCurrency);
  
  // Load preferences from localStorage on mount
  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
      const savedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY);
      
      if (savedLocale) setLocaleState(savedLocale);
      if (savedCurrency) setCurrencyState(savedCurrency);
    }
  }, []);

  // Custom setters that also update localStorage
  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    }
  };

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);
    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENCY_STORAGE_KEY, newCurrency);
    }
  };

  return (
    <I18nContext.Provider value={{ locale, currency, setLocale, setCurrency }}>
      {children}
    </I18nContext.Provider>
  );
}
