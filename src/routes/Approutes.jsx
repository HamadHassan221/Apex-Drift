import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home     from '../pages/Home'
import Booking  from '../pages/Booking'
import Checkout from '../pages/Checkout'

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function AppRoutes({ booking, setBooking }) {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/booking"  element={<Booking  booking={booking}  setBooking={setBooking} />} />
        <Route path="/checkout" element={<Checkout booking={booking} />} />
      </Routes>
    </>
  )
}