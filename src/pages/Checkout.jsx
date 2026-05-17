import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import PaymentCard  from '../components/checkout/PaymentCard'
import OrderSummary from '../components/checkout/OrderSummary'
import SuccessModal from '../components/checkout/SuccessModal'

export default function Checkout({ booking }) {
  const [success, setSuccess] = useState(false)
  const location = useLocation()

  // Plan can come from membership selection or regular booking
  const plan = location.state?.plan || null

  return (
    <main className="pt-24">
      <div className="text-center py-14 px-6 bg-[radial-gradient(ellipse_at_top,rgba(255,43,43,0.06),transparent_70%)]">
        <p className="font-orbitron text-[10px] tracking-[0.3em] text-primary uppercase mb-3">Final Step</p>
        <h1 className="font-orbitron text-4xl md:text-5xl font-black">
          SECURE <span className="glow-text">CHECKOUT</span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-8">
        <PaymentCard booking={booking} plan={plan} onSuccess={() => setSuccess(true)} />
        <div className="lg:sticky lg:top-24 h-fit">
          <OrderSummary booking={booking} plan={plan} />
        </div>
      </div>

      <SuccessModal show={success} onClose={() => setSuccess(false)} />
    </main>
  )
}