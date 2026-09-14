import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import FleetCatalog from './pages/FleetCatalog.jsx'
import VehicleDetails from './pages/VehicleDetails.jsx'
import Booking from './pages/Booking.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname, search, hash, key } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, search, hash, key])

  return null
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <ScrollToTop />
      <Header />
      <main className="flex-1 pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fleet" element={<FleetCatalog />} />
          <Route path="/fleet/:id" element={<VehicleDetails />} />
          <Route path="/fleet/:id/book" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
