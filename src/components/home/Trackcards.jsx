import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { X, MapPin, Clock, Zap } from 'lucide-react'
import { tracks } from '../../data/mockData'
import SectionTitle from '../ui/SectionTitle'

const trackDetails = {
  inferno: {
    description: 'Our flagship circuit designed for advanced racers. Featuring 8 high-speed corners, elevation changes, and a breathtaking final chicane that will test every reflex you have.',
    features: ['8 Technical Corners', 'Elevation Changes', 'Night Lighting', 'Timed Laps'],
    bestTime: '1:24.3',
    capacity: '12 karts',
  },
  neon: {
    description: 'The crown jewel of APEX DRIFT — Neon Boulevard comes alive after dark. 12 corners bathed in ultraviolet light create an otherworldly racing experience.',
    features: ['12 Neon-lit Corners', 'Night Sessions Only', 'UV Lighting', 'Live DJ'],
    bestTime: '1:18.7',
    capacity: '8 karts',
  },
  thunder: {
    description: 'Perfect for beginners. Thunder Oval offers a safe, fun environment to learn the fundamentals of karting with professional instructors always on hand.',
    features: ['4 Easy Corners', 'Beginner Friendly', 'Instructor Available', 'All Day Sessions'],
    bestTime: '0:58.1',
    capacity: '16 karts',
  },
  driftx: {
    description: 'A mixed-discipline track that blends circuit racing with dedicated drift zones. Master both styles in one session on our most versatile track.',
    features: ['Drift Zones', 'Mixed Layout', 'All Skill Levels', 'Formula Karts Allowed'],
    bestTime: '1:09.5',
    capacity: '10 karts',
  },
}

const difficultyColor = {
  Beginner: 'text-green-400 border-green-400/40 bg-green-400/10',
  Advanced:  'text-yellow-400 border-yellow-400/40 bg-yellow-400/10',
  Expert:    'text-primary border-primary/40 bg-primary/10',
}

export default function TrackCards() {
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  const handleBook = (track) => {
    setSelected(null)
    window.scrollTo(0, 0)
    navigate('/booking', { state: { trackId: track.id, trackName: track.name } })
  }

  return (
    <section className="px-6 md:px-10 lg:px-16 pb-20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle tag="Our Tracks" title="CHOOSE YOUR" highlight="BATTLEFIELD" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {tracks.slice(0, 3).map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -6 }}
              onClick={() => setSelected(track)}
              className="relative rounded-2xl overflow-hidden border border-white/10 hover:border-primary/60 hover:shadow-[0_0_40px_rgba(255,43,43,0.15)] transition-all duration-400 cursor-pointer group"
              style={{ height: 320 }}
            >
              <img src={track.image} alt={track.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

              <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/50 to-transparent" />

              {/* Hover overlay CTA */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.div
                  initial={{ scale: 0.85 }}
                  whileHover={{ scale: 1 }}
                  className="bg-primary/90 backdrop-blur-sm text-white font-orbitron text-xs tracking-widest px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(255,43,43,0.5)]"
                >
                  VIEW DETAILS →
                </motion.div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block bg-primary text-white text-[10px] tracking-widest font-orbitron px-3 py-1 mb-3 clip-skewed">
                  {track.badge}
                </span>
                <h3 className="font-orbitron text-xl font-bold mb-2">{track.name}</h3>
                <div className="flex gap-4 text-muted text-xs">
                  <span>🔥 {track.difficulty}</span>
                  <span>📏 {track.length}</span>
                  <span>⏱️ {track.corners} corners</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Track Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[400] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#070707]/85 backdrop-blur-md"
              onClick={() => setSelected(null)}
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{   scale: 0.88, opacity: 0, y: 24  }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(255,43,43,0.2)] z-10"
            >
              {/* Image */}
              <div className="relative h-52">
                <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-black/70 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:border-primary hover:text-primary transition-all"
                >
                  <X size={15} />
                </button>
                <div className="absolute bottom-4 left-6">
                  <span className={`text-[10px] font-orbitron tracking-widest border px-2 py-1 rounded ${difficultyColor[selected.difficulty]}`}>
                    {selected.difficulty}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="font-orbitron text-2xl font-bold mb-2">{selected.name}</h2>
                <p className="text-muted text-sm leading-relaxed mb-5">
                  {trackDetails[selected.id]?.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { icon: <MapPin size={14}/>, label: 'Length',    val: selected.length },
                    { icon: <Clock size={14}/>,  label: 'Best Time', val: trackDetails[selected.id]?.bestTime },
                    { icon: <Zap size={14}/>,    label: 'Capacity',  val: trackDetails[selected.id]?.capacity },
                  ].map(({ icon, label, val }) => (
                    <div key={label} className="bg-white/5 border border-white/8 rounded-xl p-3 text-center">
                      <div className="flex justify-center text-primary mb-1">{icon}</div>
                      <p className="text-white text-xs font-semibold">{val}</p>
                      <p className="text-muted text-[10px] mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {trackDetails[selected.id]?.features.map(f => (
                    <span key={f} className="text-[11px] text-muted border border-white/10 bg-white/5 rounded-full px-3 py-1">
                      {f}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleBook(selected)}
                    className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white font-orbitron text-xs tracking-widest rounded-xl hover:shadow-[0_8px_30px_rgba(255,43,43,0.4)] hover:scale-[1.02] transition-all"
                  >
                    BOOK THIS TRACK →
                  </button>
                  <button
                    onClick={() => setSelected(null)}
                    className="px-5 border border-white/15 text-muted rounded-xl hover:border-white/30 hover:text-white transition-all text-xs font-orbitron tracking-wider"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}