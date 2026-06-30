"use client"

import { useEffect, useRef, useCallback } from "react"
import { useScopedUI } from "@react-zero-ui/core"

type Options = {
  bandPx?: number
  offsetPx?: number
}

export function useCenterActiveDebug({ bandPx = 2, offsetPx = 0 }: Options = {}) {
  const [, setActive] = useScopedUI<"true" | "false">("active", "false")
  const node = useRef<HTMLElement | null>(null)
  const isActive = useRef(false)
  const observer = useRef<IntersectionObserver | null>(null)
  const debugBandEl = useRef<HTMLDivElement | null>(null)
  const debugStyleEl = useRef<HTMLStyleElement | null>(null)

  const setDebugNodeState = useCallback((el: HTMLElement | null, active: boolean) => {
    if (!el) return
    el.setAttribute("data-center-debug", "true")
    el.setAttribute("data-center-debug-active", active ? "true" : "false")
  }, [])

  const clearDebugNodeState = useCallback((el: HTMLElement | null) => {
    if (!el) return
    el.removeAttribute("data-center-debug")
    el.removeAttribute("data-center-debug-active")
  }, [])

  const ensureDebugUI = useCallback((centerY: number, bandPxValue: number) => {
    if (!debugStyleEl.current) {
      const style = document.createElement("style")
      style.setAttribute("data-center-active-debug-style", "true")
      style.textContent = `
        [data-center-debug="true"] {
          background-image: linear-gradient(
            rgba(59, 130, 246, 0.10),
            rgba(59, 130, 246, 0.10)
          );
        }

        [data-center-debug-active="true"] {
          background-image: linear-gradient(
            rgba(239, 68, 68, 0.16),
            rgba(239, 68, 68, 0.16)
          );
        }
      `
      document.head.appendChild(style)
      debugStyleEl.current = style
    }

    if (!debugBandEl.current) {
      const el = document.createElement("div")
      el.setAttribute("data-center-active-debug-band", "true")
      Object.assign(el.style, {
        position: "fixed",
        left: "0",
        right: "0",
        pointerEvents: "none",
        zIndex: "999999",
        background: "rgba(239, 68, 68, 0.16)",
        transform: "translateY(-50%)",
      })
      document.body.appendChild(el)
      debugBandEl.current = el
    }

    debugBandEl.current.style.top = `${centerY}px`
    debugBandEl.current.style.height = `${Math.max(1, bandPxValue)}px`
  }, [])

  const cleanupDebugUI = useCallback(() => {
    debugBandEl.current?.remove()
    debugBandEl.current = null

    debugStyleEl.current?.remove()
    debugStyleEl.current = null

    clearDebugNodeState(node.current)
  }, [clearDebugNodeState])

  const flip = useCallback(
    (next: boolean) => {
      if (isActive.current === next) return
      isActive.current = next
      setActive(next ? "true" : "false")
      setDebugNodeState(node.current, next)
    },
    [setActive, setDebugNodeState]
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

      ensureDebugUI(center, bandPx)

      observer.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (!entry) return
          flip(entry.isIntersecting)
        },
        { root: null, rootMargin: `-${top}px 0px -${bottom}px 0px`, threshold: 0 }
      )

      if (node.current) {
        observer.current.observe(node.current)
        setDebugNodeState(node.current, isActive.current)
      }
    }

    connect()

    window.addEventListener("resize", connect)
    window.visualViewport?.addEventListener("resize", connect)

    return () => {
      observer.current?.disconnect()
      window.removeEventListener("resize", connect)
      window.visualViewport?.removeEventListener("resize", connect)

      cleanupDebugUI()
    }
  }, [bandPx, offsetPx, flip, ensureDebugUI, cleanupDebugUI, setDebugNodeState])

  return useCallback(
    (el: HTMLElement | null) => {
      const prev = node.current
      if (prev && prev !== el) {
        observer.current?.unobserve(prev)
        clearDebugNodeState(prev)
      }

      node.current = el
      setActive.ref?.(el)

      if (el) {
        setActive(isActive.current ? "true" : "false")
        setDebugNodeState(el, isActive.current)
        observer.current?.observe(el)
      }
    },
    [setActive, setDebugNodeState, clearDebugNodeState]
  )
}
