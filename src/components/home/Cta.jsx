import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import GlowText from '../ui/GlowText'

export default function CTA() {
  const navigate = useNavigate()

  const handleExplorePlans = () => {
    const section = document.getElementById('membership-section')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="relative py-24 px-6 text-center border-y border-primary/20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,43,43,0.1),transparent_70%)]" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-orbitron text-[10px] tracking-[0.3em] text-primary uppercase mb-4">Ready to Race?</p>
          <h2 className="font-orbitron font-black leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            YOUR RACE STARTS<br /><GlowText>TODAY</GlowText>
          </h2>
          <p className="text-muted mb-10 leading-relaxed">
            Don't just watch motorsport. Live it. Book your session now and join 5,000+ racers who chose APEX.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="primary" glow onClick={() => { window.scrollTo(0,0); navigate('/booking') }}>
              BOOK A SESSION
            </Button>
            <Button variant="outline" onClick={handleExplorePlans}>
              EXPLORE PLANS
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}