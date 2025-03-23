import EventList from '../components/event-list'

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Upcoming Travel Events</h1>
      <div className="mb-8 text-center">
        <p className="text-lg mb-4">Join us for exciting travel events and workshops!</p>
      </div>
      <EventList />
    </div>
  )
}

