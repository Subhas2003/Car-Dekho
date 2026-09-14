# Velocita — Executive Fleet Intelligence

A frontend-only React application for an executive/luxury car rental brand,
built directly from the supplied `DESIGN.md` design system and Stitch-generated
fleet catalog screen. There is no backend: all vehicle, pricing and booking
data is static/mocked in `src/data` and component state.

## Stack

- **React 19** + **Vite** — app shell and dev/build tooling
- **React Router v6** — client-side routing across Home / Fleet / Details / Booking
- **Tailwind CSS v4** — utility styling, themed via `@theme` tokens pulled 1:1 from `DESIGN.md`
- **GSAP** (+ ScrollTrigger) — one orchestrated hero entrance per page, and a scroll-triggered stats count-up
- **Three.js** — abstract "velocity streak" WebGL visual behind the home hero
- **lucide-react** — icon set

All amounts are quoted in **Indian Rupees (₹)** via `src/utils/currency.js`.

## Folder structure

```
velocita-fleet/
├── index.html
├── vite.config.js
├── src/
│   ├── main.jsx              # React root, router provider, global CSS import
│   ├── App.jsx                # Route table + persistent Header/Footer shell
│   ├── styles/
│   │   └── tokens.css         # Tailwind v4 @theme — design tokens from DESIGN.md
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   ├── ui/                 # Generic primitives (Button, Badge)
│   │   ├── vehicle/            # VehicleCard, SpecGrid
│   │   ├── booking/            # StepIndicator, RateBreakdown
│   │   └── three/              # HeroVelocityScene (WebGL)
│   ├── pages/                  # Home, FleetCatalog, VehicleDetails, Booking, About, Contact, NotFound
│   ├── data/
│   │   └── vehicles.js         # Static fleet dataset (single source of truth for pricing/specs)
│   ├── hooks/
│   │   ├── useHeroTimeline.js  # GSAP entrance timeline
│   │   └── useCountUp.js       # GSAP ScrollTrigger count-up
│   └── utils/
│       └── currency.js         # INR formatting + rate-breakdown math
```

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build      # production build to dist/
npm run preview    # preview the production build
```

## Design system fidelity

Every color, radius, spacing and type-scale value in `src/styles/tokens.css`
is copied directly from the brief's `DESIGN.md` — there is no invented
palette. Vehicle photography URLs are reused from the originally supplied
Stitch HTML prototype (`code.html`) so the catalog visually matches the
approved mockups.

## Motion principles applied

- **One orchestrated hero entrance** per page (`useHeroTimeline`), not
  fade-in-on-every-section.
- **Scroll-triggered count-up** on the stats banner — motion that reveals a
  real number as you reach it, not decoration.
- **Three.js hero visual** runs continuously but pauses off-screen and
  freezes entirely under `prefers-reduced-motion`.
- Hover/interaction states are handled by CSS transitions, not GSAP.

## Known limitations (by design — frontend only)

- No real payment processing, authentication, or persistence; the booking
  flow's "Confirm & Reserve" step generates a mock booking reference client-side.
- Vehicle inventory, availability and reviews are static fixtures in
  `src/data/vehicles.js`.
