'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, addDays, isBefore, parse } from "date-fns"
import { CalendarIcon, Loader2, Info } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export default function EnquiryForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredContact: 'email', // Default preferred contact method
    travelType: '',
    destination: '',
    departureDate: null as Date | null,
    returnDate: null as Date | null,
    travelers: 2, // Default number of travelers
    budget: [10000, 200000], // Default budget range [min, max] in INR
    message: '',
    subscribe: false // Newsletter subscription
  })

  // Update return date if departure date is after return date
  useEffect(() => {
    if (formData.departureDate && formData.returnDate) {
      if (isBefore(formData.returnDate, formData.departureDate)) {
        setFormData(prev => ({
          ...prev,
          returnDate: addDays(formData.departureDate!, 1)
        }))
      }
    }
  }, [formData.departureDate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData(prevState => ({ 
      ...prevState, 
      [name]: type === 'checkbox' ? checked : value 
    }))
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev}
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prevState => ({ ...prevState, [name]: value }))
    
    // Clear error when user selects
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev}
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleDateChange = (name: string) => (date: Date | undefined) => {
    setFormData(prevState => ({ ...prevState, [name]: date || null }))
    
    // Clear error when user selects a date
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev}
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleBudgetChange = (value: number[]) => {
    setFormData(prevState => ({ ...prevState, budget: value }))
  }
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[0-9+\s-()]{8,20}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }
    
    // Travel type validation
    if (!formData.travelType) {
      newErrors.travelType = "Please select a travel type"
    }
    
    // Destination validation
    if (!formData.destination.trim()) {
      newErrors.destination = "Destination is required"
    }
    
    // Date validations
    if (!formData.departureDate) {
      newErrors.departureDate = "Departure date is required"
    }
    
    if (!formData.returnDate) {
      newErrors.returnDate = "Return date is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      toast({
        title: "Form Validation Failed",
        description: "Please check the form and fix the errors",
        variant: "destructive",
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Format dates for API submission
      const formattedData = {
        ...formData,
        departureDate: formData.departureDate ? format(formData.departureDate, 'yyyy-MM-dd') : null,
        returnDate: formData.returnDate ? format(formData.returnDate, 'yyyy-MM-dd') : null,
        budget: `₹${formData.budget[0].toLocaleString('en-IN')} - ₹${formData.budget[1].toLocaleString('en-IN')}`
      }
      
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit enquiry')
      }
      
      const data = await response.json()
      
      toast({
        title: "Enquiry Submitted Successfully",
        description: "Your travel enquiry has been received. We'll contact you soon!",
        variant: "default",
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredContact: 'email',
        travelType: '',
        destination: '',
        departureDate: null,
        returnDate: null,
        travelers: 2,
        budget: [50000, 200000], // Reset to default INR values
        message: '',
        subscribe: false
      })
      
      // Redirect to thank you page
      router.push('/thank-you')
    } catch (error) {
      console.error('Error submitting enquiry:', error)
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Unable to submit your enquiry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={cn("w-full", errors.name && "border-red-500")}
            disabled={isSubmitting}
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={cn("w-full", errors.email && "border-red-500")}
            disabled={isSubmitting}
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={cn("w-full", errors.phone && "border-red-500")}
            disabled={isSubmitting}
          />
          {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Contact Method
          </label>
          <RadioGroup 
            value={formData.preferredContact} 
            onValueChange={(value) => handleSelectChange('preferredContact')(value)}
            className="flex space-x-4"
            disabled={isSubmitting}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email-contact" />
              <Label htmlFor="email-contact">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="phone" id="phone-contact" />
              <Label htmlFor="phone-contact">Phone</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="whatsapp" id="whatsapp-contact" />
              <Label htmlFor="whatsapp-contact">WhatsApp</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <label htmlFor="travelType" className="block text-sm font-medium text-gray-700 mb-1">
            Travel Type <span className="text-red-500">*</span>
          </label>
          <Select 
            onValueChange={handleSelectChange('travelType')} 
            value={formData.travelType}
            disabled={isSubmitting}
          >
            <SelectTrigger className={cn("w-full", errors.travelType && "border-red-500")}>
              <SelectValue placeholder="Select travel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="solo">Solo</SelectItem>
              <SelectItem value="couple">Couple</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="group">Group</SelectItem>
              <SelectItem value="honeymoon">Honeymoon</SelectItem>
              <SelectItem value="adventure">Adventure</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.travelType && <p className="text-sm text-red-500 mt-1">{errors.travelType}</p>}
        </div>
        
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
            Destination <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
            className={cn("w-full", errors.destination && "border-red-500")}
            disabled={isSubmitting}
          />
          {errors.destination && <p className="text-sm text-red-500 mt-1">{errors.destination}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Travelers
          </label>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setFormData(prev => ({ ...prev, travelers: Math.max(1, prev.travelers - 1) }))}
              disabled={isSubmitting || formData.travelers <= 1}
              className="h-8 w-8"
            >
              -
            </Button>
            <span className="px-3 py-1 border rounded-md min-w-[50px] text-center">
              {formData.travelers}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setFormData(prev => ({ ...prev, travelers: prev.travelers + 1 }))}
              disabled={isSubmitting}
              className="h-8 w-8"
            >
              +
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-1">
              Departure Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
              type="date"
              id="departureDate"
              name="departureDate"
              value={formData.departureDate ? format(formData.departureDate, "yyyy-MM-dd") : ""}
              onChange={(e) => {
                const date = e.target.value ? new Date(e.target.value) : null;
                handleDateChange('departureDate')(date || undefined);
              }}
              min={format(new Date(), "yyyy-MM-dd")}
              className={cn(
                "w-full pr-10 appearance-none", 
                errors.departureDate && "border-red-500",
                "[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              )}
              disabled={isSubmitting}
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            {errors.departureDate && <p className="text-sm text-red-500 mt-1">{errors.departureDate}</p>}
            </div>
            
            <div>
            <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-1">
              Return Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate ? format(formData.returnDate, "yyyy-MM-dd") : ""}
              onChange={(e) => {
                const date = e.target.value ? new Date(e.target.value) : null;
                handleDateChange('returnDate')(date || undefined);
              }}
              min={formData.departureDate ? format(formData.departureDate, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd")}
              className={cn(
                "w-full pr-10 appearance-none", 
                errors.returnDate && "border-red-500",
                "[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              )}
              disabled={isSubmitting || !formData.departureDate}
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            {errors.returnDate && <p className="text-sm text-red-500 mt-1">{errors.returnDate}</p>}
            {!formData.departureDate && !errors.returnDate && (
              <p className="text-sm text-amber-600 mt-1">Please select departure date first</p>
            )}
            </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Budget Range (INR)
          </label>
          <div className="px-2">
            <Slider
              value={formData.budget}
              min={1000}
              max={500000}
              step={5000}
              onValueChange={handleBudgetChange}
              disabled={isSubmitting}
            />
          </div>
          <div className="flex justify-between mt-2">
            <Badge variant="outline">₹{formData.budget[0].toLocaleString('en-IN')}</Badge>
            <Badge variant="outline">₹{formData.budget[1].toLocaleString('en-IN')}</Badge>
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Information
          </label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full"
            placeholder="Tell us more about your trip preferences, special requirements, or any questions you have."
            disabled={isSubmitting}
          />
        </div>
        
        {/* <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="subscribe"
            name="subscribe"
            checked={formData.subscribe}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            disabled={isSubmitting}
          />
          <label htmlFor="subscribe" className="text-sm text-gray-600">
            Subscribe to our newsletter for travel deals and updates
          </label>
        </div> */}
      </div>
      
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-700 text-sm">
          We respect your privacy. Your information will only be used to process your travel enquiry.
        </AlertDescription>
      </Alert>
      
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Enquiry'
        )}
      </Button>
      
      <p className="text-xs text-gray-500 text-center">
        Fields marked with <span className="text-red-500">*</span> are required
      </p>
    </form>
  )
}