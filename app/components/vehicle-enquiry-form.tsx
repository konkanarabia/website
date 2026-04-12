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

export default function VehicleEnquiryForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [today, setToday] = useState<string>("");

  useEffect(() => {
    setToday(format(new Date(), "yyyy-MM-dd"));
  }, []);

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
          travelType: `Vehicle Rental (${formData.vehicleType})`,
          destination: `Pickup: ${formData.pickupLocation}, Dropoff: ${formData.dropoffLocation}`,
          departureDate: formData.pickupDate,
          returnDate: formData.dropoffDate,
          travelers: parseInt(formData.passengers),
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
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
          <Label>Vehicle Type</Label>
          <Select value={formData.vehicleType} onValueChange={handleSelectChange("vehicleType")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="car">Car Rental</SelectItem>
              <SelectItem value="bike">Bike Rental</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formData.vehicleType === "car" ? (
          <div className="space-y-2">
            <Label>Car Category</Label>
            <Select value={formData.carCategory} onValueChange={handleSelectChange("carCategory")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Economy (e.g., Swift, Baleno)</SelectItem>
                <SelectItem value="midsize">Mid-size Sedan (e.g., City, Verna)</SelectItem>
                <SelectItem value="luxury">Luxury (e.g., BMW, Mercedes)</SelectItem>
                <SelectItem value="suv">SUV (e.g., Creta, Fortuner)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="space-y-2">
            <Label>Bike Category</Label>
            <Select value={formData.bikeCategory} onValueChange={handleSelectChange("bikeCategory")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="city">City Bike / Scooter</SelectItem>
                <SelectItem value="mountain">Mountain / Adventure Bike</SelectItem>
                <SelectItem value="cruiser">Cruiser / Royal Enfield</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="space-y-2">
          <Label>Passengers / Riders</Label>
          <Select value={formData.passengers} onValueChange={handleSelectChange("passengers")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7].map(n => (
                <SelectItem key={n} value={n.toString()}>{n} {n === 1 ? 'Person' : 'People'}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="pickupLocation">Pickup Location</Label>
          <div className="relative">
            <Pin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input id="pickupLocation" name="pickupLocation" required value={formData.pickupLocation} onChange={handleChange} className="pl-10" placeholder="e.g. Airport, Hotel" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dropoffLocation">Drop-off Location</Label>
          <div className="relative">
            <Pin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input id="dropoffLocation" name="dropoffLocation" required value={formData.dropoffLocation} onChange={handleChange} className="pl-10" placeholder="e.g. Railway Station" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="pickupDate">Pickup Date</Label>
          <Input id="pickupDate" name="pickupDate" type="date" required min={today} value={formData.pickupDate} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dropoffDate">Drop-off Date</Label>
          <Input id="dropoffDate" name="dropoffDate" type="date" required min={formData.pickupDate || today} value={formData.dropoffDate} onChange={handleChange} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Special Requirements (Optional)</Label>
        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Any specific car model or additional requirements?" rows={4} />
      </div>

      <Button type="submit" className="w-full py-6 text-lg font-bold" disabled={isSubmitting}>
        {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</> : "Request Vehicle Quote"}
      </Button>
    </form>
  );
}
