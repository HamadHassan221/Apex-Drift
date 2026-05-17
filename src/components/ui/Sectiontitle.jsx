import GlowText from './GlowText'
import SlideUp from '../animations/SlideUp'

export default function SectionTitle({ tag, title, highlight, subtitle, center = false }) {
  return (
    <SlideUp className={center ? 'text-center' : ''}>
      <p className="font-orbitron text-xs tracking-[0.3em] text-primary uppercase mb-3">{tag}</p>
      <h2 className="font-orbitron text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
        {title}
        {highlight && (<><br /><GlowText>{highlight}</GlowText></>)}
      </h2>
      {subtitle && (
        <p className={`text-muted leading-relaxed max-w-lg ${center ? 'mx-auto' : ''}`}>{subtitle}</p>
      )}
    </SlideUp>
  )
}