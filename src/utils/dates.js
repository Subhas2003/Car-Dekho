const DEFAULT_PICKUP_DATE = '2026-10-24'
const DEFAULT_RETURN_DATE = '2026-10-27'

export function getRentalDates(searchParams = new URLSearchParams()) {
  return {
    pickupDate: searchParams.get('pickupDate') || DEFAULT_PICKUP_DATE,
    returnDate: searchParams.get('returnDate') || DEFAULT_RETURN_DATE,
  }
}

export function calculateRentalDays(pickupDate, returnDate) {
  const pickup = new Date(`${pickupDate}T00:00:00`)
  const returnDateTime = new Date(`${returnDate}T00:00:00`)
  const millisecondsPerDay = 24 * 60 * 60 * 1000

  if (!Number.isFinite(pickup.getTime()) || !Number.isFinite(returnDateTime.getTime())) {
    return 0
  }

  return Math.max(0, Math.ceil((returnDateTime - pickup) / millisecondsPerDay))
}

export function formatRentalDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}