import dbConnect from '@/lib/mongodb';
import Review from '@/lib/models/Review';
import Destination from '@/lib/models/Destination';
import TestimonialsClient from './testimonials-client';

export default async function Testimonials() {
  await dbConnect();
  
  // Get latest 6 reviews and populate destination name if possible
  const reviews = await Review.find().sort({ createdAt: -1 }).limit(6).lean();
  if (reviews.length === 0) return null;

  const destinations = await Destination.find({ id: { $in: reviews.map((r: any) => r.destinationId) } }).lean();
  const destMap = new Map(destinations.map((d: any) => [d.id, d.name]));

  const formattedReviews = reviews.map((rev: any) => ({
    id: String(rev._id || rev.id),
    userName: String(rev.userName || 'Guest Traveler'),
    comment: String(rev.comment || ''),
    rating: Number(rev.rating || 5),
    destinationName: String(destMap.get(rev.destinationId) || 'a hidden gem'),
  }));

  return <TestimonialsClient reviews={formattedReviews} />;
}
