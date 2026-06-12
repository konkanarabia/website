'use server'

import { geminiGenerateText } from '@/lib/gemini-generate';

/**
 * Translates a given text (plain text or HTML) into the target language using Gemini.
 */
export async function translateTextAction(text: string, locale: string): Promise<{ success: boolean; text?: string; error?: string }> {
  try {
    const targetLanguage = getLanguageName(locale);
    if (!targetLanguage || targetLanguage === 'English' || !text.trim()) {
      return { success: true, text };
    }

    const isHtml = /<[a-z][\s\S]*>/i.test(text);

    let prompt = `Translate the following text into ${targetLanguage}. Return ONLY the translated text, do not add any quotes or extra explanation.`;
    if (isHtml) {
      prompt = `Translate the following HTML content into ${targetLanguage}. Keep all HTML tags, structure, and attributes exactly the same, only translate the text content inside the HTML elements. Return ONLY the translated HTML content, do not add markdown code blocks (e.g. do not wrap in \`\`\`html) or extra explanation.`;
    }

    const fullPrompt = `${prompt}\n\nContent:\n${text}`;

    const result = await geminiGenerateText(fullPrompt);
    if (!result.ok) {
      return { success: false, error: result.error };
    }

    let translatedText = result.text.trim();
    
    // Clean up markdown code blocks if the AI returned them
    if (translatedText.startsWith('```')) {
      translatedText = translatedText.replace(/^```(?:html)?\n/i, '').replace(/\n```$/, '');
    }

    return { success: true, text: translatedText };
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
  };
  return mapping[lang] || 'English';
}
