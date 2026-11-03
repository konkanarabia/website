import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Restaurant from '@/lib/models/Restaurant';
import { parseItemId } from '@/lib/route-id';

// Loads one record for the admin edit form (same public fields as /restaurants/[id]).
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = parseItemId((await params).id);
  if (id === null) {
    return NextResponse.json({ success: false, error: 'Restaurant not found' }, { status: 404 });
  }
  try {
    await dbConnect();
    const restaurant = await Restaurant.findOne({ id }).lean();
    if (!restaurant) {
      return NextResponse.json({ success: false, error: 'Restaurant not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, restaurant });
  } catch (error) {
    console.error('GET /api/restaurants/[id]:', error);
    return NextResponse.json({ success: false, error: 'Failed to load restaurant' }, { status: 500 });
  }
}
