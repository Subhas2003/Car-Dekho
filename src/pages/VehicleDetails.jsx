import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  Home as HomeIcon,
  ChevronRight,
  Star,
  Share2,
  Heart,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import SpecGrid from '../components/vehicle/SpecGrid.jsx'
import VehicleCard from '../components/vehicle/VehicleCard.jsx'
import { getVehicleById, vehicles } from '../data/vehicles.js'
import { formatINR, computeRateBreakdown } from '../utils/currency.js'
import { calculateRentalDays, getRentalDates } from '../utils/dates.js'

export default function VehicleDetails() {
  const { id } = useParams()
  const { search } = useLocation()
  const navigate = useNavigate()
  const vehicle = getVehicleById(id)
  const { pickupDate, returnDate } = getRentalDates(new URLSearchParams(search))
  const days = calculateRentalDays(pickupDate, returnDate)

  if (!vehicle) {
    return (
      <div className="content-container py-space-xl text-center">
        <h1 className="font-headline-xl text-primary mb-space-sm">Vehicle not found</h1>
        <p className="font-body-md text-on-surface-variant mb-space-md">
          This vehicle may have been removed from the fleet listing.
        </p>
        <Link to="/fleet" className="text-secondary font-label-lg hover:underline">
          ← Back to fleet catalog
        </Link>
      </div>
    )
  }

  const { total } = computeRateBreakdown({
    dailyRate: vehicle.dailyRate,
    days,
    protectionPerDay: vehicle.protectionPerDay,
  })

  const similar = vehicles.filter((v) => v.id !== vehicle.id).slice(0, 3)

  return (
    <div className="content-container py-space-lg">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-space-xs font-label-md text-on-surface-variant mb-space-md">
        <Link to="/" className="hover:text-primary flex items-center gap-1">
          <HomeIcon size={14} /> Home
        </Link>
        <ChevronRight size={13} />
        <Link to="/fleet" className="hover:text-primary">Fleet</Link>
        <ChevronRight size={13} />
        <span className="text-on-surface font-semibold">{vehicle.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Left: gallery + info */}
        <div className="lg:col-span-8 flex flex-col gap-space-lg">
          <div>
            <div className="flex items-center gap-space-xs mb-space-xs">
              <span className="bg-primary-container text-on-primary font-label-md px-3 py-1 rounded-full uppercase tracking-wide">
                {vehicle.classLabel}
              </span>
              <span className="bg-success-container text-on-success-container font-label-md px-3 py-1 rounded-full">
                Instant Confirmation
              </span>
            </div>
            <div className="flex items-start justify-between gap-space-sm">
              <div>
                <h1 className="font-headline-xl text-primary font-bold">
                  {vehicle.year} {vehicle.name}
                </h1>
                <div className="flex items-center gap-space-sm mt-1 font-body-sm text-on-surface-variant">
                  <span className="flex items-center gap-1 text-secondary-container font-semibold">
                    <Star size={15} fill="currentColor" strokeWidth={0} />
                    {vehicle.rating.toFixed(1)} ({vehicle.reviews} verified reviews)
                  </span>
                  <span>·</span>
                  <span>Verified Fleet Partner</span>
                </div>
              </div>
              <div className="flex items-center gap-space-xs shrink-0">
                <IconButton icon={Share2} label="Share" />
                <IconButton icon={Heart} label="Save" />
              </div>
            </div>
          </div>

          <div className="relative w-full h-80 sm:h-[420px] bg-gradient-to-b from-surface-container-low to-surface-container-lowest rounded-xl overflow-hidden flex items-center justify-center">
            <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-contain p-space-md" />
          </div>

          <div>
            <h2 className="font-headline-lg text-primary mb-space-sm">Vehicle Specifications</h2>
            <SpecGrid vehicle={vehicle} />
          </div>

          <div>
            <h2 className="font-headline-lg text-primary mb-space-sm">
              Included Amenities &amp; Driver Technology
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
              {vehicle.amenities.map((item) => (
                <div key={item} className="flex items-center gap-space-xs">
                  <CheckCircle2 className="text-success shrink-0" size={18} />
                  <span className="font-body-md text-on-surface">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-headline-lg text-primary mb-space-sm">Similar vehicles you might like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-gutter">
              {similar.map((v) => (
                <VehicleCard key={v.id} vehicle={v} rentalSearch={search} />
              ))}
            </div>
          </div>
        </div>

        {/* Right: sticky booking summary */}
        <aside className="lg:col-span-4 flex flex-col gap-space-md bg-surface-container-lowest rounded-xl p-space-lg shadow-sm sticky top-24">
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-xl text-primary font-bold tabular-nums">
              {formatINR(vehicle.dailyRate)}
            </span>
            <span className="font-body-sm text-on-surface-variant">/ day</span>
          </div>
          <p className="font-label-sm text-secondary font-semibold">
            Estimated {formatINR(total)} total for a {days}-day rental
          </p>

          <div className="flex items-center gap-space-xs bg-surface-container-low rounded-xl p-space-sm">
            <ShieldCheck className="text-on-surface-variant shrink-0" size={18} />
            <p className="font-label-sm text-on-surface-variant">
              Free cancellation up to 24h before pickup. No card charged today.
            </p>
          </div>

          <button
            onClick={() => navigate(`/fleet/${vehicle.id}/book${search}`)}
            className="w-full h-12 rounded-xl bg-secondary-container text-on-primary font-label-lg shadow-[0_4px_14px_rgba(253,118,26,0.3)] hover:opacity-95 transition-all cursor-pointer"
          >
            Book This Vehicle Now
          </button>

          <ul className="flex flex-col gap-space-xs font-label-sm text-on-surface-variant">
            <li>✓ 100% sanitized &amp; multi-point safety inspected</li>
            <li>✓ Encrypted payment processing &amp; instant voucher</li>
            <li>✓ Unlimited mileage on all standard bookings</li>
          </ul>
        </aside>
      </div>
    </div>
  )
}

function IconButton({ icon: Icon, label }) {
  return (
    <button
      aria-label={label}
      className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-secondary-container hover:bg-surface-container transition-colors"
    >
      <Icon size={18} />
    </button>
  )
}
