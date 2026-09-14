import { Link } from 'react-router-dom'
import { Shield, ReceiptIndianRupee, Award, Share2, Globe, Mail } from 'lucide-react'

const TRUST_STRIP = [
  {
    icon: Shield,
    title: '24/7 Roadside Assistance',
    body: 'Full coverage and rapid dispatch wherever you are on the road.',
  },
  {
    icon: ReceiptIndianRupee,
    title: 'Zero Hidden Fees',
    body: 'Clear, transparent pricing inclusive of taxes and mandatory insurance.',
  },
  {
    icon: Award,
    title: 'Best Rate Guarantee',
    body: 'Competitive rates matched across our entire executive car roster.',
  },
]

const FLEET_LINKS = ['Executive Sedans', 'Luxury SUVs', 'Electric & Hybrid', 'High Performance']
const COMPANY_LINKS = ['About Us', 'Locations & Hubs', 'Support & Help', 'Corporate Accounts']

export default function Footer() {
  return (
    <footer className="bg-surface-container-low">
      <div className="content-container py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mb-space-xl">
          {TRUST_STRIP.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex flex-col gap-space-xs bg-surface-container-lowest rounded-xl p-space-md shadow-sm"
            >
              <Icon className="text-secondary-container" size={22} />
              <span className="font-headline-sm text-primary">{title}</span>
              <p className="font-body-sm text-on-surface-variant">{body}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg pt-space-lg border-t border-outline-variant">
          <div className="flex flex-col gap-space-sm">
            <span className="font-headline-md text-primary font-bold">Velocita</span>
            <p className="font-body-sm text-on-surface-variant max-w-xs">
              Premier automotive solutions engineered for effortless fleet
              management, executive rentals, and luxury travel reservations
              across India.
            </p>
            <div className="flex items-center gap-space-sm mt-space-xs text-on-surface-variant">
              <Share2 size={18} />
              <Globe size={18} />
              <Mail size={18} />
            </div>
          </div>

          <FooterColumn title="Fleet" links={FLEET_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />

          <div className="flex flex-col gap-space-sm">
            <span className="font-headline-sm text-primary font-bold">Newsletter</span>
            <p className="font-body-sm text-on-surface-variant">
              Stay updated with seasonal fleet arrivals and exclusive corporate
              offers.
            </p>
            <form
              className="flex gap-space-xs"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter work email"
                className="flex-1 min-w-0 bg-surface-container-lowest px-space-sm py-2 rounded-lg font-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none"
              />
              <button
                type="submit"
                className="px-space-md py-2 rounded-lg bg-primary text-on-primary font-label-lg"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-lg mt-space-lg border-t border-outline-variant font-label-sm text-on-surface-variant">
          <span>© 2026 Velocita Fleet Management Systems Pvt. Ltd. All rights reserved.</span>
          <div className="flex items-center gap-space-md">
            <Link to="/privacy" className="hover:text-on-surface">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-on-surface">Terms of Service</Link>
            <Link to="/security" className="hover:text-on-surface">Security Standard</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }) {
  return (
    <div className="flex flex-col gap-space-sm">
      <span className="font-headline-sm text-primary font-bold">{title}</span>
      <ul className="flex flex-col gap-space-xs">
        {links.map((label) => (
          <li key={label}>
            <Link
              to="/fleet"
              className="font-body-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
