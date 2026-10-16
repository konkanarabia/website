/**
 * AI Spam Agent for KonkanArabia
 * Uses Gemini LLM to analyze intent, tone, credibility, and unsolicited pitches.
 */

import { geminiGenerateText } from '@/lib/gemini-generate';

export interface AiSpamAnalysis {
  isSpam: boolean;
  confidence: number; // 0.0 to 1.0
  category: 'legitimate' | 'seo_marketing' | 'cold_sales' | 'crypto_scam' | 'phishing' | 'gibberish' | 'other_spam';
  reason: string;
}

export async function analyzeSpamWithAi(payload: {
  name?: string;
  email?: string;
  phone?: string;
  destination?: string;
  travelType?: string;
  message?: string;
}): Promise<AiSpamAnalysis> {
  const message = (payload.message || '').trim();
  const name = (payload.name || '').trim();
  const destination = (payload.destination || '').trim();
  const travelType = (payload.travelType || '').trim();
  const email = (payload.email || '').trim();
  const phone = (payload.phone || '').trim();

  // If there's barely any text, skip LLM call
  if (!message && !name) {
    return { isSpam: false, confidence: 0, category: 'legitimate', reason: 'Insufficient content for AI' };
  }

  const prompt = `You are a real-time Anti-Spam Security Agent protecting KonkanArabia, a luxury travel, hospitality, resorts, taxi, car rental, and visa services group operating in India and UAE.

Evaluate this form submission to determine if it is SPAM or a LEGITIMATE customer enquiry.

Submission Details:
- Name: "${name}"
- Email: "${email}"
- Phone: "${phone || 'N/A'}"
- Service/Destination: "${destination || travelType || 'N/A'}"
- Message: "${message}"

CRITERIA FOR SPAM:
- Unsolicited commercial pitches: SEO services, link-building, backlink packages, website redesign, app outsourcing, lead databases, digital marketing agencies.
- Guest post / sponsored article publication requests.
- Financial/crypto solicitations: bitcoin mining, forex, trading platforms, binary options, fast loans, casino, betting, lottery, or pharmaceutical promotions.
- Phishing or redirection attempts (e.g. asking to contact an external email or message on Telegram/WhatsApp).
- Automated bot gibberish, fake names, or nonsensical text.

CRITERIA FOR LEGITIMATE:
- Genuine travelers asking about trip planning, vacation packages, hotel stays, resort dining, airport taxi / car rentals, visa assistance, corporate events, or franchise partnership.
- Natural questions about itinerary, dates, prices, availability, family travel, or customer support.

Respond ONLY with a valid JSON object matching this schema:
{
  "isSpam": boolean,
  "confidence": number between 0.0 and 1.0,
  "category": "legitimate" | "seo_marketing" | "cold_sales" | "crypto_scam" | "phishing" | "gibberish" | "other_spam",
  "reason": "Brief 1-sentence explanation"
}`;

  try {
    const result = await geminiGenerateText(prompt, { responseMimeType: 'application/json' });
    if (!result.ok || !result.text) {
      return { isSpam: false, confidence: 0, category: 'legitimate', reason: 'AI analysis bypassed' };
    }

    let parsed: any;
    try {
      parsed = JSON.parse(result.text);
    } catch {
      const match = result.text.match(/\{[\s\S]*\}/);
      if (match) parsed = JSON.parse(match[0]);
    }

    if (parsed && typeof parsed.isSpam === 'boolean') {
      const isSpam = Boolean(parsed.isSpam);
      const confidence = typeof parsed.confidence === 'number' ? parsed.confidence : (isSpam ? 0.9 : 0.1);
      return {
        isSpam,
        confidence,
        category: parsed.category || (isSpam ? 'other_spam' : 'legitimate'),
        reason: parsed.reason || (isSpam ? 'Flagged as spam by AI Agent' : 'Legitimate customer enquiry'),
      };
    }
  } catch (error) {
    console.warn('[AI Spam Agent] Evaluation error (falling back to allowed):', error);
  }

  return { isSpam: false, confidence: 0, category: 'legitimate', reason: 'Fallback pass' };
}
