// UpsellPopup for booking page — suggests upgrading car type
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function UpsellPopup({ booking, setBooking }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 6000)
    return () => clearTimeout(t)
  }, [])

  // Only show if on standard kart
  if (booking.carId !== 'standard') return null

  const accept = () => {
    setBooking(b => ({ ...b, carId: 'pro', carName: 'PRO Kart', carPrice: 470 }))
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[450] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#070707]/80 backdrop-blur-md"
            onClick={() => setShow(false)}
          />

          {/* Popup — centered */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1,    opacity: 1, y: 0  }}
            exit={{   scale: 0.85, opacity: 0, y: 30  }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="relative w-full max-w-sm bg-[#0d0d0d] border border-primary/50 rounded-2xl p-8 shadow-[0_0_80px_rgba(255,43,43,0.3)] z-10 text-center"
          >
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 w-8 h-8 border border-white/15 rounded-full flex items-center justify-center text-muted hover:border-primary hover:text-white transition-all"
            >
              <X size={14} />
            </button>

            <span className="inline-block bg-secondary/20 border border-secondary/40 text-secondary font-orbitron text-[9px] tracking-widest px-4 py-1.5 rounded-full mb-5">
              🔥 LIMITED OFFER
            </span>

            <h3 className="font-orbitron text-xl font-bold mb-2">Upgrade to <span className="glow-text">PRO Kart</span></h3>
            <p className="text-muted text-sm leading-relaxed mb-4">
              50% more power, race-tuned drift setup, and priority pit access.
            </p>
            <p className="font-orbitron text-3xl font-black text-primary mb-6">
              +120 <span className="text-base text-muted font-normal">EGP only</span>
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={accept}
                className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-orbitron text-xs tracking-widest rounded-xl hover:shadow-[0_8px_30px_rgba(255,43,43,0.4)] hover:scale-[1.02] transition-all"
              >
                UPGRADE NOW →
              </button>
              <button
                onClick={() => setShow(false)}
                className="w-full py-3 border border-white/15 text-muted font-orbitron text-xs tracking-widest rounded-xl hover:border-white/30 hover:text-white transition-all"
              >
                KEEP STANDARD
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}