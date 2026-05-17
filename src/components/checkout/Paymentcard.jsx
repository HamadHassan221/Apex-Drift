import { useState } from 'react'
import { calcTotal } from '../../data/mockData'

// ─── Validation helpers ───────────────────────────────────
function validate({ name, cardNum, expiry, cvv }) {
  const errors = {}

  // Name
  if (!name.trim())                          errors.name = 'Cardholder name is required'
  else if (name.trim().length > 50)          errors.name = 'Name must be 50 characters or less'

  // Card number
  const digits = cardNum.replace(/\s/g, '')
  if (!digits)                               errors.cardNum = 'Card number is required'
  else if (!/^\d+$/.test(digits))            errors.cardNum = 'Card number must contain digits only'
  else if (digits.length !== 16)             errors.cardNum = 'Card number must be exactly 16 digits'

  // Expiry MM/YY
  if (!expiry)                               errors.expiry = 'Expiry date is required'
  else {
    const parts = expiry.split('/')
    if (parts.length !== 2)                  errors.expiry = 'Use MM/YY format'
    else {
      const mm = parseInt(parts[0], 10)
      const yy = parseInt(parts[1], 10)
      const now = new Date()
      const nowYY = now.getFullYear() % 100
      const nowMM = now.getMonth() + 1
      if (isNaN(mm) || isNaN(yy))           errors.expiry = 'Invalid date'
      else if (mm < 1 || mm > 12)           errors.expiry = 'Month must be 01–12'
      else if (yy < nowYY || (yy === nowYY && mm < nowMM))
                                             errors.expiry = 'Card has expired'
    }
  }

  // CVV
  if (!cvv)                                  errors.cvv = 'CVV is required'
  else if (!/^\d{3,4}$/.test(cvv))          errors.cvv = 'CVV must be 3–4 digits'

  return errors
}

function ErrorMsg({ msg }) {
  if (!msg) return null
  return <p className="text-primary text-xs mt-1.5 flex items-center gap-1">⚠ {msg}</p>
}

export default function PaymentCard({ booking, onSuccess }) {
  const [name,    setName]    = useState('')
  const [cardNum, setCardNum] = useState('')
  const [expiry,  setExpiry]  = useState('')
  const [cvv,     setCvv]     = useState('')
  const [errors,  setErrors]  = useState({})
  const [touched, setTouched] = useState({})
  const [loading, setLoading] = useState(false)

  const displayNum = cardNum
    ? '•••• •••• •••• ' + cardNum.replace(/\s/g, '').slice(-4).padStart(4, '•')
    : '•••• •••• •••• 4242'

  const formatCardNum = (v) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

  const formatExpiry = (v) => {
    const digits = v.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2)
    return digits
  }

  const touch = (field) => setTouched(t => ({ ...t, [field]: true }))

  const liveErrors = (field) => {
    if (!touched[field]) return {}
    return validate({ name, cardNum, expiry, cvv })
  }

  const pay = () => {
    const all = { name, cardNum, expiry, cvv }
    const errs = validate(all)
    setTouched({ name: true, cardNum: true, expiry: true, cvv: true })
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    setTimeout(() => { setLoading(false); onSuccess() }, 2500)
  }

  const fieldClass = (field) => {
    const err = (touched[field] && errors[field])
    return `w-full bg-white/5 border text-white px-4 py-3 rounded-lg text-sm outline-none transition-colors
      ${err ? 'border-primary/70 bg-primary/5' : 'border-white/10 focus:border-primary'}`
  }

  return (
    <div className="glass-card border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-xl">
      <p className="font-orbitron text-xs tracking-widest text-primary mb-7">💳 PAYMENT DETAILS</p>

      {/* Visual Card */}
      <div className="rounded-2xl p-7 mb-7 relative overflow-hidden border border-white/10"
           style={{ background: 'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)' }}>
        <div className="absolute top-[-40px] right-[-40px] w-40 h-40 bg-primary/15 rounded-full blur-3xl" />
        <div className="w-9 h-7 rounded-md mb-6" style={{ background: 'linear-gradient(135deg,#FFD700,#FFA500)' }} />
        <p className="font-orbitron text-xl tracking-widest mb-5">{displayNum}</p>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] text-white/40 tracking-widest uppercase mb-1">Card Holder</p>
            <p className="font-orbitron text-sm">{name.toUpperCase() || 'YOUR NAME'}</p>
          </div>
          <div>
            <p className="text-[10px] text-white/40 tracking-widest uppercase mb-1">Expires</p>
            <p className="font-orbitron text-sm">{expiry || 'MM/YY'}</p>
          </div>
          <p className="font-orbitron text-base font-bold glow-text">APEX<br/>PAY</p>
        </div>
      </div>

      {/* Name */}
      <div className="mb-5">
        <label className="block font-orbitron text-[10px] tracking-widest text-muted uppercase mb-2">
          Cardholder Name
        </label>
        <input
          type="text"
          placeholder="Ahmed Mohamed"
          maxLength={50}
          value={name}
          onChange={e => { setName(e.target.value); setErrors(v => ({...v, name: ''})) }}
          onBlur={() => { touch('name'); setErrors(validate({ name, cardNum, expiry, cvv })) }}
          className={fieldClass('name')}
        />
        <ErrorMsg msg={touched.name && errors.name} />
      </div>

      {/* Card Number */}
      <div className="mb-5">
        <label className="block font-orbitron text-[10px] tracking-widest text-muted uppercase mb-2">
          Card Number
        </label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          value={cardNum}
          onChange={e => { setCardNum(formatCardNum(e.target.value)); setErrors(v => ({...v, cardNum: ''})) }}
          onBlur={() => { touch('cardNum'); setErrors(validate({ name, cardNum, expiry, cvv })) }}
          className={fieldClass('cardNum')}
        />
        <ErrorMsg msg={touched.cardNum && errors.cardNum} />
      </div>

      {/* Expiry + CVV */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-orbitron text-[10px] tracking-widest text-muted uppercase mb-2">
            Expiry Date
          </label>
          <input
            type="text"
            placeholder="MM/YY"
            maxLength={5}
            value={expiry}
            onChange={e => { setExpiry(formatExpiry(e.target.value)); setErrors(v => ({...v, expiry: ''})) }}
            onBlur={() => { touch('expiry'); setErrors(validate({ name, cardNum, expiry, cvv })) }}
            className={fieldClass('expiry')}
          />
          <ErrorMsg msg={touched.expiry && errors.expiry} />
        </div>
        <div>
          <label className="block font-orbitron text-[10px] tracking-widest text-muted uppercase mb-2">
            CVV
          </label>
          <input
            type="password"
            placeholder="•••"
            maxLength={4}
            value={cvv}
            onChange={e => { setCvv(e.target.value.replace(/\D/g,'')); setErrors(v => ({...v, cvv: ''})) }}
            onBlur={() => { touch('cvv'); setErrors(validate({ name, cardNum, expiry, cvv })) }}
            className={fieldClass('cvv')}
          />
          <ErrorMsg msg={touched.cvv && errors.cvv} />
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={pay}
        disabled={loading}
        className="w-full py-5 bg-gradient-to-r from-primary to-secondary text-white font-orbitron text-sm tracking-widest rounded-lg hover:shadow-[0_10px_40px_rgba(255,43,43,0.5)] hover:scale-[1.01] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? '⏳ Processing...' : `🔒 PAY NOW — ${calcTotal(booking)} EGP`}
      </button>

      <div className="flex justify-center gap-6 mt-5 flex-wrap">
        {['🔒 SSL Secured', '✅ 256-bit Encrypted', '🛡️ PCI Compliant'].map(b => (
          <span key={b} className="text-muted text-xs">{b}</span>
        ))}
      </div>
    </div>
  )
}