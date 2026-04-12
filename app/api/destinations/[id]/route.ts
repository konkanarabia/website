import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Destination from '@/lib/models/Destination';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    await dbConnect();
    const destination = await Destination.findOne({ id: Number(id) }).lean();
    
    if (!destination) {
      return NextResponse.json({ success: false, error: 'Destination not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, destination });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
