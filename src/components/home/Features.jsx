import { motion } from 'framer-motion'
import { features } from '../../data/mockData'
import SectionTitle from '../ui/SectionTitle'

export default function Features() {
  return (
    <section className="px-6 md:px-10 lg:px-16 py-20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle tag="Why APEX DRIFT" title="ENGINEERED FOR" highlight="CHAMPIONS"
          subtitle="Every detail crafted to deliver the ultimate motorsport experience." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-xl p-8 group relative overflow-hidden border border-white/8 hover:border-primary/30 transition-colors duration-300 cursor-default"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div className="w-[52px] h-[52px] bg-primary/15 border border-primary/30 rounded-xl flex items-center justify-center text-2xl mb-5">{f.icon}</div>
              <h3 className="font-orbitron font-semibold text-sm tracking-wide mb-3">{f.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}