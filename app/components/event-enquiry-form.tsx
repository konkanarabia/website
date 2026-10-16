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
import { Loader2, PartyPopper, Calendar, Pin, Users, Sparkles } from "lucide-react";
import TranslatedText from "@/components/TranslatedText";
import { eventEnquirySchema, formatZodErrors, nameSchema, emailSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";
import useTranslatedString from "@/hooks/use-translated-string";
import { PhoneInput } from "@/components/ui/phone-input";


export default function EventEnquiryForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [today, setToday] = useState<string>("");

  const namePlaceholder = useTranslatedString("John Doe");
  const emailPlaceholder = useTranslatedString("john@example.com");
  const phonePlaceholder = useTranslatedString("+44 7911 123456");
  const locationPlaceholder = useTranslatedString("e.g. Alibaug, Lonavala, Dubai");
  const budgetPlaceholder = useTranslatedString("e.g. £5,000");
  const detailsPlaceholder = useTranslatedString("Tell us more about what you have in mind (catering, decoration, entertainment...)");


  useEffect(() => {
    setToday(new Date().toISOString().split('T')[0]);
  }, []);

  const [formLoadedAt] = useState(() => Date.now());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "wedding",
    eventLocation: "",
    eventDate: "",
    guestCount: "50",
    budget: "",
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

    const validation = eventEnquirySchema.safeParse(formData);
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
          travelType: `Event Management (${formData.eventType})`,
          destination: formData.eventLocation,
          departureDate: formData.eventDate,
          travelers: parseInt(formData.guestCount) || 1,
          message: `Estimated Budget: ${formData.budget}\n\n${formData.message}`,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      toast({
        title: "Event Request Submitted",
        description: "Our event planners will get back to you with a customized proposal shortly.",
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
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
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
        <label htmlFor="event_website_hp">Website</label>
        <input id="event_website_hp" type="text" name="website_hp" value={formData.website_hp} onChange={handleChange} tabIndex={-1} autoComplete="off" />
        <label htmlFor="event_business_url">Company URL</label>
        <input id="event_business_url" type="text" name="business_url" value={formData.business_url} onChange={handleChange} tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">
            <TranslatedText text="Organizer Name" />
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
            <TranslatedText text="Event Type" />
          </Label>
          <Select value={formData.eventType} onValueChange={handleSelectChange("eventType")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wedding">
                <TranslatedText text="Destination Wedding" />
              </SelectItem>
              <SelectItem value="corporate">
                <TranslatedText text="Corporate Retreat / Meeting" />
              </SelectItem>
              <SelectItem value="birthday">
                <TranslatedText text="Birthday Party" />
              </SelectItem>
              <SelectItem value="anniversary">
                <TranslatedText text="Anniversary Celebration" />
              </SelectItem>
              <SelectItem value="other">
                <TranslatedText text="Other Special Event" />
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="eventLocation">
            <TranslatedText text="Preferred Location" />
          </Label>
          <div className="relative">
            <Pin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input id="eventLocation" name="eventLocation" required value={formData.eventLocation} onChange={handleChange} className={cn("pl-10", errors.eventLocation && "border-red-500")} placeholder={locationPlaceholder} />
          </div>
          {errors.eventLocation && <p className="text-xs text-red-500 font-medium mt-1">{errors.eventLocation}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="eventDate">
            <TranslatedText text="Event Date" />
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input id="eventDate" name="eventDate" type="date" required min={today} value={formData.eventDate} onChange={handleChange} className={cn("pl-10", errors.eventDate && "border-red-500")} />
          </div>
          {errors.eventDate && <p className="text-xs text-red-500 font-medium mt-1">{errors.eventDate}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>
            <TranslatedText text="Estimated Guest Count" />
          </Label>
          <Select value={formData.guestCount} onValueChange={handleSelectChange("guestCount")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="50">
                <TranslatedText text="Up to 50 guests" />
              </SelectItem>
              <SelectItem value="150">
                <TranslatedText text="50 - 150 guests" />
              </SelectItem>
              <SelectItem value="300">
                <TranslatedText text="150 - 300 guests" />
              </SelectItem>
              <SelectItem value="500">
                <TranslatedText text="More than 300 guests" />
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">
            <TranslatedText text="Estimated Budget (Optional)" />
          </Label>
          <Input id="budget" name="budget" value={formData.budget} onChange={handleChange} placeholder={budgetPlaceholder} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          <TranslatedText text="Event Details & Vision" />
        </Label>
        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder={detailsPlaceholder} rows={4} />
      </div>

      <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-primary mt-0.5" />
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <TranslatedText text="From concept to execution, we make your dream event a reality. Our planners will provide a detailed quote and theme proposal based on your requirements." />
        </p>
      </div>

      <Button type="submit" className="w-full py-6 text-lg font-bold" disabled={isSubmitting}>
        {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> <TranslatedText text="Planning..." /></> : <TranslatedText text="Request Event Proposal" />}
      </Button>
    </form>
  );
}
