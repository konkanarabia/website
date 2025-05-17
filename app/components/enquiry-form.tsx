'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

export default function EnquiryForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelType: '',
    destination: '',
    departureDate: null as Date | null,
    returnDate: null as Date | null,
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleDateChange = (name: string) => (date: Date | undefined) => {
    setFormData(prevState => ({ ...prevState, [name]: date || null }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Format dates for API submission
      const formattedData = {
        ...formData,
        departureDate: formData.departureDate ? format(formData.departureDate, 'yyyy-MM-dd') : null,
        returnDate: formData.returnDate ? format(formData.returnDate, 'yyyy-MM-dd') : null,
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
        title: "Enquiry Submitted",
        description: "Your travel enquiry has been received. We'll contact you soon!",
        variant: "default",
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        travelType: '',
        destination: '',
        departureDate: null,
        returnDate: null,
        message: ''
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
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="travelType" className="block text-sm font-medium text-gray-700 mb-1">Travel Type</label>
          <Select 
            onValueChange={handleSelectChange('travelType')} 
            value={formData.travelType}
            disabled={isSubmitting}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select travel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="leisure">Leisure</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="adventure">Adventure</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
          <Input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
            className="w-full"
            disabled={isSubmitting}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.departureDate && "text-muted-foreground"
                  )}
                  disabled={isSubmitting}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.departureDate ? format(formData.departureDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.departureDate}
                  onSelect={handleDateChange('departureDate')}
                  initialFocus
                  disabled={isSubmitting}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.returnDate && "text-muted-foreground"
                  )}
                  disabled={isSubmitting}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.returnDate ? format(formData.returnDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.returnDate}
                  onSelect={handleDateChange('returnDate')}
                  initialFocus
                  disabled={isSubmitting}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full"
            disabled={isSubmitting}
          />
        </div>
      </div>
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
    </form>
  )
}

