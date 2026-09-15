import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home as HomeIcon, RotateCcw, LayoutGrid, List, Search, ShieldCheck } from 'lucide-react'
import VehicleCard from '../components/vehicle/VehicleCard.jsx'
import { vehicles, fleetStats } from '../data/vehicles.js'

const CLASS_OPTIONS = [
  'Luxury Sedan',
  'Executive SUV',
  'Electric Performance',
  'Convertible & Sports',
  'Economy Hatchback',
  'Executive Performance',
]

const SORTERS = {
  popular: (a, b) => b.rating - a.rating,
  'price-asc': (a, b) => a.dailyRate - b.dailyRate,
  'price-desc': (a, b) => b.dailyRate - a.dailyRate,
}

export default function FleetCatalog() {
  const { search: rentalSearch } = useLocation()
  const [search, setSearch] = useState('')
  const [activeClasses, setActiveClasses] = useState(new Set())
  const [transmission, setTransmission] = useState('any')
  const [sort, setSort] = useState('popular')
  const [maxPrice, setMaxPrice] = useState(25000)
  const [viewMode, setViewMode] = useState('grid')

  function toggleClass(label) {
    setActiveClasses((prev) => {
      const next = new Set(prev)
      if (next.has(label)) {
        next.delete(label)
      } else {
        next.add(label)
      }
      return next
    })
  }

  function resetFilters() {
    setSearch('')
    setActiveClasses(new Set())
    setTransmission('any')
    setMaxPrice(25000)
  }

  const filtered = useMemo(() => {
    let list = vehicles.filter((v) => {
      const matchesSearch =
        !search || v.name.toLowerCase().includes(search.toLowerCase())
      const matchesClass =
        activeClasses.size === 0 || activeClasses.has(v.classLabel)
      const matchesTransmission =
        transmission === 'any' || v.transmission.toLowerCase() === transmission
      const matchesPrice = v.dailyRate <= maxPrice
      return matchesSearch && matchesClass && matchesTransmission && matchesPrice
    })
    return list.sort(SORTERS[sort])
  }, [search, activeClasses, transmission, maxPrice, sort])

  const activeFilterChips = [
    ...Array.from(activeClasses),
    maxPrice < 25000 ? `Under ₹${maxPrice.toLocaleString('en-IN')}/day` : null,
    transmission !== 'any' ? (transmission === 'automatic' ? 'Automatic' : 'Manual') : null,
  ].filter(Boolean)

  return (
    <div className="flex flex-col">
      {/* Sub-header strip */}
      <section className="w-full bg-surface-container-low py-space-lg shadow-sm">
        <div className="content-container">
          <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-sm">
            <div className="flex items-center gap-space-xs font-label-md text-on-surface-variant">
              <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
                <HomeIcon size={14} /> Home
              </Link>
              <ChevronRight size={13} />
              <span className="text-secondary-container font-semibold">Available Vehicles</span>
            </div>
            <div className="inline-flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-1 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
              <span className="font-label-sm text-on-surface">
                Fleet Status: <strong className="text-secondary">{fleetStats.vehiclesReady} Vehicles Ready</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pt-space-xs">
            <div>
              <h1 className="font-headline-xl text-primary font-bold tracking-tight">
                Executive &amp; Luxury Fleet
              </h1>
              <p className="font-body-md text-on-surface-variant mt-1">
                Select from our meticulously maintained fleet of grand tourers,
                executive saloons, and versatile SUVs.
              </p>
            </div>

            <div className="flex items-center gap-space-md self-start md:self-auto">
              <div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-2 rounded-xl shadow-sm">
                <label htmlFor="fleet-sort" className="font-label-sm text-on-surface-variant whitespace-nowrap">
                  Sort by:
                </label>
                <select
                  id="fleet-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-transparent font-label-lg text-primary font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
              <div className="flex items-center bg-surface-container-high p-1 rounded-xl">
                <button
                  type="button"
                  aria-label="Grid view"
                  aria-pressed={viewMode === 'grid'}
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center justify-center w-9 h-9 rounded-lg cursor-pointer transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-surface-container-lowest text-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  type="button"
                  aria-label="List view"
                  aria-pressed={viewMode === 'list'}
                  onClick={() => setViewMode('list')}
                  className={`flex items-center justify-center w-9 h-9 rounded-lg cursor-pointer transition-colors ${
                    viewMode === 'list'
                      ? 'bg-surface-container-lowest text-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main workspace */}
      <section className="content-container py-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Filters sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3 flex flex-col gap-space-lg bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
            <div className="flex items-center justify-between pb-space-sm -mx-space-lg -mt-space-lg px-space-lg py-space-md rounded-t-xl bg-surface-container-low">
              <span className="font-headline-sm text-primary font-bold">Filter Assets</span>
              <button
                onClick={resetFilters}
                className="font-label-sm text-secondary-container hover:text-secondary font-semibold flex items-center gap-1"
              >
                <RotateCcw size={14} /> Reset All
              </button>
            </div>

            <div className="flex flex-col gap-space-xs">
              <label htmlFor="car-search" className="font-label-lg text-on-surface font-semibold">
                Search Model
              </label>
              <div className="relative flex items-center">
                <Search size={18} className="absolute left-3 text-on-surface-variant" />
                <input
                  id="car-search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="e.g. Aventos, Grand, Hybrid"
                  className="w-full bg-surface-container-low pl-10 pr-space-md py-2.5 rounded-xl font-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-space-sm">
              <span className="font-label-lg text-on-surface font-semibold">Vehicle Class</span>
              <div className="flex flex-col gap-2">
                {CLASS_OPTIONS.map((label) => (
                  <label
                    key={label}
                    className="flex items-center justify-between cursor-pointer group py-1 px-2 rounded-lg hover:bg-surface-container-low"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={activeClasses.has(label)}
                        onChange={() => toggleClass(label)}
                        className="w-4 h-4 rounded accent-primary cursor-pointer"
                      />
                      <span className="font-body-md text-on-surface group-hover:text-primary">
                        {label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-space-sm bg-surface-container-low p-space-md rounded-xl">
              <div className="flex items-center justify-between">
                <span className="font-label-lg text-on-surface font-semibold">Max Daily Rate</span>
                <span className="font-headline-sm text-secondary font-bold">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={2000}
                max={25000}
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-secondary-container"
              />
              <div className="flex justify-between font-label-sm text-on-surface-variant">
                <span>₹2,000/day</span>
                <span>₹25,000+/day</span>
              </div>
            </div>

            <div className="flex flex-col gap-space-sm">
              <span className="font-label-lg text-on-surface font-semibold">Transmission</span>
              <div className="flex items-center gap-2">
                {['any', 'automatic', 'manual'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setTransmission(opt)}
                    className={`cursor-pointer flex-1 text-center py-2 px-2 rounded-lg capitalize font-label-md transition-all ${
                      transmission === opt
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-space-sm p-space-md rounded-xl bg-surface-container-high flex flex-col gap-2 text-on-surface">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-secondary-container" size={20} />
                <span className="font-headline-sm font-semibold">Corporate Priority</span>
              </div>
              <p className="font-body-sm text-on-surface-variant">
                Need a custom fleet dispatch or airport delivery? Speak with
                your dedicated agent.
              </p>
              <Link
                to="/contact"
                className="font-label-sm text-secondary font-bold hover:underline inline-flex items-center gap-1 mt-1"
              >
                Open Fleet Request <ChevronRight size={14} />
              </Link>
            </div>
          </aside>

          {/* Results */}
          <main className="lg:col-span-8 xl:col-span-9 flex flex-col gap-space-lg">
            {activeFilterChips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 bg-surface-container-lowest p-space-sm rounded-xl shadow-sm">
                <span className="font-label-sm text-on-surface-variant uppercase tracking-wider pl-2">
                  Active filters:
                </span>
                {activeFilterChips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1 bg-surface-container text-on-surface px-3 py-1 rounded-full font-label-md"
                  >
                    {chip}
                  </span>
                ))}
                <button
                  onClick={resetFilters}
                  className="font-label-sm text-secondary hover:underline ml-auto pr-2"
                >
                  Clear Filter Bar
                </button>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-xl p-space-xl text-center shadow-sm">
                <p className="font-headline-sm text-primary mb-1">No vehicles match these filters</p>
                <p className="font-body-sm text-on-surface-variant mb-space-md">
                  Try widening your price range or clearing a filter.
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center h-10 px-space-lg rounded-xl bg-secondary-container text-on-primary font-label-lg"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter' : 'grid grid-cols-1 gap-space-md'}>
                {filtered.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} rentalSearch={rentalSearch} layout={viewMode} />
                ))}
              </div>
            )}
          </main>
        </div>
      </section>
    </div>
  )
}
