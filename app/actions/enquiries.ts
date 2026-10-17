'use server'

import dbConnect from '@/lib/mongodb';
import Enquiry from '@/lib/models/Enquiry';
import { revalidatePath } from 'next/cache';
import { analyzeSpamWithAi } from '@/lib/ai-spam-agent';

export async function getEnquiries(limit = 50) {
  await dbConnect();
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(limit).lean();
    return JSON.parse(JSON.stringify(enquiries));
  } catch (error) {
    return [];
  }
}

export async function getEnquiryCount() {
  await dbConnect();
  try {
    return await Enquiry.countDocuments();
  } catch {
    return 0;
  }
}

export async function getPaginatedEnquiries(page = 1, limit = 10) {
  await dbConnect();
  try {
    const safePage = page > 0 ? page : 1;
    const skip = (safePage - 1) * limit;
    const [data, total] = await Promise.all([
      Enquiry.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Enquiry.countDocuments(),
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

export async function updateEnquiryStatus(id: string, status: string) {
  await dbConnect();
  try {
    const isSpam = status === 'Spam';
    await Enquiry.findByIdAndUpdate(id, { 
      status, 
      ...(isSpam ? { isSpam: true } : {}) 
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * AI Spam Agent: Scan a specific enquiry and label it
 */
export async function auditEnquirySpam(id: string) {
  await dbConnect();
  try {
    const enq = await Enquiry.findById(id).lean();
    if (!enq) return { success: false, error: 'Enquiry not found' };

    const analysis = await analyzeSpamWithAi({
      name: enq.name || enq.fname,
      fname: enq.fname,
      email: enq.email,
      phone: enq.phone,
      destination: enq.destination,
      travelType: enq.travelType,
      message: enq.message,
    });

    const isSpam = analysis.isSpam && analysis.confidence >= 0.65;
    await Enquiry.findByIdAndUpdate(id, {
      isSpam,
      status: isSpam ? 'Spam' : (enq.status === 'Spam' ? 'New' : enq.status),
      spamScore: analysis.confidence,
      spamReason: analysis.reason,
      spamCategory: analysis.category,
    });

    revalidatePath('/admin');
    return { success: true, analysis };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * AI Spam Agent: Bulk scan pending/recent enquiries
 */
export async function bulkScanSpamEnquiries(limit = 100) {
  await dbConnect();
  try {
    const enquiries = await Enquiry.find({ status: { $ne: 'Spam' } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    let scannedCount = 0;
    let spamCount = 0;

    for (const enq of enquiries) {
      scannedCount++;
      const analysis = await analyzeSpamWithAi({
        name: enq.name || enq.fname,
        fname: enq.fname,
        email: enq.email,
        phone: enq.phone,
        destination: enq.destination,
        travelType: enq.travelType,
        message: enq.message,
      });

      if (analysis.isSpam && analysis.confidence >= 0.65) {
        spamCount++;
        await Enquiry.findByIdAndUpdate(enq._id, {
          isSpam: true,
          status: 'Spam',
          spamScore: analysis.confidence,
          spamReason: analysis.reason,
          spamCategory: analysis.category,
        });
      }
    }

    revalidatePath('/admin');
    return { success: true, scannedCount, spamCount };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Delete all enquiries flagged as spam
 */
export async function purgeSpamEnquiries() {
  await dbConnect();
  try {
    const result = await Enquiry.deleteMany({
      $or: [{ status: 'Spam' }, { isSpam: true }]
    });
    revalidatePath('/admin');
    return { success: true, deletedCount: result.deletedCount };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
