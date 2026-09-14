import { Link } from 'react-router-dom'
import { Star, Heart, Settings, Zap, Users, Briefcase } from 'lucide-react'
import Badge from '../ui/Badge.jsx'
import { formatINR } from '../../utils/currency.js'

export default function VehicleCard({ vehicle, rentalSearch = '', layout = 'grid' }) {
  const isList = layout === 'list'

  return (
    <article className={`${isList ? 'grid grid-cols-1 md:grid-cols-[13rem_minmax(0,1fr)] gap-space-md items-center' : 'flex flex-col'} bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-xl transition-all duration-300 justify-between group hover:-translate-y-1 relative`}>
      <div className={`flex items-center justify-between z-10 ${isList ? 'md:col-span-2 mb-0' : 'mb-space-sm'}`}>
        <Badge label={vehicle.badge} />
        <button
          aria-label="Save to favorites"
          className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-secondary-container hover:bg-surface-container transition-colors"
        >
          <Heart size={18} />
        </button>
      </div>

      <Link
        to={`/fleet/${vehicle.id}${rentalSearch}`}
        className={`relative w-full ${isList ? 'h-40 md:h-full md:min-h-40 mb-0' : 'h-48 mb-space-md'} bg-linear-to-b from-surface-container-low to-surface-container-lowest rounded-xl overflow-hidden flex items-center justify-center p-2`}
      >
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute bottom-2 left-2 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-0.5 rounded font-label-sm text-on-surface font-semibold">
          {vehicle.category}
        </div>
      </Link>

      <div className={isList ? 'min-w-0' : ''}>
        <div className="flex items-baseline justify-between mb-1">
          <Link to={`/fleet/${vehicle.id}${rentalSearch}`}>
            <h3 className="font-headline-sm text-primary font-bold group-hover:text-secondary transition-colors">
              {vehicle.name}
            </h3>
          </Link>
          <div className="flex items-center text-secondary-container">
            <Star size={16} fill="currentColor" strokeWidth={0} />
            <span className="font-label-sm text-on-surface font-bold ml-0.5">
              {vehicle.rating.toFixed(1)}
            </span>
          </div>
        </div>
        <p className={`font-body-sm text-on-surface-variant ${isList ? 'mb-space-sm' : 'mb-space-md'}`}>
          {vehicle.tagline}
        </p>

        <div className="grid grid-cols-4 gap-1 py-space-xs px-space-sm bg-surface-container-low rounded-xl mb-space-md text-center text-on-surface-variant">
          <SpecIcon icon={Settings} label={vehicle.transmission} />
          <SpecIcon icon={Zap} label={vehicle.fuel} />
          <SpecIcon icon={Users} label={`${vehicle.seats} Seats`} />
          <SpecIcon icon={Briefcase} label={`${vehicle.bags} Bags`} />
        </div>
      </div>

      <div className={`pt-space-xs mt-auto ${isList ? 'min-w-0' : ''}`}>
        <div className="flex items-baseline justify-between mb-space-sm">
          <div>
            <span className="font-headline-lg text-primary font-bold tracking-tight tabular-nums">
              {formatINR(vehicle.dailyRate)}
            </span>
            <span className="font-body-sm text-on-surface-variant"> / day</span>
          </div>
          <span className="font-label-sm text-on-surface-variant">
            Tax &amp; insurance incl.
          </span>
        </div>
        <div className="grid grid-cols-2 gap-space-xs">
          <Link
            to={`/fleet/${vehicle.id}${rentalSearch}`}
            className="h-10 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-lg transition-colors"
          >
            View Specs
          </Link>
          <Link
            to={`/fleet/${vehicle.id}/book${rentalSearch}`}
            className="h-10 flex items-center justify-center rounded-xl bg-secondary-container hover:opacity-90 text-on-primary font-label-lg shadow-sm transition-all"
          >
            Rent Now
          </Link>
        </div>
      </div>
    </article>
  )
}

function SpecIcon({ icon: Icon, label }) {
  return (
    <div className="flex flex-col items-center">
      <Icon size={18} />
      <span className="font-label-sm font-semibold mt-0.5 truncate max-w-full">
        {label}
      </span>
    </div>
  )
}
