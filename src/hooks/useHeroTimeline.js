import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * A single orchestrated entrance sequence for a hero section.
 *
 * Deliberately NOT "fade-and-slide-up on every section" — this fires once,
 * on mount, for the one hero moment per page that deserves it. Everything
 * else on the page stays still; hover/interaction states are handled by
 * CSS, not GSAP, per the project's motion principle (only animate to draw
 * attention once, or in direct response to a person's action).
 *
 * Usage:
 *   const scope = useRef(null)
 *   useHeroTimeline(scope)
 *   <div ref={scope}>
 *     <span data-hero="eyebrow">...</span>
 *     <h1 data-hero="headline">...</h1>
 *     <p data-hero="sub">...</p>
 *     <div data-hero="cta">...</div>
 *   </div>
 */
export function useHeroTimeline(scopeRef, { skip = false } = {}) {
  useLayoutEffect(() => {
    if (skip || !scopeRef.current) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('[data-hero="eyebrow"]', { opacity: 0, y: 12, duration: 0.5 })
        .from(
          '[data-hero="headline"]',
          { opacity: 0, y: 28, duration: 0.7 },
          '-=0.25'
        )
        .from(
          '[data-hero="sub"]',
          { opacity: 0, y: 18, duration: 0.6 },
          '-=0.4'
        )
        .from(
          '[data-hero="cta"]',
          { opacity: 0, y: 14, duration: 0.5, stagger: 0.08 },
          '-=0.35'
        )
        .from(
          '[data-hero="visual"]',
          { opacity: 0, scale: 0.96, duration: 0.9, ease: 'power2.out' },
          '-=0.9'
        )
    }, scopeRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip])
}

export function useEntranceRef() {
  return useRef(null)
}
