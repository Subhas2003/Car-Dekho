import { ShieldCheck } from 'lucide-react'
import { formatINR, formatINRPrecise, computeRateBreakdown } from '../../utils/currency.js'

export default function RateBreakdown({ vehicle, days, includeProtection, selectedAddOns = [], onConfirm, confirmLabel }) {
  const protectionPerDay = includeProtection ? vehicle.protectionPerDay : 0
  const addOnTotal = selectedAddOns.reduce((sum, addon) => sum + (addon.flat || 0), 0)
  const { baseTotal, protectionTotal, concessionFee, taxes, total } =
    computeRateBreakdown({
      dailyRate: vehicle.dailyRate,
      days,
      protectionPerDay,
      addOnTotal,
    })

  return (
    <aside className="flex flex-col gap-space-md bg-surface-container-lowest rounded-xl p-space-md shadow-sm sticky top-24">
      <div className="flex items-center justify-between">
        <span className="font-label-md bg-primary-container text-on-primary px-3 py-1 rounded-full uppercase tracking-wide">
          {vehicle.classLabel}
        </span>
        <span className="font-label-sm text-success flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-success" /> Confirmed Available
        </span>
      </div>

      <div className="relative w-full h-40 bg-gradient-to-b from-surface-container-low to-surface-container-lowest rounded-xl overflow-hidden flex items-center justify-center">
        <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-contain p-2" />
      </div>

      <div>
        <h3 className="font-headline-md text-primary font-bold">{vehicle.name}</h3>
        <p className="font-body-sm text-on-surface-variant">{vehicle.tagline}</p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center py-space-sm border-y border-outline-variant/50">
        <MiniStat value={`${vehicle.seats}`} label="Seats" />
        <MiniStat value={`${vehicle.bags}`} label="Bags" />
        <MiniStat value={`${vehicle.hp} HP`} label="Power" />
      </div>

      <div className="flex items-center justify-between font-label-md text-on-surface-variant">
        <span>Total Rental Duration</span>
        <span className="font-semibold text-on-surface">{days} Day{days > 1 ? 's' : ''}</span>
      </div>

      <div className="flex flex-col gap-space-xs">
        <span className="font-label-sm text-on-surface-variant uppercase tracking-wide">
          Rate Breakdown
        </span>
        <LineItem
          label={`${vehicle.name.split(' ')[0]} Daily Rate (${formatINR(vehicle.dailyRate)} × ${days})`}
          value={formatINR(baseTotal)}
        />
        {includeProtection && (
          <LineItem
            label={`Executive Collision Protection (${formatINR(protectionPerDay)} × ${days})`}
            value={formatINR(protectionTotal)}
          />
        )}
        {selectedAddOns.filter((addon) => addon.flat).map((addon) => (
          <LineItem key={addon.key} label={addon.label} value={formatINR(addon.flat)} />
        ))}
        <LineItem label="Airport Concession Recovery Fee" value={formatINR(concessionFee)} />
        <LineItem label="State & GST Taxes (8.5%)" value={formatINR(taxes)} />
      </div>

      <div className="flex items-baseline justify-between pt-space-sm border-t border-outline-variant">
        <span className="font-headline-sm text-on-surface">Total Estimated Due</span>
        <span className="font-headline-lg text-secondary font-bold tabular-nums">
          {formatINRPrecise(total)}
        </span>
      </div>

      <div className="flex items-center gap-space-xs bg-surface-container-low rounded-xl p-space-sm">
        <ShieldCheck className="text-on-surface-variant shrink-0" size={18} />
        <p className="font-label-sm text-on-surface-variant">
          Refundable security hold of {formatINR(vehicle.securityDeposit)} placed at
          dispatch, released on undamaged return inspection.
        </p>
      </div>

      {onConfirm && (
        <button
          onClick={onConfirm}
          className="w-full h-12 rounded-xl bg-secondary-container text-on-primary font-label-lg shadow-[0_4px_14px_rgba(253,118,26,0.3)] hover:opacity-95 transition-all cursor-pointer"
        >
          {confirmLabel || 'Confirm & Reserve'}
        </button>
      )}
    </aside>
  )
}

function LineItem({ label, value }) {
  return (
    <div className="flex items-center justify-between font-body-sm text-on-surface-variant">
      <span>{label}</span>
      <span className="text-on-surface font-medium tabular-nums">{value}</span>
    </div>
  )
}

function MiniStat({ value, label }) {
  return (
    <div className="flex flex-col">
      <span className="font-headline-sm text-primary font-bold">{value}</span>
      <span className="font-label-sm text-on-surface-variant">{label}</span>
    </div>
  )
}
