'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Clock, MapPin } from 'lucide-react'

const events = [
  {
    id: 1,
    title: "European Capitals Tour",
    description: "Explore the historic capitals of Europe",
    date: "2026-08-15",
    time: "09:00 AM",
    location: "Paris, France",
    details: "Join us on an unforgettable journey through the heart of Europe. Visit iconic landmarks, taste local cuisines, and immerse yourself in rich cultures. This 14-day tour covers Paris, Berlin, Prague, and Rome."
  },
  {
    id: 2,
    title: "Asian Cuisine Workshop",
    description: "Learn to cook authentic Asian dishes",
    date: "2023-09-05",
    time: "02:00 PM",
    location: "Tokyo, Japan",
    details: "Discover the secrets of Asian cuisine in this hands-on workshop. Learn to prepare sushi, dim sum, and Thai curries from expert chefs. All ingredients and tools provided."
  },
  {
    id: 3,
    title: "African Safari Adventure",
    description: "Wildlife expedition in the Serengeti",
    date: "2026-10-10",
    time: "06:00 AM",
    location: "Serengeti National Park, Tanzania",
    details: "Experience the thrill of an African safari in the world-famous Serengeti. Witness the great migration, spot the Big Five, and enjoy luxury camping under the stars. Expert guides and photographers included."
  }
]

type EventItem = (typeof events)[number]

export default function EventList() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>{event.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-2">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center mb-2">
              <Clock className="mr-2 h-4 w-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" onClick={() => setSelectedEvent(event)}>View Details</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{selectedEvent?.title}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <p className="mb-4">{selectedEvent?.details}</p>
                  <div className="flex items-center mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{selectedEvent?.date}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{selectedEvent?.time}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{selectedEvent?.location}</span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

