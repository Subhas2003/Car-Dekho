# 🚗 Velocita — Car Rental Management System

A modern, fully responsive **Car Rental Management System** built as part of
**Project Phase 1 (Task 1)** of the Web Development Internship at
**Sqrock IT Solutions**.

Velocita lets users browse an executive/luxury vehicle fleet, filter and
search available cars, view detailed specifications, and complete a
multi-step booking flow — all on the frontend, with no backend required.

---

## ✨ Features

- **Homepage** — animated hero section, quick-search booking widget, featured
  vehicles, trust/value propositions, and testimonials
- **Fleet Catalog** — live search, filter by vehicle class / transmission /
  price range, and sort by popularity or price
- **Vehicle Details Page** — full specifications, amenities list, and
  similar-vehicle recommendations
- **Multi-Step Booking Flow** — rental itinerary, driver details form with
  validation, protection/add-on selection, live rate breakdown, and a
  confirmation screen with a generated booking reference
- **Fully Responsive** — optimized layouts for mobile, tablet, and desktop
- **Indian Rupee (₹) Pricing** — all rates, taxes, and totals formatted using
  `Intl.NumberFormat('en-IN')`
- **Smooth Animations** — GSAP-powered hero entrance and scroll-triggered
  stats counter
- **3D Visual Effect** — an abstract Three.js "velocity streak" animation in
  the homepage hero, built with raw WebGL (no external 3D model assets)

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + Vite |
| Routing | React Router v6 |
| Styling | Tailwind CSS v4 (custom design tokens) |
| Animation | GSAP + ScrollTrigger |
| 3D Graphics | Three.js |
| Icons | lucide-react |
| Data | Static JSON-style fixtures (no backend) |

---

## 📁 Project Structure

```
velocita-fleet/
├── index.html
├── vite.config.js
├── src/
│   ├── main.jsx                # App entry point, router setup
│   ├── App.jsx                  # Route definitions + layout shell
│   ├── styles/
│   │   └── tokens.css            # Design tokens (colors, type scale, spacing)
│   ├── components/
│   │   ├── layout/                # Header, Footer
│   │   ├── ui/                     # Button, Badge
│   │   ├── vehicle/                 # VehicleCard, SpecGrid
│   │   ├── booking/                  # StepIndicator, RateBreakdown
│   │   └── three/                     # HeroVelocityScene (WebGL)
│   ├── pages/                          # Home, FleetCatalog, VehicleDetails, Booking, About, Contact
│   ├── data/
│   │   └── vehicles.js                 # Static fleet dataset
│   ├── hooks/                            # useHeroTimeline, useCountUp (GSAP)
│   └── utils/
│       └── currency.js                   # INR formatting + pricing logic
```

---

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd velocita-fleet
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

---

## 🎯 What This Project Demonstrates

- Component-based architecture and clean separation of concerns
- Client-side routing and multi-step form/state management in React
- Working with a predefined design system (tokens translated directly into
  Tailwind's theme layer)
- Practical, restrained use of animation libraries (GSAP, Three.js) tied to
  specific UX moments rather than decorative overuse
- Realistic, production-style project structure and documentation

---

## 📄 License

This project was built for educational purposes as part of the Sqrock IT
Solutions internship program.
