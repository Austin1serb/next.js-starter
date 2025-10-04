import { useEffect } from "react"

// === Debug overlay for IntersectionObserver ===
export function useIOOverlay(rootMargin: string, sensorEl: HTMLElement | null) {
  useEffect(() => {
    if (!sensorEl) return

    // ---- build overlay DOM ----
    const overlay = document.createElement("div")
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      pointerEvents: "none",
      zIndex: "2147483647",
      mixBlendMode: "normal",
    })

    // Root box (viewport after rootMargin)
    const rootBox = document.createElement("div")
    Object.assign(rootBox.style, {
      position: "absolute",
      outline: "2px dashed rgba(0,200,255,.9)",
      boxShadow: "inset 0 0 0 1px rgba(0,200,255,.35)",
    })

    // Sensor target box
    const targetBox = document.createElement("div")
    Object.assign(targetBox.style, {
      position: "fixed",
      border: "2px solid rgba(255,200,0,.9)",
      background: "rgba(255,200,0,.08)",
    })

    // Intersection area (target ∩ root)
    const intersectBox = document.createElement("div")
    Object.assign(intersectBox.style, {
      position: "fixed",
      background: "rgba(0,255,120,.10)",
      outline: "2px solid rgba(0,255,120,.45)",
    })

    // Readout
    const label = document.createElement("div")
    Object.assign(label.style, {
      position: "fixed",
      right: "8px",
      bottom: "8px",
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      fontSize: "12px",
      background: "rgba(0,0,0,.7)",
      color: "#0ff",
      padding: "6px 8px",
      borderRadius: "6px",
    })

    overlay.append(rootBox, targetBox, intersectBox, label)
    document.body.appendChild(overlay)

    // ---- helpers ----
    const parseMargin = (v: string, axis: "x" | "y") => {
      v = (v || "").trim()
      if (v.endsWith("%")) {
        const p = parseFloat(v)
        const base = axis === "y" ? window.innerHeight : window.innerWidth
        return (p / 100) * base
      }
      // treat bare "0" as px
      return parseFloat(v) || 0
    }

    const getRootRect = () => {
      const parts = (rootMargin || "0px 0px 0px 0px").trim().split(/\s+/)
      const [t, r, b, l] = [
        parseMargin(parts[0] ?? "0px", "y"),
        parseMargin(parts[1] ?? "0px", "x"),
        parseMargin(parts[2] ?? "0px", "y"),
        parseMargin(parts[3] ?? "0px", "x"),
      ]

      // Negative shrinks inward; positive expands outward
      const top = Math.max(0, -Math.min(0, t))
      const right = Math.max(0, -Math.min(0, r))
      const bottom = Math.max(0, -Math.min(0, b))
      const left = Math.max(0, -Math.min(0, l))

      const x = left
      const y = top
      const w = window.innerWidth - left - right
      const h = window.innerHeight - top - bottom

      return new DOMRect(x, y, Math.max(0, w), Math.max(0, h))
    }

    const rectIntersect = (a: DOMRect, b: DOMRect) => {
      const x = Math.max(a.x, b.x)
      const y = Math.max(a.y, b.y)
      const xr = Math.min(a.x + a.width, b.x + b.width)
      const yb = Math.min(a.y + a.height, b.y + b.height)
      const w = Math.max(0, xr - x)
      const h = Math.max(0, yb - y)
      return new DOMRect(x, y, w, h)
    }

    // ---- update loop ----
    let raf: number | null = null
    const update = () => {
      raf = null

      // Root (viewport after margins)
      const rr = getRootRect()
      Object.assign(rootBox.style, {
        left: `${rr.x}px`,
        top: `${rr.y}px`,
        width: `${rr.width}px`,
        height: `${rr.height}px`,
      })

      // Sensor target (in viewport coords)
      const tr = sensorEl.getBoundingClientRect()
      Object.assign(targetBox.style, {
        left: `${tr.left}px`,
        top: `${tr.top}px`,
        width: `${tr.width}px`,
        height: `${tr.height}px`,
      })

      // Intersection
      const ir = rectIntersect(rr, tr)
      Object.assign(intersectBox.style, {
        left: `${ir.x}px`,
        top: `${ir.y}px`,
        width: `${ir.width}px`,
        height: `${ir.height}px`,
        display: ir.width && ir.height ? "block" : "none",
      })
    }

    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    // Observe size/position changes
    const ro = new ResizeObserver(queue)
    ro.observe(document.documentElement)
    ro.observe(sensorEl)

    const onScroll = () => queue()
    const onResize = () => queue()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize, { passive: true })

    // Kick off
    queue()

    // Also attach a live IO to prove the same ratio the API sees
    const io = new IntersectionObserver(
      ([entry]) => {
        // overwrite only the ratio readout; boxes already show geometry
        const txt = label.textContent || ""
        const r = entry.intersectionRatio
        label.textContent = txt.replace(/ratio:\s*[\d.]+$/, `ratio: ${r.toFixed(2)}`)
      },
      { root: null, rootMargin, threshold: Array.from({ length: 11 }, (_, i) => i / 10) }
    )
    io.observe(sensorEl)

    // cleanup
    return () => {
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      overlay.remove()
    }
  }, [rootMargin, sensorEl])
}
