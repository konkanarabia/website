import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/lib/models/Event';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const event = await Event.findOne({ id: Number(id) }).lean();
    if (!event) {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, event });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
