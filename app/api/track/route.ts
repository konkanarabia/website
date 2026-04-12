import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Visit from '@/lib/models/Visit';

const IS_BOT_REGEX = /bot|crawler|spider|crawling|slurp|bingbot|googlebot|yandexbot|facebookexternalhit|baiduspider|duckduckbot/i;

export async function POST(req: Request) {
  try {
    const { path, sessionId } = await req.json();
    const userAgent = req.headers.get('user-agent') || 'unknown';
    const xf = req.headers.get('x-forwarded-for');
    const ip = xf ? xf.split(',')[0].trim() : (req.headers.get('x-real-ip') || 'unknown');

    if (IS_BOT_REGEX.test(userAgent)) return NextResponse.json({ success: true, bot: true });

    if (path && !path.startsWith('/admin') && !path.startsWith('/api')) {
      await dbConnect();
      
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      // Deduplicate rapid reloads by tracking exact path per session per day
      const existing = await Visit.findOne({
        path,
        sessionId,
        timestamp: { $gte: startOfToday }
      });

      if (!existing) {
        await Visit.create({ path, userAgent, ip, sessionId });
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
