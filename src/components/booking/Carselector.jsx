import { motion } from 'framer-motion'
import { cars } from '../../data/mockData'

export function StepLabel({ num, label }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white font-orbitron text-[10px] font-bold flex-shrink-0">{num}</span>
      <span className="font-orbitron text-[10px] tracking-[0.25em] text-primary uppercase">{label}</span>
    </div>
  )
}

export default function CarSelector({ booking, setBooking }) {
  return (
    <div className="mb-10">
      <StepLabel num={1} label="Choose Your Machine" />
      <div className="grid grid-cols-3 gap-3">
        {cars.map(car => (
          <motion.div key={car.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setBooking(b => ({ ...b, carId: car.id, carName: car.name, carPrice: car.price }))}
            className={`rounded-xl p-4 text-center cursor-pointer border transition-all duration-300
              ${booking.carId === car.id ? 'border-primary bg-primary/10' : 'border-white/8 bg-white/4 hover:border-primary/50'}`}
          >
            <div className="text-3xl mb-2">{car.emoji}</div>
            <div className="font-orbitron text-[10px] tracking-wider font-semibold">{car.tag}</div>
            <div className="text-primary text-xs mt-1">{car.price} EGP</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}