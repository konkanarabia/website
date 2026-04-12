'use server'

import { GoogleGenAI } from "@google/genai";
import { GEMINI_FLASH_MODEL } from '@/lib/constants';

let genAiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  if (!genAiClient) genAiClient = new GoogleGenAI({ apiKey: key });
  return genAiClient;
}

export async function generateDestinationData(prompt: string) {
  try {
    const fullPrompt = `Generate a detailed JSON object for a travel destination: "${prompt}". Match this structure: {"description": "...", "details": "...", "duration": "...", "bestTime": "...", "highlights": [], "inclusions": [], "exclusions": [], "itinerary": [{"day": "1", "title": "...", "description": "..."}], "type": "International"}. Return ONLY raw JSON.`;
    
    const response = await getGenAI().models.generateContent({
      model: GEMINI_FLASH_MODEL,
      contents: fullPrompt
    });

    let text = response.text?.trim() || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) text = jsonMatch[0].trim();
    
    return { success: true, data: JSON.parse(text) };
  } catch (error: unknown) {
    console.error("Gemini Error (generateDestinationData):", error);
    const message = error instanceof Error ? error.message : "Failed to generate data";
    return { success: false, data: {}, error: message };
  }
}

export async function enhanceText(text: string) {
  try {
    const fullPrompt = `Enhance this travel text to be more engaging: "${text}". Return ONLY the rewritten text.`;
    
    const response = await getGenAI().models.generateContent({
      model: GEMINI_FLASH_MODEL,
      contents: fullPrompt
    });
    
    return { success: true as const, text: response.text?.trim() || text };
  } catch (error: unknown) {
    console.error("Gemini Error (enhanceText):", error);
    const message = error instanceof Error ? error.message : "Failed to enhance text";
    return { success: false as const, error: message };
  }
}

export async function generateImageUrl(destinationName: string, description: string) {
  try {
    const fullPrompt = `DSLR photography prompt for ${destinationName}: ${description}. Return ONLY the prompt text.`;
    
    const response = await getGenAI().models.generateContent({
      model: GEMINI_FLASH_MODEL,
      contents: fullPrompt
    });
    
    const imagePrompt = response.text?.trim() || destinationName;
    const encodedPrompt = encodeURIComponent(imagePrompt);
    const randomSeed = Math.floor(Math.random() * 1000000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=800&nologo=true&seed=${randomSeed}`;

    return { success: true, url: imageUrl };
  } catch (error: unknown) {
    console.error("Gemini Error (generateImageUrl):", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, url: "", error: message };
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

    const response = await getGenAI().models.generateContent({
      model: GEMINI_FLASH_MODEL,
      contents: fullPrompt,
    });

    const text = response.text?.trim() || '';
    if (!text) {
      return { success: false as const };
    }
    return { success: true as const, text };
  } catch (error: unknown) {
    console.error('Gemini Error (draftEnquiryReply):', error);
    return { success: false as const };
  }
}

export async function getTravelAdvice(userQuery: string, destinations: any[]) {
  try {
    const context = destinations.map(d => `- ${d.name}: ${d.description}`).join('\n');
    const fullPrompt = `You are Aura, the travel concierge for KonkanArabia.
Available Tours:
${context}

User Query: "${userQuery}"
Help the user find the right tour. Keep it concise (max 2 paragraphs). Use bold for destination names. End with an inspiring follow-up.`;

    const response = await getGenAI().models.generateContent({
      model: GEMINI_FLASH_MODEL,
      contents: fullPrompt
    });

    return { success: true, text: response.text?.trim() || "" };
  } catch (error: any) {
    console.error("Gemini Error (getTravelAdvice):", error);
    return { success: false, text: "I'm having a bit of trouble connecting right now. Please try again in a moment." };
  }
}

export async function getTravelWeatherAndPacking(destination: string, month: string) {
  try {
    const fullPrompt = `Weather and packing for ${destination} in ${month}. Return JSON: {"temp": "...", "condition": "...", "advice": "...", "essentials": [], "proTip": "..."}.`;
    
    const response = await getGenAI().models.generateContent({ 
      model: GEMINI_FLASH_MODEL, 
      contents: fullPrompt
    });
    
    let text = response.text?.trim() || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) text = jsonMatch[0];
    return { success: true, data: JSON.parse(text) };
  } catch (error: any) {
    console.error("Gemini Error (getTravelWeather):", error);
    return { success: false };
  }
}
