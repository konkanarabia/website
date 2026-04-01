/**
 * Simple server-side currency utilities that don't depend on the I18nProvider
 */

/**
 * Format a number as a currency string
 * Used for server-side email formatting
 */
export function formatServerCurrency(
  amount: number,
  options: {
    currency?: string;
    locale?: string;
  } = {}
) {
  const { currency = 'INR', locale = 'en-IN' } = options;
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a price range for server-side use
 * Used in email templates
 */
export function formatServerPriceRange(
  min: number | undefined,
  max: number | undefined,
  options: {
    currency?: string;
    locale?: string;
  } = {}
) {
  if (
    min == null ||
    max == null ||
    typeof min !== 'number' ||
    typeof max !== 'number' ||
    Number.isNaN(min) ||
    Number.isNaN(max)
  ) {
    return 'Not specified';
  }
  return `${formatServerCurrency(min, options)} - ${formatServerCurrency(max, options)}`;
}
