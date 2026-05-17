import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="bg-[#040404] border-t border-primary/15 pt-16 pb-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="font-orbitron text-xl font-bold glow-text mb-3">APEX DRIFT</div>
            <p className="text-muted text-sm leading-relaxed max-w-[260px]">
              Cairo's premier karting and drift racing arena. Where legends are made and limits are shattered.
            </p>
          </div>
          <div>
            <p className="font-orbitron text-[10px] tracking-[0.25em] text-primary uppercase mb-4">Navigate</p>
            <ul className="space-y-3 text-sm text-muted">
              {[['Home','/'],['Book Now','/booking'],['About Us','#'],['Gallery','#']].map(([l,h])=>(
                <li key={l}><button onClick={()=>navigate(h)} className="hover:text-white transition-colors">{l}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-orbitron text-[10px] tracking-[0.25em] text-primary uppercase mb-4">Tracks</p>
            <ul className="space-y-3 text-sm text-muted">
              {['Inferno Circuit','Neon Boulevard','Thunder Oval','Drift Zone X'].map(t=>(
                <li key={t}><span className="hover:text-white transition-colors cursor-pointer">{t}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-orbitron text-[10px] tracking-[0.25em] text-primary uppercase mb-4">Contact</p>
            <ul className="space-y-3 text-sm text-muted">
              <li>+20 100 APEX-01</li>
              <li>race@apexdrift.com</li>
              <li>Cairo, Egypt</li>
              <li>Open: 9AM — 2AM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted">
          <span className="font-orbitron font-bold glow-text">APEX DRIFT</span>
          <span>© 2026 APEX DRIFT Arena. All rights reserved.</span>
          <span>Built for Champions</span>
        </div>
      </div>
    </footer>
  )
}