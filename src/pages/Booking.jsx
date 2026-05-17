import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BookingForm from '../components/booking/BookingForm'
import PricingCard  from '../components/booking/PricingCard'
import UpsellPopup  from '../components/booking/UpsellPopup'

export default function Booking({ booking, setBooking }) {
  const location = useLocation()

  // If navigated from a track card, pre-select that track
  useEffect(() => {
    if (location.state?.trackId) {
      setBooking(b => ({
        ...b,
        trackId:   location.state.trackId,
        trackName: location.state.trackName,
      }))
    }
  }, [location.state, setBooking])

  return (
    <main className="pt-24">
      <div className="text-center py-14 px-6 bg-[radial-gradient(ellipse_at_top,rgba(255,43,43,0.06),transparent_70%)]">
        <p className="font-orbitron text-[10px] tracking-[0.3em] text-primary uppercase mb-3">
          Step Into the Arena
        </p>
        <h1 className="font-orbitron text-4xl md:text-5xl font-black mb-3">
          BOOK YOUR <span className="glow-text">SESSION</span>
        </h1>
        <p className="text-muted max-w-sm mx-auto text-sm">
          Select your track, car, and time. We'll handle the rest.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        <BookingForm booking={booking} setBooking={setBooking} />
        <div className="lg:sticky lg:top-24 h-fit">
          <PricingCard booking={booking} setBooking={setBooking} />
        </div>
      </div>

      <UpsellPopup booking={booking} setBooking={setBooking} />
    </main>
  )
}