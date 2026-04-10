import { Metadata } from 'next';
import { destinations } from '@/lib/destinations-data';
import { ReactNode } from 'react';

type Props = {
  params: Promise<{ id: string }>;
  children: ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: rawId } = await params;
  const id = parseInt(rawId);
  const destination = destinations.find((d) => d.id === id);

  if (!destination) {
    return {
      title: 'Destination Not Found',
    };
  }

  return {
    title: `${destination.name} Tour Package`,
    description: destination.description,
    openGraph: {
      title: `${destination.name} Tour Package | KonkanArabia`,
      description: destination.description,
      images: [destination.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${destination.name} Tour Package`,
      description: destination.description,
      images: [destination.image],
    },
  };
}

export default function DestinationLayout({ children }: Props) {
  return <>{children}</>;
}
