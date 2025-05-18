# Internationalization (i18n) Guide

This document provides guidelines on how to use the internationalization features in the travel website project.

## Table of Contents

1. [Introduction](#introduction)
2. [Setting Up Locale](#setting-up-locale)
3. [Currency Formatting](#currency-formatting)
4. [Real-time Currency Conversion](#real-time-currency-conversion)
5. [Date Formatting](#date-formatting)
6. [Best Practices](#best-practices)
7. [Examples](#examples)

## Introduction

The project includes comprehensive internationalization support for:

- Currency formatting and real-time conversion
- Date formatting
- Duration formatting
- Relative time formatting

All components automatically adapt to the user's selected locale and currency preferences.

## Setting Up Locale

The locale and currency settings are managed through the `I18nProvider` which is already set up in `app/layout.tsx`. User preferences are stored in the browser's localStorage.

Users can change their locale and currency using the locale switcher component in the header.

## Currency Formatting

### Using the Price Component

```tsx
import { Price, PriceRange } from "@/components/ui/price";

// Basic usage
<Price amount={1000} />

// Format with specific options
<Price 
  amount={1000} 
  showCurrencyCode={true}
  minimumFractionDigits={2}
/>

// Show conversion (e.g., if the original price is in USD but user prefers INR)
<Price
  amount={100}
  sourceCurrency="USD"
  showConversion={true}
/>

// Price range
<PriceRange min={500} max={1000} />

// Price range with conversion
<PriceRange
  min={500}
  max={1000}
  sourceCurrency="EUR"
  showConversion={true}
/>
```

### Using the useCurrencyFormatter Hook

For more complex scenarios, you can use the `useCurrencyFormatter` hook:

```tsx
import { useCurrencyFormatter } from "@/hooks/use-currency";

function MyComponent() {
  const { 
    formatCurrency, 
    formatPriceRange, 
    convertToUserCurrency,
    formatWithConversion,
    currentCurrency
  } = useCurrencyFormatter();

  // Format a price
  const formattedPrice = formatCurrency(1000);

  // Convert from one currency to another
  const convertedPrice = convertToUserCurrency(100, "USD");

  // Format with automatic conversion 
  const priceWithConversion = formatWithConversion(100, "USD");

  return (
    <div>
      <p>Price: {formattedPrice}</p>
      <p>Converted Price: {convertedPrice && formatCurrency(convertedPrice)}</p>
      <p>Price with conversion: {priceWithConversion}</p>
    </div>
  );
}
```

## Date Formatting

### Using the FormattedDate Component

```tsx
import { FormattedDate, DateRange, Duration } from "@/components/ui/date";

// Basic date formatting
<FormattedDate date="2025-05-18" />

// With specific format
<FormattedDate
  date="2025-05-18"
  format="verbose" // "verbose", "compact", "itinerary", "booking", "receipt"
/>

// Show relative time (e.g., "2 days ago")
<FormattedDate
  date="2025-05-16"
  relative={true}
/>

// Date range
<DateRange
  startDate="2025-05-18"
  endDate="2025-05-25"
  showDuration={true} // adds "(8 days)" after the date range
/>

// Show just duration
<Duration days={8} includeNights={true} /> // "8 days, 7 nights"
```

### Using the useDateFormatter Hook

For more complex scenarios, you can use the `useDateFormatter` hook:

```tsx
import { useDateFormatter } from "@/hooks/use-date";

function MyComponent() {
  const { 
    formatDate, 
    formatDateRange, 
    formatRelativeTime,
    formatDuration,
    getFormattedDate
  } = useDateFormatter();

  // Format a date
  const formattedDate = formatDate(new Date());

  // Format a date range
  const dateRange = formatDateRange(
    new Date('2025-05-18'),
    new Date('2025-05-25')
  );

  // Format relative time
  const relativeTime = formatRelativeTime(new Date('2025-05-16'));

  // Format duration
  const duration = formatDuration(8, { includeNights: true });

  return (
    <div>
      <p>Date: {formattedDate}</p>
      <p>Date Range: {dateRange}</p>
      <p>Relative: {relativeTime}</p>
      <p>Duration: {duration}</p>
    </div>
  );
}
```

## Best Practices

1. **Use Components First**: Prefer the `Price` and `FormattedDate` components for most use cases.

2. **Server Components**: In server components, import from the server utilities:
   ```tsx
   import { formatServerCurrency } from "@/lib/server-currency";
   import { formatServerDate } from "@/lib/server-date";
   ```

3. **Consistent User Experience**: Always use the internationalization components for displaying dates and currencies to ensure a consistent user experience.

4. **Source Currency**: When displaying prices from external sources (e.g., hotel rates from an API that are in USD), always specify the `sourceCurrency` attribute to allow proper conversion.

5. **Testing**: Test your internationalization implementation with different locales and currencies to ensure it works correctly.

## Examples

### Hotel Listing with Internationalization

```tsx
import { Price } from "@/components/ui/price";
import { FormattedDate } from "@/components/ui/date";

function HotelCard({ hotel }) {
  return (
    <div className="hotel-card">
      <h3>{hotel.name}</h3>
      <p>
        <Price 
          amount={hotel.price} 
          sourceCurrency={hotel.currency}
          showConversion={true}
        />
        <span className="per-night">per night</span>
      </p>
      <p>
        Available from: <FormattedDate date={hotel.availableFrom} format="booking" />
      </p>
    </div>
  );
}
```

### Travel Package with Date and Price Range

```tsx
import { PriceRange } from "@/components/ui/price";
import { DateRange } from "@/components/ui/date";

function PackageCard({ travelPackage }) {
  return (
    <div className="package-card">
      <h3>{travelPackage.name}</h3>
      <p>
        Duration: <DateRange 
          startDate={travelPackage.startDate}
          endDate={travelPackage.endDate}
          showDuration={true}
        />
      </p>
      <p>
        Price Range: <PriceRange 
          min={travelPackage.minPrice} 
          max={travelPackage.maxPrice}
          sourceCurrency={travelPackage.currency}
          showConversion={true}
        />
      </p>
    </div>
  );
}
```
