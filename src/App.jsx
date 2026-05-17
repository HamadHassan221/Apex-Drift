import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import SplashScreen from './components/layout/SplashScreen'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LiveNotification from './components/layout/LiveNotification'
import FloatingActionButton from './components/ui/FloatingActionButton'
import { defaultBooking } from './data/mockData'

export default function App() {
  const [splashDone, setSplashDone] = useState(false)
  const [booking, setBooking] = useState(defaultBooking)

  useEffect(() => {
    const t = setTimeout(() => setSplashDone(true), 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <BrowserRouter>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      {splashDone && (
        <>
          <Navbar />
          <LiveNotification />
          <FloatingActionButton />
          <AppRoutes booking={booking} setBooking={setBooking} />
          <Footer />
        </>
      )}
    </BrowserRouter>
  )
}