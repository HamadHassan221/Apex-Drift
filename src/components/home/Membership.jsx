import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { X, ArrowRight } from 'lucide-react'
import { memberships } from '../../data/mockData'
import SectionTitle from '../ui/SectionTitle'

// Upsell map: which tier to suggest when user picks a lower one
const upsellMap = {
  rookie: { targetId: 'pro',    message: 'Unlock PRO — 10 sessions, all tracks & helmet cam' },
  pro:    { targetId: 'legend', message: 'Go LEGEND — unlimited sessions + VIP lounge access' },
}

export default function Membership() {
  const navigate = useNavigate()
  const [upsell, setUpsell] = useState(null) // { from: tier, to: tier }

  const handleSelect = (membership) => {
    const up = upsellMap[membership.id]
    if (up) {
      const toTier = memberships.find(m => m.id === up.targetId)
      setUpsell({ from: membership, to: toTier, message: up.message })
    } else {
      // Legend — go straight to checkout
      goToCheckout(membership)
    }
  }

  const goToCheckout = (membership) => {
    setUpsell(null)
    window.scrollTo(0, 0)
    navigate('/checkout', {
      state: {
        plan: {
          id:       membership.id,
          name:     membership.name,
          price:    membership.price,
          features: membership.features,
        }
      }
    })
  }

  return (
    <section id="membership-section" className="px-6 md:px-10 lg:px-16 py-20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          tag="Membership Plans"
          title="JOIN THE"
          highlight="RACING ELITE"
          subtitle="Choose your tier. Unlock exclusive benefits. Race more, pay less."
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {memberships.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className={`relative rounded-2xl p-9 text-center overflow-hidden border transition-all duration-300
                ${m.featured
                  ? 'border-primary/60 bg-primary/8 shadow-[0_20px_60px_rgba(255,43,43,0.15)]'
                  : 'glass-card border-white/10 hover:border-primary/30'}`}
            >
              {m.featured && (
                <span className="absolute top-5 right-[-28px] bg-primary text-white text-[9px] tracking-[0.2em] font-orbitron py-1 px-9 rotate-45">
                  POPULAR
                </span>
              )}

              <p className="font-orbitron text-[10px] tracking-[0.3em] text-primary mb-3">{m.tier}</p>
              <h3 className="font-orbitron text-2xl font-bold mb-6">{m.name}</h3>

              <div className="font-orbitron text-5xl font-black mb-1">
                {m.price.toLocaleString()}
                <span className="text-base text-muted font-normal ml-1">EGP</span>
              </div>
              <p className="text-muted text-xs mb-8">per month</p>

              <ul className="text-left space-y-3 mb-8">
                {m.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-muted text-sm border-b border-white/5 pb-3">
                    <span className="text-primary text-xs flex-shrink-0">▸</span>{f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelect(m)}
                className={`w-full py-4 font-orbitron text-xs tracking-widest uppercase clip-skewed transition-all duration-300 flex items-center justify-center gap-2
                  ${m.featured
                    ? 'bg-primary text-white hover:bg-secondary hover:shadow-[0_8px_30px_rgba(255,43,43,0.4)]'
                    : 'border border-primary text-primary hover:bg-primary hover:text-white'}`}
              >
                {m.id === 'rookie' ? 'GET STARTED' : m.id === 'pro' ? 'JOIN PRO' : 'GO LEGEND'}
                <ArrowRight size={13} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upsell Modal */}
      <AnimatePresence>
        {upsell && (
          <motion.div
            className="fixed inset-0 z-[450] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#070707]/88 backdrop-blur-md"
              onClick={() => setUpsell(null)}
            />

            {/* Popup — centered */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{   scale: 0.85, opacity: 0, y: 30  }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              className="relative w-full max-w-md bg-[#0d0d0d] border border-primary/40 rounded-2xl p-8 shadow-[0_0_80px_rgba(255,43,43,0.25)] z-10 text-center"
            >
              <button
                onClick={() => setUpsell(null)}
                className="absolute top-4 right-4 w-8 h-8 border border-white/15 rounded-full flex items-center justify-center text-muted hover:border-primary hover:text-white transition-all"
              >
                <X size={14} />
              </button>

              {/* Badge */}
              <span className="inline-block bg-secondary/20 border border-secondary/40 text-secondary font-orbitron text-[9px] tracking-widest px-4 py-1.5 rounded-full mb-5">
                🔥 UPGRADE OFFER
              </span>

              <h3 className="font-orbitron text-xl font-bold mb-2">
                Wait — consider <span className="glow-text">{upsell.to.name}</span>
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-6">{upsell.message}</p>

              {/* Comparison */}
              <div className="grid grid-cols-2 gap-4 mb-7">
                {[upsell.from, upsell.to].map((tier, i) => (
                  <div key={tier.id}
                    className={`rounded-xl p-4 border text-left ${i === 1 ? 'border-primary/50 bg-primary/8' : 'border-white/10 bg-white/4 opacity-70'}`}>
                    <p className="font-orbitron text-[10px] tracking-widest text-muted mb-1">{tier.tier}</p>
                    <p className="font-orbitron font-bold text-sm mb-1">{tier.name}</p>
                    <p className="font-orbitron text-lg font-black text-primary">{tier.price.toLocaleString()} <span className="text-xs text-muted font-normal">EGP</span></p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => goToCheckout(upsell.to)}
                  className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-orbitron text-xs tracking-widest rounded-xl hover:shadow-[0_8px_30px_rgba(255,43,43,0.4)] hover:scale-[1.02] transition-all"
                >
                  YES, UPGRADE TO {upsell.to.name} →
                </button>
                <button
                  onClick={() => goToCheckout(upsell.from)}
                  className="w-full py-3 border border-white/15 text-muted font-orbitron text-xs tracking-widest rounded-xl hover:border-white/30 hover:text-white transition-all"
                >
                  NO THANKS, KEEP {upsell.from.name}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}