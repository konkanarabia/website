"use client";

import { useState } from "react";
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
import { Loader2, PartyPopper, Calendar, MapPin, Users, Sparkles } from "lucide-react";

export default function EventEnquiryForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          travelType: `Event Management (${formData.eventType})`,
          destination: formData.eventLocation,
          departureDate: formData.eventDate,
          travelers: parseInt(formData.guestCount),
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Organizer Name</Label>
          <Input id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
        </div>
        <div className="space-y-2">
          <Label>Event Type</Label>
          <Select value={formData.eventType} onValueChange={handleSelectChange("eventType")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wedding">Destination Wedding</SelectItem>
              <SelectItem value="corporate">Corporate Retreat / Meeting</SelectItem>
              <SelectItem value="birthday">Birthday Party</SelectItem>
              <SelectItem value="anniversary">Anniversary Celebration</SelectItem>
              <SelectItem value="other">Other Special Event</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="eventLocation">Preferred Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input id="eventLocation" name="eventLocation" required value={formData.eventLocation} onChange={handleChange} className="pl-10" placeholder="e.g. Alibaug, Lonavala, Dubai" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="eventDate">Event Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input id="eventDate" name="eventDate" type="date" required value={formData.eventDate} onChange={handleChange} className="pl-10" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Estimated Guest Count</Label>
          <Select value={formData.guestCount} onValueChange={handleSelectChange("guestCount")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="50">Up to 50 guests</SelectItem>
              <SelectItem value="150">50 - 150 guests</SelectItem>
              <SelectItem value="300">150 - 300 guests</SelectItem>
              <SelectItem value="500">More than 300 guests</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">Estimated Budget (Optional)</Label>
          <Input id="budget" name="budget" value={formData.budget} onChange={handleChange} placeholder="e.g. ₹5,00,000" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Event Details & Vision</Label>
        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us more about what you have in mind (catering, decoration, entertainment...)" rows={4} />
      </div>

      <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-primary mt-0.5" />
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          From concept to execution, we make your dream event a reality. Our planners will provide a detailed quote and theme proposal based on your requirements.
        </p>
      </div>

      <Button type="submit" className="w-full py-6 text-lg font-bold" disabled={isSubmitting}>
        {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Planning...</> : "Request Event Proposal"}
      </Button>
    </form>
  );
}
