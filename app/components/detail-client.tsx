"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Price } from "@/components/ui/price";
import { CheckCircle2, ShieldCheck, Clock, Shield, Sparkles } from "lucide-react";

const getIcon = (iconName: string, className: string) => {
	switch (iconName) {
		case "ShieldCheck": return <ShieldCheck className={className} />;
		case "Clock": return <Clock className={className} />;
		case "Shield": return <Shield className={className} />;
		case "Sparkles":
		default:
			return <Sparkles className={className} />;
	}
};

interface DetailClientProps {
  item: any;
  allItems: any[];
  category: 'vehicles' | 'visas' | 'events';
  categoryTitle: string;
}

export default function DetailClient({ item, allItems, category, categoryTitle }: DetailClientProps) {
	const router = useRouter();
	const [thumbPick, setThumbPick] = useState<{
		sid: number;
		url: string;
	} | null>(null);
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		setImageError(true);
	};

	const activeImage =
		item &&
		thumbPick &&
		thumbPick.sid === item.id &&
		thumbPick.url
			? thumbPick.url
			: item?.image || "";

	useEffect(() => {
		window.scrollTo(0, 0);
		setImageError(false);
	}, [item.id]);

	const handlePrev = () => {
        const currentIndex = allItems.findIndex((s) => s.id === item.id);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : allItems.length - 1;
		router.push(`/${category}/${allItems[prevIndex].id}`);
	};

	const handleNext = () => {
        const currentIndex = allItems.findIndex((s) => s.id === item.id);
        const nextIndex = currentIndex < allItems.length - 1 ? currentIndex + 1 : 0;
		router.push(`/${category}/${allItems[nextIndex].id}`);
	};

	return (
		<div className="container mx-auto px-4 py-12">
			<div className="text-sm breadcrumbs mb-6">
				<ul className="flex items-center gap-2 text-slate-500">
					<li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
					<li className="flex items-center gap-2">
						<span className="text-slate-300">/</span>
						<Link href={`/${category}`} className="hover:text-primary transition-colors uppercase font-bold text-[10px] tracking-widest">{categoryTitle}</Link>
					</li>
					<li className="flex items-center gap-2">
						<span className="text-slate-300">/</span>
						<span className="font-medium text-slate-900">{item.name}</span>
					</li>
				</ul>
			</div>

			<div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
				<h1 className="text-4xl font-bold">{item.name}</h1>
				<Badge variant="outline" className="text-lg py-1.5">{item.description}</Badge>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
				<div className="space-y-4">
					<div className="relative aspect-video lg:aspect-[4/3] overflow-hidden rounded-2xl shadow-xl border border-slate-200">
						<Image
							src={imageError ? "/placeholder.svg" : activeImage}
							alt={item.name}
							fill
							className="object-cover transition-all duration-700 hover:scale-105"
							priority
							onError={handleImageError}
						/>
					</div>
					
					{item.images && item.images.length > 1 && (
						<div className="flex gap-3 overflow-x-auto pb-4 pt-1">
							{item.images.map((img: string, idx: number) => (
								<button
									key={idx}
									onClick={() => setThumbPick({ sid: item.id, url: img })}
									className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
										activeImage === img ? "border-primary scale-95" : "border-transparent opacity-70 hover:opacity-100"
									}`}
								>
									<Image src={img} alt={`${item.name} ${idx + 1}`} fill className="object-cover" />
								</button>
							))}
						</div>
					)}
				</div>

				<div>
					<Tabs defaultValue="details" className="w-full">
						<TabsList className="mb-6 grid grid-cols-2">
							<TabsTrigger value="details">Details</TabsTrigger>
							<TabsTrigger value="pricing">Pricing</TabsTrigger>
						</TabsList>

						<TabsContent value="details" className="space-y-6 pt-2">
							<div className="prose max-w-none text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.details }} />

							{item.features && item.features.length > 0 && (
								<div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
									<h3 className="text-lg font-bold mb-4 flex items-center">
										<Sparkles className="w-5 h-5 mr-2 text-primary" />
										Key Features
									</h3>
									<ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										{item.features.map((feature: string, i: number) => (
											<li key={i} className="flex items-start text-sm text-slate-600">
												<CheckCircle2 className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
												<span>{feature}</span>
											</li>
										))}
									</ul>
								</div>
							)}
						</TabsContent>

						<TabsContent value="pricing">
							<div className="space-y-2">
								{item.pricing && item.pricing.map((p: any, i: number) => (
									<div key={i} className="flex justify-between items-center border-b py-3">
										<span className="font-medium">{p.type}</span>
										<span className="text-lg font-bold text-slate-900">{p.price}</span>
									</div>
								))}
							</div>
						</TabsContent>
					</Tabs>

					<div className="mt-8">
						<Link href={`/enquiry/${category === 'vehicles' ? 'vehicle' : category === 'visas' ? 'visa' : 'event'}`} className="block w-full">
							<Button size="lg" className="w-full py-7 font-bold rounded-xl shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99]">
								Enquire About This {categoryTitle.slice(0, -1)}
							</Button>
						</Link>
					</div>
				</div>
			</div>

			<div className="flex justify-between items-center mt-16 gap-4 border-t pt-8">
				<Button variant="outline" onClick={handlePrev} className="flex-1 sm:flex-none">Previous {categoryTitle.slice(0, -1)}</Button>
				<Button variant="outline" onClick={handleNext} className="flex-1 sm:flex-none">Next {categoryTitle.slice(0, -1)}</Button>
			</div>
		</div>
	);
}
