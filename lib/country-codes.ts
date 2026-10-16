export interface CountryCode {
  name: string;
  code: string; // ISO 3166-1 alpha-2
  dialCode: string; // Dialing code including '+'
  flag: string; // Emoji flag
  minLength: number; // Minimum national number digits
  maxLength: number; // Maximum national number digits
  example: string; // Example placeholder format
  popular?: boolean;
}

export const POPULAR_COUNTRY_CODES: CountryCode[] = [
  { name: 'India', code: 'IN', dialCode: '+91', flag: '🇮🇳', minLength: 10, maxLength: 10, example: '98765 43210', popular: true },
  { name: 'United Arab Emirates', code: 'AE', dialCode: '+971', flag: '🇦🇪', minLength: 9, maxLength: 9, example: '50 123 4567', popular: true },
  { name: 'Saudi Arabia', code: 'SA', dialCode: '+966', flag: '🇸🇦', minLength: 9, maxLength: 9, example: '50 123 4567', popular: true },
  { name: 'Qatar', code: 'QA', dialCode: '+974', flag: '🇶🇦', minLength: 8, maxLength: 8, example: '3312 3456', popular: true },
  { name: 'Oman', code: 'OM', dialCode: '+968', flag: '🇴🇲', minLength: 8, maxLength: 8, example: '9123 4567', popular: true },
  { name: 'Kuwait', code: 'KW', dialCode: '+965', flag: '🇰🇼', minLength: 8, maxLength: 8, example: '9876 5432', popular: true },
  { name: 'Bahrain', code: 'BH', dialCode: '+973', flag: '🇧🇭', minLength: 8, maxLength: 8, example: '3912 3456', popular: true },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧', minLength: 10, maxLength: 10, example: '7911 123456', popular: true },
  { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸', minLength: 10, maxLength: 10, example: '202 555 0123', popular: true },
  { name: 'Canada', code: 'CA', dialCode: '+1', flag: '🇨🇦', minLength: 10, maxLength: 10, example: '416 555 0123', popular: true },
  { name: 'Australia', code: 'AU', dialCode: '+61', flag: '🇦🇺', minLength: 9, maxLength: 9, example: '412 345 678', popular: true },
  { name: 'Singapore', code: 'SG', dialCode: '+65', flag: '🇸🇬', minLength: 8, maxLength: 8, example: '8123 4567', popular: true },
  { name: 'Malaysia', code: 'MY', dialCode: '+60', flag: '🇲🇾', minLength: 9, maxLength: 10, example: '12 345 6789', popular: true },
  { name: 'Germany', code: 'DE', dialCode: '+49', flag: '🇩🇪', minLength: 10, maxLength: 11, example: '151 23456789', popular: true },
  { name: 'France', code: 'FR', dialCode: '+33', flag: '🇫🇷', minLength: 9, maxLength: 9, example: '6 12 34 56 78', popular: true },
];

export const ALL_COUNTRY_CODES: CountryCode[] = [
  { name: 'Afghanistan', code: 'AF', dialCode: '+93', flag: '🇦🇫', minLength: 9, maxLength: 9, example: '70 123 4567' },
  { name: 'Albania', code: 'AL', dialCode: '+355', flag: '🇦🇱', minLength: 9, maxLength: 9, example: '69 123 4567' },
  { name: 'Algeria', code: 'DZ', dialCode: '+213', flag: '🇩🇿', minLength: 9, maxLength: 9, example: '55 123 4567' },
  { name: 'Andorra', code: 'AD', dialCode: '+376', flag: '🇦🇩', minLength: 6, maxLength: 6, example: '312 345' },
  { name: 'Angola', code: 'AO', dialCode: '+244', flag: '🇦🇴', minLength: 9, maxLength: 9, example: '923 123 456' },
  { name: 'Argentina', code: 'AR', dialCode: '+54', flag: '🇦🇷', minLength: 10, maxLength: 10, example: '11 2345 6789' },
  { name: 'Armenia', code: 'AM', dialCode: '+374', flag: '🇦🇲', minLength: 8, maxLength: 8, example: '77 123456' },
  { name: 'Australia', code: 'AU', dialCode: '+61', flag: '🇦🇺', minLength: 9, maxLength: 9, example: '412 345 678' },
  { name: 'Austria', code: 'AT', dialCode: '+43', flag: '🇦🇹', minLength: 10, maxLength: 11, example: '664 1234567' },
  { name: 'Azerbaijan', code: 'AZ', dialCode: '+994', flag: '🇦🇿', minLength: 9, maxLength: 9, example: '50 123 45 67' },
  { name: 'Bahamas', code: 'BS', dialCode: '+1242', flag: '🇧🇸', minLength: 7, maxLength: 7, example: '359 1234' },
  { name: 'Bahrain', code: 'BH', dialCode: '+973', flag: '🇧🇭', minLength: 8, maxLength: 8, example: '3912 3456' },
  { name: 'Bangladesh', code: 'BD', dialCode: '+880', flag: '🇧🇩', minLength: 10, maxLength: 10, example: '1712 345678' },
  { name: 'Barbados', code: 'BB', dialCode: '+1246', flag: '🇧🇧', minLength: 7, maxLength: 7, example: '230 1234' },
  { name: 'Belarus', code: 'BY', dialCode: '+375', flag: '🇧🇾', minLength: 9, maxLength: 9, example: '29 123 45 67' },
  { name: 'Belgium', code: 'BE', dialCode: '+32', flag: '🇧🇪', minLength: 9, maxLength: 9, example: '470 12 34 56' },
  { name: 'Belize', code: 'BZ', dialCode: '+501', flag: '🇧🇿', minLength: 7, maxLength: 7, example: '610 1234' },
  { name: 'Bhutan', code: 'BT', dialCode: '+975', flag: '🇧🇹', minLength: 8, maxLength: 8, example: '17 12 34 56' },
  { name: 'Bolivia', code: 'BO', dialCode: '+591', flag: '🇧🇴', minLength: 8, maxLength: 8, example: '71234567' },
  { name: 'Bosnia and Herzegovina', code: 'BA', dialCode: '+387', flag: '🇧🇦', minLength: 8, maxLength: 9, example: '61 123 456' },
  { name: 'Botswana', code: 'BW', dialCode: '+267', flag: '🇧🇼', minLength: 8, maxLength: 8, example: '71 123 456' },
  { name: 'Brazil', code: 'BR', dialCode: '+55', flag: '🇧🇷', minLength: 10, maxLength: 11, example: '11 98765 4321' },
  { name: 'Brunei', code: 'BN', dialCode: '+673', flag: '🇧🇳', minLength: 7, maxLength: 7, example: '712 3456' },
  { name: 'Bulgaria', code: 'BG', dialCode: '+359', flag: '🇧🇬', minLength: 8, maxLength: 9, example: '87 123 4567' },
  { name: 'Cambodia', code: 'KH', dialCode: '+855', flag: '🇰🇭', minLength: 8, maxLength: 9, example: '12 345 678' },
  { name: 'Cameroon', code: 'CM', dialCode: '+237', flag: '🇨🇲', minLength: 9, maxLength: 9, example: '6 71 23 45 67' },
  { name: 'Canada', code: 'CA', dialCode: '+1', flag: '🇨🇦', minLength: 10, maxLength: 10, example: '416 555 0123' },
  { name: 'Chile', code: 'CL', dialCode: '+56', flag: '🇨🇱', minLength: 9, maxLength: 9, example: '9 1234 5678' },
  { name: 'China', code: 'CN', dialCode: '+86', flag: '🇨🇳', minLength: 11, maxLength: 11, example: '138 1234 5678' },
  { name: 'Colombia', code: 'CO', dialCode: '+57', flag: '🇨🇴', minLength: 10, maxLength: 10, example: '300 123 4567' },
  { name: 'Costa Rica', code: 'CR', dialCode: '+506', flag: '🇨🇷', minLength: 8, maxLength: 8, example: '8312 3456' },
  { name: 'Croatia', code: 'HR', dialCode: '+385', flag: '🇭🇷', minLength: 8, maxLength: 9, example: '91 123 4567' },
  { name: 'Cyprus', code: 'CY', dialCode: '+357', flag: '🇨🇾', minLength: 8, maxLength: 8, example: '99 123456' },
  { name: 'Czech Republic', code: 'CZ', dialCode: '+420', flag: '🇨🇿', minLength: 9, maxLength: 9, example: '601 123 456' },
  { name: 'Denmark', code: 'DK', dialCode: '+45', flag: '🇩🇰', minLength: 8, maxLength: 8, example: '20 12 34 56' },
  { name: 'Ecuador', code: 'EC', dialCode: '+593', flag: '🇪🇨', minLength: 9, maxLength: 9, example: '99 123 4567' },
  { name: 'Egypt', code: 'EG', dialCode: '+20', flag: '🇪🇬', minLength: 10, maxLength: 10, example: '10 1234 5678' },
  { name: 'Estonia', code: 'EE', dialCode: '+372', flag: '🇪🇪', minLength: 7, maxLength: 8, example: '512 3456' },
  { name: 'Ethiopia', code: 'ET', dialCode: '+251', flag: '🇪🇹', minLength: 9, maxLength: 9, example: '91 123 4567' },
  { name: 'Fiji', code: 'FJ', dialCode: '+679', flag: '🇫🇯', minLength: 7, maxLength: 7, example: '701 2345' },
  { name: 'Finland', code: 'FI', dialCode: '+358', flag: '🇫🇮', minLength: 9, maxLength: 10, example: '40 123 4567' },
  { name: 'France', code: 'FR', dialCode: '+33', flag: '🇫🇷', minLength: 9, maxLength: 9, example: '6 12 34 56 78' },
  { name: 'Georgia', code: 'GE', dialCode: '+995', flag: '🇬🇪', minLength: 9, maxLength: 9, example: '599 12 34 56' },
  { name: 'Germany', code: 'DE', dialCode: '+49', flag: '🇩🇪', minLength: 10, maxLength: 11, example: '151 23456789' },
  { name: 'Ghana', code: 'GH', dialCode: '+233', flag: '🇬🇭', minLength: 9, maxLength: 9, example: '20 123 4567' },
  { name: 'Greece', code: 'GR', dialCode: '+30', flag: '🇬🇷', minLength: 10, maxLength: 10, example: '691 234 5678' },
  { name: 'Hong Kong', code: 'HK', dialCode: '+852', flag: '🇭🇰', minLength: 8, maxLength: 8, example: '5123 4567' },
  { name: 'Hungary', code: 'HU', dialCode: '+36', flag: '🇭🇺', minLength: 9, maxLength: 9, example: '20 123 4567' },
  { name: 'Iceland', code: 'IS', dialCode: '+354', flag: '🇮🇸', minLength: 7, maxLength: 7, example: '612 3456' },
  { name: 'India', code: 'IN', dialCode: '+91', flag: '🇮🇳', minLength: 10, maxLength: 10, example: '98765 43210' },
  { name: 'Indonesia', code: 'ID', dialCode: '+62', flag: '🇮🇩', minLength: 9, maxLength: 12, example: '812 3456 7890' },
  { name: 'Iran', code: 'IR', dialCode: '+98', flag: '🇮🇷', minLength: 10, maxLength: 10, example: '912 345 6789' },
  { name: 'Iraq', code: 'IQ', dialCode: '+964', flag: '🇮🇶', minLength: 10, maxLength: 10, example: '790 123 4567' },
  { name: 'Ireland', code: 'IE', dialCode: '+353', flag: '🇮🇪', minLength: 9, maxLength: 9, example: '85 123 4567' },
  { name: 'Israel', code: 'IL', dialCode: '+972', flag: '🇮🇱', minLength: 9, maxLength: 9, example: '50 123 4567' },
  { name: 'Italy', code: 'IT', dialCode: '+39', flag: '🇮🇹', minLength: 9, maxLength: 10, example: '320 123 4567' },
  { name: 'Jamaica', code: 'JM', dialCode: '+1876', flag: '🇯🇲', minLength: 7, maxLength: 7, example: '301 2345' },
  { name: 'Japan', code: 'JP', dialCode: '+81', flag: '🇯🇵', minLength: 10, maxLength: 10, example: '90 1234 5678' },
  { name: 'Jordan', code: 'JO', dialCode: '+962', flag: '🇯🇴', minLength: 9, maxLength: 9, example: '7 9123 4567' },
  { name: 'Kazakhstan', code: 'KZ', dialCode: '+7', flag: '🇰🇿', minLength: 10, maxLength: 10, example: '701 123 4567' },
  { name: 'Kenya', code: 'KE', dialCode: '+254', flag: '🇰🇪', minLength: 9, maxLength: 9, example: '712 345678' },
  { name: 'Kuwait', code: 'KW', dialCode: '+965', flag: '🇰🇼', minLength: 8, maxLength: 8, example: '9876 5432' },
  { name: 'Laos', code: 'LA', dialCode: '+856', flag: '🇱🇦', minLength: 8, maxLength: 9, example: '20 23 123 456' },
  { name: 'Lebanon', code: 'LB', dialCode: '+961', flag: '🇱🇧', minLength: 7, maxLength: 8, example: '71 123 456' },
  { name: 'Luxembourg', code: 'LU', dialCode: '+352', flag: '🇱🇺', minLength: 9, maxLength: 9, example: '621 123 456' },
  { name: 'Malaysia', code: 'MY', dialCode: '+60', flag: '🇲🇾', minLength: 9, maxLength: 10, example: '12 345 6789' },
  { name: 'Maldives', code: 'MV', dialCode: '+960', flag: '🇲🇻', minLength: 7, maxLength: 7, example: '712 3456' },
  { name: 'Malta', code: 'MT', dialCode: '+356', flag: '🇲🇹', minLength: 8, maxLength: 8, example: '7912 3456' },
  { name: 'Mauritius', code: 'MU', dialCode: '+230', flag: '🇲🇺', minLength: 8, maxLength: 8, example: '5123 4567' },
  { name: 'Mexico', code: 'MX', dialCode: '+52', flag: '🇲🇽', minLength: 10, maxLength: 10, example: '55 1234 5678' },
  { name: 'Monaco', code: 'MC', dialCode: '+377', flag: '🇲🇨', minLength: 8, maxLength: 9, example: '6 12 34 56 78' },
  { name: 'Morocco', code: 'MA', dialCode: '+212', flag: '🇲🇦', minLength: 9, maxLength: 9, example: '650 123456' },
  { name: 'Myanmar', code: 'MM', dialCode: '+95', flag: '🇲🇲', minLength: 8, maxLength: 10, example: '9 251 234 567' },
  { name: 'Namibia', code: 'NA', dialCode: '+264', flag: '🇳🇦', minLength: 9, maxLength: 9, example: '81 123 4567' },
  { name: 'Nepal', code: 'NP', dialCode: '+977', flag: '🇳🇵', minLength: 10, maxLength: 10, example: '984 1234567' },
  { name: 'Netherlands', code: 'NL', dialCode: '+31', flag: '🇳🇱', minLength: 9, maxLength: 9, example: '6 12345678' },
  { name: 'New Zealand', code: 'NZ', dialCode: '+64', flag: '🇳🇿', minLength: 8, maxLength: 10, example: '21 123 4567' },
  { name: 'Nigeria', code: 'NG', dialCode: '+234', flag: '🇳🇬', minLength: 10, maxLength: 10, example: '802 123 4567' },
  { name: 'Norway', code: 'NO', dialCode: '+47', flag: '🇳🇴', minLength: 8, maxLength: 8, example: '412 34 567' },
  { name: 'Oman', code: 'OM', dialCode: '+968', flag: '🇴🇲', minLength: 8, maxLength: 8, example: '9123 4567' },
  { name: 'Pakistan', code: 'PK', dialCode: '+92', flag: '🇵🇰', minLength: 10, maxLength: 10, example: '301 2345678' },
  { name: 'Panama', code: 'PA', dialCode: '+507', flag: '🇵🇦', minLength: 8, maxLength: 8, example: '6123 4567' },
  { name: 'Peru', code: 'PE', dialCode: '+51', flag: '🇵🇪', minLength: 9, maxLength: 9, example: '912 345 678' },
  { name: 'Philippines', code: 'PH', dialCode: '+63', flag: '🇵🇭', minLength: 10, maxLength: 10, example: '917 123 4567' },
  { name: 'Poland', code: 'PL', dialCode: '+48', flag: '🇵🇱', minLength: 9, maxLength: 9, example: '512 345 678' },
  { name: 'Portugal', code: 'PT', dialCode: '+351', flag: '🇵🇹', minLength: 9, maxLength: 9, example: '912 345 678' },
  { name: 'Qatar', code: 'QA', dialCode: '+974', flag: '🇶🇦', minLength: 8, maxLength: 8, example: '3312 3456' },
  { name: 'Romania', code: 'RO', dialCode: '+40', flag: '🇷🇴', minLength: 9, maxLength: 9, example: '712 345 678' },
  { name: 'Russia', code: 'RU', dialCode: '+7', flag: '🇷🇺', minLength: 10, maxLength: 10, example: '912 345 67 89' },
  { name: 'Rwanda', code: 'RW', dialCode: '+250', flag: '🇷🇼', minLength: 9, maxLength: 9, example: '788 123 456' },
  { name: 'Saudi Arabia', code: 'SA', dialCode: '+966', flag: '🇸🇦', minLength: 9, maxLength: 9, example: '50 123 4567' },
  { name: 'Seychelles', code: 'SC', dialCode: '+248', flag: '🇸🇨', minLength: 7, maxLength: 7, example: '251 2345' },
  { name: 'Singapore', code: 'SG', dialCode: '+65', flag: '🇸🇬', minLength: 8, maxLength: 8, example: '8123 4567' },
  { name: 'South Africa', code: 'ZA', dialCode: '+27', flag: '🇿🇦', minLength: 9, maxLength: 9, example: '71 123 4567' },
  { name: 'South Korea', code: 'KR', dialCode: '+82', flag: '🇰🇷', minLength: 9, maxLength: 10, example: '10 1234 5678' },
  { name: 'Spain', code: 'ES', dialCode: '+34', flag: '🇪🇸', minLength: 9, maxLength: 9, example: '612 34 56 78' },
  { name: 'Sri Lanka', code: 'LK', dialCode: '+94', flag: '🇱🇰', minLength: 9, maxLength: 9, example: '71 234 5678' },
  { name: 'Sweden', code: 'SE', dialCode: '+46', flag: '🇸🇪', minLength: 9, maxLength: 10, example: '70 123 45 67' },
  { name: 'Switzerland', code: 'CH', dialCode: '+41', flag: '🇨🇭', minLength: 9, maxLength: 9, example: '78 123 45 67' },
  { name: 'Taiwan', code: 'TW', dialCode: '+886', flag: '🇹🇼', minLength: 9, maxLength: 9, example: '912 345 678' },
  { name: 'Tanzania', code: 'TZ', dialCode: '+255', flag: '🇹🇿', minLength: 9, maxLength: 9, example: '712 345 678' },
  { name: 'Thailand', code: 'TH', dialCode: '+66', flag: '🇹🇭', minLength: 9, maxLength: 9, example: '81 234 5678' },
  { name: 'Turkey', code: 'TR', dialCode: '+90', flag: '🇹🇷', minLength: 10, maxLength: 10, example: '532 123 45 67' },
  { name: 'Uganda', code: 'UG', dialCode: '+256', flag: '🇺🇬', minLength: 9, maxLength: 9, example: '712 345678' },
  { name: 'Ukraine', code: 'UA', dialCode: '+380', flag: '🇺🇦', minLength: 9, maxLength: 9, example: '50 123 4567' },
  { name: 'United Arab Emirates', code: 'AE', dialCode: '+971', flag: '🇦🇪', minLength: 9, maxLength: 9, example: '50 123 4567' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧', minLength: 10, maxLength: 10, example: '7911 123456' },
  { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸', minLength: 10, maxLength: 10, example: '202 555 0123' },
  { name: 'Uzbekistan', code: 'UZ', dialCode: '+998', flag: '🇺🇿', minLength: 9, maxLength: 9, example: '90 123 45 67' },
  { name: 'Vietnam', code: 'VN', dialCode: '+84', flag: '🇻🇳', minLength: 9, maxLength: 9, example: '91 234 5678' },
  { name: 'Yemen', code: 'YE', dialCode: '+967', flag: '🇾🇪', minLength: 9, maxLength: 9, example: '71 234 567' },
  { name: 'Zambia', code: 'ZM', dialCode: '+260', flag: '🇿🇲', minLength: 9, maxLength: 9, example: '955 123456' },
  { name: 'Zimbabwe', code: 'ZW', dialCode: '+263', flag: '🇿🇼', minLength: 9, maxLength: 9, example: '71 234 5678' },
];

export const DEFAULT_COUNTRY: CountryCode = POPULAR_COUNTRY_CODES[0]; // India (+91)

/**
 * Finds a country by dial code or country code.
 */
export function findCountry(dialOrCountryCode: string): CountryCode | undefined {
  const query = dialOrCountryCode.trim().toUpperCase();
  return (
    POPULAR_COUNTRY_CODES.find((c) => c.dialCode === query || c.code.toUpperCase() === query) ||
    ALL_COUNTRY_CODES.find((c) => c.dialCode === query || c.code.toUpperCase() === query)
  );
}

/**
 * Parses a phone number string into its CountryCode and national number parts.
 * Supports numbers formatted like "+91 9876543210", "+971501234567", "0091 987...", or raw digits.
 */
export function parsePhoneNumber(
  fullPhone?: string,
  fallbackCountryCode = 'IN'
): { country: CountryCode; nationalNumber: string } {
  const fallback =
    POPULAR_COUNTRY_CODES.find((c) => c.code === fallbackCountryCode) ||
    ALL_COUNTRY_CODES.find((c) => c.code === fallbackCountryCode) ||
    DEFAULT_COUNTRY;

  if (!fullPhone || typeof fullPhone !== 'string') {
    return { country: fallback, nationalNumber: '' };
  }

  const raw = fullPhone.trim();
  if (!raw) {
    return { country: fallback, nationalNumber: '' };
  }

  // Handle + prefix or 00 prefix
  let normalized = raw;
  if (normalized.startsWith('00')) {
    normalized = '+' + normalized.slice(2);
  }

  if (normalized.startsWith('+')) {
    // Check longest dial codes first to avoid false matches (e.g. +1242 vs +1)
    const sorted = [...ALL_COUNTRY_CODES].sort(
      (a, b) => b.dialCode.length - a.dialCode.length
    );

    for (const country of sorted) {
      if (normalized.startsWith(country.dialCode)) {
        const nationalNumber = normalized.slice(country.dialCode.length).trim();
        return { country, nationalNumber };
      }
    }
  }

  return { country: fallback, nationalNumber: raw };
}

/**
 * Formats country dial code and national number into standard international format.
 */
export function formatFullPhoneNumber(dialCode: string, nationalNumber: string): string {
  const cleanNumber = nationalNumber.trim();
  if (!cleanNumber) return '';
  return `${dialCode} ${cleanNumber}`;
}

/**
 * Validates national phone number digits according to the specific country's rules.
 */
export function validateCountryPhoneNumber(
  fullPhone: string,
  fallbackCountryCode = 'IN'
): { isValid: boolean; error?: string; country: CountryCode; nationalDigits: string } {
  const { country, nationalNumber } = parsePhoneNumber(fullPhone, fallbackCountryCode);

  if (!nationalNumber) {
    return {
      isValid: false,
      error: 'Phone number is required',
      country,
      nationalDigits: '',
    };
  }

  // Strip non-digits
  let digits = nationalNumber.replace(/\D/g, '');

  // For countries where users commonly enter a national trunk prefix '0' (except Italy where 0 is part of the area code),
  // strip leading 0 if the resulting length matches the expected country length
  if (country.code !== 'IT' && digits.startsWith('0') && digits.length === country.maxLength + 1) {
    digits = digits.slice(1);
  }

  if (!digits) {
    return {
      isValid: false,
      error: `Please enter a valid phone number for ${country.name}`,
      country,
      nationalDigits: '',
    };
  }

  // Prevent repeated identical digits (e.g. 9999999999 or 0000000000)
  if (/^(\d)\1{5,}$/.test(digits)) {
    return {
      isValid: false,
      error: 'Phone number cannot contain all identical repeated digits',
      country,
      nationalDigits: digits,
    };
  }

  // Country-specific length validation
  if (country.minLength === country.maxLength) {
    if (digits.length !== country.minLength) {
      return {
        isValid: false,
        error: `Phone number for ${country.name} (${country.dialCode}) must be exactly ${country.minLength} digits (entered: ${digits.length})`,
        country,
        nationalDigits: digits,
      };
    }
  } else {
    if (digits.length < country.minLength) {
      return {
        isValid: false,
        error: `Phone number for ${country.name} (${country.dialCode}) requires a minimum of ${country.minLength} digits (entered: ${digits.length})`,
        country,
        nationalDigits: digits,
      };
    }
    if (digits.length > country.maxLength) {
      return {
        isValid: false,
        error: `Phone number for ${country.name} (${country.dialCode}) cannot exceed ${country.maxLength} digits (entered: ${digits.length})`,
        country,
        nationalDigits: digits,
      };
    }
  }

  return {
    isValid: true,
    country,
    nationalDigits: digits,
  };
}
