/**
 * Currency conversion utilities
 */

// API endpoint for fetching exchange rates
const EXCHANGE_RATE_API_URL = 'https://currency-converter-backend-app-api.vercel.app/api/exchange-rates';

// Cache for exchange rates to minimize API calls
interface ExchangeRateCache {
  rates: Record<string, number>;
  timestamp: number;
  baseCode: string;
  nextUpdateTimestamp: number;
}

interface ExchangeRateResponse {
  result: string;
  base_code: string;
  conversion_rates: Record<string, number>;
  time_next_update_unix: number;
}

let exchangeRateCache: ExchangeRateCache | null = null;

// Cache validity duration in milliseconds (1 hour)
const CACHE_DURATION = 60 * 60 * 1000; 

// Fallback rates in case the API is unavailable
const FALLBACK_RATES: Record<string, Record<string, number>> = {
  'USD': {
    'INR': 85.62,
    'EUR': 0.90,
    'GBP': 0.75,
    'AED': 3.67,
    'USD': 1
  },
  'INR': {
    'USD': 0.012,
    'EUR': 0.011,
    'GBP': 0.0094,
    'AED': 0.044,
    'INR': 1
  },
  'EUR': {
    'USD': 1.11,
    'INR': 95.63,
    'GBP': 0.84,
    'AED': 4.10,
    'EUR': 1
  },
  'GBP': {
    'USD': 1.33,
    'INR': 113.71,
    'EUR': 1.19,
    'AED': 4.88,
    'GBP': 1
  },
  'AED': {
    'USD': 0.27,
    'INR': 23.31,
    'EUR': 0.24,
    'GBP': 0.20,
    'AED': 1
  }
};

/**
 * Fetch exchange rates from the API
 * 
 * @param baseCurrency - The base currency code
 * @returns A promise that resolves to the exchange rates
 */
async function fetchRatesFromAPI(baseCurrency: string = 'USD'): Promise<Record<string, number>> {
  try {
    const response = await fetch(`${EXCHANGE_RATE_API_URL}?base=${baseCurrency}`);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data: ExchangeRateResponse = await response.json();
    
    if (data.result !== 'success') {
      throw new Error('API returned unsuccessful result');
    }
    
    // Update the cache
    exchangeRateCache = {
      rates: data.conversion_rates,
      timestamp: Date.now(),
      baseCode: data.base_code,
      nextUpdateTimestamp: data.time_next_update_unix * 1000 // Convert to milliseconds
    };
    
    return data.conversion_rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    
    // Use fallback rates if available
    if (FALLBACK_RATES[baseCurrency]) {
      return FALLBACK_RATES[baseCurrency];
    }
    
    // If no fallback rates for this currency, use USD fallback rates
    return FALLBACK_RATES['USD'];
  }
}

/**
 * Check if we need to refresh the cached rates
 * 
 * @param baseCurrency - The base currency to check
 * @returns True if cache needs to be refreshed
 */
function shouldRefreshCache(baseCurrency: string): boolean {
  if (!exchangeRateCache) {
    return true;
  }
  
  // Refresh if base currency changed
  if (exchangeRateCache.baseCode !== baseCurrency) {
    return true;
  }
  
  // Refresh if cache has expired
  const now = Date.now();
  if (now >= exchangeRateCache.nextUpdateTimestamp || 
      now >= exchangeRateCache.timestamp + CACHE_DURATION) {
    return true;
  }
  
  return false;
}

/**
 * Get the exchange rate between two currencies
 * 
 * @param fromCurrency - The source currency
 * @param toCurrency - The target currency
 * @returns The exchange rate or undefined if not available
 */
export async function getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number | undefined> {
  // Same currency, rate is 1
  if (fromCurrency === toCurrency) {
    return 1;
  }
  
  try {
    // Get rates with fromCurrency as base
    const rates = await fetchExchangeRates(fromCurrency);
    
    return rates[toCurrency];
  } catch (error) {
    console.error('Error getting exchange rate:', error);
    return undefined;
  }
}

/**
 * Synchronous version of getExchangeRate that uses cached values
 * Only use this when you know rates are already cached
 * 
 * @param fromCurrency - The source currency
 * @param toCurrency - The target currency
 * @returns The exchange rate or undefined if not available
 */
export function getExchangeRateSync(fromCurrency: string, toCurrency: string): number | undefined {
  // Same currency, rate is 1
  if (fromCurrency === toCurrency) {
    return 1;
  }
  
  // If we have cached rates for fromCurrency
  if (exchangeRateCache && exchangeRateCache.baseCode === fromCurrency) {
    return exchangeRateCache.rates[toCurrency];
  }
  
  // Try fallback rates
  if (FALLBACK_RATES[fromCurrency] && FALLBACK_RATES[fromCurrency][toCurrency]) {
    return FALLBACK_RATES[fromCurrency][toCurrency];
  }
  
  return undefined;
}

/**
 * Convert an amount from one currency to another
 * 
 * @param amount - The amount to convert
 * @param fromCurrency - The source currency code
 * @param toCurrency - The target currency code
 * @returns A promise that resolves to the converted amount or undefined if conversion is not possible
 */
export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number | undefined> {
  // If same currency, no conversion needed
  if (fromCurrency === toCurrency) {
    return amount;
  }
  
  try {
    const rate = await getExchangeRate(fromCurrency, toCurrency);
    
    if (rate === undefined) {
      console.warn(`Exchange rate not available for conversion from ${fromCurrency} to ${toCurrency}`);
      return undefined;
    }
    
    return amount * rate;
  } catch (error) {
    console.error('Error converting currency:', error);
    return undefined;
  }
}

/**
 * Synchronous version of convertCurrency that uses cached values
 * Only use this when you know rates are already cached
 * 
 * @param amount - The amount to convert
 * @param fromCurrency - The source currency code
 * @param toCurrency - The target currency code
 * @returns The converted amount or undefined if conversion is not possible
 */
export function convertCurrencySync(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number | undefined {
  // If same currency, no conversion needed
  if (fromCurrency === toCurrency) {
    return amount;
  }
  
  const rate = getExchangeRateSync(fromCurrency, toCurrency);
  
  if (rate === undefined) {
    console.warn(`Exchange rate not available for sync conversion from ${fromCurrency} to ${toCurrency}`);
    return undefined;
  }
  
  return amount * rate;
}

/**
 * Fetch latest exchange rates from the API
 * 
 * @param baseCurrency - The base currency to get rates for
 * @returns A promise that resolves to the fetched exchange rates
 */
export async function fetchExchangeRates(baseCurrency: string = 'USD'): Promise<Record<string, number>> {
  // Check if we need to refresh the cache
  if (shouldRefreshCache(baseCurrency)) {
    return await fetchRatesFromAPI(baseCurrency);
  }
  
  // Use cached rates
  return exchangeRateCache!.rates;
}

/**
 * Prefetch and cache exchange rates for common currencies
 * Call this during app initialization to prepare the cache
 */
export async function prefetchExchangeRates(): Promise<void> {
  try {
    // Prefetch USD rates as they're most commonly used
    await fetchExchangeRates('USD');
  } catch (error) {
    console.error('Failed to prefetch exchange rates:', error);
  }
}
