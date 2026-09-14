import { Gauge, Cog, Fuel, Users, Compass, MonitorSpeaker } from 'lucide-react'

export default function SpecGrid({ vehicle }) {
  const specs = [
    { icon: Gauge, label: 'Engine & Output', value: vehicle.engine },
    { icon: Cog, label: 'Transmission', value: vehicle.gearboxLabel },
    { icon: Fuel, label: 'Fuel & Efficiency', value: vehicle.fuelLabel },
    {
      icon: Users,
      label: 'Cabin & Luggage',
      value: `${vehicle.seats} Seats · ${vehicle.bags} Large Bags`,
    },
    { icon: Compass, label: 'Drivetrain', value: vehicle.drivetrain },
    { icon: MonitorSpeaker, label: 'Cockpit & Infotainment', value: vehicle.infotainment },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
      {specs.map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className="flex flex-col gap-space-xs bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/40"
        >
          <Icon className="text-secondary-container" size={20} />
          <span className="font-label-sm text-on-surface-variant uppercase tracking-wide">
            {label}
          </span>
          <span className="font-headline-sm text-primary">{value}</span>
        </div>
      ))}
    </div>
  )
}
