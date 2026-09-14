import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ShieldCheck, Zap, Key, Star } from 'lucide-react'
import HeroVelocityScene from '../components/three/HeroVelocityScene.jsx'
import VehicleCard from '../components/vehicle/VehicleCard.jsx'
import { useHeroTimeline } from '../hooks/useHeroTimeline.js'
import { useCountUp } from '../hooks/useCountUp.js'
import { vehicles, fleetStats, testimonials } from '../data/vehicles.js'

const FEATURED_IDS = ['aventos-gt-sport', 'velox-horizon-esuv', 'prestige-executive-s-class']

const VALUE_PROPS = [
  {
    icon: ShieldCheck,
    title: 'Transparent Pricing',
    body: 'Zero hidden surcharges or undisclosed airport fees or card-hold surprises. What you see is precisely what you pay.',
  },
  {
    icon: Zap,
    title: 'Flexible Cancellation',
    body: "Travel agendas shift rapidly. Receive a full refund with a single tap up to 24 hours before your pickup schedule.",
  },
  {
    icon: Key,
    title: 'Contactless Smart Pickup',
    body: 'Skip rental counter queues. Locate and unlock your reserved vehicle directly via the Velocita digital key.',
  },
]

export default function Home() {
  const heroRef = useRef(null)
  useHeroTimeline(heroRef)

  const [pickup, setPickup] = useState('Bengaluru — Kempegowda Intl. (BLR)')
  const [pickupDate, setPickupDate] = useState('2026-10-24')
  const [returnDate, setReturnDate] = useState('2026-10-27')
  const fleetSearch = `?pickupDate=${pickupDate}&returnDate=${returnDate}`

  const featured = FEATURED_IDS.map((id) => vehicles.find((v) => v.id === id))

  return (
    <div className="flex flex-col">
      {/*  Hero */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-primary text-on-primary pt-32 pb-space-xl"
      >
        <HeroVelocityScene className="absolute inset-0 w-full h-full opacity-70" />

        <div className="relative content-container grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <span
              data-hero="eyebrow"
              className="font-label-lg text-secondary-fixed"
            >
              Executive Mobility, Concierge &amp; Fleet
            </span>
            <h1
              data-hero="headline"
              className="font-display-lg text-inverse-on-surface max-w-xl"
            >
              Precision-managed rentals for India's executive fleet.
            </h1>
            <p data-hero="sub" className="font-body-lg text-primary-fixed-dim max-w-lg">
              Seamless bookings, meticulously maintained luxury and everyday
              vehicles, and transparent pricing with zero deposit surprises —
              across six major hubs nationwide.
            </p>
            <div data-hero="cta" className="flex flex-wrap gap-space-sm pt-space-xs">
              <Link
                to="/fleet"
                className="inline-flex items-center h-12 px-space-lg rounded-xl bg-secondary-container text-on-primary font-label-lg shadow-[0_4px_14px_rgba(253,118,26,0.35)] hover:opacity-95 transition-all"
              >
                Explore Fleet
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center h-12 px-space-lg rounded-xl border border-primary-fixed-dim/40 text-inverse-on-surface font-label-lg hover:bg-primary-fixed-dim/10 transition-all"
              >
                Our Guarantee
              </Link>
            </div>
          </div>

          <div data-hero="visual" className="lg:col-span-5 flex justify-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ8gcGrD2AL_kn_sgvOA4q4eNtCQBoY7fFsNcpGY7GOHCpHyysQy8LCwfZuKG02jqPoOqjyBhHjPMq7YmwrTMA4Y8uyyX9uf9c8QLs7-VmVwnWcfMPP045oujsuw-XEpCM5PVlaeW_fNFeZd6vnRKGPBGalSkG4se5fLxsl8Jk1_9wIHm8vK6z9jiIn1tbrwAvjRBxNj4nLu8FNvNmvg1d-I7UQ1MouOmxtj_s4tcPuN2goXVMu-MS"
              alt="Aventos GT Sport"
              className="max-w-md w-full drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Booking widget */}
        <div className="relative content-container mt-space-xl">
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xl grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-space-sm items-end">
            <Field label="Pickup Location">
              <select
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full bg-surface-container-low px-space-sm py-2.5 rounded-lg font-body-sm text-on-surface focus:outline-none"
              >
                {[
                  'Bengaluru — Kempegowda Intl. (BLR)',
                  'Mumbai — Chhatrapati Shivaji Intl. (BOM)',
                  'Delhi NCR — Indira Gandhi Intl. (DEL)',
                  'Hyderabad — Rajiv Gandhi Intl. (HYD)',
                ].map((hub) => (
                  <option key={hub} value={hub}>
                    {hub}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Pickup Date">
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-surface-container-low px-space-sm py-2.5 rounded-lg font-body-sm text-on-surface focus:outline-none"
              />
            </Field>
            <Field label="Return Date">
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-surface-container-low px-space-sm py-2.5 rounded-lg font-body-sm text-on-surface focus:outline-none"
              />
            </Field>
            <Field label="Fleet Category">
              <select className="w-full bg-surface-container-low px-space-sm py-2.5 rounded-lg font-body-sm text-on-surface focus:outline-none">
                <option>Any Category</option>
                <option>Luxury Sedan</option>
                <option>Executive SUV</option>
                <option>Electric &amp; Hybrid</option>
              </select>
            </Field>
            <Link
              to={`/fleet${fleetSearch}`}
              className="h-11 md:mb-0.5 flex items-center justify-center gap-2 rounded-xl bg-secondary-container text-on-primary font-label-lg px-space-lg hover:opacity-95 transition-all"
            >
              <Search size={18} /> Find Cars
            </Link>
          </div>
        </div>
      </section>

      
      <section className="content-container py-space-xl">
        <h2 className="font-headline-xl text-primary text-center mb-space-lg">
          Engineered for frictionless travel
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
          {VALUE_PROPS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex flex-col gap-space-xs bg-surface-container-lowest rounded-xl p-space-md shadow-sm"
            >
              <Icon className="text-secondary-container" size={22} />
              <span className="font-headline-sm text-primary">{title}</span>
              <p className="font-body-sm text-on-surface-variant">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured vehicles*/}
      <section className="content-container pb-space-xl">
        <div className="flex items-end justify-between mb-space-lg">
          <div>
            <span className="font-label-md text-secondary uppercase tracking-wide">
              Pristine Fleet Collection
            </span>
            <h2 className="font-headline-xl text-primary">
              Featured vehicles for your next journey
            </h2>
          </div>
          <Link
            to="/fleet"
            className="hidden sm:inline font-label-lg text-secondary hover:underline"
          >
            View complete fleet inventory →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
          {featured.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/*  Stats banner  */}
      <section className="bg-primary text-on-primary py-space-xl">
        <div className="content-container grid grid-cols-2 md:grid-cols-4 gap-space-lg text-center">
          <Stat value={fleetStats.totalVehicles} suffix="+" label="Premium Vehicles" />
          <Stat value={45} suffix="k+" label="Journeys Completed" />
          <Stat value={fleetStats.satisfactionRate} decimals={1} suffix="%" label="Satisfaction Rate" />
          <Stat value={fleetStats.majorHubs} label="Major Hubs" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="content-container py-space-xl">
        <h2 className="font-headline-xl text-primary text-center mb-space-lg">
          Trusted by executives and voyagers nationwide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-space-sm bg-surface-container-lowest rounded-xl p-space-md shadow-sm"
            >
              <div className="flex text-secondary-container">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="font-body-md text-on-surface">"{t.quote}"</p>
              <div>
                <span className="font-label-lg text-primary block">{t.name}</span>
                <span className="font-label-sm text-on-surface-variant">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-label-sm text-on-surface-variant">{label}</label>
      {children}
    </div>
  )
}

function Stat({ value, suffix = '', decimals = 0, label }) {
  const ref = useCountUp(value, { decimals, suffix })
  return (
    <div>
      <div
        ref={ref}
        className="font-display-lg tabular-nums"
      >
        0{suffix}
      </div>
      <span className="font-label-md text-primary-fixed-dim uppercase tracking-wide">
        {label}
      </span>
    </div>
  )
}
