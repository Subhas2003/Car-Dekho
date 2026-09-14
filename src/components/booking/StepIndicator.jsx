import { Check } from 'lucide-react'

const STEPS = ['Vehicle Selection', 'Details & Add-ons', 'Confirmation']

export default function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-space-sm py-space-md">
      {STEPS.map((label, index) => {
        const stepNum = index + 1
        const isComplete = stepNum < currentStep
        const isActive = stepNum === currentStep

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md font-bold transition-colors ${
                  isComplete
                    ? 'bg-primary text-on-primary'
                    : isActive
                    ? 'bg-secondary-container text-on-primary'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {isComplete ? <Check size={16} /> : stepNum}
              </div>
              <span
                className={`font-label-sm hidden sm:block ${
                  isActive ? 'text-on-surface font-semibold' : 'text-on-surface-variant'
                }`}
              >
                {label}
              </span>
            </div>
            {stepNum < STEPS.length && (
              <div
                className={`w-10 sm:w-24 h-0.5 mx-2 ${
                  isComplete ? 'bg-primary' : 'bg-surface-container-high'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
