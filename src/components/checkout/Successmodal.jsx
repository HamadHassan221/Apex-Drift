import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function SuccessModal({ show, onClose }) {
  const navigate = useNavigate()
  const [ref] = useState('APX-2026-' + Math.floor(Math.random() * 9000 + 1000))

  const handleClose = () => { onClose(); navigate('/') }

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[500] flex items-center justify-center bg-[#070707]/90 backdrop-blur-xl"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1,    opacity: 1, y: 0  }}
            exit={{   scale: 0.85, opacity: 0, y: 30  }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-[#0d0d0d] border border-primary/40 rounded-3xl p-12 text-center max-w-lg w-[90%] shadow-[0_0_80px_rgba(255,43,43,0.2)]"
          >
            <motion.div
              animate={{ boxShadow: ['0 0 10px rgba(255,43,43,0.4)','0 0 30px rgba(255,43,43,0.7)','0 0 10px rgba(255,43,43,0.4)'] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-20 h-20 bg-primary/10 border-2 border-primary rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
            >🏁</motion.div>

            <h2 className="font-orbitron text-3xl font-black mb-2">
              RACE <span className="glow-text">CONFIRMED!</span>
            </h2>
            <p className="text-muted text-sm leading-relaxed mb-7">
              Your session has been booked. Prepare your racing gear — the track awaits.
            </p>
            <div className="bg-primary/8 border border-primary/20 rounded-xl p-4 mb-7">
              <p className="font-orbitron text-[10px] tracking-widest text-muted mb-1">BOOKING REFERENCE</p>
              <p className="font-orbitron text-2xl font-bold text-primary tracking-wider">{ref}</p>
            </div>
            <p className="text-muted text-xs mb-7">Arrive 15 minutes before your session. Your gear will be ready.</p>
            <button onClick={handleClose}
              className="px-10 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-orbitron text-sm tracking-widest rounded-xl hover:scale-105 hover:shadow-[0_10px_30px_rgba(255,43,43,0.4)] transition-all">
              BACK TO HOME 🏠
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}