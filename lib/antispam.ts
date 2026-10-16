/**
 * Anti-Spam protection utilities for form submissions
 * Includes IP rate limiting, decoy honeypots, timing verification, and content heuristics.
 */

export interface SpamCheckPayload {
  name?: string;
  fname?: string;
  email?: string;
  phone?: string;
  message?: string;
  company?: string;
  destination?: string;
  website_hp?: string; // Legacy honeypot field
  business_url?: string; // Decoy honeypot (looks like company website to bots)
  phone_fax?: string; // Decoy honeypot (looks like fax number to bots)
  company_website?: string; // Decoy honeypot
  _form_loaded_at?: number | string; // Timestamp when form was rendered
  turnstileToken?: string;
}

export interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
}

// -------------------------------------------------------------
// In-Memory IP-Based Rate Limiting
// -------------------------------------------------------------

interface RateLimitRecord {
  submissions: number[]; // Timestamps of submissions
}

const ipSubmissionsMap = new Map<string, RateLimitRecord>();

// Clean up old rate limit records every 15 minutes
setInterval(() => {
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  for (const [ip, record] of ipSubmissionsMap.entries()) {
    record.submissions = record.submissions.filter((t) => t > cutoff);
    if (record.submissions.length === 0) {
      ipSubmissionsMap.delete(ip);
    }
  }
}, 15 * 60 * 1000);

/**
 * Check if an IP address has exceeded rate limits.
 * Default: Max 4 submissions per 10 minutes, max 12 per 24 hours.
 */
export function checkRateLimit(
  ip: string,
  options: {
    maxInWindow?: number;
    windowMs?: number;
    maxDaily?: number;
  } = {}
): { allowed: boolean; reason?: string } {
  if (!ip || ip === 'unknown' || ip === '127.0.0.1' || ip === '::1') {
    // In local development or unknown IP, allow with generous threshold
    return { allowed: true };
  }

  const {
    maxInWindow = 4,
    windowMs = 10 * 60 * 1000, // 10 minutes
    maxDaily = 12, // 24 hours
  } = options;

  const now = Date.now();
  let record = ipSubmissionsMap.get(ip);
  if (!record) {
    record = { submissions: [] };
    ipSubmissionsMap.set(ip, record);
  }

  // Filter out timestamps older than 24h
  record.submissions = record.submissions.filter((t) => now - t < 24 * 60 * 60 * 1000);

  // Check 10-minute window
  const recentInWindow = record.submissions.filter((t) => now - t < windowMs).length;
  if (recentInWindow >= maxInWindow) {
    return {
      allowed: false,
      reason: `Rate limit exceeded: ${recentInWindow} submissions in ${Math.round(windowMs / 60000)} minutes`,
    };
  }

  // Check 24-hour window
  if (record.submissions.length >= maxDaily) {
    return {
      allowed: false,
      reason: `Daily rate limit exceeded: ${record.submissions.length} submissions in 24 hours`,
    };
  }

  // Record this attempt
  record.submissions.push(now);
  return { allowed: true };
}

/**
 * Extract client IP address from Next.js request headers
 */
export function getClientIp(request: Request): string {
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  const xRealIp = request.headers.get('x-real-ip');
  if (xRealIp) {
    return xRealIp.trim();
  }
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }
  return 'unknown';
}

// -------------------------------------------------------------
// Spam Keywords & Content Patterns
// -------------------------------------------------------------

// SEO & Google Ranking spam solicitation
const SEO_SPAM_REGEX =
  /\b(rank(?:ing)?\s+(?:on|in)?\s*#?1|page\s+1\s+of\s+google|first\s+page\s+of\s+google|google\s+first\s+page|seo\s+(?:services?|audit|specialist|agency|package|optimization)|dofollow\s+backlinks?|high\s+da\s+backlinks?|buy\s+backlinks?|guest\s+posts?|sponsored\s+posts?|outreach\s+(?:specialist|campaign)|link\s+building|domain\s+authority|boost\s+your\s+website\s+traffic|increase\s+(?:your\s+)?(?:website\s+)?traffic|organic\s+traffic|search\s+engine\s+ranking)\b/i;

// Cold Outreach, Lead scraping & Tech outsourcing spam
const OUTREACH_SPAM_REGEX =
  /\b(hire\s+(?:dedicated\s+)?developers?|b2b\s+leads?|email\s+(?:database|blast|outreach|scraper|scraping)|cold\s+email(?:ing)?|scraping\s+services?|redesign\s+your\s+website|website\s+redesign\s+services?|digital\s+marketing\s+agency|grow\s+your\s+business\s+with\s+our)\b/i;

// Crypto, Financial, Gambling, Adult, Pharma scams
const SCAM_SPAM_REGEX =
  /\b(cryptocurrency|bitcoin\s+mining|ethereum|usdt\s+investment|binance\s+trading|forex\s+trading|binary\s+options?|guaranteed\s+(?:return|profit)s?|passive\s+income\s+scheme|unsecured\s+loan|pre-approved\s+loan|claim\s+your\s+funds?|inheritance\s+(?:fund|money)|lottery\s+winner|online\s+casino|slot\s+machine|online\s+poker|sportsbook|viagra|cialis|prescription\s+free\s+drugs)\b/i;

// Messaging handle redirection spam (Telegram channels, WhatsApp marketing links)
const HANDLE_REDIRECT_REGEX =
  /\b(telegram\s*:\s*@?|t\.me\/|wa\.me\/|contact\s+(?:me|us)\s+on\s+telegram|reach\s+(?:me|us)\s+on\s+telegram|channel\s*:\s*@|join\s+(?:our|my)\s+telegram|whatsapp\s*:\s*\+?\d{8,})\b/i;

// URL shorteners (never used in legitimate travel inquiries)
const URL_SHORTENERS_REGEX =
  /(bit\.ly|tinyurl\.com|t\.co|cutt\.ly|goo\.gl|is\.gd|buff\.ly|ow\.ly|rebrand\.ly|shorturl\.at|tiny\.cc)/i;

// Suspicious/spammy top-level domains commonly used in spam blast links
const SPAM_TLD_LINKS_REGEX =
  /https?:\/\/[^\s\/$.?#].[^\s]*\.(xyz|top|click|buzz|work|monster|quest|surf|uno|live|shop|club|ru|cc|cn|bond|cam|cfd)\b/i;

// Russian spam keywords
const RUSSIAN_SPAM_KEYWORDS =
  /(рассылка|база\s+данных|продвижение|заработок|клиентская\s+база|купить\s+базу|заказать\s+сайт)/i;

// Consonant clusters in names indicating automated bot gibberish (e.g. "dfghjkl", "brtzxvc")
const CONSONANT_GIBBERISH_REGEX =
  /[bcdfghjklmnpqrstvwxyz]{6,}/i;

// -------------------------------------------------------------
// Core Spam Evaluation Function
// -------------------------------------------------------------

export function evaluateSpam(
  payload: SpamCheckPayload,
  clientIp?: string
): SpamCheckResult {
  // 1. Honeypots: Any filled decoy field indicates an automated bot crawler
  if (payload.website_hp && payload.website_hp.trim().length > 0) {
    return { isSpam: true, reason: 'Honeypot field (website_hp) was filled' };
  }
  if (payload.business_url && payload.business_url.trim().length > 0) {
    return { isSpam: true, reason: 'Decoy honeypot (business_url) was filled' };
  }
  if (payload.company_website && payload.company_website.trim().length > 0) {
    return { isSpam: true, reason: 'Decoy honeypot (company_website) was filled' };
  }
  if (payload.phone_fax && payload.phone_fax.trim().length > 0) {
    return { isSpam: true, reason: 'Decoy honeypot (phone_fax) was filled' };
  }

  // 2. IP Rate Limit check (if IP provided)
  if (clientIp) {
    const rateCheck = checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      return { isSpam: true, reason: rateCheck.reason || 'IP rate limit exceeded' };
    }
  }

  // 3. Form Submission Timing Check:
  // Legitimate users on our website always load the form in React with `_form_loaded_at`.
  // Direct API bot scripts (curl, requests.post, spam tools) almost always omit this field.
  if (!payload._form_loaded_at) {
    return {
      isSpam: true,
      reason: 'Form load timestamp is missing (direct API automated submission)',
    };
  }

  const loadedAt = Number(payload._form_loaded_at);
  if (isNaN(loadedAt) || loadedAt <= 0) {
    return {
      isSpam: true,
      reason: 'Form load timestamp is invalid',
    };
  }

  const durationMs = Date.now() - loadedAt;

  // Real humans require at least 1.8 seconds to read, fill, and submit a form
  if (durationMs < 1800) {
    return {
      isSpam: true,
      reason: `Form submitted unnaturally fast (${durationMs}ms)`,
    };
  }

  // Timestamp in the future (bot manipulated clock or forged timestamp)
  if (durationMs < -5000) {
    return {
      isSpam: true,
      reason: 'Form timestamp is from the future',
    };
  }

  // Timestamp older than 24 hours (stale replay)
  if (durationMs > 24 * 60 * 60 * 1000) {
    return {
      isSpam: true,
      reason: 'Form submission expired (> 24 hours)',
    };
  }

  const message = (payload.message || '').trim();
  const name = (payload.name || payload.fname || '').trim();
  const company = (payload.company || '').trim();
  const destination = (payload.destination || '').trim();

  // 4. Name & Destination field validations
  if (name.length > 0) {
    if (/(https?:\/\/|www\.|\.com|\.xyz|\.ru|\.top|\.online|\.net|\.io|<script|\[url)/i.test(name)) {
      return { isSpam: true, reason: 'URL, web domain, or HTML tag in name field' };
    }
    if (CONSONANT_GIBBERISH_REGEX.test(name)) {
      return { isSpam: true, reason: 'Gibberish consonant sequence in name' };
    }
  }

  if (destination.length > 0) {
    if (/(https?:\/\/|www\.|\.com|\.xyz|<script|\[url)/i.test(destination)) {
      return { isSpam: true, reason: 'URL or HTML tag in destination field' };
    }
  }

  if (company.length > 0) {
    if (/(<script|\[url)/i.test(company)) {
      return { isSpam: true, reason: 'HTML or BBCode tag in company field' };
    }
  }

  // 5. Message Content Analysis
  if (message.length > 0) {
    // Pure numeric message check
    const lettersCount = (message.match(/[a-zA-Z\u0600-\u06FF\u0900-\u097F]/g) || []).length;
    const digitsOnly = message.replace(/[\s\-\+\(\)\.]/g, '');
    if (lettersCount === 0 && /^\d{5,}$/.test(digitsOnly)) {
      return {
        isSpam: true,
        reason: 'Message contains only numbers without any words or inquiries',
      };
    }

    // URL shorteners (100% spam in travel inquiries)
    if (URL_SHORTENERS_REGEX.test(message)) {
      return {
        isSpam: true,
        reason: 'Message contains URL shortener link',
      };
    }

    // Links with spam TLDs
    if (SPAM_TLD_LINKS_REGEX.test(message)) {
      return {
        isSpam: true,
        reason: 'Message contains link to high-risk spam domain',
      };
    }

    // Multiple URLs in message (Real travelers never post multiple URLs)
    const urlMatches = message.match(/https?:\/\/[^\s]+|www\.[^\s]+/gi) || [];
    if (urlMatches.length > 1) {
      return {
        isSpam: true,
        reason: 'Multiple URLs in inquiry message',
      };
    }

    // Messaging handle redirection spam
    if (HANDLE_REDIRECT_REGEX.test(message)) {
      return {
        isSpam: true,
        reason: 'Message redirects to external messaging channel (Telegram/WhatsApp promo)',
      };
    }

    // SEO & Ranking spam keywords
    if (SEO_SPAM_REGEX.test(message)) {
      return {
        isSpam: true,
        reason: 'Message matches SEO / Google ranking spam keywords',
      };
    }

    // Cold Outreach & Developer outsourcing spam
    if (OUTREACH_SPAM_REGEX.test(message)) {
      return {
        isSpam: true,
        reason: 'Message matches cold outreach / marketing agency spam',
      };
    }

    // Crypto, Financial, Gambling, Pharma scams
    if (SCAM_SPAM_REGEX.test(message)) {
      return {
        isSpam: true,
        reason: 'Message matches financial, crypto, or illicit spam keywords',
      };
    }

    // Foreign Cyrillic spambot flood on English/Arabic site
    const cyrillicLetters = (message.match(/[\u0400-\u04FF]/g) || []).length;
    if (cyrillicLetters > 15 && cyrillicLetters / message.length > 0.25) {
      return {
        isSpam: true,
        reason: 'Message contains unsolicited foreign Cyrillic character flood',
      };
    }

    if (RUSSIAN_SPAM_KEYWORDS.test(message)) {
      return {
        isSpam: true,
        reason: 'Message matches known foreign marketing spam terms',
      };
    }

    // Character repetition spam (e.g. "aaaaa", ".....")
    if (/(.)\1{5,}/.test(message)) {
      return {
        isSpam: true,
        reason: 'Excessive identical character repetition',
      };
    }
  }

  return { isSpam: false };
}
