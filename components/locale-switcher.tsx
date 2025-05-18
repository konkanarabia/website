"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n-provider";
import { CURRENCY_SYMBOLS } from "@/lib/currency";

interface LocaleSwitcherProps {
  className?: string;
}

// List of supported locales with their display names
const SUPPORTED_LOCALES = [
  { code: "en-IN", name: "English (India)" },
  { code: "en-US", name: "English (US)" },
  { code: "en-GB", name: "English (UK)" },
  { code: "ar-AE", name: "Arabic (UAE)" },
  { code: "hi-IN", name: "Hindi (India)" },
];

// List of supported currencies
const SUPPORTED_CURRENCIES = [
  { code: "INR", name: "Indian Rupee (₹)" },
  { code: "USD", name: "US Dollar ($)" },
  { code: "EUR", name: "Euro (€)" },
  { code: "GBP", name: "British Pound (£)" },
  { code: "AED", name: "UAE Dirham (د.إ)" },
];

export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const { locale, currency, setLocale, setCurrency } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={className}
          aria-label="Change language and currency"
        >
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        {SUPPORTED_LOCALES.map((supportedLocale) => (
          <DropdownMenuItem
            key={supportedLocale.code}
            onClick={() => setLocale(supportedLocale.code)}
            className={locale === supportedLocale.code ? "font-bold" : ""}
          >
            {supportedLocale.name}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Currency</DropdownMenuLabel>
        {SUPPORTED_CURRENCIES.map((supportedCurrency) => (
          <DropdownMenuItem
            key={supportedCurrency.code}
            onClick={() => setCurrency(supportedCurrency.code)}
            className={currency === supportedCurrency.code ? "font-bold" : ""}
          >
            {supportedCurrency.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
