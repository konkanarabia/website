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
