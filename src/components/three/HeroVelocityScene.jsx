import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Abstract "velocity streak" visual for the home hero.
 *
 * Rationale (see DESIGN.md "Emotional Target: Velocity & Efficiency"):
 * rather than a literal 3D car model (which needs a licensed asset we
 * don't have) or a generic rotating-gradient blob, this renders directional
 * light streaks travelling toward the viewer along the brand's navy/amber
 * palette — evoking motion and precision without competing with the real
 * vehicle photography used elsewhere on the page.
 *
 * This is the page's one non-user-triggered motion moment in 3D; it runs
 * continuously but slowly, pauses off-screen, and slows substantially under
 * prefers-reduced-motion.
 */
export default function HeroVelocityScene({ className = '' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const motionScale = prefersReduced ? 0.2 : 1

    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    //  Streak field: thin line segments radiating along Z 
    const STREAK_COUNT = 260
    const positions = new Float32Array(STREAK_COUNT * 2 * 3)
    const colors = new Float32Array(STREAK_COUNT * 2 * 3)

    const navy = new THREE.Color('#0f1e36')
    const amber = new THREE.Color('#fd761a')
    const paleBlue = new THREE.Color('#b8c7e6')

    const streaks = []
    for (let i = 0; i < STREAK_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 0.6 + Math.random() * 3.2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius * 0.6
      const z = Math.random() * -20

      const length = 0.4 + Math.random() * 1.4
      const speed = 4 + Math.random() * 6

      streaks.push({ x, y, z, length, speed })

      const colorChoice =
        Math.random() > 0.88 ? amber : Math.random() > 0.5 ? paleBlue : navy

      const i6 = i * 6
      colors[i6] = colorChoice.r
      colors[i6 + 1] = colorChoice.g
      colors[i6 + 2] = colorChoice.b
      colors[i6 + 3] = colorChoice.r
      colors[i6 + 4] = colorChoice.g
      colors[i6 + 5] = colorChoice.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
    })

    const lines = new THREE.LineSegments(geometry, material)
    scene.add(lines)

    function updatePositions(dt) {
      const posAttr = geometry.attributes.position
      for (let i = 0; i < STREAK_COUNT; i++) {
        const s = streaks[i]
        s.z += s.speed * dt * motionScale
        if (s.z > camera.position.z + 1) {
          s.z = -20 - Math.random() * 5
        }
        const i6 = i * 6
        posAttr.array[i6] = s.x
        posAttr.array[i6 + 1] = s.y
        posAttr.array[i6 + 2] = s.z
        posAttr.array[i6 + 3] = s.x
        posAttr.array[i6 + 4] = s.y
        posAttr.array[i6 + 5] = s.z + s.length
      }
      posAttr.needsUpdate = true
    }

    let rafId = null
    let isVisible = true
    const clock = new THREE.Clock()

    function animate() {
      rafId = requestAnimationFrame(animate)
      if (!isVisible) return
      const dt = Math.min(clock.getDelta(), 0.05)
      updatePositions(dt)
      renderer.render(scene, camera)
    }

    animate()

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    observer.observe(container)

    function handleResize() {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.render(scene, camera)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      role="presentation"
      aria-hidden="true"
      className={className}
    />
  )
}
