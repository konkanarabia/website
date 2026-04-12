'use server'

import dbConnect from '@/lib/mongodb';
import Enquiry from '@/lib/models/Enquiry';
import { revalidatePath } from 'next/cache';

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
    await Enquiry.findByIdAndUpdate(id, { status });
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
