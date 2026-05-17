import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import GlowText from '../ui/GlowText'

function useCountUp(target, duration, active) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = Date.now()
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / duration)
      setVal(Math.floor(p * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])
  return val
}

export default function Hero() {
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)

  useEffect(() => { setTimeout(() => setStarted(true), 400) }, [])

  const racers = useCountUp(5000, 2000, started)
  const tracks = useCountUp(4,    1200, started)
  const rating = useCountUp(98,   1600, started)

  const handleExplorePlans = () => {
    const section = document.getElementById('membership-section')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById('membership-section')?.scrollIntoView({ behavior: 'smooth' })
      }, 400)
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80')", filter: 'brightness(0.3)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070707]/20 via-transparent to-[#070707]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,43,43,0.12),transparent_60%)]" />

      {/* Hero Content — takes up most of the vertical space */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-5 pt-28 pb-8">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/40 rounded-full px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-primary mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-neon-blink" />
            Now Open — Cairo's #1 Drift Arena
          </div>

          <h1 className="font-orbitron font-black leading-[0.9] tracking-tight mb-6"
              style={{ fontSize: 'clamp(3.2rem, 9vw, 7.5rem)' }}>
            RACE<br />
            <GlowText>BEYOND</GlowText>
            <br />LIMITS
          </h1>

          <p className="text-muted text-base md:text-lg max-w-md mx-auto mb-10 leading-relaxed">
            The most advanced karting and drift racing experience in Egypt.
            Professionally tuned tracks. Neon nights. Pure adrenaline.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="primary" glow onClick={() => navigate('/booking')}>
              BOOK YOUR RACE
            </Button>
            <Button variant="outline" onClick={handleExplorePlans}>
              EXPLORE PLANS
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Stats Section — clearly separated */}
      <div className="relative z-10 w-full px-6 pb-16">
        {/* Visual separator */}
        <div className="max-w-xl mx-auto mb-10 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="font-orbitron text-[9px] tracking-[0.35em] text-white/30 uppercase">Live Stats</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="max-w-2xl mx-auto grid grid-cols-3 gap-4 md:gap-6"
        >
          {[
            { num: racers.toLocaleString() + '+', label: 'Racers Monthly' },
            { num: String(tracks),                label: 'Pro Tracks'     },
            { num: rating + '%',                  label: 'Satisfaction'   },
          ].map(({ num, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.1 }}
              className="text-center bg-white/5 border border-white/10 rounded-2xl py-6 px-2 md:py-8 md:px-6 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300"
            >
              <p className="font-orbitron text-2xl md:text-4xl font-bold glow-text mb-2">{num}</p>
              <p className="text-muted text-[10px] md:text-xs tracking-[0.15em] uppercase">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}