import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plan Your Dream Trip | Trip Enquiry',
  description: 'Fill out our travel enquiry form to get a personalized itinerary from our travel experts. Let KonkanArabia handle the details of your next adventure.',
  keywords: 'travel enquiry, plan a trip, custom itinerary, holiday planning, KonkanArabia enquiry',
};

export default function EnquiryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
