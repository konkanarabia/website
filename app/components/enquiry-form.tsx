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
import { format, addDays, isBefore, parse, isValid } from "date-fns";
import { Loader2, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";

export default function EnquiryForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    console.log("isSubmitting status:", isSubmitting);
  }, [isSubmitting]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredContact: "email", // Default preferred contact method
    travelType: "",
    destination: "",
    departureDate: "", // String format YYYY-MM-DD
    returnDate: "", // String format YYYY-MM-DD
    travelers: 2, // Default number of travelers
    budgetMin: 10000, // Default minimum budget in INR
    budgetMax: 200000, // Default maximum budget in INR
    budgetCurrency: "INR", // Default currency for budget
    message: "",
    subscribe: false, // Newsletter subscription
  });
  // Helper function to parse date strings to Date objects
  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    const parsedDate = parse(dateString, "yyyy-MM-dd", new Date());
    return isValid(parsedDate) ? parsedDate : null;
  };

  // Update return date if departure date is after return date
  useEffect(() => {
    const departureDate = parseDate(formData.departureDate);
    const returnDate = parseDate(formData.returnDate);

    if (departureDate && returnDate) {
      if (isBefore(returnDate, departureDate)) {
        const nextDay = addDays(departureDate, 1);
        setFormData((prev) => ({
          ...prev,
          returnDate: format(nextDay, "yyyy-MM-dd"),
        }));
      }
    }
  }, [formData.departureDate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user types
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

    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;

    setFormData((prevState) => ({
      ...prevState,
      [name]: numValue,
    }));

    // Ensure minimum budget is not greater than maximum
    if (name === "budgetMin" && numValue > formData.budgetMax) {
      setFormData((prev) => ({ ...prev, budgetMax: numValue }));
    }

    // Ensure maximum budget is not less than minimum
    if (name === "budgetMax" && numValue < formData.budgetMin) {
      setFormData((prev) => ({ ...prev, budgetMin: numValue }));
    }
  };
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate required fields
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.travelType)
      newErrors.travelType = "Please select a travel type";
    if (!formData.destination.trim())
      newErrors.destination = "Destination is required";

    // Date validation
    if (formData.departureDate) {
      const departureDate = parseDate(formData.departureDate);
      if (!departureDate) {
        newErrors.departureDate = "Please enter a valid date (YYYY-MM-DD)";
      } else if (isBefore(departureDate, new Date())) {
        newErrors.departureDate = "Departure date must be in the future";
      }
    }

    if (formData.returnDate) {
      const returnDate = parseDate(formData.returnDate);
      if (!returnDate) {
        newErrors.returnDate = "Please enter a valid date (YYYY-MM-DD)";
      } else if (formData.departureDate) {
        const departureDate = parseDate(formData.departureDate);
        if (departureDate && isBefore(returnDate, departureDate)) {
          newErrors.returnDate = "Return date must be after departure date";
        }
      }
    }

    // Budget validation
    if (formData.budgetMin <= 0) {
      newErrors.budgetMin = "Minimum budget must be greater than 0";
    }
    if (formData.budgetMax <= 0) {
      newErrors.budgetMax = "Maximum budget must be greater than 0";
    }
    if (formData.budgetMin > formData.budgetMax) {
      newErrors.budgetMin = "Minimum budget cannot exceed maximum budget";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "There are some issues with your form submission.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Make an API call to the enquiry endpoint
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("API Error:", responseData);
        throw new Error(responseData.error || "Failed to submit enquiry");
      }
      toast({
        title: "Enquiry Submitted!",
        description: "Thank you for your enquiry. We'll be in touch soon.",
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        preferredContact: "email",
        travelType: "",
        destination: "",
        departureDate: "",
        returnDate: "",
        travelers: 2,
        budgetMin: 10000,
        budgetMax: 200000,
        budgetCurrency: "INR",
        message: "",
        subscribe: false,
      });

      // Redirect user to thank you page
      router.push("/thank-you");
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description:
          "There was an error submitting your enquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  // JSX form implementation
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="w-full max-w-4xl mx-auto p-6 bg-card rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Travel Enquiry Form
        </h2>

        {/* Personal Information */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold">Personal Information</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={cn(errors.name && "border-destructive")}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className={cn(errors.email && "border-destructive")}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              className={cn(errors.phone && "border-destructive")}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="text-sm text-destructive mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <Label className="mb-2 block">Preferred Contact Method</Label>
            <RadioGroup
              value={formData.preferredContact}
              onValueChange={handleSelectChange("preferredContact")}
              className="flex gap-4"
              disabled={isSubmitting}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="contact-email" />
                <Label htmlFor="contact-email">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="contact-phone" />
                <Label htmlFor="contact-phone">Phone</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="whatsapp" id="contact-whatsapp" />
                <Label htmlFor="contact-whatsapp">WhatsApp</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Trip Details */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold">Trip Details</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="travelType">Type of Travel *</Label>
              <Select
                value={formData.travelType}
                onValueChange={handleSelectChange("travelType")}
                disabled={isSubmitting}
              >
                <SelectTrigger
                  className={cn(errors.travelType && "border-destructive")}
                >
                  <SelectValue placeholder="Select travel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leisure">Leisure / Holiday</SelectItem>
                  <SelectItem value="family">Family Vacation</SelectItem>
                  <SelectItem value="honeymoon">Honeymoon</SelectItem>
                  <SelectItem value="religious">Religious Tour</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                  <SelectItem value="medical">Medical Tourism</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.travelType && (
                <p className="text-sm text-destructive mt-1">
                  {errors.travelType}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="destination">Destination *</Label>
              <Input
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Where do you want to go?"
                className={cn(errors.destination && "border-destructive")}
                disabled={isSubmitting}
              />
              {errors.destination && (
                <p className="text-sm text-destructive mt-1">
                  {errors.destination}
                </p>
              )}
            </div>
          </div>{" "}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="departureDate">Departure Date</Label>
              <div className="relative">
                <Input
                  id="departureDate"
                  name="departureDate"
                  type="date"
                  value={formData.departureDate}
                  onChange={handleChange}
                  min={format(new Date(), "yyyy-MM-dd")}
                  className={cn(
                    errors.departureDate && "border-destructive",
                    "appearance-none pr-10 focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2",
                    "[&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:h-5",
                    "[&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:hover:cursor-pointer",
                    "[&::-webkit-calendar-picker-indicator]:hover:text-primary [&::-webkit-calendar-picker-indicator]:text-muted-foreground"
                  )}
                  disabled={isSubmitting}
                />
              </div>
              {errors.departureDate && (
                <p className="text-sm text-destructive mt-1">
                  {errors.departureDate}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="returnDate">Return Date</Label>
              <div className="relative">
                <Input
                  id="returnDate"
                  name="returnDate"
                  type="date"
                  value={formData.returnDate}
                  onChange={handleChange}
                  min={
                    formData.departureDate
                      ? format(
                          addDays(
                            parseDate(formData.departureDate) || new Date(),
                            1
                          ),
                          "yyyy-MM-dd"
                        )
                      : format(new Date(), "yyyy-MM-dd")
                  }
                  className={cn(
                    errors.returnDate && "border-destructive",
                    "appearance-none pr-10 focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2",
                    "[&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:h-5",
                    "[&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:hover:cursor-pointer",
                    "[&::-webkit-calendar-picker-indicator]:hover:text-primary [&::-webkit-calendar-picker-indicator]:text-muted-foreground"
                  )}
                  disabled={isSubmitting || !formData.departureDate}
                />
              </div>
              {errors.returnDate && (
                <p className="text-sm text-destructive mt-1">
                  {errors.returnDate}
                </p>
              )}
              {!formData.departureDate && (
                <p className="text-xs text-muted-foreground mt-1">
                  <Info className="inline-block h-3 w-3 mr-1" />
                  Please select a departure date first
                </p>
              )}
            </div>
          </div>
          <div>
            <Label>Number of Travelers</Label>
            <Select
              value={
                formData.travelers === 11
                  ? "morethan10"
                  : formData.travelers.toString()
              }
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  travelers: value === "morethan10" ? 11 : parseInt(value),
                }))
              }
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select number of travelers" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Person" : "People"}
                  </SelectItem>
                ))}
                <SelectItem value="morethan10">More than 10</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <Label>Budget Range</Label>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label
                  htmlFor="budgetMin"
                  className="text-sm text-muted-foreground"
                >
                  Minimum Budget
                </Label>
                <Input
                  id="budgetMin"
                  name="budgetMin"
                  type="number"
                  min={5000}
                  step={1000}
                  value={formData.budgetMin}
                  onChange={handleBudgetChange}
                  className={cn(errors.budgetMin && "border-destructive")}
                  disabled={isSubmitting}
                />
                {errors.budgetMin && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.budgetMin}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="budgetMax"
                  className="text-sm text-muted-foreground"
                >
                  Maximum Budget
                </Label>
                <Input
                  id="budgetMax"
                  name="budgetMax"
                  type="number"
                  min={formData.budgetMin}
                  step={1000}
                  value={formData.budgetMax}
                  onChange={handleBudgetChange}
                  className={cn(errors.budgetMax && "border-destructive")}
                  disabled={isSubmitting}
                />
                {errors.budgetMax && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.budgetMax}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 mb-4">
              <div>
                <Label htmlFor="budgetCurrency">Budget Currency</Label>
                <Select
                  value={formData.budgetCurrency}
                  onValueChange={handleSelectChange("budgetCurrency")}
                  disabled={isSubmitting}
                >
                  <SelectTrigger id="budgetCurrency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="GBP">British Pound (£)</SelectItem>
                    <SelectItem value="AED">UAE Dirham (د.إ)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <Badge variant="outline" className="text-xs">
                Min:{" "}
                <Price
                  amount={formData.budgetMin}
                  sourceCurrency={formData.budgetCurrency || "USD"}
                  showConversion={true}
                  showOriginal={false}
                />
              </Badge>
              <Badge variant="outline" className="text-xs">
                Max:{" "}
                <Price
                  amount={formData.budgetMax}
                  sourceCurrency={formData.budgetCurrency || "USD"}
                  showConversion={true}
                  showOriginal={false}
                />
              </Badge>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold">Additional Information</h3>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us more about your travel plans, preferences, or any special requirements..."
              className="min-h-[120px]"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Enquiry"
          )}
        </Button>
      </div>
    </form>
  );
}
