import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/',         label: 'Home'     },
  { to: '/booking',  label: 'Booking'  },
  { to: '/checkout', label: 'Checkout' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const goTo = (path) => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    navigate(path)
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-300
        ${scrolled ? 'bg-[#070707]/90 backdrop-blur-xl border-b border-primary/20' : 'bg-transparent'}`}
    >
      {/* Logo */}
      <button onClick={() => goTo('/')} className="font-orbitron text-xl font-black tracking-wider glow-text">
        APEX DRIFT
      </button>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-8 list-none">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              className={({ isActive }) =>
                `text-xs tracking-widest uppercase transition-colors duration-200 relative pb-1
                ${isActive
                  ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-primary'
                  : 'text-muted hover:text-white'}`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Desktop CTA */}
      <button
        onClick={() => goTo('/booking')}
        className="hidden md:block font-orbitron text-xs tracking-widest uppercase bg-primary text-white px-6 py-2.5 clip-skewed transition-all hover:bg-secondary hover:shadow-[0_0_20px_rgba(255,107,0,0.4)]"
      >
        BOOK NOW
      </button>

      {/* Mobile hamburger */}
      <button className="md:hidden text-white" onClick={() => setMenuOpen(v => !v)}>
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1,  y: 0   }}
          className="absolute top-full left-0 right-0 bg-[#070707]/95 backdrop-blur-xl border-b border-primary/20 flex flex-col items-center gap-6 py-8 z-50"
        >
          {links.map(({ to, label }) => (
            <button
              key={to}
              onClick={() => goTo(to)}
              className="font-orbitron text-sm tracking-widest text-muted hover:text-white transition-colors"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => goTo('/booking')}
            className="font-orbitron text-xs bg-primary text-white px-8 py-3 clip-skewed hover:bg-secondary transition-all"
          >
            BOOK NOW
          </button>
        </motion.div>
      )}
    </motion.nav>
  )
}