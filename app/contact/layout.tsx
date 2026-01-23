import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Global Travel Support & Enquiries',
  description: 'Get in touch with KonkanArabia. Reach out to our India or Dubai offices for holiday bookings, vehicle rentals, and travel assistance.',
  keywords: 'contact KonkanArabia, travel agency contact, Dubai office, Mumbai office, travel enquiry',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
