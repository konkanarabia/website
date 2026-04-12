'use server'

import dbConnect from '@/lib/mongodb';
import Visit from '@/lib/models/Visit';

export async function getAnalytics() {
  await dbConnect();
  try {
    const uniqueSessions = await Visit.distinct('sessionId', { sessionId: { $exists: true, $ne: null } });
    const totalVisits = uniqueSessions.length;
    
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todaySessions = await Visit.distinct('sessionId', { 
        timestamp: { $gte: startOfToday }, 
        sessionId: { $exists: true, $ne: null } 
    });
    const todayVisits = todaySessions.length;

    const topPaths = await Visit.aggregate([
      { $group: { _id: "$path", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 }
    ]);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const dailyStats = await Visit.aggregate([
      { $match: { timestamp: { $gte: sevenDaysAgo } } },
      { $group: { 
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          visits: { $addToSet: "$sessionId" }
      } },
      { $project: { date: "$_id", count: { $size: "$visits" } } },
      { $sort: { date: 1 } }
    ]);

    return { totalVisits, todayVisits, topPaths, dailyStats };
  } catch (error) {
    return { totalVisits: 0, todayVisits: 0, topPaths: [], dailyStats: [] };
  }
}
