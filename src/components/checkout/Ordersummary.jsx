import { calcLapFee, calcTotal } from '../../data/mockData'

export default function OrderSummary({ booking, plan }) {
  // If coming from membership selection, show plan summary
  if (plan) {
    return (
      <div className="glass-card border border-white/10 rounded-2xl p-7 backdrop-blur-xl">
        <p className="font-orbitron text-xs tracking-widest text-primary mb-6">📋 ORDER SUMMARY</p>

        {/* Plan badge */}
        <div className="bg-primary/8 border border-primary/30 rounded-xl p-5 mb-6 text-center">
          <p className="font-orbitron text-[10px] tracking-[0.3em] text-primary mb-2">MEMBERSHIP PLAN</p>
          <h3 className="font-orbitron text-2xl font-bold mb-1">{plan.name}</h3>
          <p className="font-orbitron text-4xl font-black text-primary mt-3">
            {plan.price.toLocaleString()}
            <span className="text-sm text-muted font-normal ml-1">EGP/mo</span>
          </p>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-6">
          {plan.features.map(f => (
            <li key={f} className="flex items-center gap-3 text-muted text-sm border-b border-white/6 pb-2.5">
              <span className="text-primary text-xs flex-shrink-0">▸</span>{f}
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center pt-4 border-t border-primary/30">
          <span className="font-orbitron text-xs tracking-widest">TOTAL / MONTH</span>
          <span className="font-orbitron text-3xl font-bold text-primary">{plan.price.toLocaleString()} EGP</span>
        </div>
      </div>
    )
  }

  // Regular booking summary
  const lapFee = calcLapFee(booking.laps)
  const total  = calcTotal(booking)

  return (
    <div className="glass-card border border-white/10 rounded-2xl p-7 backdrop-blur-xl">
      <p className="font-orbitron text-xs tracking-widest text-primary mb-6">📋 ORDER SUMMARY</p>
      <img
        src="https://images.unsplash.com/photo-1541348263662-e068662d82af?w=600&q=80"
        alt="Track"
        className="w-full h-36 object-cover rounded-xl mb-6 border border-white/8"
      />
      {[
        ['Vehicle',   booking.carName],
        ['Track',     booking.trackName],
        ['Laps',      `${booking.laps} laps`],
        ['Date',      booking.date || 'TBD'],
        ['Time',      booking.time],
        ['Base',      `${booking.carPrice} EGP`],
        ['Laps Fee',  `${lapFee} EGP`],
        ...(booking.helmetCam ? [['Helmet Cam', '150 EGP']] : []),
      ].map(([label, value]) => (
        <div key={label} className="flex justify-between py-2.5 border-b border-white/6 text-sm last:border-0">
          <span className="text-muted">{label}</span>
          <span>{value}</span>
        </div>
      ))}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-primary/30">
        <span className="font-orbitron text-xs tracking-widest">TOTAL</span>
        <span className="font-orbitron text-3xl font-bold text-primary">{total} EGP</span>
      </div>
    </div>
  )
}