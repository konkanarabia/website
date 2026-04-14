import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Vehicle from '@/lib/models/Vehicle';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const vehicle = await Vehicle.findOne({ id: Number(id) }).lean();
    if (!vehicle) {
      return NextResponse.json({ success: false, error: 'Vehicle not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, vehicle });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
