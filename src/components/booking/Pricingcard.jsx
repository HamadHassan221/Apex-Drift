import { useNavigate } from 'react-router-dom'
import { calcLapFee, calcTotal } from '../../data/mockData'

export default function PricingCard({ booking, setBooking }) {
  const navigate = useNavigate()
  const lapFee = calcLapFee(booking.laps)
  const total  = calcTotal(booking)
  const vipPct = Math.min(100, Math.round((total / 460) * 100))
  const vipLeft = Math.max(0, 460 - total)

  const rows = [
    ['Vehicle',    booking.carName],
    ['Track',      booking.trackName],
    ['Date',       booking.date || 'Select Date'],
    ['Time',       booking.time],
    ['Laps',       `${booking.laps} laps`],
    ['Base Price', `${booking.carPrice} EGP`],
    ['Laps Fee',   `${lapFee} EGP`],
    ...(booking.helmetCam ? [['Helmet Cam', '150 EGP']] : []),
  ]

  return (
    <div className="glass-card border border-white/10 rounded-2xl p-7 backdrop-blur-xl">
      <p className="font-orbitron text-xs tracking-widest text-primary mb-6">⚡ YOUR ORDER</p>

      {rows.map(([label, value]) => (
        <div key={label} className="flex justify-between items-center py-2.5 border-b border-white/6 text-sm last:border-0">
          <span className="text-muted">{label}</span>
          <span>{value}</span>
        </div>
      ))}

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-primary/30">
        <span className="font-orbitron text-xs tracking-widest">TOTAL</span>
        <span className="font-orbitron text-2xl font-bold text-primary">{total} EGP</span>
      </div>

      <button onClick={() => navigate('/checkout')}
        className="w-full mt-5 py-4 bg-gradient-to-r from-primary to-secondary text-white font-orbitron text-sm tracking-widest rounded-lg hover:shadow-[0_10px_40px_rgba(255,43,43,0.4)] hover:scale-[1.01] transition-all duration-300 animate-glow-pulse">
        PROCEED TO CHECKOUT →
      </button>

      {/* VIP Progress */}
      <div className="bg-primary/6 border border-primary/20 rounded-xl p-4 mt-4">
        <p className="text-muted text-xs mb-2">
          {vipLeft > 0 ? `Add ${vipLeft} EGP more to unlock VIP Lounge` : '🎉 VIP Lounge Unlocked!'}
        </p>
        <div className="h-1 bg-white/8 rounded overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-secondary rounded transition-all duration-500"
            style={{ width: `${vipPct}%` }} />
        </div>
      </div>

      {/* Helmet Cam upsell */}
      {!booking.helmetCam && (
        <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 mt-3">
          <p className="text-secondary text-xs font-semibold mb-1">🎥 Most Racers Add This</p>
          <p className="text-muted text-xs mb-3">Helmet Cam Recording — relive every corner from your POV</p>
          <button onClick={() => setBooking(b => ({ ...b, helmetCam: true }))}
            className="w-full py-2 bg-secondary/20 border border-secondary/50 text-secondary font-orbitron text-[10px] tracking-widest rounded-lg hover:bg-secondary/35 transition-all">
            ADD HELMET CAM +150 EGP
          </button>
        </div>
      )}
    </div>
  )
}