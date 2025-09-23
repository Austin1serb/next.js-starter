"use client"

import { useMotionValue, useSpring, useTransform } from "motion/react"
import { useEffect, useRef } from "react"
import * as motion from "motion/react-m"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  intensity?: number
  className?: string
  /** If provided, pointer events come from this element instead of the wrapper */
  hoverRef?: React.RefObject<HTMLElement | null>
}

export function ParallaxItemWrapper({ children, intensity = 20, className = "", hoverRef }: Props) {
  /* ----------------------------------------------------------------- */
  /* 1. Refs & motion values                                            */
  /* ----------------------------------------------------------------- */
  const isMobile = useRef(typeof window !== "undefined" && window.matchMedia("(pointer: coarse), (hover: none)").matches)
  const targetRef = useRef<HTMLDivElement>(null) // the wrapper itself
  const rectRef = useRef<DOMRect | null>(null)

  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const x = useSpring(
    useTransform(px, (v) => v * intensity),
    {
      stiffness: 150,
      damping: 15,
    }
  )
  const y = useSpring(
    useTransform(py, (v) => v * intensity),
    {
      stiffness: 150,
      damping: 15,
    }
  )

  /* ----------------------------------------------------------------- */
  /* 2. Coarse-pointer detection (no re-render)                         */
  /* ----------------------------------------------------------------- */
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse), (hover: none)")
    const update = () => (isMobile.current = mq.matches)
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  /* ----------------------------------------------------------------- */
  /* 3. Pointer handlers                                                */
  /* ----------------------------------------------------------------- */
  const handleEnter = () => {
    const el = hoverRef?.current ?? targetRef.current
    rectRef.current = el?.getBoundingClientRect() ?? null
  }

  const handleLeave = () => {
    rectRef.current = null
    px.set(0)
    py.set(0)
  }

  const handleMove = (e: PointerEvent) => {
    if (isMobile.current || !rectRef.current) return
    const r = rectRef.current
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  /* ----------------------------------------------------------------- */
  /* 4. Attach listeners — either on self or on hoverRef               */
  /* ----------------------------------------------------------------- */
  useEffect(() => {
    const el: HTMLElement | null = hoverRef?.current ?? targetRef.current
    if (!el) return

    el.addEventListener("pointerenter", handleEnter)
    el.addEventListener("pointermove", handleMove)
    el.addEventListener("pointerleave", handleLeave)
    return () => {
      el.removeEventListener("pointerenter", handleEnter)
      el.removeEventListener("pointermove", handleMove)
      el.removeEventListener("pointerleave", handleLeave)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoverRef]) // re-bind if parent ref changes

  /* ----------------------------------------------------------------- */
  /* 5. Render                                                          */
  /* ----------------------------------------------------------------- */
  return (
    <motion.div
      ref={targetRef}
      style={{ x, y }}
      className={`${className} duration-100 ease-out`}
      {...(hoverRef
        ? {}
        : {
            /* no pointer handlers here when using parent */
          })}
    >
      {children}
    </motion.div>
  )
}
