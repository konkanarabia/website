"use client";

import { useEffect } from "react";
import { prefetchExchangeRates } from "@/lib/currency-conversion";

/**
 * Component that prefetches exchange rates on app initialization
 */
export default function ExchangeRatesInitializer() {
  useEffect(() => {
    // Prefetch exchange rates
    const initExchangeRates = async () => {
      try {
        await prefetchExchangeRates();
      } catch (error) {
        console.error("Failed to prefetch exchange rates:", error);
      }
    };

    initExchangeRates();
  }, []);

  // This component doesn't render anything
  return null;
}
