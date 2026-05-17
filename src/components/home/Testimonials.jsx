import { motion } from 'framer-motion'
import { testimonials } from '../../data/mockData'
import SectionTitle from '../ui/SectionTitle'

export default function Testimonials() {
  return (
    <section className="px-6 md:px-10 lg:px-16 pb-20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle tag="What They Say" title="RACERS" highlight="SPEAK OUT" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {testimonials.map((t, i) => (
            <motion.div key={t.id}
              initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card border border-white/10 rounded-2xl p-7"
            >
              <div className="text-secondary text-sm tracking-widest mb-4">{'★'.repeat(t.stars)}</div>
              <p className="text-white/75 text-sm leading-relaxed italic mb-6">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-orbitron text-xs font-bold text-white flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-muted text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}