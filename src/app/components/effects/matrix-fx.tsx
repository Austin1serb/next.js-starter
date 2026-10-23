"use client"

import { useEffect, useRef } from "react"
export type MatrixFxProps = {
  /** Tailwind classes for color (text-*), opacity, and stacking. */
  className?: string
  /** Any CSS color, including variables. Defaults to the inherited text color. */
  color?: string
  /** Square dot size in CSS pixels, with a minimum of 1. */
  size?: number
  /** Gap between dots in CSS pixels, with a minimum of 0. */
  spacing?: number
  /** Maximum drawing rate, clamped to 1–60 frames per second. */
  fps?: number
  flicker?: boolean
  /** Fade from the top center, matching the Once UI demo. */
  fade?: boolean
}

type Dot = {
  x: number
  y: number
  opacity: number
  phase: number
  frequency: number
}

/**
 * Decorative dot background. The parent must be positioned and have a size;
 * put foreground content in a relative layer above it. No animation library is
 * needed. Reduced motion produces a grid; offscreen/hidden canvases pause.
 *
 * <section className="relative bg-neutral-950">
 *   <MatrixFx className="text-neutral-500" />
 *   <div className="relative px-6 py-32">Hero content</div>
 * </section>
 */
export function MatrixFx({
  className = "",
  color,
  size = 2.5,
  spacing = 5,
  fps = 12,
  flicker = true,
  fade = true,
}: MatrixFxProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!container || !canvas || !context) {
      return
    }

    const dotSize = Number.isFinite(size) ? Math.max(1, size) : 1.5
    const gap = Number.isFinite(spacing) ? Math.max(0, spacing) : 5
    const frameInterval = 1000 / (Number.isFinite(fps) ? Math.min(60, Math.max(1, fps)) : 24)
    const motionPreference = globalThis.matchMedia("(prefers-reduced-motion: reduce)")
    let dots: Dot[] = []
    let width = 0
    let height = 0
    let pixelRatio = 1
    let isVisible = false
    let frame: number | null = null
    let lastDrawTime = 0

    function draw(time: number) {
      if (!context || !canvas) {
        return
      }

      context.clearRect(0, 0, width, height)
      // Resolve Tailwind colors and CSS variables on the actual element.
      context.fillStyle = getComputedStyle(canvas).color
      const shouldFlicker = flicker && !motionPreference.matches

      for (const dot of dots) {
        const shimmer = shouldFlicker
          ? 0.6 + Math.sin((time / 1000) * dot.frequency + dot.phase) * 0.4
          : 1
        context.globalAlpha = dot.opacity * shimmer
        context.fillRect(dot.x, dot.y, dotSize, dotSize)
      }
      context.globalAlpha = 1
    }

    function animate(time: number) {
      const elapsed = time - lastDrawTime
      if (elapsed >= frameInterval) {
        draw(time)
        // Retain the remainder so a 24 FPS target works on a 60 Hz display.
        lastDrawTime = time - (elapsed % frameInterval)
      }
      frame = requestAnimationFrame(animate)
    }

    function syncAnimation() {
      if (frame !== null) {
        cancelAnimationFrame(frame)
        frame = null
      }
      if (!isVisible || document.hidden || width === 0 || height === 0) {
        return
      }

      lastDrawTime = performance.now()
      draw(lastDrawTime)
      if (flicker && !motionPreference.matches) {
        frame = requestAnimationFrame(animate)
      }
    }

    function resize() {
      if (!container || !canvas || !context) {
        return
      }

      const bounds = container.getBoundingClientRect()
      const nextPixelRatio = Math.min(globalThis.devicePixelRatio || 1, 2)
      if (bounds.width === width && bounds.height === height && nextPixelRatio === pixelRatio) {
        return
      }

      width = bounds.width
      height = bounds.height
      pixelRatio = nextPixelRatio
      // Changing bitmap dimensions clears the canvas, including a static frame.
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      const pitch = dotSize + gap
      const columns = Math.ceil(width / pitch)
      const rows = Math.ceil(height / pitch)
      dots = []
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          dots.push({
            x: column * pitch,
            y: row * pitch,
            opacity: 0.3 + Math.random() * 0.7,
            phase: Math.random() * Math.PI * 2,
            frequency: 2.4 + Math.random() * 1.2,
          })
        }
      }
      syncAnimation()
    }

    const resizeObserver = new ResizeObserver(resize)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      syncAnimation()
    })
    // A grid must also repaint when its color or Tailwind classes change.
    const styleObserver = new MutationObserver(syncAnimation)
    styleObserver.observe(container, { attributes: true, attributeFilter: ["class", "style"] })
    resizeObserver.observe(container)
    visibilityObserver.observe(container)
    // Also catch pixel-density changes when moving between displays or zooming.
    globalThis.addEventListener("resize", resize)
    document.addEventListener("visibilitychange", syncAnimation)
    motionPreference.addEventListener("change", syncAnimation)

    return () => {
      if (frame !== null) {
        cancelAnimationFrame(frame)
      }
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      styleObserver.disconnect()
      globalThis.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", syncAnimation)
      motionPreference.removeEventListener("change", syncAnimation)
    }
  }, [size, spacing, fps, flicker])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${fade ? "mask-[radial-gradient(50svh_at_50%_0%,black,transparent)]" : ""} ${className}`}
      style={{ color }}
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  )
}
