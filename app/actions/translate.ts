'use server'

import crypto from 'crypto';
import { TRANSLATIONS } from '@/lib/translations';
import dbConnect from '@/lib/mongodb';
import Translation from '@/lib/models/Translation';

/**
 * Searches the static TRANSLATIONS dictionary for the English string
 * and returns the translated value if present.
 */
function getStaticTranslation(text: string, lang: string): string | null {
  if (lang === 'en') return text;
  
  const searchStr = text.toLowerCase().trim();
  const enTranslations = TRANSLATIONS.en;
  if (!enTranslations) return null;
  
  for (const [key, val] of Object.entries(enTranslations)) {
    if (val.toLowerCase().trim() === searchStr) {
      const translatedVal = TRANSLATIONS[lang]?.[key];
      if (translatedVal) {
        return translatedVal;
      }
    }
  }
  return null;
}

/**
 * Translates a given text (plain text or HTML) using static dictionaries and MongoDB database cache.
 * It NEVER calls the Gemini AI API, avoiding rate limit errors on the user-facing site.
 */
export async function translateTextAction(text: string, locale: string): Promise<{ success: boolean; text?: string; error?: string }> {
  try {
    if (!text.trim()) {
      return { success: true, text };
    }

    const lang = locale.split('-')[0].toLowerCase();
    const targetLanguage = getLanguageName(locale);

    if (!targetLanguage || targetLanguage === 'English' || lang === 'en') {
      return { success: true, text };
    }

    // 1. Static Dictionary Lookup
    const staticText = getStaticTranslation(text, lang);
    if (staticText) {
      return { success: true, text: staticText };
    }

    // 2. Database Cache Lookup
    const hash = crypto.createHash('sha256').update(text).digest('hex');
    await dbConnect();
    
    const cachedEntry = await Translation.findOne({ hash, locale: lang });
    if (cachedEntry) {
      return { success: true, text: cachedEntry.translatedText };
    }

    // 3. Fallback: return the original English text
    return { success: true, text };
  } catch (error: unknown) {
    console.error('Translation error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

function getLanguageName(locale: string): string {
  const lang = locale.split('-')[0];
  const mapping: Record<string, string> = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    pt: 'Portuguese',
    hi: 'Hindi',
    ar: 'Arabic',
    ru: 'Russian',
    he: 'Hebrew',
  };
  return mapping[lang] || 'English';
}

/**
 * Returns statistics about the cached translations in MongoDB.
 */
export async function getTranslationStats() {
  try {
    await dbConnect();
    const count = await Translation.countDocuments();
    return { success: true, count };
  } catch (error: any) {
    return { success: false, error: error.message, count: 0 };
  }
}

/**
 * Clears the translation database cache.
 */
export async function clearTranslationCache() {
  try {
    await dbConnect();
    await Translation.deleteMany({});
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}


