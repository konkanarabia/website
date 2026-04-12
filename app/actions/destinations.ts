'use server'

import { v2 as cloudinary } from 'cloudinary';
import dbConnect from '@/lib/mongodb';
import Destination from '@/lib/models/Destination';
import { revalidatePath } from 'next/cache';

export async function deleteDestination(id: number) {
  await dbConnect();
  try {
    await Destination.findOneAndDelete({ id });
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getDestinations() {
  await dbConnect();
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(destinations));
  } catch (error) {
    return [];
  }
}

export async function getPaginatedDestinations(page: number = 1, limit: number = 9) {
  await dbConnect();
  try {
    const skip = (page - 1) * limit;
    const destinations = await Destination.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
    const total = await Destination.countDocuments();
    return {
      data: JSON.parse(JSON.stringify(destinations)),
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

export async function addDestination(formData: FormData) {
  await dbConnect();
  
  try {
    const file = formData.get('image') as File;
    let imageUrl = '';
    
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      
      imageUrl = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: 'destinations' }, (err: any, result: any) => {
          if (err) reject(err);
          else resolve(result!.secure_url);
        }).end(buffer);
      });
    }

    const payloadRaw = formData.get('payload') as string;
    const payload = JSON.parse(payloadRaw) as Record<string, unknown> & {
      aiImageUrl?: unknown;
    };

    const aiImageUrl =
      typeof payload.aiImageUrl === 'string' ? payload.aiImageUrl : '';
    
    // generate a unique ID based on max ID in the db + 1
    const lastDest = await Destination.findOne().sort({ id: -1 });
    const nextId = lastDest && lastDest.id ? lastDest.id + 1 : 100;
    
    payload.id = nextId;

    if (imageUrl) {
      payload.image = imageUrl;
    } else if (aiImageUrl) {
      console.log('Uploading AI generated image to Cloudinary from:', aiImageUrl);
      try {
          const result = await cloudinary.uploader.upload(aiImageUrl, { folder: 'destinations' });
          payload.image = result.secure_url;
      } catch(e) {
          console.error("Cloudinary failed to fetch AI image:", e);
          payload.image = aiImageUrl; // Fallback to raw AI URL
      }
    } else {
      payload.image = '/placeholder.jpg';
    }

    const newDest = new Destination(payload);
    await newDest.save();
    
    return { success: true, id: newDest._id.toString() };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateDestination(id: string | number, formData: FormData) {
  await dbConnect();
  
  try {
    const file = formData.get('image') as File;
    let imageUrl = '';
    
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      imageUrl = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: 'destinations' }, (err: any, result: any) => {
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

    const updated = await Destination.findOneAndUpdate(
      { id: Number(id) }, 
      payload, 
      { new: true }
    );
    
    if (!updated) throw new Error("Destination not found");
    
    revalidatePath('/admin');
    revalidatePath(`/destinations/${id}`);
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

