import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Visa from '@/lib/models/Visa';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const visa = await Visa.findOne({ id: Number(id) }).lean();
    if (!visa) {
      return NextResponse.json({ success: false, error: 'Visa not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, visa });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
