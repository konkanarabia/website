import HotelList from '../components/hotel-list'

export default function HotelsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Partner Hotels</h1>
      <div className="mb-8 text-center">
        <p className="text-lg mb-4">Discover comfortable and luxurious accommodations for your next trip</p>
      </div>
      <HotelList />
    </div>
  )
}

