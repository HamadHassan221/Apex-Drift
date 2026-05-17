import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { liveNotifications } from '../../data/mockData'

export default function LiveNotification() {
  const [visible, setVisible] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const show = () => {
      setIndex(i => (i + 1) % liveNotifications.length)
      setVisible(true)
      setTimeout(() => setVisible(false), 3500)
    }
    const first = setTimeout(show, 5000)
    const loop  = setInterval(show, 9000)
    return () => { clearTimeout(first); clearInterval(loop) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed top-20 right-4 z-40 bg-[#070707]/95 backdrop-blur-xl border border-primary/40 rounded-lg px-4 py-3 flex items-center gap-3 max-w-[260px] shadow-[0_4px_24px_rgba(255,43,43,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-neon-blink flex-shrink-0" />
          <span className="text-xs text-white/90 leading-snug">{liveNotifications[index].text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}