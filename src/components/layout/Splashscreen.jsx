import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SplashScreen({ onDone }) {
  const [pct, setPct] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setPct(prev => {
        const next = prev + Math.random() * 5 + 2
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => { setVisible(false); setTimeout(onDone, 600) }, 300)
          return 100
        }
        return next
      })
    }, 60)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] bg-[#070707] flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="font-orbitron text-5xl md:text-6xl font-black tracking-[0.25em] glow-text"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            APEX DRIFT
          </motion.h1>

          <motion.p
            className="text-muted tracking-[0.4em] text-xs uppercase mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Racing Beyond Limits
          </motion.p>

          <div className="w-72 h-0.5 bg-white/10 mt-14 rounded overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded"
              style={{ width: `${pct}%`, boxShadow: '0 0 12px rgba(255,43,43,0.6)' }}
            />
          </div>

          <p className="font-orbitron text-xs text-muted mt-3 tracking-widest">
            {Math.floor(pct)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}