'use server'

import dbConnect from '@/lib/mongodb';
import Review from '@/lib/models/Review';
import { geminiGenerateText, getGeminiClient } from '@/lib/gemini-generate';
import { revalidatePath } from 'next/cache';

import { evaluateSpam } from '@/lib/antispam';
import { analyzeSpamWithAi } from '@/lib/ai-spam-agent';

export async function submitReview(destinationId: number, formData: FormData) {
  await dbConnect();
  try {
    const userName = (formData.get('userName') as string || '').trim();
    const rating = Number(formData.get('rating'));
    const comment = (formData.get('comment') as string || '').trim();

    // Anti-spam evaluation (heuristics, gibberish name & comment checks)
    const spamCheck = evaluateSpam({
      name: userName,
      message: comment,
      _form_loaded_at: Date.now() - 5000,
    });
    if (spamCheck.isSpam) {
      console.warn(`[AntiSpam] Blocked spam review submission: ${spamCheck.reason}`, { userName, comment });
      return { success: false, error: 'Review could not be posted. Please ensure your submission is authentic.' };
    }

    // AI Spam Agent Evaluation (Semantic Intelligence)
    const aiSpam = await analyzeSpamWithAi({
      name: userName,
      message: comment,
      destination: `Destination #${destinationId}`,
    });
    if (aiSpam.isSpam && aiSpam.confidence >= 0.65) {
      console.warn(`[AI Spam Agent] Blocked spam review (${aiSpam.category}, ${Math.round(aiSpam.confidence * 100)}%): ${aiSpam.reason}`);
      return { success: false, error: 'Review submission flagged as spam.' };
    }

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

export async function getReviewCount() {
    await dbConnect();
    try {
        return await Review.countDocuments();
    } catch {
        return 0;
    }
}

export async function getPaginatedReviews(page = 1, limit = 10) {
    await dbConnect();
    try {
        const safePage = page > 0 ? page : 1;
        const skip = (safePage - 1) * limit;
        const [data, total] = await Promise.all([
            Review.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            Review.countDocuments(),
        ]);
        return {
            data: JSON.parse(JSON.stringify(data)),
            totalPages: Math.ceil(total / limit),
            currentPage: safePage,
            totalCount: total,
        };
    } catch {
        return { data: [], totalPages: 0, currentPage: 1, totalCount: 0 };
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
