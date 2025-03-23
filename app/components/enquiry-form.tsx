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
import { CalendarIcon } from 'lucide-react'
import { cn } from "@/lib/utils"

export default function EnquiryForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelType: '',
    destination: '',
    departureDate: null,
    returnDate: null,
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
    setFormData(prevState => ({ ...prevState, [name]: date }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    router.push('/thank-you')
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
          />
        </div>
        <div>
          <label htmlFor="travelType" className="block text-sm font-medium text-gray-700 mb-1">Travel Type</label>
          <Select onValueChange={handleSelectChange('travelType')}>
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
          />
        </div>
      </div>
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg shadow-md">Submit Enquiry</Button>
    </form>
  )
}

