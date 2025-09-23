"use client"
import { useEffect, useCallback, useState, useRef } from "react"
import { useMotionValue, useSpring, useInView } from "motion/react"
import * as motion from "motion/react-m"

export interface ParallaxWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  intensity?: number
  mobileIntensity?: number
  className?: string
}

export function ParallaxWrapper({ children, intensity = 20, mobileIntensity = 0, className = "" }: ParallaxWrapperProps) {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.matchMedia("(pointer: coarse), (hover: none)").matches)
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { amount: 0.8 })

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const smoothX = useSpring(x, { stiffness: 120, damping: 20 })
  const smoothY = useSpring(y, { stiffness: 120, damping: 20 })

  // ✅ Detect coarse-pointer devices;
  useEffect(() => {
    const mql = window.matchMedia("(pointer: coarse), (hover: none)")
    const update = () => setIsMobile(mql.matches)
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [])

  // ✅ Mouse movement for desktop
  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (isMobile || !inView) return

      const { innerWidth, innerHeight } = window
      const offsetX = (e.clientX / innerWidth - 0.5) * intensity
      const offsetY = (e.clientY / innerHeight - 0.5) * intensity

      x.set(Math.max(-intensity, Math.min(offsetX, intensity)))
      y.set(Math.max(-intensity, Math.min(offsetY, intensity)))
    },
    [intensity, isMobile, inView, x, y]
  )

  // ✅ Scroll movement for mobile
  const lastScrollY = useRef(0)

  useEffect(() => {
    lastScrollY.current = window.scrollY
  }, [])
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleScroll = useCallback(() => {
    if (!isMobile || !inView) return

    const scrollDelta = window.scrollY - lastScrollY.current
    lastScrollY.current = window.scrollY

    const offsetY = Math.max(-20, Math.min(scrollDelta * mobileIntensity * 0.05, 20))
    y.set(offsetY)
    clearTimeout(scrollTimeout.current!)
    scrollTimeout.current = setTimeout(() => y.set(0), 150)
  }, [mobileIntensity, isMobile, inView, y])

  // ✅ Attach event listeners conditionally
  useEffect(() => {
    if (!inView) return

    if (isMobile) {
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    } else {
      window.addEventListener("pointermove", handlePointerMove)
      return () => window.removeEventListener("pointermove", handlePointerMove)
    }
  }, [isMobile, handlePointerMove, handleScroll, inView])

  return (
    <motion.div
      ref={containerRef}
      className={`absolute inset-0 m-[-4px] will-change-transform ${className} `}
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      {children}
    </motion.div>
  )
}
