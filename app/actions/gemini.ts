'use server'

import { geminiGenerateText, getGeminiClient } from '@/lib/gemini-generate';
import { getDestinations } from '@/app/actions/destinations';

export async function generateDestinationData(prompt: string) {
  try {
    const fullPrompt = `Generate a detailed JSON object for a travel destination: "${prompt}". Match this structure: {"description": "...", "details": "...", "duration": "...", "bestTime": "...", "highlights": [], "inclusions": [], "exclusions": [], "itinerary": [{"day": "1", "title": "...", "description": "..."}], "type": "International"}. Return ONLY raw JSON.`;

    const result = await geminiGenerateText(fullPrompt);
    if (!result.ok) {
      return { success: false, data: {}, error: result.error };
    }

    let text = result.text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) text = jsonMatch[0].trim();

    return { success: true, data: JSON.parse(text) };
  } catch (error: unknown) {
    console.error('Gemini Error (generateDestinationData):', error);
    const message = error instanceof Error ? error.message : 'Failed to generate data';
    return { success: false, data: {}, error: message };
  }
}

export async function enhanceText(text: string) {
  const fullPrompt = `Enhance this travel text to be more engaging: "${text}". Return ONLY the rewritten text.`;

  const result = await geminiGenerateText(fullPrompt);
  if (!result.ok) {
    return { success: false as const, error: result.error };
  }
  return { success: true as const, text: result.text };
}

export async function generateImageUrl(destinationName: string, description: string) {
  try {
    const fullPrompt = `DSLR photography prompt for ${destinationName}: ${description}. Return ONLY the prompt text.`;

    const result = await geminiGenerateText(fullPrompt);
    const imagePrompt =
      result.ok && result.text.trim().length > 0
        ? result.text.trim()
        : `${destinationName} travel destination, ${description || 'scenic landscape'}, professional travel photography, golden hour, 8k`.slice(0, 900);

    const encodedPrompt = encodeURIComponent(imagePrompt);
    const randomSeed = Math.floor(Math.random() * 1000000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=800&nologo=true&seed=${randomSeed}`;

    return { success: true, url: imageUrl };
  } catch (error: unknown) {
    console.error('Gemini Error (generateImageUrl):', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, url: '', error: message };
  }
}

type EnquiryDraftInput = {
  name?: string;
  email?: string;
  phone?: string;
  destination?: string;
  travelType?: string;
  message?: string;
  departureDate?: Date | string;
  returnDate?: Date | string;
  travelers?: string;
};

export async function draftEnquiryReply(enq: EnquiryDraftInput) {
  try {
    const details = [
      enq.name && `Guest name: ${enq.name}`,
      enq.destination && `Destination interest: ${enq.destination}`,
      enq.travelType && `Travel type: ${enq.travelType}`,
      enq.travelers && `Travelers: ${enq.travelers}`,
      enq.message && `Their message: ${enq.message}`,
    ]
      .filter(Boolean)
      .join('\n');

    const fullPrompt = `You are a warm, professional travel consultant for KonkanArabia. Draft a short email reply (plain text, no subject line) to this enquiry. Thank them, acknowledge their interest, offer to help with next steps (dates, itinerary, quote), and invite them to reply with any questions. Keep it under 180 words. Do not invent specific prices or guarantees.

${details}`;

    const result = await geminiGenerateText(fullPrompt);
    if (result.ok && result.text) {
      return { success: true as const, text: result.text };
    }

    const name = enq.name?.trim() || 'Guest';
    const dest = enq.destination?.trim() || 'your trip';
    const fallback = `Dear ${name},\n\nThank you for your enquiry about ${dest}. We would be glad to help with dates, itinerary ideas, and a tailored quote. Please reply with any preferred travel windows or questions, and our team will follow up shortly.\n\nWarm regards,\nKonkanArabia`;
    return { success: true as const, text: fallback };
  } catch (error: unknown) {
    console.error('Gemini Error (draftEnquiryReply):', error);
    const name = enq.name?.trim() || 'Guest';
    const dest = enq.destination?.trim() || 'your trip';
    return {
      success: true as const,
      text: `Dear ${name},\n\nThank you for your enquiry about ${dest}. We would be glad to help with next steps—please reply with any dates or questions.\n\nWarm regards,\nKonkanArabia`,
    };
  }
}

export async function getTravelAdvice(userQuery: string) {
  try {
    if (!getGeminiClient()) {
      return {
        success: false,
        text: 'Aura needs a configured GEMINI_API_KEY on the server. Please contact the site administrator.',
      };
    }

    const raw = await getDestinations();
    const rows = (Array.isArray(raw) ? raw : []).map((d: { name?: string; description?: string }) => ({
      name: String(d?.name ?? '').trim(),
      description: String(d?.description ?? '').trim().slice(0, 1500),
    }));

    const context =
      rows.some((d) => d.name)
        ? rows
            .filter((d) => d.name)
            .map((d) => `- ${d.name}: ${d.description || 'Premium travel experience.'}`)
            .join('\n')
        : '(No tours are listed in the database yet — give helpful general travel guidance and invite them to browse the site or contact KonkanArabia.)';

    const fullPrompt = `You are Aura, the travel concierge for KonkanArabia.
Available Tours:
${context}

User Query: "${userQuery}"
Help the user find the right tour. Keep it concise (max 2 paragraphs). Use bold for destination names. End with an inspiring follow-up.`;

    const result = await geminiGenerateText(fullPrompt);
    if (!result.ok) {
      return {
        success: false,
        text: "I'm having a bit of trouble connecting right now. Please try again in a moment.",
      };
    }
    return { success: true, text: result.text };
  } catch (error: unknown) {
    console.error('Gemini Error (getTravelAdvice):', error);
    return {
      success: false,
      text: "I'm having a bit of trouble connecting right now. Please try again in a moment.",
    };
  }
}

function weatherFallback(destination: string, month: string) {
  return {
    temp: '—',
    condition: 'Live forecast unavailable',
    advice: `We could not load a live AI outlook for ${destination} in ${month}. Check a trusted weather service before you travel; conditions vary year to year.`,
    essentials: ['Comfortable walking shoes', 'Light layers', 'Sun protection', 'Reusable water bottle'],
    proTip: 'Book flexible dates and recheck the forecast a week before departure.',
  };
}

function stripMarkdownJsonFence(raw: string): string {
  let s = raw.trim();
  if (s.startsWith('```')) {
    s = s.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '');
  }
  return s.trim();
}

function toTrimmedString(v: unknown): string {
  if (typeof v === 'number' && Number.isFinite(v)) return String(v);
  if (typeof v === 'string') return v.trim();
  return '';
}

function firstNonEmpty(...vals: unknown[]): string {
  for (const v of vals) {
    const s = toTrimmedString(v);
    if (s) return s;
  }
  return '';
}

function firstStringArray(...vals: unknown[]): string[] {
  for (const v of vals) {
    if (!Array.isArray(v)) continue;
    const out = v.map((x) => toTrimmedString(x)).filter(Boolean);
    if (out.length) return out;
  }
  return [];
}

function normalizeWeatherFromJson(data: Record<string, unknown>) {
  const record = data as Record<string, unknown> & {
    packing_list?: unknown;
    packingList?: unknown;
    pro_tip?: unknown;
    avg_temp?: unknown;
    highLow?: unknown;
  };

  const temp =
    firstNonEmpty(record.temp, record.temperature, record.avg_temp, record.highLow) || '—';
  const condition = firstNonEmpty(
    record.condition,
    record.conditions,
    record.weather,
    record.sky,
  );
  const advice = firstNonEmpty(record.advice, record.outlook, record.tips, record.notes, record.description);
  const essentials = firstStringArray(
    record.essentials,
    record.packing_list,
    record.packingList,
    record.packing,
    record.items,
  );
  const proTip = firstNonEmpty(record.proTip, record.pro_tip, record.tip);

  return { temp, condition, advice, essentials, proTip };
}

function weatherHasAnySignal(w: ReturnType<typeof normalizeWeatherFromJson>): boolean {
  return (
    (w.temp && w.temp !== '—') ||
    w.condition.length > 0 ||
    w.advice.length > 0 ||
    w.essentials.length > 0 ||
    w.proTip.length > 0
  );
}

function enrichWeatherDisplay(
  destination: string,
  month: string,
  w: ReturnType<typeof normalizeWeatherFromJson>,
): ReturnType<typeof normalizeWeatherFromJson> {
  let advice = w.advice;
  if (!advice) {
    const bits = [w.condition, w.temp && w.temp !== '—' ? `around ${w.temp}` : ''].filter(Boolean);
    advice = bits.length
      ? `For ${destination} in ${month}: ${bits.join(', ')}. Confirm closer to departure.`
      : `General travel planning for ${destination} in ${month}—check a trusted weather app before you pack.`;
  }

  const essentials =
    w.essentials.length > 0
      ? w.essentials
      : ['Comfortable walking shoes', 'Light layers', 'Sun protection', 'Reusable water bottle'];

  const proTip =
    w.proTip ||
    'Recheck the forecast about a week before travel and adjust layers for heat or rain.';

  const condition = w.condition || (w.temp && w.temp !== '—' ? 'Typical for season' : '');

  return { ...w, advice, essentials, proTip, condition };
}

export async function getTravelWeatherAndPacking(destination: string, month: string) {
  try {
    if (!getGeminiClient()) {
      return { success: true, data: weatherFallback(destination, month), usedFallback: true as const };
    }

    const fullPrompt = `You are a travel assistant. For destination "${destination}" during calendar month "${month}", reply with ONE JSON object only (no markdown fences, no commentary). Use these exact keys: {"temp": "short range or typical e.g. 24-32°C", "condition": "brief e.g. warm and humid", "advice": "2-3 sentences", "essentials": ["4-6 packing strings"], "proTip": "one sentence"}. If unsure, give typical seasonal guidance for that region and month—do not leave values empty.`;

    let result = await geminiGenerateText(fullPrompt, { responseMimeType: 'application/json' });
    if (!result.ok) {
      result = await geminiGenerateText(fullPrompt);
    }
    if (!result.ok) {
      return { success: true, data: weatherFallback(destination, month), usedFallback: true as const };
    }

    let text = stripMarkdownJsonFence(result.text);
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) text = jsonMatch[0];

    let data: Record<string, unknown>;
    try {
      data = JSON.parse(text) as Record<string, unknown>;
    } catch {
      return { success: true, data: weatherFallback(destination, month), usedFallback: true as const };
    }

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return { success: true, data: weatherFallback(destination, month), usedFallback: true as const };
    }

    const parsed = normalizeWeatherFromJson(data);
    if (!weatherHasAnySignal(parsed)) {
      return { success: true, data: weatherFallback(destination, month), usedFallback: true as const };
    }

    const normalized = enrichWeatherDisplay(destination, month, parsed);
    return { success: true, data: normalized, usedFallback: false as const };
  } catch (error: unknown) {
    console.error('Gemini Error (getTravelWeather):', error);
    return { success: true, data: weatherFallback(destination, month), usedFallback: true as const };
  }
}
