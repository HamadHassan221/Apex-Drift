import { motion } from 'framer-motion'

export default function Button({ variant = 'primary', children, glow = false, className = '', ...rest }) {
  const base = 'font-orbitron text-xs tracking-widest uppercase cursor-pointer transition-all duration-300 px-8 py-3.5 inline-flex items-center gap-2'

  const variants = {
    primary: `bg-primary text-white clip-skewed ${glow ? 'animate-glow-pulse' : ''}`,
    outline: 'border border-white/30 text-white hover:border-primary hover:text-primary',
    ghost:   'text-primary border border-primary/40 bg-primary/10 hover:bg-primary/20',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  )
}