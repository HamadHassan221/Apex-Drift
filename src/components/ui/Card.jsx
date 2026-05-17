import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = true, neon = false }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      className={`glass-card rounded-xl ${neon ? 'neon-border' : 'border border-white/10'} ${className}`}
    >
      {children}
    </motion.div>
  )
}