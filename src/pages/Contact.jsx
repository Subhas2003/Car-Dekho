import { useState } from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="content-container py-space-xl grid grid-cols-1 lg:grid-cols-12 gap-gutter">
      <div className="lg:col-span-5 flex flex-col gap-space-md">
        <h1 className="font-headline-xl text-primary font-bold">Talk to a fleet concierge</h1>
        <p className="font-body-md text-on-surface-variant">
          Corporate accounts, airport VIP delivery, and custom dispatch
          requests are handled directly by our concierge desk.
        </p>
        <ContactRow icon={Phone} label="+91 80055-50199" sub="24/7 Concierge Line" />
        <ContactRow icon={Mail} label="concierge@velocita.in" sub="Response within 2 hours" />
        <ContactRow icon={MapPin} label="Six Major Hubs" sub="Bengaluru · Mumbai · Delhi NCR · Hyderabad · Chennai · Pune" />
      </div>

      <div className="lg:col-span-7">
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
          {submitted ? (
            <div className="text-center py-space-lg">
              <p className="font-headline-md text-primary mb-space-xs">Message sent</p>
              <p className="font-body-md text-on-surface-variant">
                A concierge agent will reach out shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <Field label="Full Name *" required />
              <Field label="Company" />
              <Field label="Email *" type="email" required />
              <Field label="Phone" />
              <label className="sm:col-span-2 flex flex-col gap-1">
                <span className="font-label-sm text-on-surface-variant">Message *</span>
                <textarea
                  required
                  rows={4}
                  className="bg-surface-container-low px-space-sm py-2 rounded-xl font-body-sm text-on-surface focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="sm:col-span-2 h-12 rounded-xl bg-secondary-container text-on-primary font-label-lg shadow-[0_4px_14px_rgba(253,118,26,0.3)] hover:opacity-95 transition-all"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function ContactRow({ icon: Icon, label, sub }) {
  return (
    <div className="flex items-start gap-space-sm">
      <Icon className="text-secondary-container mt-0.5" size={20} />
      <div>
        <p className="font-label-lg text-on-surface font-semibold">{label}</p>
        <p className="font-body-sm text-on-surface-variant">{sub}</p>
      </div>
    </div>
  )
}

function Field({ label, type = 'text', required }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-label-sm text-on-surface-variant">{label}</span>
      <input
        type={type}
        required={required}
        className="h-11 bg-surface-container-low px-space-sm rounded-xl font-body-sm text-on-surface focus:outline-none"
      />
    </label>
  )
}
