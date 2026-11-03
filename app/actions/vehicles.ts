'use server'

import { v2 as cloudinary } from 'cloudinary';
import dbConnect, { isMongoConfigured } from '@/lib/mongodb';
import Vehicle from '@/lib/models/Vehicle';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { clampPagination } from '@/lib/pagination';
import { sanitizeRichHtml } from '@/lib/sanitize';
import { FALLBACK_IMAGE } from '@/lib/images';

export async function deleteVehicle(id: number) {
  await requireAdmin();
  await dbConnect();
  try {
    await Vehicle.findOneAndDelete({ id });
    revalidatePath('/admin');
    revalidatePath('/vehicles');
    revalidatePath(`/vehicles/${id}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getVehicles() {
  // No database at build time (CI, local builds): prerender an empty list.
  if (!isMongoConfigured()) return [];
  await dbConnect();
  try {
    const vehicles = await Vehicle.find().sort({ id: 1 }).lean();
    return JSON.parse(JSON.stringify(vehicles));
  } catch (error) {
    return [];
  }
}

export async function getPaginatedVehicles(rawPage: number = 1, rawLimit: number = 9) {
  const { page, limit } = clampPagination(rawPage, rawLimit);
  await dbConnect();
  try {
    const skip = (page - 1) * limit;
    const vehicles = await Vehicle.find().sort({ id: 1 }).skip(skip).limit(limit).lean();
    const total = await Vehicle.countDocuments();
    return {
      data: JSON.parse(JSON.stringify(vehicles)),
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalCount: total
    };
  } catch (error) {
    return { data: [], totalPages: 0, currentPage: 1, totalCount: 0 };
  }
}

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

export async function addVehicle(formData: FormData) {
  await requireAdmin();
  await dbConnect();
  
  try {
    const file = formData.get('image') as File;
    let imageUrl = '';
    
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      
      imageUrl = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: 'vehicles' }, (err: any, result: any) => {
          if (err) reject(err);
          else resolve(result!.secure_url);
        }).end(buffer);
      });
    }

    const payloadRaw = formData.get('payload') as string;
    const payload = JSON.parse(payloadRaw) as Record<string, unknown> & {
      aiImageUrl?: unknown;
    };

    const aiImageUrl = typeof payload.aiImageUrl === 'string' ? payload.aiImageUrl : '';
    
    // generate a unique ID based on max ID in the db + 1
    const lastDest = await Vehicle.findOne().sort({ id: -1 });
    const nextId = lastDest && lastDest.id ? lastDest.id + 1 : 100;
    
    payload.id = nextId;

    if (imageUrl) {
      payload.image = imageUrl;
    } else if (aiImageUrl) {
      console.log('Uploading AI generated image to Cloudinary from:', aiImageUrl);
      try {
          const result = await cloudinary.uploader.upload(aiImageUrl, { folder: 'vehicles' });
          payload.image = result.secure_url;
      } catch(e) {
          console.error("Cloudinary failed to fetch AI image:", e);
          payload.image = aiImageUrl; // Fallback to raw AI URL
      }
    } else if (!payload.image) {
      payload.image = FALLBACK_IMAGE;
    }

    payload.details = sanitizeRichHtml(payload.details);

    const newVehicle = new Vehicle(payload);
    await newVehicle.save();
    
    revalidatePath('/admin');
    revalidatePath('/vehicles');
    return { success: true, id: newVehicle._id.toString() };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateVehicle(id: string | number, formData: FormData) {
  await requireAdmin();
  await dbConnect();
  
  try {
    const file = formData.get('image') as File;
    let imageUrl = '';
    
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      imageUrl = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: 'vehicles' }, (err: any, result: any) => {
          if (err) reject(err);
          else resolve(result!.secure_url);
        }).end(buffer);
      });
    }

    const payloadRaw = formData.get('payload') as string;
    const payload = JSON.parse(payloadRaw) as Record<string, unknown>;

    if (imageUrl) {
      payload.image = imageUrl;
    }

    if ('details' in payload) payload.details = sanitizeRichHtml(payload.details);

    const updated = await Vehicle.findOneAndUpdate(
      { id: Number(id) }, 
      payload, 
      { new: true }
    );
    
    if (!updated) throw new Error("Vehicle not found");
    
    revalidatePath('/admin');
    revalidatePath('/vehicles');
    revalidatePath(`/vehicles/${id}`);
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
