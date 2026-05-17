import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Zap } from 'lucide-react'

export default function FloatingActionButton() {
  const navigate = useNavigate()
  return (
    <motion.button
      onClick={() => navigate('/booking')}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,43,43,0.5)]"
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      title="Book Now"
    >
      <Zap size={22} fill="white" />
    </motion.button>
  )
}