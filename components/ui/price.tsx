"use client";

import React, { useState, useEffect } from "react";
import { useCurrencyFormatter } from "@/hooks/use-currency";
import { parseComplexPriceString } from "@/lib/currency";

interface PriceProps {
  amount?: number | string;
  className?: string;
  showCurrencyCode?: boolean;
  showCurrencySymbol?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  sourceCurrency?: string; // Optional source currency for conversion
  showConversion?: boolean; // Whether to show conversion to user's currency
  showOriginal?: boolean; // Whether to show the original price when conversion is enabled (defaults to false)
}

/**
 * Price component that automatically formats currencies based on the application's locale settings
 */
export function Price({
  amount,
  className,
  showCurrencyCode = false,
  showCurrencySymbol = true,
  minimumFractionDigits,
  maximumFractionDigits,
  sourceCurrency,
  showConversion = false,
  showOriginal = false, // Default to not showing original price when conversion is enabled
}: PriceProps) {
  const { 
    formatCurrency, 
    parseComplexPriceString, 
    formatWithConversion, 
    currentCurrency,
    isInitialized
  } = useCurrencyFormatter();
  
  // If amount is undefined or null, return nothing
  if (amount === undefined || amount === null) {
    return null;
  }
  
  // Handle string inputs that might have currency symbols or other formatting
  if (typeof amount === "string") {
    // Special case for "custom quote" or other non-numeric strings
    if (amount.toLowerCase().includes("custom") || isNaN(Number(amount.replace(/[^0-9.-]+/g, '')))) {
      return <span className={className}>{amount}</span>;
    }
    
    // Handle "+" prefix for addons
    if (amount.startsWith("+")) {
      const numericValue = parseComplexPriceString(amount.substring(1));
      
      if (!numericValue) {
        return <span className={className}>{amount}</span>;
      }
      
      // If conversion is requested and source currency is provided
      if (showConversion && sourceCurrency && sourceCurrency !== currentCurrency && isInitialized) {
        return (
          <span className={className}>
            +{formatWithConversion(numericValue, sourceCurrency, {
              currencyDisplay: showCurrencySymbol ? "symbol" : "code",
              minimumFractionDigits,
              maximumFractionDigits,
            })}
          </span>
        );
      }
      
      return (
        <span className={className}>
          +{formatCurrency(numericValue, {
            currencyDisplay: showCurrencySymbol ? "symbol" : "code",
            minimumFractionDigits,
            maximumFractionDigits,
          })}
        </span>
      );
    }
    
    // Parse the numeric value from the string
    const numericValue = parseComplexPriceString(amount);
    
    // If parsing fails, just display the original string
    if (numericValue === undefined) {
      return <span className={className}>{amount}</span>;
    }
    
    // If conversion is requested and source currency is provided
    if (showConversion && sourceCurrency && sourceCurrency !== currentCurrency && isInitialized) {
      return (
        <span className={className}>
          {formatWithConversion(numericValue, sourceCurrency, {
            currencyDisplay: showCurrencySymbol ? "symbol" : "code",
            minimumFractionDigits,
            maximumFractionDigits,
          })}
        </span>
      );
    }
    
    // Otherwise format the parsed numeric value
    return (
      <span className={className}>
        {formatCurrency(numericValue, {
          currencyDisplay: showCurrencySymbol ? "symbol" : "code",
          minimumFractionDigits,
          maximumFractionDigits,
        })}
      </span>
    );
  }
  
  // For numeric inputs with conversion
  if (showConversion && sourceCurrency && sourceCurrency !== currentCurrency && isInitialized) {
    return (
      <span className={className}>
        {formatWithConversion(amount, sourceCurrency, {
          currencyDisplay: showCurrencySymbol ? "symbol" : "code",
          minimumFractionDigits,
          maximumFractionDigits,
        })}
      </span>
    );
  }
  
  // For numeric inputs, simply format the number
  return (
    <span className={className}>
      {formatCurrency(amount, {
        currencyDisplay: showCurrencySymbol ? "symbol" : "code",
        minimumFractionDigits,
        maximumFractionDigits,
      })}
    </span>
  );
}

interface PriceRangeProps extends Omit<PriceProps, 'amount'> {
  min: number;
  max: number;
  separator?: string;
  sourceCurrency?: string;
  showConversion?: boolean;
}

/**
 * PriceRange component that displays a formatted price range
 */
export function PriceRange({
  min,
  max,
  className,
  separator = " - ",
  showCurrencyCode,
  showCurrencySymbol,
  minimumFractionDigits,
  maximumFractionDigits,
  sourceCurrency,
  showConversion = false,
  showOriginal = false,
}: PriceRangeProps) {
  const { formatPriceRange, currentCurrency, isInitialized } = useCurrencyFormatter();
  
  // Use individual Price components to handle conversion if needed
  if (showConversion && sourceCurrency && sourceCurrency !== currentCurrency && isInitialized) {    return (
      <span className={className}>
        <Price 
          amount={min} 
          sourceCurrency={sourceCurrency}
          showConversion={true}
          showOriginal={showOriginal}
          showCurrencySymbol={showCurrencySymbol}
          showCurrencyCode={showCurrencyCode}
          minimumFractionDigits={minimumFractionDigits}
          maximumFractionDigits={maximumFractionDigits}
        />
        {separator}
        <Price 
          amount={max} 
          sourceCurrency={sourceCurrency}
          showConversion={true}
          showOriginal={showOriginal}
          showCurrencySymbol={showCurrencySymbol}
          showCurrencyCode={showCurrencyCode}
          minimumFractionDigits={minimumFractionDigits}
          maximumFractionDigits={maximumFractionDigits}
        />
      </span>
    );
  }
  
  // Otherwise use the standard price range formatter
  return (
    <span className={className}>
      {formatPriceRange(min, max, {
        currencyDisplay: showCurrencySymbol ? "symbol" : "code",
        minimumFractionDigits,
        maximumFractionDigits,
      })}
    </span>
  );
}
