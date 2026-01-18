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
import { Loader2, Globe, FileText, Calendar, ShieldCheck } from "lucide-react";

export default function VisaEnquiryForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    destinationCountry: "",
    visaType: "tourist",
    passengerCount: "1",
    tentativeDate: "",
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
          travelType: `Visa Assistance (${formData.visaType})`,
          destination: formData.destinationCountry,
          departureDate: formData.tentativeDate,
          travelers: parseInt(formData.passengerCount),
          message: `Nationality: ${formData.nationality}\n\n${formData.message}`,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      toast({
        title: "Visa Enquiry Received",
        description: "Our visa specialists will review your details and contact you shortly.",
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
          <Label htmlFor="name">Full Name (as per Passport)</Label>
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
          <Label htmlFor="nationality">Nationality</Label>
          <Input id="nationality" name="nationality" required value={formData.nationality} onChange={handleChange} placeholder="e.g. Indian" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="destinationCountry">Destination Country</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input id="destinationCountry" name="destinationCountry" required value={formData.destinationCountry} onChange={handleChange} className="pl-10" placeholder="e.g. Dubai, Thailand" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Visa Type</Label>
          <Select value={formData.visaType} onValueChange={handleSelectChange("visaType")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tourist">Tourist Visa</SelectItem>
              <SelectItem value="business">Business Visa</SelectItem>
              <SelectItem value="transit">Transit Visa</SelectItem>
              <SelectItem value="work">Work Permit Assistance</SelectItem>
              <SelectItem value="student">Student Visa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="tentativeDate">Tentative Travel Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input id="tentativeDate" name="tentativeDate" type="date" required value={formData.tentativeDate} onChange={handleChange} className="pl-10" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Number of Applicants</Label>
          <Select value={formData.passengerCount} onValueChange={handleSelectChange("passengerCount")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                <SelectItem key={n} value={n.toString()}>{n} Applicant{n > 1 ? 's' : ''}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Additional Details (Optional)</Label>
        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Mention any previous visa rejections or specific concerns..." rows={4} />
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5" />
        <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
          Your data is encrypted and secure. We only use your information for visa processing purposes and will never share it with third parties without your consent.
        </p>
      </div>

      <Button type="submit" className="w-full py-6 text-lg font-bold" disabled={isSubmitting}>
        {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</> : "Submit Visa Inquiry"}
      </Button>
    </form>
  );
}
