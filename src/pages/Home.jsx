import Hero         from '../components/home/Hero'
import Features     from '../components/home/Features'
import TrackCards   from '../components/home/TrackCards'
import Membership   from '../components/home/Membership'
import Testimonials from '../components/home/Testimonials'
import CTA          from '../components/home/CTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <TrackCards />
      <Membership />
      <Testimonials />
      <CTA />
    </main>
  )
}