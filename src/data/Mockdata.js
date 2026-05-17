// src/data/mockData.js

export const cars = [
  { id: 'standard', name: 'Standard',      emoji: '🏎️', price: 350, tag: 'STANDARD', specs: '270cc · Beginner Friendly' },
  { id: 'pro',      name: 'PRO Kart',      emoji: '⚡', price: 470, tag: 'PRO KART',  specs: '390cc · Race Tuned'        },
  { id: 'formula',  name: 'Formula Drift', emoji: '🔥', price: 650, tag: 'FORMULA',   specs: '500cc · Full Drift Setup'  },
]

export const tracks = [
  { id: 'inferno', name: 'Inferno Circuit', difficulty: 'Advanced', length: '1.2km', corners: 8,  badge: 'SIGNATURE', image: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?w=800&q=80' },
  { id: 'neon',    name: 'Neon Boulevard',  difficulty: 'Expert',   length: '0.9km', corners: 12, badge: 'NIGHT ONLY', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80', nightOnly: true },
  { id: 'thunder', name: 'Thunder Oval',    difficulty: 'Beginner', length: '0.6km', corners: 4,  badge: 'BEGINNER',  image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80' },
  { id: 'driftx',  name: 'Drift Zone X',   difficulty: 'Advanced', length: '0.8km', corners: 6,  badge: 'NEW',       image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'  },
]

export const memberships = [
  {
    id: 'rookie', tier: 'TIER 01', name: 'ROOKIE', price: 599,
    features: ['4 Sessions / Month', 'Standard Karts Only', 'Access to Thunder Oval', 'Basic Leaderboard'],
  },
  {
    id: 'pro', tier: 'TIER 02', name: 'PRO', price: 1199, featured: true,
    features: ['10 Sessions / Month', 'PRO Kart Access', 'All 3 Tracks', 'Helmet Cam Included', 'Priority Booking'],
  },
  {
    id: 'legend', tier: 'TIER 03', name: 'LEGEND', price: 2499,
    features: ['Unlimited Sessions', 'Formula Drift Kart', 'VIP Lounge Access', 'Personal Instructor', 'Night Mode Priority', 'Official Race License'],
  },
]

export const testimonials = [
  { id: '1', name: 'Karim Mostafa', role: 'PRO Member',      initials: 'KM', stars: 5, text: '"APEX DRIFT changed my life. The Night Drift experience on Neon Boulevard is unlike anything I\'ve ever felt. Pure adrenaline from start to finish."' },
  { id: '2', name: 'Sara Ahmed',    role: 'LEGEND Member',   initials: 'SA', stars: 5, text: '"The karts are insanely responsive. I\'ve been to international tracks and APEX holds its own. The helmet cam feature is a game changer."' },
  { id: '3', name: 'Omar Tarek',    role: 'Corporate Client', initials: 'OT', stars: 5, text: '"Brought my whole team here for a corporate event. The staff are professional, the facilities are world-class, and the experience is unforgettable."' },
]

export const timeSlots = [
  { time: '09:00', taken: true  },
  { time: '11:00', taken: false },
  { time: '13:00', taken: false },
  { time: '15:00', taken: true  },
  { time: '17:00', taken: false },
  { time: '19:00', taken: false },
  { time: '21:00', taken: false },
  { time: '23:00', taken: false },
]

export const liveNotifications = [
  { text: 'Ahmed just booked Night Drift Track! 🔥' },
  { text: 'Sara upgraded to PRO Kart ⚡' },
  { text: 'Karim set a new lap record! 🏆' },
  { text: 'New session added: 11PM Neon Boulevard' },
  { text: '3 spots left for Friday Night Race!' },
  { text: 'Mohamed just joined LEGEND tier 🎖️' },
]

export const features = [
  { icon: '🏎️', title: 'Pro-Grade Karts',       desc: 'Professional racing karts with 270cc engines, hydraulic brakes, and full safety harness systems.' },
  { icon: '🌙', title: 'Night Drift Mode',        desc: 'Race under neon lights with our exclusive night sessions — a cinematic experience like no other.' },
  { icon: '📹', title: 'Helmet Cam Recording',    desc: 'Every race recorded from your perspective. Replay, share, and relive every perfect drift.' },
  { icon: '🏆', title: 'Live Leaderboards',       desc: 'Real-time timing systems track every millisecond. Compete with friends and global rankings.' },
  { icon: '🛡️', title: 'Safety First',            desc: 'FIA-certified safety barriers, professional marshals on-site, and full protective gear provided.' },
  { icon: '🎮', title: 'Racing Simulator',        desc: 'Train your reflexes on our full-motion racing simulators before hitting the real track.' },
]

// ─── Booking helpers ────────────────────────────────────
export const defaultBooking = {
  carId: 'standard', carName: 'Standard', carPrice: 350,
  trackId: 'inferno', trackName: 'Inferno Circuit',
  date: '', time: '11:00', laps: 10, helmetCam: false,
}

export function calcLapFee(laps)  { return Math.max(0, ((laps - 5) / 5) * 30) }
export function calcTotal(booking) { return booking.carPrice + calcLapFee(booking.laps) + (booking.helmetCam ? 150 : 0) }