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
import { format } from "date-fns";
import { Loader2, Hotel, Utensils, Calendar, Pin, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

import { useSearchParams } from "next/navigation";

export default function SpecializedEnquiryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [today, setToday] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "hospitality", 
    destination: "Siddhivinayak Devbag Beach Resort",
    checkInDate: "",
    checkOutDate: "",
    guests: "2",
    message: "",
  });

  useEffect(() => {
    setToday(format(new Date(), "yyyy-MM-dd"));
  }, []);

  useEffect(() => {
    const service = searchParams.get("service");
    if (service === "food-beverages") {
      setFormData(prev => ({ 
        ...prev, 
        serviceType: "food-beverages",
        destination: "02) Konkan Swad - The Test Of Konkan"
      }));
    } else if (service === "hospitality") {
      setFormData(prev => ({ 
        ...prev, 
        serviceType: "hospitality",
        destination: "01) Siddhivinayak Devbag Beach Resort"
      }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    
    if (name === "serviceType") {
      if (value === "hospitality") {
        setFormData(prev => ({ ...prev, destination: "01) Siddhivinayak Devbag Beach Resort" }));
      } else {
        setFormData(prev => ({ ...prev, destination: "02) Konkan Swad - The Test Of Konkan" }));
      }
    }

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          travelType: formData.serviceType === "hospitality" ? "Hospitality Stay" : "Dining Enquiry",
          departureDate: formData.checkInDate,
          returnDate: formData.checkOutDate,
          travelers: parseInt(formData.guests),
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");
      
      toast({
        title: "Enquiry Received",
        description: "We will contact you shortly regarding your request.",
      });
      router.push("/thank-you");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <Label htmlFor="serviceType" className="text-slate-700 font-semibold">I'm interested in</Label>
            <Select value={formData.serviceType} onValueChange={handleSelectChange("serviceType")}>
              <SelectTrigger className="h-12 rounded-xl border-slate-200 focus:ring-[#0066a1]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hospitality">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Hotel className="w-4 h-4 text-[#0066a1]" /> Hospitality Stay
                  </div>
                </SelectItem>
                <SelectItem value="food-beverages">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Utensils className="w-4 h-4 text-[#0066a1]" /> Food & Beverages
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination" className="text-slate-700 font-semibold">Location / Venue</Label>
            <div className="relative">
              <Pin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="destination"
                name="destination"
                value={formData.destination}
                readOnly
                className="h-12 pl-12 rounded-xl border-slate-200 bg-slate-50 text-slate-600 font-medium"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700 font-semibold">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className={cn("h-12 rounded-xl border-slate-200", errors.name && "border-red-500")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 font-semibold">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className={cn("h-12 rounded-xl border-slate-200", errors.email && "border-red-500")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-700 font-semibold">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="+91"
              value={formData.phone}
              onChange={handleChange}
              className={cn("h-12 rounded-xl border-slate-200", errors.phone && "border-red-500")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="guests" className="text-slate-700 font-semibold">No. of Guests</Label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Select value={formData.guests} onValueChange={handleSelectChange("guests")}>
                <SelectTrigger className="h-12 pl-12 rounded-xl border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, "7+"].map(n => (
                    <SelectItem key={n} value={n.toString()}>{n} Guests</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {formData.serviceType === "hospitality" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <Label htmlFor="checkInDate" className="text-slate-700 font-semibold">Check-in Date</Label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="checkInDate"
                  name="checkInDate"
                  type="date"
                  min={today}
                  value={formData.checkInDate}
                  onChange={handleChange}
                  className="h-12 pl-12 rounded-xl border-slate-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkOutDate" className="text-slate-700 font-semibold">Check-out Date</Label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="checkOutDate"
                  name="checkOutDate"
                  type="date"
                  min={formData.checkInDate || today}
                  value={formData.checkOutDate}
                  onChange={handleChange}
                  className="h-12 pl-12 rounded-xl border-slate-200"
                />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2 mb-8">
          <Label htmlFor="message" className="text-slate-700 font-semibold">Additional Details</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us more about your requirements (e.g., room preference, dietary needs, special events)..."
            value={formData.message}
            onChange={handleChange}
            className="min-h-[120px] rounded-xl border-slate-200"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#0066a1] hover:bg-[#00558a] text-white py-6 rounded-xl text-lg font-bold shadow-lg shadow-blue-900/20 transition-all duration-300 transform hover:scale-[1.01]"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
            </div>
          ) : (
            "Send Enquiry"
          )}
        </Button>
      </div>
    </form>
  );
}
