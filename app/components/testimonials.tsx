'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const testimonials = [
  { name: 'John Doe', text: 'Amazing experience! Will definitely book again.', avatar: 'JD' },
  { name: 'Jane Smith', text: 'The trip exceeded all my expectations!', avatar: 'JS' },
  { name: 'Mike Johnson', text: 'Professional service and unforgettable memories.', avatar: 'MJ' },
  { name: 'Emily Brown', text: 'TravelEase made planning my vacation so easy!', avatar: 'EB' },
  { name: 'David Lee', text: 'Incredible destinations and top-notch customer service.', avatar: 'DL' },
]

export default function Testimonials() {
  const [visibleTestimonials, setVisibleTestimonials] = useState(3)

  const loadMore = () => {
    setVisibleTestimonials(prevVisible => Math.min(prevVisible + 3, testimonials.length))
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Travelers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, visibleTestimonials).map((testimonial) => (
            <Card key={testimonial.name} className="bg-gray-50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{testimonial.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 italic">&ldquo;{testimonial.text}&rdquo;</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {visibleTestimonials < testimonials.length && (
          <div className="mt-12 text-center">
            <Button onClick={loadMore} variant="outline">Load More</Button>
          </div>
        )}
      </div>
    </section>
  )
}

