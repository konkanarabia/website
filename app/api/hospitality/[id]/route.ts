import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Hospitality from '@/lib/models/Hospitality';
import { parseItemId } from '@/lib/route-id';

// Loads one record for the admin edit form (same public fields as /hospitality/[id]).
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = parseItemId((await params).id);
  if (id === null) {
    return NextResponse.json({ success: false, error: 'Stay not found' }, { status: 404 });
  }
  try {
    await dbConnect();
    const hospitality = await Hospitality.findOne({ id }).lean();
    if (!hospitality) {
      return NextResponse.json({ success: false, error: 'Stay not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, hospitality });
  } catch (error) {
    console.error('GET /api/hospitality/[id]:', error);
    return NextResponse.json({ success: false, error: 'Failed to load stay' }, { status: 500 });
  }
}
