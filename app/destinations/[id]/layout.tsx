import type { Metadata, ResolvingMetadata } from 'next';
import { destinations } from "@/lib/destinations-data";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  const destination = destinations.find((d) => d.id === id);

  if (!destination) {
    return {
      title: 'Destination Not Found',
    };
  }

  return {
    title: `${destination.name} | Tours & Travel`,
    description: destination.description || `Explore ${destination.name} with KonkanArabia. Handcrafted holiday packages featuring ${destination.highlights?.join(', ') || 'top attractions'}.`,
    openGraph: {
      title: destination.name,
      description: destination.description,
      images: [destination.image],
    },
    keywords: [destination.name, 'tour package', 'holiday', 'travel itinerary', 'KonkanArabia'],
  };
}

export default function DestinationDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
