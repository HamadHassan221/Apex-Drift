import { motion } from 'framer-motion'
import { tracks, timeSlots } from '../../data/mockData'
import CarSelector, { StepLabel } from './CarSelector'

const trackIcons = { inferno: '🔥', neon: '💜', thunder: '⚡', driftx: '🌀' }

export default function BookingForm({ booking, setBooking }) {
  const updateLaps = (delta) =>
    setBooking(b => ({ ...b, laps: Math.max(5, Math.min(50, b.laps + delta)) }))

  return (
    <div className="glass-card border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-xl">

      {/* Step 1 */}
      <CarSelector booking={booking} setBooking={setBooking} />

      {/* Step 2 */}
      <div className="mb-10">
        <StepLabel num={2} label="Select Your Track" />
        <div className="grid grid-cols-2 gap-3">
          {tracks.map(track => (
            <motion.div key={track.id} whileHover={{ scale: 1.02 }}
              onClick={() => setBooking(b => ({ ...b, trackId: track.id, trackName: track.name }))}
              className={`border rounded-xl p-4 cursor-pointer flex items-center gap-3 transition-all duration-300
                ${booking.trackId === track.id ? 'border-primary bg-primary/8' : 'border-white/8 hover:border-primary/40'}`}
            >
              <span className="text-2xl">{trackIcons[track.id]}</span>
              <div>
                <p className="text-sm font-medium">{track.name}</p>
                <p className="text-muted text-xs">{track.difficulty} · {track.length}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Step 3 */}
      <div className="mb-10">
        <StepLabel num={3} label="Pick Date & Time" />
        <input type="date" value={booking.date}
          onChange={e => setBooking(b => ({ ...b, date: e.target.value }))}
          className="w-full mb-4 bg-white/5 border border-white/12 text-white px-4 py-3 rounded-lg text-sm outline-none focus:border-primary transition-colors [color-scheme:dark]"
        />
        <div className="grid grid-cols-4 gap-2.5">
          {timeSlots.map(slot => (
            <motion.button key={slot.time} whileTap={!slot.taken ? { scale: 0.95 } : undefined}
              disabled={slot.taken}
              onClick={() => !slot.taken && setBooking(b => ({ ...b, time: slot.time }))}
              className={`py-2.5 rounded-lg text-sm border transition-all duration-300
                ${slot.taken ? 'opacity-30 cursor-not-allowed line-through border-white/8'
                  : booking.time === slot.time ? 'border-primary bg-primary/10 text-primary'
                  : 'border-white/8 bg-white/4 hover:border-primary/50'}`}
            >
              {slot.time}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Step 4 */}
      <div>
        <StepLabel num={4} label="Number of Laps" />
        <div className="flex items-center gap-5">
          <button onClick={() => updateLaps(-5)}
            className="w-11 h-11 bg-white/5 border border-white/15 rounded-lg text-white text-xl hover:border-primary hover:bg-primary/10 transition-all flex items-center justify-center">−</button>
          <div className="text-center">
            <p className="font-orbitron text-4xl font-bold">{booking.laps}</p>
            <p className="text-muted text-xs">laps</p>
          </div>
          <button onClick={() => updateLaps(5)}
            className="w-11 h-11 bg-white/5 border border-white/15 rounded-lg text-white text-xl hover:border-primary hover:bg-primary/10 transition-all flex items-center justify-center">+</button>
          <p className="text-muted text-xs leading-relaxed">Min: 5 laps<br />+30 EGP per 5 laps</p>
        </div>
      </div>

    </div>
  )
}