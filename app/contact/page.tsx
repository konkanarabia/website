'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import TranslatedText from "@/components/TranslatedText"
import useTranslatedString from "@/hooks/use-translated-string"


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const namePlaceholder = useTranslatedString("Enter your name")
  const emailPlaceholder = useTranslatedString("name@example.com")
  const phonePlaceholder = useTranslatedString("+44 / +971 phone number")
  const messagePlaceholder = useTranslatedString("Tell us about your travel plans...")


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit the form')
      }
      
      toast({
        title: "Message Sent Successfully!",
        description: "One of our travel experts will contact you shortly.",
        variant: "default",
      })
      
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: error instanceof Error ? error.message : "Please try again later or call us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
       {/* Small Hero Header */}
       <section className="bg-slate-100 text-slate-900 py-20 px-4 text-center border-b border-slate-200">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-serif font-black mb-6 tracking-tight text-slate-900">
              <TranslatedText text="Contact Us" />
            </h1>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              <TranslatedText text="Have questions or ready to plan your next adventure? Our global team is here to help you every step of the way." />
            </p>
          </div>
       </section>

      <div className="container mx-auto px-4 lg:px-20 pt-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white text-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900">
                <span className="p-2 bg-amber-50 rounded-lg">🇮🇳</span>
                <TranslatedText text="India Office" />
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-slate-900">KonkanArabia Hospitality & Holiday Mgmt. Pvt. Ltd.</h3>
                    <p className="text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
                      <TranslatedText text="Company Registered & Corporate office:" />
                    </p>
                    <p className="text-slate-700 leading-relaxed text-sm font-medium">
                      <TranslatedText text="Office No:S-144, 2nd Floor, Haware Fantasia Business Park, Sector 30A, Behind Inorbit Mall, Near Railway Station, Vashi, Navi Mumbai 400703" />
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-slate-900">
                      <TranslatedText text="Phone" />
                    </h3>
                    <p className="text-slate-700 font-medium">+91-9370528517</p>
                    <p className="text-slate-700 font-medium">+91-9326380922</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900">
                <span className="p-2 bg-slate-100 rounded-lg">🇦🇪</span>
                <TranslatedText text="Dubai UAE Office" />
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4 text-slate-900">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 text-[#0066a1]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-slate-900">KonkanArabia Tourism LLC</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                      <TranslatedText text="Address:" />
                    </p>
                    <p className="text-slate-600">
                      <TranslatedText text="Binshama 2, Al Barsha 1, Opp. Armada Residence, Dubai, UAE." />
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 text-[#0066a1]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-slate-900">
                      <TranslatedText text="Phone" />
                    </h3>
                    <p className="text-slate-600">+971-555995260</p>
                    <p className="text-slate-600">0557337618</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 text-[#0066a1]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-slate-900">
                      <TranslatedText text="Email" />
                    </h3>
                    <p className="text-slate-600 text-sm break-all">bookings@konkanarabiahospitalitygroup.com</p>
                    <p className="text-slate-600 text-sm break-all pt-1 font-medium">konkanarabiatourism@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100">
              <h2 className="text-3xl font-bold mb-8 text-slate-900">
                <TranslatedText text="Send us a Message" />
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                      <TranslatedText text="Full Name" />
                    </label>
                    <Input
                      name="name"
                      placeholder={namePlaceholder}
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="py-6 rounded-xl border-slate-200 focus:border-[#0066a1] focus:ring-[#0066a1]/20 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                      <TranslatedText text="Email Address" />
                    </label>
                    <Input
                      type="email"
                      name="email"
                      placeholder={emailPlaceholder}
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="py-6 rounded-xl border-slate-200 focus:border-[#0066a1] focus:ring-[#0066a1]/20 transition-all font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                    <TranslatedText text="Phone Number" />
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={phonePlaceholder}
                    disabled={isSubmitting}
                    className="py-6 rounded-xl border-slate-200 focus:border-[#0066a1] focus:ring-[#0066a1]/20 transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                    <TranslatedText text="Message" />
                  </label>
                  <Textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={messagePlaceholder}
                    disabled={isSubmitting}
                    className="rounded-xl border-slate-200 focus:border-[#0066a1] focus:ring-[#0066a1]/20 transition-all font-medium resize-none p-4"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full py-8 text-lg font-bold rounded-xl shadow-lg shadow-amber-500/20 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 transition-all hover:scale-[1.01] active:scale-[0.99]" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      <TranslatedText text="Sending..." />
                    </>
                  ) : (
                    <TranslatedText text="Contact Our Travel Experts" />
                  )}
                </Button>
              </form>
            </div>
          </div>

        </div>

        {/* Map Section */}
        <div className="mt-12">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0066a1]/10 flex items-center justify-center text-[#0066a1]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  <TranslatedText text="Find Our Vashi Office" />
                </h2>
                <p className="text-slate-500 text-sm">
                  <TranslatedText text="Haware Fantasia Business Park, Sector 30A, Vashi, Navi Mumbai – 400703" />
                </p>
              </div>
            </div>
            <div className="w-full h-[420px]">
              <iframe
                title="KonkanArabia Vashi Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1749.5!2d73.0028629!3d19.0660381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1473a43e2dd%3A0xc79fbfcddecb1320!2sKonkanArabia+Hospitality+%26+Holidays+Management+Group%2CMumbai!5e0!3m2!1sen!2sin!4v1715800000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-4 bg-slate-50 flex flex-wrap gap-3 justify-between items-center">
              <p className="text-slate-500 text-sm">
                <TranslatedText text="📍 Near Inorbit Mall, Behind Vashi Railway Station" />
              </p>
              <a
                href="https://www.google.com/maps/place/KonkanArabia+Hospitality+%26+Holidays+Management+Group,Mumbai/@19.0660381,73.0028629,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c1473a43e2dd:0xc79fbfcddecb1320!8m2!3d19.0660381!4d73.0028629!16s%2Fg%2F11z65q1wt9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066a1] text-white text-sm font-semibold rounded-xl hover:bg-[#00558a] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                <TranslatedText text="Open in Google Maps" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

