"use client";

import * as React from "react";
import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronDown, Check, Search, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CountryCode,
  POPULAR_COUNTRY_CODES,
  ALL_COUNTRY_CODES,
  DEFAULT_COUNTRY,
  parsePhoneNumber,
  formatFullPhoneNumber,
} from "@/lib/country-codes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface PhoneInputProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  onCountryChange?: (country: CountryCode) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  error?: boolean | string;
  defaultCountryCode?: string;
  autoComplete?: string;
  showLengthHint?: boolean;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      id,
      name = "phone",
      value = "",
      onChange,
      onValueChange,
      onCountryChange,
      placeholder,
      disabled = false,
      required = false,
      className,
      error,
      defaultCountryCode = "IN",
      autoComplete = "tel-national",
      showLengthHint = true,
    },
    ref
  ) => {
    // Parse initial value to extract country and local number
    const parsed = useMemo(
      () => parsePhoneNumber(value, defaultCountryCode),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

    const [selectedCountry, setSelectedCountry] = useState<CountryCode>(parsed.country);
    const [localNumber, setLocalNumber] = useState<string>(
      parsed.nationalNumber.replace(/\D/g, "").slice(0, parsed.country.maxLength)
    );
    const [isTouched, setIsTouched] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const internalInputRef = useRef<HTMLInputElement | null>(null);

    // Keep internal state synchronized if parent value changes externally (e.g. form reset)
    useEffect(() => {
      if (value === "" || value === undefined) {
        setLocalNumber("");
        setIsTouched(false);
      } else {
        const next = parsePhoneNumber(value, selectedCountry.code);
        const cleanDigits = next.nationalNumber.replace(/\D/g, "").slice(0, next.country.maxLength);
        if (cleanDigits !== localNumber || next.country.code !== selectedCountry.code) {
          setSelectedCountry(next.country);
          setLocalNumber(cleanDigits);
        }
      }
    }, [value]);

    // Filter countries based on search query
    const filteredPopular = useMemo(() => {
      if (!searchQuery.trim()) return POPULAR_COUNTRY_CODES;
      const q = searchQuery.toLowerCase().trim();
      return POPULAR_COUNTRY_CODES.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.dialCode.includes(q) ||
          c.code.toLowerCase().includes(q)
      );
    }, [searchQuery]);

    const filteredAll = useMemo(() => {
      if (!searchQuery.trim()) return ALL_COUNTRY_CODES;
      const q = searchQuery.toLowerCase().trim();
      return ALL_COUNTRY_CODES.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.dialCode.includes(q) ||
          c.code.toLowerCase().includes(q)
      );
    }, [searchQuery]);

    // Emit changes to parent
    const emitValue = (country: CountryCode, numberStr: string) => {
      const cleanDigits = numberStr.replace(/\D/g, "").slice(0, country.maxLength);
      const fullValue = cleanDigits ? formatFullPhoneNumber(country.dialCode, cleanDigits) : "";

      if (onValueChange) {
        onValueChange(fullValue);
      }

      if (onChange) {
        const syntheticEvent = {
          target: {
            name,
            value: fullValue,
          },
          currentTarget: {
            name,
            value: fullValue,
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    };

    // Handle country selection
    const handleSelectCountry = (country: CountryCode) => {
      setSelectedCountry(country);
      setIsOpen(false);
      setSearchQuery("");
      onCountryChange?.(country);

      // Strictly truncate current number if it exceeds the new country's maxLength
      const currentDigits = localNumber.replace(/\D/g, "");
      const truncatedDigits = currentDigits.slice(0, country.maxLength);
      setLocalNumber(truncatedDigits);
      emitValue(country, truncatedDigits);

      // Focus phone input
      setTimeout(() => {
        internalInputRef.current?.focus();
      }, 50);
    };

    // Handle national number input typing
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsTouched(true);
      const rawInput = e.target.value;

      // If user pasted a full number with country code (e.g. "+971 501234567")
      if (rawInput.trim().startsWith("+") || rawInput.trim().startsWith("00")) {
        const detected = parsePhoneNumber(rawInput, selectedCountry.code);
        setSelectedCountry(detected.country);
        const capped = detected.nationalNumber.replace(/\D/g, "").slice(0, detected.country.maxLength);
        setLocalNumber(capped);
        emitValue(detected.country, capped);
        return;
      }

      // Strictly extract digits and cap at selectedCountry.maxLength
      const digitsOnly = rawInput.replace(/\D/g, "");
      const cappedDigits = digitsOnly.slice(0, selectedCountry.maxLength);

      setLocalNumber(cappedDigits);
      emitValue(selectedCountry, cappedDigits);
    };

    // Validation calculations
    const digits = localNumber.replace(/\D/g, "");
    const isTooShort = isTouched && digits.length > 0 && digits.length < selectedCountry.minLength;
    const isComplete = digits.length >= selectedCountry.minLength && digits.length <= selectedCountry.maxLength;
    const hasExternalError = Boolean(error);
    const hasValidationError = hasExternalError || isTooShort;

    const expectedLengthText =
      selectedCountry.minLength === selectedCountry.maxLength
        ? `${selectedCountry.minLength} digits`
        : `${selectedCountry.minLength}-${selectedCountry.maxLength} digits`;

    const dynamicPlaceholder =
      placeholder || `${selectedCountry.example} (${expectedLengthText})`;

    return (
      <div className="w-full space-y-1">
        <div
          className={cn(
            "relative flex items-center w-full rounded-xl border border-input bg-background transition-all",
            "focus-within:ring-2 focus-within:ring-amber-500/30 focus-within:border-amber-500",
            hasValidationError && "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/30",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          {/* Country Code Dropdown Trigger */}
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                disabled={disabled}
                aria-label="Select country code"
                className={cn(
                  "flex items-center gap-1.5 h-full px-3 py-2.5 rounded-l-xl",
                  "border-r border-input/60 bg-muted/30 hover:bg-muted/60 transition-colors",
                  "text-slate-800 dark:text-slate-200 text-sm font-semibold select-none shrink-0",
                  "focus:outline-none focus:bg-muted/70",
                  disabled && "pointer-events-none"
                )}
              >
                <span className="text-lg leading-none" role="img" aria-label={selectedCountry.name}>
                  {selectedCountry.flag}
                </span>
                <span className="text-xs font-bold tracking-tight text-slate-700 dark:text-slate-200">
                  {selectedCountry.dialCode}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5 shrink-0" />
              </button>
            </PopoverTrigger>

            <PopoverContent
              className="w-72 sm:w-80 p-0 shadow-2xl rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-50"
              align="start"
              sideOffset={4}
            >
              {/* Search Box */}
              <div className="p-2 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search country or code..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    autoFocus
                  />
                </div>
              </div>

              {/* Country List */}
              <div className="max-h-64 overflow-y-auto p-1 text-sm divide-y divide-slate-50 dark:divide-slate-800/50">
                {/* Popular countries header */}
                {!searchQuery && (
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-50/60 dark:bg-amber-950/20 rounded-md my-1">
                    Popular Destinations & Origins
                  </div>
                )}

                {/* Popular List */}
                {(!searchQuery ? filteredPopular : []).map((country) => (
                  <button
                    key={`pop-${country.code}-${country.dialCode}`}
                    type="button"
                    onClick={() => handleSelectCountry(country)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors hover:bg-slate-100 dark:hover:bg-slate-800",
                      selectedCountry.code === country.code && selectedCountry.dialCode === country.dialCode
                        ? "bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-bold"
                        : "text-slate-700 dark:text-slate-300"
                    )}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-base leading-none">{country.flag}</span>
                      <span className="truncate">{country.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                        {country.dialCode}
                      </span>
                      {selectedCountry.code === country.code && selectedCountry.dialCode === country.dialCode && (
                        <Check className="w-3.5 h-3.5 text-amber-600" />
                      )}
                    </div>
                  </button>
                ))}

                {/* All countries header */}
                {!searchQuery && (
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-md my-1">
                    All Countries
                  </div>
                )}

                {/* All or Filtered List */}
                {filteredAll.map((country) => (
                  <button
                    key={`all-${country.code}-${country.dialCode}`}
                    type="button"
                    onClick={() => handleSelectCountry(country)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors hover:bg-slate-100 dark:hover:bg-slate-800",
                      selectedCountry.code === country.code && selectedCountry.dialCode === country.dialCode
                        ? "bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-bold"
                        : "text-slate-700 dark:text-slate-300"
                    )}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-base leading-none">{country.flag}</span>
                      <span className="truncate">{country.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                        {country.dialCode}
                      </span>
                      {selectedCountry.code === country.code && selectedCountry.dialCode === country.dialCode && (
                        <Check className="w-3.5 h-3.5 text-amber-600" />
                      )}
                    </div>
                  </button>
                ))}

                {filteredAll.length === 0 && (
                  <div className="p-4 text-center text-xs text-slate-400">
                    No country found matching &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>

          {/* National Phone Input with Strict HTML5 minLength and maxLength attributes */}
          <input
            ref={(node) => {
              internalInputRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            type="tel"
            inputMode="numeric"
            id={id}
            name={name}
            value={localNumber}
            onChange={handleNumberChange}
            onBlur={() => setIsTouched(true)}
            placeholder={dynamicPlaceholder}
            disabled={disabled}
            required={required}
            minLength={selectedCountry.minLength}
            maxLength={selectedCountry.maxLength}
            autoComplete={autoComplete}
            className={cn(
              "flex-1 w-full bg-transparent px-3 py-2 text-sm md:text-base",
              "text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500",
              "focus:outline-none disabled:cursor-not-allowed font-medium"
            )}
          />

          {/* Live Dynamic Digit Counter & Min/Max Badge */}
          {showLengthHint && digits.length > 0 && (
            <div className="pr-3 flex items-center select-none shrink-0 pointer-events-none">
              <span
                className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors flex items-center gap-1",
                  isComplete
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                    : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"
                )}
                title={`${digits.length} of ${expectedLengthText}`}
              >
                {digits.length}/{selectedCountry.maxLength}
                {isComplete ? " ✓" : ` (min ${selectedCountry.minLength})`}
              </span>
            </div>
          )}
        </div>

        {/* Live Validation Guidance Message */}
        {showLengthHint && (
          <div>
            {isTooShort ? (
              <p className="text-xs font-semibold text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {selectedCountry.minLength === selectedCountry.maxLength
                    ? `Phone number for ${selectedCountry.name} (${selectedCountry.dialCode}) must be exactly ${selectedCountry.minLength} digits (currently ${digits.length})`
                    : `Phone number for ${selectedCountry.name} (${selectedCountry.dialCode}) must be at least ${selectedCountry.minLength} digits (currently ${digits.length} of ${selectedCountry.minLength}-${selectedCountry.maxLength})`}
                </span>
              </p>
            ) : isComplete ? (
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>
                  Valid {selectedCountry.minLength === selectedCountry.maxLength ? `${selectedCountry.minLength}-digit` : `${selectedCountry.minLength}-${selectedCountry.maxLength} digit`} phone number for {selectedCountry.name} ({selectedCountry.dialCode})
                </span>
              </p>
            ) : (
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1">
                <span>
                  {selectedCountry.name} ({selectedCountry.dialCode}): Min <strong className="text-slate-700 dark:text-slate-300">{selectedCountry.minLength}</strong>, Max <strong className="text-slate-700 dark:text-slate-300">{selectedCountry.maxLength}</strong> digits
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
