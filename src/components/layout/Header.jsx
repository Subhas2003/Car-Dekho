import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, Phone, Headset, X } from 'lucide-react'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/fleet', label: 'Cars' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(15,30,54,0.06)]">
      <div className="h-20 content-container flex items-center justify-between gap-gutter">
        <div className="flex items-center gap-space-lg">
          <Link to="/" className="flex items-center gap-space-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-container text-on-primary font-headline-sm">
              V
            </span>
            <span className="font-headline-md text-on-surface tracking-tight font-bold">
              Velocita
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-space-lg ml-space-md">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-label-lg transition-colors ${
                    isActive
                      ? 'text-on-surface font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-space-sm sm:gap-space-md">
          <div className="hidden xl:flex items-center gap-space-sm py-space-xs">
            <Headset className="text-secondary-container" size={20} />
            <div className="flex flex-col text-left">
              <span className="font-label-sm text-on-surface-variant leading-none">
                24/7 Concierge
              </span>
              <span className="font-label-md text-on-surface font-semibold flex items-center gap-1">
                <Phone size={12} /> +91 80055-50199
              </span>
            </div>
          </div>

          <Link
            to="/fleet"
            className="hidden sm:inline-flex items-center justify-center h-11 px-space-lg rounded-xl bg-secondary-container text-on-primary font-label-lg shadow-[0_4px_14px_rgba(253,118,26,0.3)] hover:opacity-95 transition-all"
          >
            Book Now
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface-container text-primary hover:bg-surface-container-high transition-colors"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="lg:hidden border-t border-outline-variant/50 bg-surface-container-lowest px-space-md py-space-sm shadow-lg"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-space-sm py-3 font-label-lg transition-colors ${
                    isActive
                      ? 'bg-primary-container text-on-primary font-bold'
                      : 'text-on-surface hover:bg-surface-container-low'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
