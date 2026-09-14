import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


export function useCountUp(target, { decimals = 0, suffix = '' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReduced) {
      node.textContent = `${target.toFixed(decimals)}${suffix}`
      return
    }

    const counter = { value: 0 }
    const trigger = ScrollTrigger.create({
      trigger: node,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            node.textContent = `${counter.value.toFixed(decimals)}${suffix}`
          },
        })
      },
    })

    return () => trigger.kill()
  }, [target, decimals, suffix])

  return ref
}
