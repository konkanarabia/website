'use server'

import dbConnect from '@/lib/mongodb';
import Review from '@/lib/models/Review';
import { geminiGenerateText, getGeminiClient } from '@/lib/gemini-generate';
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
    if (!getGeminiClient()) {
      return { success: false, error: 'GEMINI_API_KEY environment variable is not set.' };
    }

    const context = reviews.map(r => `Rating: ${r.rating}, Comment: ${r.comment}`).join('\n');
    
    const fullPrompt = `Analyze the following traveler reviews and provide a 2-sentence summary of the consensus. 
Focus on what people love most. Start with "Travelers say...".

Reviews:
${context}

Return ONLY the summary text.`;

    const result = await geminiGenerateText(fullPrompt);
    if (!result.ok) {
      return { success: false, error: result.error };
    }
    return { success: true, text: result.text };
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
