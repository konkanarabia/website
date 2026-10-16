import { z } from 'zod';
import { validateCountryPhoneNumber } from './country-codes';

/**
 * Common field validation primitives
 */

// Common placeholder / dummy / test names
const FAKE_NAMES = new Set([
  'test', 'testing', 'asdf', 'qwerty', 'admin', 'administrator', 'user', 'null', 'undefined',
  'fake', 'sample', 'example', 'nobody', 'anonymous', 'someone', 'demo', 'trial'
]);

// Common temporary / disposable email provider domains
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com', 'tempmail.com', '10minutemail.com', 'guerrillamail.com',
  'sharklasers.com', 'yopmail.com', 'throwawaymail.com', 'trashmail.com',
  'dispostable.com', 'getairmail.com', 'fakemailgenerator.com', 'temp-mail.org',
  'mohmal.com', 'fakeinbox.com', 'inboxkitten.com', 'generator.email',
  'crazymailing.com', 'mytemp.email', 'temp-mail.io', 'burnermail.io',
  'maildrop.cc', 'yopmail.fr', 'yopmail.net', 'cool.fr.nf', 'jetable.org',
  'nada.ltd', 'getnada.com', 'abcvg.com', 'zillamail.com', 'emailfake.com',
  'trashmail.net', 'burnermail.com', 'boximail.com', 'disposablemail.com',
  'dayrep.com', 'teleworm.us', 'armyspy.com', 'cuvox.de', 'fleckens.hu',
  'gustr.com', 'jourrapide.com', 'rhyta.com', 'superrito.com', 'chacuo.net',
  'dropmail.me', 'mytempmail.com', 'tempinbox.com', 'crazymail.com',
  'harakirimail.com', 'spambog.com', 'mailcatch.com', 'trash-mail.at',
  'mailnull.com', 'meltmail.com', 'trashmail.de', 'hidemail.de'
]);

// Common email domain typos with correction suggestions
const COMMON_DOMAIN_TYPOS: Record<string, string> = {
  'gmai.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'gmaik.com': 'gmail.com',
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'hotmial.com': 'hotmail.com',
  'hotmaill.com': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'outloo.com': 'outlook.com',
  'icld.com': 'icloud.com',
};

// Name: 2-70 characters, strict letters/spaces/hyphens, no digits, no code injection, no gibberish
export const nameSchema = z
  .string({ required_error: 'Full name is required' })
  .trim()
  .min(2, 'Name must be at least 2 characters')
  .max(70, 'Name cannot exceed 70 characters')
  .refine(
    (val) => !/\d/.test(val),
    'Name cannot contain numbers or digits'
  )
  .refine(
    (val) => !/(https?:\/\/|<script|\[url|<\/?\w+>)/i.test(val),
    'Name contains invalid characters or links'
  )
  .refine(
    (val) => /^[\p{L}\p{M}\s.'-]+$/u.test(val),
    'Name can only contain alphabetic letters, spaces, hyphens, and apostrophes'
  )
  .refine(
    (val) => !/([.'-])\1/.test(val),
    'Name cannot contain consecutive hyphens, dots, or apostrophes'
  )
  .refine(
    (val) => !/^[.'-]|[.'-]$/.test(val),
    'Name cannot begin or end with a hyphen, dot, or apostrophe'
  )
  .refine(
    (val) => (val.match(/[\p{L}]/gu) || []).length >= 2,
    'Name must contain at least 2 letters'
  )
  .refine(
    (val) => {
      const lettersOnly = val.replace(/[^a-zA-Z]/g, '').toLowerCase();
      if (lettersOnly.length >= 3 && /^([a-z])\1+$/.test(lettersOnly)) {
        return false;
      }
      return true;
    },
    'Name cannot be all repeated identical letters'
  )
  .refine(
    (val) => !FAKE_NAMES.has(val.trim().toLowerCase()),
    'Please enter your real full name'
  );

// Email: Comprehensive RFC-compliant email validation with domain, TLD, typo, and disposable checks
export const emailSchema = z
  .string({ required_error: 'Email address is required' })
  .trim()
  .min(5, 'Email address is too short')
  .max(100, 'Email cannot exceed 100 characters')
  .email('Please enter a valid email address (e.g. name@example.com)')
  .refine(
    (val) => !/\s/.test(val),
    'Email address cannot contain spaces'
  )
  .refine(
    (val) => !/\.{2,}/.test(val),
    'Email cannot contain consecutive dots'
  )
  .superRefine((val, ctx) => {
    const parts = val.split('@');
    if (parts.length !== 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Email must contain exactly one "@" symbol',
      });
      return;
    }

    const [local, domain] = parts;

    if (!local || local.length > 64) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Username portion of email must be between 1 and 64 characters',
      });
    }

    if (local.startsWith('.') || local.endsWith('.')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Email username cannot start or end with a dot',
      });
    }

    if (local.startsWith('-') || local.endsWith('-')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Email username cannot start or end with a hyphen',
      });
    }

    if (!domain || domain.length > 255) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Email domain is invalid or too long',
      });
    }

    const domainParts = domain.split('.');
    if (domainParts.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Email domain must include a top-level extension (e.g. .com, .ae, .in)',
      });
      return;
    }

    const tld = domainParts[domainParts.length - 1];
    if (!/^[a-zA-Z]{2,24}$/.test(tld)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Email domain extension is invalid (must be at least 2 letters, e.g. .com, .in, .ae)',
      });
    }

    const lowerDomain = domain.toLowerCase();
    if (COMMON_DOMAIN_TYPOS[lowerDomain]) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Did you mean @${COMMON_DOMAIN_TYPOS[lowerDomain]}? Please verify your email domain.`,
      });
    }

    if (DISPOSABLE_EMAIL_DOMAINS.has(lowerDomain)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Temporary or disposable email addresses are not permitted. Please use your personal or business email.',
      });
    }
  });

// Phone: Validated dynamically based on selected country code and digit length rules.
export const phoneSchema = z
  .string({ required_error: 'Phone number is required' })
  .trim()
  .min(1, 'Phone number is required')
  .superRefine((val, ctx) => {
    const res = validateCountryPhoneNumber(val);
    if (!res.isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: res.error || 'Please enter a valid phone number',
      });
    }
  });

export const optionalPhoneSchema = z
  .string()
  .trim()
  .optional()
  .superRefine((val, ctx) => {
    if (!val || val.length === 0) return;
    const res = validateCountryPhoneNumber(val);
    if (!res.isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: res.error || 'Please enter a valid phone number or leave blank',
      });
    }
  });

// Message: Minimum 5 characters, max 3000, must contain text (not only numbers)
export const messageSchema = z
  .string({ required_error: 'Message is required' })
  .trim()
  .min(5, 'Message must be at least 5 characters')
  .max(3000, 'Message cannot exceed 3000 characters')
  .refine(
    (val) => /[a-zA-Z\u0600-\u06FF\u0900-\u097F]/.test(val),
    'Message must contain text/letters'
  )
  .refine(
    (val) => !/(bit\.ly|tinyurl\.com|t\.co|cutt\.ly|goo\.gl|is\.gd|rebrand\.ly)/i.test(val),
    'URL links or shortened links are not permitted in message'
  );

export const optionalMessageSchema = z
  .string()
  .trim()
  .max(3000, 'Message cannot exceed 3000 characters')
  .refine(
    (val) => !val || !/(bit\.ly|tinyurl\.com|t\.co|cutt\.ly|goo\.gl|is\.gd|rebrand\.ly)/i.test(val),
    'URL links or shortened links are not permitted in message'
  )
  .optional()
  .or(z.literal(''));

// Date helper: Validates non-empty date and ensures it is today or in future
export const futureOrTodayDateSchema = (fieldName: string = 'Date') =>
  z
    .string({ required_error: `${fieldName} is required` })
    .trim()
    .min(1, `${fieldName} is required`)
    .refine((val) => {
      if (!val) return false;
      const d = new Date(val);
      if (isNaN(d.getTime())) return false;
      // Allow today (strip hours)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return d >= today;
    }, `${fieldName} cannot be in the past`);

export const optionalDateSchema = z
  .string()
  .trim()
  .optional()
  .or(z.literal(''));

/**
 * Form Schemas
 */

// 1. Contact Form Schema
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: optionalPhoneSchema,
  message: messageSchema,
  website_hp: z.string().optional(),
  business_url: z.string().optional(),
  phone_fax: z.string().optional(),
  company_website: z.string().optional(),
  _form_loaded_at: z.union([z.number(), z.string()]).optional(),
});

// 2. Franchise Enquiry Schema
export const franchiseFormSchema = z.object({
  fname: nameSchema,
  company: z.string().trim().max(100).optional().or(z.literal('')),
  email: emailSchema,
  phone: phoneSchema,
  country: z.string().trim().min(2, 'Country is required').max(60),
  itype: z.string().trim().min(2, 'Investor profile is required'),
  format: z.string().trim().min(2, 'Preferred format is required'),
  budget: z.string().trim().min(2, 'Investment budget is required'),
  message: optionalMessageSchema,
  website_hp: z.string().optional(),
  business_url: z.string().optional(),
  phone_fax: z.string().optional(),
  company_website: z.string().optional(),
  _form_loaded_at: z.union([z.number(), z.string()]).optional(),
});

// 3. General Travel Enquiry Schema
export const travelEnquirySchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    preferredContact: z.enum(['email', 'phone', 'whatsapp']).default('email'),
    travelType: z.string().trim().min(1, 'Please select a travel service type'),
    destination: z.string().trim().min(1, 'Destination is required').max(150),
    departureDate: optionalDateSchema,
    returnDate: optionalDateSchema,
    travelers: z.union([z.number(), z.string()]).transform((v) => Number(v) || 1).pipe(
      z.number().min(1, 'Minimum 1 traveler').max(100, 'Maximum 100 travelers')
    ),
    budgetMin: z.union([z.number(), z.string()]).optional().transform((v) => Number(v) || 0),
    budgetMax: z.union([z.number(), z.string()]).optional().transform((v) => Number(v) || 0),
    message: optionalMessageSchema,
    subscribe: z.boolean().optional(),
    website_hp: z.string().optional(),
    business_url: z.string().optional(),
    phone_fax: z.string().optional(),
    company_website: z.string().optional(),
    _form_loaded_at: z.union([z.number(), z.string()]).optional(),
  })
  .refine(
    (data) => {
      if (data.departureDate && data.returnDate) {
        return new Date(data.returnDate) >= new Date(data.departureDate);
      }
      return true;
    },
    {
      message: 'Return date must be on or after departure date',
      path: ['returnDate'],
    }
  );

// 4. Vehicle Rental Enquiry Schema
export const vehicleEnquirySchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    vehicleType: z.enum(['car', 'bike']).default('car'),
    carCategory: z.string().optional(),
    bikeCategory: z.string().optional(),
    pickupLocation: z.string().trim().min(2, 'Pickup location is required').max(120),
    dropoffLocation: z.string().trim().min(2, 'Drop-off location is required').max(120),
    pickupDate: futureOrTodayDateSchema('Pickup date'),
    dropoffDate: futureOrTodayDateSchema('Drop-off date'),
    passengers: z.union([z.number(), z.string()]).transform((v) => Number(v) || 1).pipe(
      z.number().min(1, 'Minimum 1 passenger').max(50, 'Maximum 50 passengers')
    ),
    message: optionalMessageSchema,
    website_hp: z.string().optional(),
    business_url: z.string().optional(),
    phone_fax: z.string().optional(),
    company_website: z.string().optional(),
    _form_loaded_at: z.union([z.number(), z.string()]).optional(),
  })
  .refine(
    (data) => new Date(data.dropoffDate) >= new Date(data.pickupDate),
    {
      message: 'Drop-off date must be on or after pickup date',
      path: ['dropoffDate'],
    }
  );

// 5. Hospitality Enquiry Schema
export const hospitalityEnquirySchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    serviceType: z.enum(['hospitality', 'food-beverages']).default('hospitality'),
    destination: z.string().trim().min(2, 'Property or restaurant selection is required'),
    checkInDate: futureOrTodayDateSchema('Check-in / Reservation date'),
    checkOutDate: optionalDateSchema,
    guests: z.union([z.number(), z.string()]).transform((v) => Number(v) || 1).pipe(
      z.number().min(1, 'Minimum 1 guest').max(50, 'Maximum 50 guests')
    ),
    message: optionalMessageSchema,
    website_hp: z.string().optional(),
    business_url: z.string().optional(),
    phone_fax: z.string().optional(),
    company_website: z.string().optional(),
    _form_loaded_at: z.union([z.number(), z.string()]).optional(),
  })
  .refine(
    (data) => {
      if (data.serviceType === 'hospitality' && data.checkInDate && data.checkOutDate) {
        return new Date(data.checkOutDate) >= new Date(data.checkInDate);
      }
      return true;
    },
    {
      message: 'Check-out date must be on or after check-in date',
      path: ['checkOutDate'],
    }
  );

// 6. Visa Enquiry Schema
export const visaEnquirySchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  nationality: z.string().trim().min(2, 'Nationality is required').max(80),
  destinationCountry: z.string().trim().min(2, 'Destination country is required').max(80),
  visaType: z.string().trim().min(2, 'Visa type is required'),
  passengerCount: z.union([z.number(), z.string()]).transform((v) => Number(v) || 1).pipe(
    z.number().min(1, 'Minimum 1 applicant').max(20, 'Maximum 20 applicants')
  ),
  tentativeDate: futureOrTodayDateSchema('Travel date'),
  message: optionalMessageSchema,
  website_hp: z.string().optional(),
  business_url: z.string().optional(),
  phone_fax: z.string().optional(),
  company_website: z.string().optional(),
  _form_loaded_at: z.union([z.number(), z.string()]).optional(),
});

// 7. Event Enquiry Schema
export const eventEnquirySchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  eventType: z.string().trim().min(2, 'Event type is required'),
  eventLocation: z.string().trim().min(2, 'Event destination or city is required').max(100),
  eventDate: futureOrTodayDateSchema('Event date'),
  guestCount: z.union([z.number(), z.string()]).transform((v) => Number(v) || 1).pipe(
    z.number().min(1, 'Minimum 1 guest').max(5000, 'Maximum 5000 guests')
  ),
  budget: z.string().trim().optional().or(z.literal('')),
  message: optionalMessageSchema,
  website_hp: z.string().optional(),
  business_url: z.string().optional(),
  phone_fax: z.string().optional(),
  company_website: z.string().optional(),
  _form_loaded_at: z.union([z.number(), z.string()]).optional(),
});

/**
 * Utility to format Zod errors into an error dictionary for UI state
 */
export function formatZodErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0]?.toString() || 'form';
    if (!errors[key]) {
      errors[key] = issue.message;
    }
  }
  return errors;
}
