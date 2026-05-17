import { calcTotal } from '../../data/mockData'

export default function ProgressUpsell({ booking }) {
  const total = calcTotal(booking)
  const pct  = Math.min(100, Math.round((total / 460) * 100))
  const left = Math.max(0, 460 - total)

  return (
    <div className="bg-primary/6 border border-primary/20 rounded-xl p-4">
      <p className="text-muted text-xs mb-2">
        {left > 0 ? `Add ${left} EGP more to unlock VIP Lounge Access` : '🎉 VIP Lounge Unlocked!'}
      </p>
      <div className="h-1 bg-white/8 rounded overflow-hidden mb-2">
        <div className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 rounded"
          style={{ width: `${pct}%` }} />
      </div>
      <p className="font-orbitron text-[10px] text-primary">{pct}% of the way there!</p>
    </div>
  )
}