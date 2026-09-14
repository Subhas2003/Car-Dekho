/**
 * Currency utilities — the whole app quotes Indian Rupees (INR) only.
 * Centralised here so no component hand-rolls its own ₹ formatting.
 */

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const inrFormatterWithPaise = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/**
 * Format a whole-rupee amount, e.g. 18500 -> "₹18,500"
 */
export function formatINR(amount) {
  return inrFormatter.format(Math.round(amount))
}

/**
 * Format an amount keeping paise, e.g. 501.8 -> "₹501.80"
 * Used for final invoice / rate-breakdown totals.
 */
export function formatINRPrecise(amount) {
  return inrFormatterWithPaise.format(amount)
}

/**
 * Compute the Velocita standard rate breakdown for a booking.
 * Kept in one place so the numbers on the summary card and the
 * confirmation step can never drift apart.
 */
export function computeRateBreakdown({ dailyRate, days, protectionPerDay = 0, addOnTotal = 0 }) {
  const baseTotal = dailyRate * days
  const protectionTotal = protectionPerDay * days
  const taxableTotal = baseTotal + protectionTotal + addOnTotal
  const concessionFee = Math.round(baseTotal * 0.014) // airport/state concession recovery
  const taxes = Math.round(taxableTotal * 0.085) // GST-equivalent 8.5%
  const total = taxableTotal + concessionFee + taxes

  return {
    baseTotal,
    protectionTotal,
    addOnTotal,
    concessionFee,
    taxes,
    total,
  }
}
