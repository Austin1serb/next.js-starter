"use client"

import { useEffect, useRef, useCallback } from "react"
import { useScopedUI } from "@react-zero-ui/core"

type Options = {
  bandPx?: number
  offsetPx?: number
}

export function useCenterActiveProd({ bandPx = 2, offsetPx = 0 }: Options = {}) {
  const [, setActive] = useScopedUI<"true" | "false">("active", "false")
  const node = useRef<HTMLElement | null>(null)
  const isActive = useRef(false)
  const observer = useRef<IntersectionObserver | null>(null)

  const flip = useCallback(
    (next: boolean) => {
      if (isActive.current === next) return
      isActive.current = next
      setActive(next ? "true" : "false")
    },
    [setActive]
  )

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return

    const connect = () => {
      observer.current?.disconnect()

      const vh = window.visualViewport?.height ?? window.innerHeight
      const center = vh / 2 + offsetPx
      const half = Math.max(1, bandPx) / 2
      const top = Math.max(0, center - half)
      const bottom = Math.max(0, vh - (center + half))

      observer.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (!entry) return
          flip(entry.isIntersecting)
        },
        { root: null, rootMargin: `-${top}px 0px -${bottom}px 0px`, threshold: 0 }
      )

      if (node.current) observer.current.observe(node.current)
    }

    connect()

    window.addEventListener("resize", connect)
    window.visualViewport?.addEventListener("resize", connect)

    return () => {
      observer.current?.disconnect()
      window.removeEventListener("resize", connect)
      window.visualViewport?.removeEventListener("resize", connect)
    }
  }, [bandPx, offsetPx, flip])

  return useCallback(
    (el: HTMLElement | null) => {
      const prev = node.current
      if (prev && prev !== el) observer.current?.unobserve(prev)

      node.current = el
      setActive.ref?.(el)

      if (el) {
        setActive(isActive.current ? "true" : "false")
        observer.current?.observe(el)
      }
    },
    [setActive]
  )
}
