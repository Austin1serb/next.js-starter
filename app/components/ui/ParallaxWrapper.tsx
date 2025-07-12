"use client"

import { useEffect, useCallback, useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useInView } from "motion/react"

interface ParallaxWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  intensity?: number
  mobileIntensity?: number
  mobileBreakpoint?: number
  className?: string
}

export function ParallaxWrapper({ children, intensity = 10, mobileIntensity = 10, mobileBreakpoint = 768, className = "" }: ParallaxWrapperProps) {
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { amount: 0.8 })

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const smoothX = useSpring(x, { stiffness: 120, damping: 20 })
  const smoothY = useSpring(y, { stiffness: 120, damping: 20 })

  const resizeTimer = useRef<NodeJS.Timeout | null>(null)

  const updateMobile = () => {
    if (resizeTimer.current) return
    resizeTimer.current = setTimeout(() => {
      setIsMobile(window.innerWidth < mobileBreakpoint)
      resizeTimer.current = null
    }, 250)
  }

  // ✅ Detect if mobile with throttled resize (250ms)
  useEffect(() => {
    if (!window) return
    setIsMobile(window.innerWidth < mobileBreakpoint)

    window.addEventListener("resize", updateMobile)
    return () => {
      window.removeEventListener("resize", updateMobile)
      if (resizeTimer.current) clearTimeout(resizeTimer.current)
    }
  }, [mobileBreakpoint])

  // ✅ Mouse movement for desktop
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMobile || !inView) return

      const { innerWidth, innerHeight } = window
      const offsetX = (e.clientX / innerWidth - 0.5) * intensity
      const offsetY = (e.clientY / innerHeight - 0.5) * intensity

      x.set(Math.max(-4, Math.min(offsetX, 4)))
      y.set(Math.max(-2, Math.min(offsetY, 2)))
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
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMobile, handleMouseMove, handleScroll, inView])

  return (
    <motion.div
      ref={containerRef}
      className={`absolute inset-0 m-[-4px] will-change-transform ${className}`}
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      {children}
    </motion.div>
  )
}
