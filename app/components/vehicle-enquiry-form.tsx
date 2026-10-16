"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Car, Bike, Calendar, Pin, Users } from "lucide-react";
import { format } from "date-fns";
import TranslatedText from "@/components/TranslatedText";
import { vehicleEnquirySchema, formatZodErrors, nameSchema, emailSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";
import useTranslatedString from "@/hooks/use-translated-string";
import { PhoneInput } from "@/components/ui/phone-input";


export default function VehicleEnquiryForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [today, setToday] = useState<string>("");

  const namePlaceholder = useTranslatedString("John Doe");
  const emailPlaceholder = useTranslatedString("john@example.com");
  const phonePlaceholder = useTranslatedString("+44 7911 123456");
  const pickupPlaceholder = useTranslatedString("e.g. Airport, Hotel");
  const dropoffPlaceholder = useTranslatedString("e.g. Railway Station");
  const messagePlaceholder = useTranslatedString("Any specific car model or additional requirements?");

  useEffect(() => {
    setToday(format(new Date(), "yyyy-MM-dd"));
  }, []);

  const [formLoadedAt] = useState(() => Date.now());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleType: "car",
    carCategory: "economy",
    bikeCategory: "city",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    dropoffDate: "",
    passengers: "2",
    message: "",
    website_hp: "",
    business_url: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: 'name' | 'email') => {
    if (field === 'name' && formData.name) {
      const res = nameSchema.safeParse(formData.name);
      if (!res.success) {
        setErrors((prev) => ({ ...prev, name: res.error.issues[0]?.message || 'Invalid name' }));
      }
    } else if (field === 'email' && formData.email) {
      const res = emailSchema.safeParse(formData.email);
      if (!res.success) {
        setErrors((prev) => ({ ...prev, email: res.error.issues[0]?.message || 'Invalid email address' }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = vehicleEnquirySchema.safeParse(formData);
    if (!validation.success) {
      const errMap = formatZodErrors(validation.error);
      setErrors(errMap);
      toast({
        title: "Please check your inputs",
        description: Object.values(errMap)[0] || "Some fields require your attention.",
        variant: "destructive",
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _form_loaded_at: formLoadedAt,
          travelType: `Vehicle Rental (${formData.vehicleType})`,
          destination: `Pickup: ${formData.pickupLocation}, Dropoff: ${formData.dropoffLocation}`,
          departureDate: formData.pickupDate,
          returnDate: formData.dropoffDate,
          travelers: parseInt(formData.passengers) || 1,
          message: `Vehicle Selection: ${formData.vehicleType === 'car' ? formData.carCategory : formData.bikeCategory}\n\n${formData.message}`,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      toast({
        title: "Enquiry Submitted",
        description: "We've received your vehicle rental request and will contact you shortly.",
      });
      router.push("/thank-you");
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900 p-5 md:p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          opacity: 0,
          zIndex: -1,
          width: "1px",
          height: "1px",
          overflow: "hidden",
          pointerEvents: "none",
          left: "-9999px",
          top: 0
        }}
      >
        <label htmlFor="veh_website_hp">Website</label>
        <input id="veh_website_hp" type="text" name="website_hp" value={formData.website_hp} onChange={handleChange} tabIndex={-1} autoComplete="off" />
        <label htmlFor="veh_business_url">Company URL</label>
        <input id="veh_business_url" type="text" name="business_url" value={formData.business_url} onChange={handleChange} tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">
            <TranslatedText text="Full Name" />
          </Label>
          <Input
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            onBlur={() => handleBlur('name')}
            placeholder={namePlaceholder}
            className={cn(errors.name && "border-red-500")}
          />
          {errors.name && <p className="text-xs text-red-500 font-medium mt-1">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            <TranslatedText text="Email Address" />
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            placeholder={emailPlaceholder}
            className={cn(errors.email && "border-red-500")}
          />
          {errors.email && <p className="text-xs text-red-500 font-medium mt-1">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">
            <TranslatedText text="Phone Number" />
          </Label>
          <PhoneInput
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            error={Boolean(errors.phone)}
          />
          {errors.phone && <p className="text-xs text-red-500 font-medium mt-1">{errors.phone}</p>}
        </div>
        <div className="space-y-2">
          <Label>
            <TranslatedText text="Vehicle Type" />
          </Label>
          <Select value={formData.vehicleType} onValueChange={handleSelectChange("vehicleType")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="car">
                <TranslatedText text="Car Rental" />
              </SelectItem>
              <SelectItem value="bike">
                <TranslatedText text="Bike Rental" />
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formData.vehicleType === "car" ? (
          <div className="space-y-2">
            <Label>
              <TranslatedText text="Car Category" />
            </Label>
            <Select value={formData.carCategory} onValueChange={handleSelectChange("carCategory")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">
                  <TranslatedText text="Economy (e.g., Swift, Baleno)" />
                </SelectItem>
                <SelectItem value="midsize">
                  <TranslatedText text="Mid-size Sedan (e.g., City, Verna)" />
                </SelectItem>
                <SelectItem value="luxury">
                  <TranslatedText text="Luxury (e.g., BMW, Mercedes)" />
                </SelectItem>
                <SelectItem value="suv">
                  <TranslatedText text="SUV (e.g., Creta, Fortuner)" />
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="space-y-2">
            <Label>
              <TranslatedText text="Bike Category" />
            </Label>
            <Select value={formData.bikeCategory} onValueChange={handleSelectChange("bikeCategory")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="city">
                  <TranslatedText text="City Bike / Scooter" />
                </SelectItem>
                <SelectItem value="mountain">
                  <TranslatedText text="Mountain / Adventure Bike" />
                </SelectItem>
                <SelectItem value="cruiser">
                  <TranslatedText text="Cruiser / Royal Enfield" />
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="space-y-2">
          <Label>
            <TranslatedText text="Passengers / Riders" />
          </Label>
          <Select value={formData.passengers} onValueChange={handleSelectChange("passengers")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7].map(n => (
                <SelectItem key={n} value={n.toString()}>
                  {n} {n === 1 ? <TranslatedText text="Person" /> : <TranslatedText text="People" />}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="pickupLocation">
            <TranslatedText text="Pickup Location" />
          </Label>
          <div className="relative">
            <Pin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input id="pickupLocation" name="pickupLocation" required value={formData.pickupLocation} onChange={handleChange} className={cn("pl-10", errors.pickupLocation && "border-red-500")} placeholder={pickupPlaceholder} />
          </div>
          {errors.pickupLocation && <p className="text-xs text-red-500 font-medium mt-1">{errors.pickupLocation}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="dropoffLocation">
            <TranslatedText text="Drop-off Location" />
          </Label>
          <div className="relative">
            <Pin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input id="dropoffLocation" name="dropoffLocation" required value={formData.dropoffLocation} onChange={handleChange} className={cn("pl-10", errors.dropoffLocation && "border-red-500")} placeholder={dropoffPlaceholder} />
          </div>
          {errors.dropoffLocation && <p className="text-xs text-red-500 font-medium mt-1">{errors.dropoffLocation}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="pickupDate">
            <TranslatedText text="Pickup Date" />
          </Label>
          <Input id="pickupDate" name="pickupDate" type="date" required min={today} value={formData.pickupDate} onChange={handleChange} className={cn(errors.pickupDate && "border-red-500")} />
          {errors.pickupDate && <p className="text-xs text-red-500 font-medium mt-1">{errors.pickupDate}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="dropoffDate">
            <TranslatedText text="Drop-off Date" />
          </Label>
          <Input id="dropoffDate" name="dropoffDate" type="date" required min={formData.pickupDate || today} value={formData.dropoffDate} onChange={handleChange} className={cn(errors.dropoffDate && "border-red-500")} />
          {errors.dropoffDate && <p className="text-xs text-red-500 font-medium mt-1">{errors.dropoffDate}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          <TranslatedText text="Special Requirements (Optional)" />
        </Label>
        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder={messagePlaceholder} rows={4} />
      </div>

      <Button type="submit" className="w-full py-6 text-lg font-bold" disabled={isSubmitting}>
        {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> <TranslatedText text="Processing..." /></> : <TranslatedText text="Request Vehicle Quote" />}
      </Button>
    </form>
  );
}
