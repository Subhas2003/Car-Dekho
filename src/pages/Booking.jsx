import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { CalendarDays, MapPin, User, Lock, CheckCircle2 } from 'lucide-react'
import StepIndicator from '../components/booking/StepIndicator.jsx'
import RateBreakdown from '../components/booking/RateBreakdown.jsx'
import { getVehicleById } from '../data/vehicles.js'
import { formatINRPrecise, computeRateBreakdown } from '../utils/currency.js'
import { calculateRentalDays, formatRentalDate, getRentalDates } from '../utils/dates.js'

const ADD_ONS = [
  { key: 'cdw', label: 'Executive Collision Damage Waiver (CDW)', note: 'Zero Deductible', rate: 'protectionPerDay' },
  { key: 'secondDriver', label: 'Authorized Second Executive Driver', flat: 850 },
  { key: 'childSeat', label: 'Premium ISOFIX Child Safety Seat', flat: 650 },
  { key: 'fuelCredit', label: 'Prepaid Fuel & Charging Credit', flat: 3200 },
]

export default function Booking() {
  const { id } = useParams()
  const { search } = useLocation()
  const navigate = useNavigate()
  const vehicle = getVehicleById(id)
  const { pickupDate, returnDate } = getRentalDates(new URLSearchParams(search))

  const [step, setStep] = useState(2) // Step 1 (vehicle selection) is the fleet/details page
  const days = calculateRentalDays(pickupDate, returnDate)
  const [addOns, setAddOns] = useState({ cdw: true, secondDriver: false, childSeat: false, fuelCredit: false })
  const [driver, setDriver] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    dob: '',
  })

  const includeProtection = addOns.cdw
  const selectedAddOns = ADD_ONS.filter((addon) => addOns[addon.key])
  const addOnTotal = selectedAddOns.reduce((sum, addon) => sum + (addon.flat || 0), 0)
  const { total } = useMemo(() => {
    if (!vehicle) return { total: 0 }
    return computeRateBreakdown({
      dailyRate: vehicle.dailyRate,
      days,
      protectionPerDay: includeProtection ? vehicle.protectionPerDay : 0,
      addOnTotal,
    })
  }, [vehicle, days, includeProtection, addOnTotal])

  if (!vehicle) {
    return (
      <div className="content-container py-space-xl text-center">
        <h1 className="font-headline-xl text-primary mb-space-sm">Vehicle not found</h1>
        <Link to="/fleet" className="text-secondary font-label-lg hover:underline">
          ← Back to fleet catalog
        </Link>
      </div>
    )
  }

  function toggleAddOn(key) {
    setAddOns((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  function handleDriverChange(field, value) {
    setDriver((prev) => ({ ...prev, [field]: value }))
  }

  const isDriverValid =
    driver.firstName && driver.lastName && driver.email && driver.phone && driver.licenseNumber

  return (
    <div className="content-container py-space-lg">
      <StepIndicator currentStep={step} />

      {step === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start mt-space-md">
          <div className="lg:col-span-8 flex flex-col gap-space-md">
            {/* Itinerary */}
            <Card title="Rental Itinerary" icon={MapPin} action={<Link to={`/fleet/${vehicle.id}`} className="font-label-sm text-secondary hover:underline">Edit</Link>}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <InfoBlock label="Pickup Location" value="Bengaluru Intl (BLR)" sub="Terminal 2 — Executive Fleet Hub" icon={CalendarDays} meta={`${formatRentalDate(pickupDate)} · 10:00 AM`} />
                <InfoBlock label="Return Location" value="Bengaluru Intl (BLR)" sub="Same as pickup hub" icon={CalendarDays} meta={`${formatRentalDate(returnDate)} · 04:00 PM`} />
              </div>
            </Card>

            {/* Driver details */}
            <Card title="Primary Driver Details" icon={User} note="Must match your valid government driver's license presented at handover.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <TextField label="First Legal Name *" value={driver.firstName} onChange={(v) => handleDriverChange('firstName', v)} placeholder="Alexander" />
                <TextField label="Last Legal Name *" value={driver.lastName} onChange={(v) => handleDriverChange('lastName', v)} placeholder="Vance" />
                <TextField label="Email *" type="email" value={driver.email} onChange={(v) => handleDriverChange('email', v)} placeholder="alexander.vance@executive.com" />
                <TextField label="Mobile Phone Number *" value={driver.phone} onChange={(v) => handleDriverChange('phone', v)} placeholder="+91 98765-43210" />
                <TextField label="Driver's License Number *" value={driver.licenseNumber} onChange={(v) => handleDriverChange('licenseNumber', v)} placeholder="KA-01-20230012345" />
                <TextField label="Date of Birth (Minimum age 21) *" type="date" value={driver.dob} onChange={(v) => handleDriverChange('dob', v)} />
              </div>
            </Card>

            {/* Protection & add-ons */}
            <Card title="Protection & Enhancements" note="Customize your travel reassurance and cabin equipment.">
              <div className="flex flex-col gap-space-sm">
                {ADD_ONS.map((addon) => (
                  <label
                    key={addon.key}
                    className={`flex items-start justify-between gap-space-md p-space-sm rounded-xl border cursor-pointer transition-colors ${
                      addOns[addon.key]
                        ? 'bg-secondary-fixed/40 border-secondary-container'
                        : 'bg-surface-container-low border-transparent hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex min-w-0 flex-1 items-start gap-space-sm">
                      <input
                        type="checkbox"
                        checked={addOns[addon.key]}
                        onChange={() => toggleAddOn(addon.key)}
                        className="mt-1 w-4 h-4 rounded accent-primary cursor-pointer"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-space-xs gap-y-1">
                          <span className="min-w-0 font-label-lg text-on-surface break-words">{addon.label}</span>
                          {addon.note && (
                            <span className="font-label-sm bg-secondary-container text-on-secondary px-2 py-0.5 rounded-full">
                              {addon.note}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="shrink-0 text-right font-label-lg text-on-surface font-semibold whitespace-nowrap">
                      +{addon.flat ? `₹${addon.flat.toLocaleString('en-IN')} flat` : `₹${vehicle.protectionPerDay.toLocaleString('en-IN')}/day`}
                    </span>
                  </label>
                ))}
              </div>
            </Card>

            {/* Payment */}
            <Card title="Payment Preference" icon={Lock} note="No backend is connected in this build — payment fields are illustrative only.">
              <div className="flex items-center gap-space-sm mb-space-md">
                {['Card', 'UPI', 'Net Banking'].map((method, i) => (
                  <button
                    key={method}
                    type="button"
                    className={`flex-1 h-11 rounded-xl font-label-lg transition-colors ${
                      i === 0
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <TextField label="Name on Card *" placeholder="Alexander Vance" />
                <TextField label="Card Number *" placeholder="•••• •••• •••• 4092" />
                <TextField label="Expiration Date *" placeholder="08 / 28" />
                <TextField label="Security Code (CVV) *" placeholder="•••" />
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 cursor-pointer">
            <RateBreakdown
              vehicle={vehicle}
              days={days}
              includeProtection={includeProtection}
              selectedAddOns={selectedAddOns}
              confirmLabel={`Confirm & Reserve ${vehicle.name.split(' ')[0]}`}
              onConfirm={() => isDriverValid && days > 0 && setStep(3)}
            />
            {days === 0 && (
              <p className="font-label-sm text-secondary mt-space-xs text-center">
                Choose a return date after the pickup date to continue.
              </p>
            )}
            {days > 0 && !isDriverValid && (
              <p className="font-label-sm text-secondary mt-space-xs text-center">
                Fill in required driver details above to continue.
              </p>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <ConfirmationStep vehicle={vehicle} driver={driver} total={total} onDone={() => navigate('/fleet')} />
      )}
    </div>
  )
}

function ConfirmationStep({ vehicle, driver, total, onDone }) {
  const [bookingRef] = useState(
    () => `VLC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
  )

  return (
    <div className="max-w-xl mx-auto mt-space-xl text-center flex flex-col items-center gap-space-md">
      <div className="w-16 h-16 rounded-full bg-success-container flex items-center justify-center">
        <CheckCircle2 className="text-success" size={32} />
      </div>
      <h1 className="font-headline-xl text-primary font-bold">Reservation confirmed</h1>
      <p className="font-body-md text-on-surface-variant">
        {driver.firstName || 'Your'} {vehicle.name} is reserved. A confirmation
        and digital key link have been sent to {driver.email || 'your email'}.
      </p>

      <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm text-left flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-on-surface-variant uppercase">Booking Reference</span>
          <span className="font-headline-sm text-primary font-bold">{bookingRef}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-label-md text-on-surface-variant uppercase">Vehicle</span>
          <span className="font-body-md text-on-surface">{vehicle.name}</span>
        </div>
        <div className="flex items-center justify-between pt-space-sm border-t border-outline-variant">
          <span className="font-headline-sm text-on-surface">Total Paid (Estimated)</span>
          <span className="font-headline-lg text-secondary font-bold tabular-nums">
            {formatINRPrecise(total)}
          </span>
        </div>
      </div>

      <button
        onClick={onDone}
        className="h-12 px-space-xl rounded-xl bg-primary text-on-primary font-label-lg hover:opacity-90 transition-all"
      >
        Back to Fleet
      </button>
    </div>
  )
}

function Card({ title, icon: Icon, action, note, children }) {
  return (
    <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          {Icon && <Icon className="text-secondary-container" size={20} />}
          <h2 className="font-headline-sm text-primary font-bold">{title}</h2>
        </div>
        {action}
      </div>
      {note && <p className="font-body-sm text-on-surface-variant -mt-space-sm">{note}</p>}
      {children}
    </section>
  )
}

function InfoBlock({ label, value, sub, meta, icon: Icon }) {
  return (
    <div className="bg-surface-container-low rounded-xl p-space-md">
      <span className="font-label-sm text-on-surface-variant uppercase flex items-center gap-1">
        {Icon && <Icon size={13} />} {label}
      </span>
      <p className="font-headline-sm text-on-surface mt-1">{value}</p>
      <p className="font-body-sm text-on-surface-variant">{sub}</p>
      <p className="font-label-sm text-on-surface-variant mt-1">{meta}</p>
    </div>
  )
}

function TextField({ label, type = 'text', value, onChange, placeholder }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-label-sm text-on-surface-variant">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="h-11 bg-surface-container-low px-space-sm rounded-xl font-body-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:bg-surface-container"
      />
    </label>
  )
}
