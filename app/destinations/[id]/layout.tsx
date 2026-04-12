import { Metadata } from 'next';
import dbConnect from '@/lib/mongodb';
import Destination from '@/lib/models/Destination';
import { ReactNode } from 'react';

type Props = {
  params: Promise<{ id: string }>;
  children: ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: rawId } = await params;
  const id = parseInt(rawId);
  
  await dbConnect();
  const destination = await Destination.findOne({ id }).select('name description image').lean() as any;

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
