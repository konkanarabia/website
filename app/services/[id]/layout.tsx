import type { Metadata, ResolvingMetadata } from 'next';

const services = [
	{
		id: 1,
		name: "Vehicle Rental",
		description: "Car Rental & Bike Rental",
	},
	{
		id: 2,
		name: "Event Management",
		description: "Destination Events & Parties",
	},
	{
		id: 3,
		name: "Visa Services",
		description: "Hassle-free Travel Documentation",
	},
];

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  const service = services.find((s) => s.id === id);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.name} | KonkanArabia Premium Services`,
    description: `Professional ${service.name} by KonkanArabia. ${service.description}. Discover luxury and convenience for your travel needs.`,
    keywords: [service.name, 'travel services', 'KonkanArabia', 'luxury rental', 'visa assistance', 'event planning'],
  };
}

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
