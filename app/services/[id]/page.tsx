"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState, type ReactNode } from "react";
import { Price } from "@/components/ui/price";
import { CheckCircle2, ShieldCheck, Clock, Shield, Sparkles } from "lucide-react";

type Service = {
	id: number;
	name: string;
	description: string;
	image: string;
	images?: string[];
	details: string;
	features?: string[];
	whyChooseUs?: Array<{
		icon: ReactNode;
		title: string;
		description: string;
	}>;
	pricing: Array<{ type: string; price: string }>;
	availabilityNotes: string;
	enquiryLink?: string;
};

const services: Service[] = [
	{
		id: 1,
		name: "Vehicle Rental",
		description: "Car Rental & Bike Rental",
		image: "/services/Vehicle Rental-1.jpg",
		images: [
			"/vehicles/vehicle-1.jpg",
			"/vehicles/vehicle-2.jpg",
			"/vehicles/vehicle-3.jpg",
			"/vehicles/vehicle-4.jpg",
			"/vehicles/vehicle-5.jpg",
			"/vehicles/vehicle-6.jpg",
			"/vehicles/vehicle-7.jpg",
			"/vehicles/vehicle-8.jpg",
			"/vehicles/vehicle-9.jpg",
			"/vehicles/vehicle-10.jpg"
		],
		details:
			"Explore destinations at your own pace with our comprehensive vehicle rental services. Choose from a wide range of cars, from economy to luxury options, or rent bikes for adventure trips and city exploration. All vehicles are well-maintained with competitive rates and flexible pickup/drop-off locations.",
		features: [
			"Well-maintained latest models",
			"24/7 Roadside Assistance",
			"Unlimited Kilometers (on select cars)",
			"Clean & Sanitized Vehicles",
			"Flexible Pickup & Drop-off",
			"Comprehensive Insurance"
		],
		whyChooseUs: [
			{
				icon: <Shield className="w-5 h-5 text-primary" />,
				title: "Safe & Secure",
				description: "Every vehicle undergoes a 50-point safety check before every rental."
			},
			{
				icon: <Clock className="w-5 h-5 text-primary" />,
				title: "24/7 Support",
				description: "Dedicated support team available round the clock for any assistance."
			},
			{
				icon: <Sparkles className="w-5 h-5 text-primary" />,
				title: "Premium Fleet",
				description: "Wide range of premium vehicles from top luxury brands."
			}
		],
		pricing: [
			{ type: "Economy Car", price: "₹3,500/day" },
			{ type: "Mid-size Car", price: "₹5,000/day" },
			{ type: "Luxury Car", price: "₹9,500/day" },
			{ type: "Mountain Bike", price: "₹1,600/day" },
			{ type: "City Bike", price: "₹1,200/day" },
		],
		availabilityNotes:
			"24-hour advance booking recommended. All vehicles subject to availability.",
		enquiryLink: "/enquiry/vehicle-rental"
	},
	{
		id: 2,
		name: "Event Management",
		description: "Destination Events & Parties",
		image: "/services/Event Management.png",
		details:
			"Make your special occasions truly memorable with our destination event management services. From beach weddings to corporate retreats, anniversary celebrations to birthday parties at exotic locations - our team handles everything from venue selection to catering, decorations, entertainment, and accommodations.",
		features: [
			"Professional Event Planners",
			"Custom Theme Decorations",
			"Premium Catering Services",
			"End-to-end Logistics Support",
			"Venue Selection & Booking"
		],
		whyChooseUs: [
			{
				icon: <Sparkles className="w-5 h-5 text-primary" />,
				title: "Unique Themes",
				description: "We create bespoke themes that reflect your personality and vision."
			},
			{
				icon: <Clock className="w-5 h-5 text-primary" />,
				title: "Stress-Free",
				description: "We handle everything from A-Z so you can enjoy your special day."
			}
		],
		pricing: [
			{ type: "Small Events (up to 50 people)", price: "Starting from ₹50,000" },
			{ type: "Medium Events (50-150 people)", price: "Starting from ₹4,00,000" },
			{ type: "Large Events (150+ people)", price: "Custom quote" },
		],
		availabilityNotes:
			"Book at least 3 months in advance for best venue options.",
		enquiryLink: "/enquiry/event-management"
	},
	{
		id: 3,
		name: "Visa Services",
		description: "Hassle-free Travel Documentation",
		image: "/services/Visa Services.png",
		details:
			"Navigate complex visa requirements with ease through our comprehensive visa assistance services. Our experts provide guidance on documentation, application preparation, appointment scheduling, and follow-ups. We assist with tourist visas, business visas, work permits, and more for destinations worldwide.",
		features: [
			"Expert Documentation Support",
			"Interview Preparation",
			"Fast-track Processing",
			"Global Visa Assistance",
			"Real-time Application Tracking"
		],
		whyChooseUs: [
			{
				icon: <ShieldCheck className="w-5 h-5 text-primary" />,
				title: "High Success Rate",
				description: "Our experts ensure all documentation is perfect for maximum success."
			},
			{
				icon: <Clock className="w-5 h-5 text-primary" />,
				title: "Quick Turnaround",
				description: "We work efficiently to get your travel documents as soon as possible."
			}
		],
		pricing: [
			{ type: "Tourist Visa Assistance", price: "₹8,000" },
			{ type: "Business Visa Assistance", price: "₹12,000" },
			{ type: "Work Permit Assistance", price: "₹20,000" },
			{ type: "Express Processing", price: "+₹6,000" },
		],
		availabilityNotes:
			"Processing times vary by destination country and visa type.",
		enquiryLink: "/enquiry/visa-services"
	},
];

export default function ServicePage() {
	const params = useParams();
	const router = useRouter();
	const id = parseInt(params.id as string);
	const service = services.find((s) => s.id === id);
	const [thumbPick, setThumbPick] = useState<{
		sid: number;
		url: string;
	} | null>(null);
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		setImageError(true);
	};

	const activeImage =
		service &&
		thumbPick &&
		thumbPick.sid === service.id &&
		thumbPick.url
			? thumbPick.url
			: service?.image || "";

	useEffect(() => {
		window.scrollTo(0, 0);
		setImageError(false);
	}, [id]);

	if (!service) {
		return (
			<div className="container mx-auto px-4 py-8 md:py-16 text-center">
				<h2 className="text-xl md:text-2xl font-bold mb-4">
					Service not found
				</h2>
				<p className="mb-6 md:mb-8">
					The service you're looking for doesn't exist or has been removed.
				</p>
				<Link href="/services" passHref>
					<Button>View All Services</Button>
				</Link>
			</div>
		);
	}

	const handlePrevService = () => {
		const prevId = id > 1 ? id - 1 : services.length;
		router.push(`/services/${prevId}`);
	};

	const handleNextService = () => {
		const nextId = id < services.length ? id + 1 : 1;
		router.push(`/services/${nextId}`);
	};

	return (
		<div className="container mx-auto px-4 py-6 md:py-12">
			<div className="text-xs md:text-sm breadcrumbs mb-6">
				<ul className="flex flex-wrap items-center gap-2 text-slate-500">
					<li>
						<Link href="/" className="hover:text-primary transition-colors">
							Home
						</Link>
					</li>
					<li className="flex items-center gap-2">
						<span className="text-slate-300">/</span>
						<Link href="/services" className="hover:text-primary transition-colors">
							Services
						</Link>
					</li>
					<li className="flex items-center gap-2">
						<span className="text-slate-300">/</span>
						<span className="font-medium text-slate-900 truncate max-w-[150px] sm:max-w-none">
							{service.name}
						</span>
					</li>
				</ul>
			</div>

			<div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
				<h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-0 break-words">
					{service.name}
				</h1>
				<Badge
					variant="outline"
					className="text-sm md:text-lg py-1 md:py-1.5 self-start md:self-auto"
				>
					<span className="truncate">{service.description}</span>
				</Badge>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 mb-8 md:mb-12">
				<div className="space-y-4 min-w-0">
					<div className="relative aspect-video lg:aspect-[4/3] overflow-hidden rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
						<Image
							src={imageError ? "/placeholder.svg" : activeImage}
							alt={service.name}
							fill
							className="object-cover transition-all duration-700 hover:scale-110"
							priority
							onError={handleImageError}
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
					</div>
					
					{service.images && service.images.length > 1 && (
						<div className="flex gap-3 overflow-x-auto pb-4 pt-1 px-1 scrollbar-hide -mx-1">
							{service.images.map((img: string, idx: number) => (
								<button
									key={idx}
									onClick={() =>
										service &&
										setThumbPick({ sid: service.id, url: img })
									}
									className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
										activeImage === img 
											? "border-primary shadow-md scale-95" 
											: "border-transparent opacity-70 hover:opacity-100"
									}`}
								>
									<Image
										src={img}
										alt={`${service.name} view ${idx + 1}`}
										fill
										className="object-cover"
									/>
								</button>
							))}
						</div>
					)}
				</div>

				<div className="mt-2 lg:mt-0 min-w-0">
					<Tabs defaultValue="details" className="w-full">
						<TabsList className="mb-4 md:mb-6 grid grid-cols-2">
							<TabsTrigger value="details" className="text-sm md:text-base">
								Details
							</TabsTrigger>
							<TabsTrigger value="pricing" className="text-sm md:text-base">
								Pricing
							</TabsTrigger>
						</TabsList>

						<TabsContent
							value="details"
							className="text-base md:text-lg space-y-6 pt-2 focus-visible:outline-none"
						>
							<div>
								<p className="leading-relaxed break-words">{service.details}</p>
							</div>

							{service.features && (
								<div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
									<h3 className="text-lg font-bold mb-4 flex items-center">
										<Sparkles className="w-5 h-5 mr-2 text-primary" />
										Key Features
									</h3>
									<ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										{service.features.map((feature: string, i: number) => (
											<li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
												<CheckCircle2 className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
												<span>{feature}</span>
											</li>
										))}
									</ul>
								</div>
							)}

							<p className="italic text-muted-foreground text-sm border-l-2 border-primary/30 pl-4 py-1">
								{service.availabilityNotes}
							</p>
						</TabsContent>

						<TabsContent value="pricing">
							<div className="space-y-1 md:space-y-2">
								{service.pricing.map((item, i) => (
									<div
										key={i}
										className="flex flex-wrap justify-between items-center border-b py-2 md:py-3"
									>
										<span className="font-medium text-sm md:text-base pr-2">
											{item.type}
										</span>										<span className="text-base md:text-lg">
											<Price
												amount={item.price}
												sourceCurrency="INR"
												showConversion={true}
												showOriginal={false}
											/>
										</span>
									</div>
								))}
							</div>
						</TabsContent>
					</Tabs>

					{service.whyChooseUs && (
						<div className="mt-8 space-y-4">
							<h3 className="text-lg font-bold px-1">Why Choose Us?</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
								{service.whyChooseUs.map((item, i: number) => (
									<div key={i} className="flex gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
										<div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
											{item.icon}
										</div>
										<div>
											<h4 className="font-bold text-sm text-slate-900 dark:text-white">{item.title}</h4>
											<p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{item.description}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					<div className="mt-8">
						<Link href={service.enquiryLink ?? "/enquiry"} className="block w-full">
							<Button size="lg" className="w-full py-6 md:py-7 text-base md:text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all whitespace-normal h-auto">
								Enquire About This Service
							</Button>
						</Link>
					</div>
				</div>
			</div>

			<div className="border-t mt-12 pt-8 mb-8">
				<h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
					You might also be interested in
				</h3>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{services
						.filter((s) => s.id !== id)
						.slice(0, 3)
						.map((s) => (
							<Link href={`/services/${s.id}`} key={s.id} className="group">
								<div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-5 transition-all border border-slate-100 dark:border-slate-800 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 h-full">
									<h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors break-words mb-1">
										{s.name}
									</h4>
									<p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
										{s.description}
									</p>
								</div>
							</Link>
						))}
				</div>
			</div>

			<div className="flex justify-between items-center mt-8 md:mt-16 gap-3 sm:gap-4">
				<Button
					variant="outline"
					onClick={handlePrevService}
					size="sm"
					className="text-xs md:text-sm px-3 sm:px-4 h-9 md:h-10 flex-1 sm:flex-none"
				>
					<span className="hidden xs:inline">Previous Service</span>
					<span className="xs:hidden">Previous</span>
				</Button>
				<Button
					variant="outline"
					onClick={handleNextService}
					size="sm"
					className="text-xs md:text-sm px-3 sm:px-4 h-9 md:h-10 flex-1 sm:flex-none"
				>
					<span className="hidden xs:inline">Next Service</span>
					<span className="xs:hidden">Next</span>
				</Button>
			</div>
		</div>
	);
}
