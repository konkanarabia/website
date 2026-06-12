/**
 * Currency formatting utilities using the Intl.NumberFormat API for internationalization
 */

/**
 * Default locale for currency formatting
 * This can be overridden by user preferences or browser settings
 */
export const DEFAULT_LOCALE = 'en-GB';

/**
 * Default currency code used throughout the application
 */
export const DEFAULT_CURRENCY = 'INR';

/**
 * Currency symbols mapping to use when only symbol is needed
 */
export const CURRENCY_SYMBOLS: Record<string, string> = {
  'INR': '₹',
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
  'AED': 'د.إ',
};

/**
 * Format a numeric value as currency using internationalization
 * 
 * @param amount - The numeric amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number, 
  options?: {
    currency?: string;
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
    compactDisplay?: 'short' | 'long';
    currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
    useContext?: boolean;
  }
) {
  const {
    currency = DEFAULT_CURRENCY,
    locale = DEFAULT_LOCALE,
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    notation = 'standard',
    compactDisplay = 'short',
    currencyDisplay = 'symbol',
    useContext = false
  } = options || {};

  // When used in client components, we'll use the context values
  // In server components or during SSR, we'll use the defaults provided
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
    notation,
    compactDisplay,
    currencyDisplay
  }).format(amount);
}

/**
 * Get only the currency symbol for a given currency code
 * 
 * @param currencyCode - The ISO currency code
 * @returns The currency symbol
 */
export function getCurrencySymbol(currencyCode: string = DEFAULT_CURRENCY): string {
  return CURRENCY_SYMBOLS[currencyCode] || CURRENCY_SYMBOLS[DEFAULT_CURRENCY];
}

/**
 * Parse a currency string containing numeric values to extract just the number
 * 
 * @param currencyString - String that may contain currency symbols, commas, etc.
 * @returns The parsed numeric value or NaN if parsing fails
 */
export function parseCurrencyToNumber(currencyString: string): number {
  // Remove all non-numeric characters except decimal point
  const numericString = currencyString.replace(/[^\d.-]/g, '');
  return parseFloat(numericString);
}

/**
 * Format a price range with the same currency
 * 
 * @param min - Minimum price
 * @param max - Maximum price
 * @param options - Formatting options
 * @returns Formatted price range string
 */
export function formatPriceRange(
  min: number,
  max: number,
  options?: Parameters<typeof formatCurrency>[1]
): string {
  const minFormatted = formatCurrency(min, options);
  const maxFormatted = formatCurrency(max, options);
  return `${minFormatted} - ${maxFormatted}`;
}

/**
 * Parse a price string that might include text like "Starting from" or "/day"
 * 
 * @param priceString - The price string to parse
 * @returns The cleaned numeric value or undefined if parsing fails
 */
export function parseComplexPriceString(priceString: string): number | undefined {
  // Extract number patterns from strings like "Starting from ₹50,000" or "₹3,500/day"
  const matches = priceString.match(/[\d,]+/);
  if (matches && matches[0]) {
    return parseCurrencyToNumber(matches[0]);
  }
  return undefined;
}
