import { ShieldCheck, Users, MapPin } from 'lucide-react'
import { hubs } from '../data/vehicles.js'

export default function About() {
  return (
    <div className="content-container py-space-xl flex flex-col gap-space-xl">
      <div className="max-w-2xl">
        <span className="font-label-lg text-secondary uppercase tracking-wide">Our Guarantee</span>
        <h1 className="font-headline-xl text-primary font-bold mt-space-xs">
          Built for operators who cannot afford friction.
        </h1>
        <p className="font-body-lg text-on-surface-variant mt-space-sm">
          Velocita manages a nationwide fleet of executive sedans, SUVs and
          performance vehicles, engineered around a single principle: every
          hand-off — booking, pickup, and return — should feel effortless.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
        <InfoCard icon={ShieldCheck} title="Zero Deposit Surprises" body="Transparent, all-inclusive pricing shown before you ever confirm a reservation." />
        <InfoCard icon={Users} title="Verified Fleet Partners" body="Every vehicle passes a 24-point inspection and sanitation pass between rentals." />
        <InfoCard icon={MapPin} title="Six Major Hubs" body="Direct terminal pickup at India's busiest airports, with corporate dispatch on request." />
      </div>

      <div>
        <h2 className="font-headline-lg text-primary mb-space-sm">Our Hubs</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
          {hubs.map((hub) => (
            <li key={hub} className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm font-body-md text-on-surface">
              {hub}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function InfoCard({ icon: Icon, title, body }) {
  return (
    <div className="flex flex-col gap-space-xs bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
      <Icon className="text-secondary-container" size={22} />
      <span className="font-headline-sm text-primary">{title}</span>
      <p className="font-body-sm text-on-surface-variant">{body}</p>
    </div>
  )
}
