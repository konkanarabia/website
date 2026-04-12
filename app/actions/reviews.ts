'use server'

import dbConnect from '@/lib/mongodb';
import Review from '@/lib/models/Review';
import { GoogleGenAI } from "@google/genai";
import { GEMINI_FLASH_MODEL } from '@/lib/constants';
import { revalidatePath } from 'next/cache';

export async function submitReview(destinationId: number, formData: FormData) {
  await dbConnect();
  try {
    const userName = formData.get('userName') as string;
    const rating = Number(formData.get('rating'));
    const comment = formData.get('comment') as string;

    const newReview = new Review({
      destinationId,
      userName,
      rating,
      comment
    });

    await newReview.save();
    revalidatePath(`/destinations/${destinationId}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getReviewSummary(reviews: any[]) {
  if (reviews.length === 0) return null;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY environment variable is not set.");

    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    const context = reviews.map(r => `Rating: ${r.rating}, Comment: ${r.comment}`).join('\n');
    
    const fullPrompt = `Analyze the following traveler reviews and provide a 2-sentence summary of the consensus. 
Focus on what people love most. Start with "Travelers say...".

Reviews:
${context}

Return ONLY the summary text.`;

    const response = await ai.models.generateContent({
      model: GEMINI_FLASH_MODEL,
      contents: fullPrompt
    });

    return { success: true, text: (response.text || "").trim() };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getReviews(destinationId: number) {
    await dbConnect();
    try {
        const reviews = await Review.find({ destinationId }).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(reviews));
    } catch (error) {
        return [];
    }
}

export async function getAllReviews(limit = 10) {
    await dbConnect();
    try {
        const reviews = await Review.find().sort({ createdAt: -1 }).limit(limit).lean();
        return JSON.parse(JSON.stringify(reviews));
    } catch (error) {
        return [];
    }
}

export async function deleteReview(id: string) {
    await dbConnect();
    try {
        await Review.findByIdAndDelete(id);
        revalidatePath('/admin');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
