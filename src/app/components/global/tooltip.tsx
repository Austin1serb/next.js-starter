"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { IconInfoCircle } from "@react-zero-ui/icon-sprite"
import { cn } from "@/lib/utils"

type Props = {
  label: string
  children: ReactNode
  className?: string
}

export function Tooltip({ label, children, className }: Props) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [open])

  return (
    <span ref={rootRef} className={cn("relative inline-flex", className)}>
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((previous) => !previous)}
        className="text-text-soft hover:bg-surface-muted hover:text-text focus-visible:ring-accent/30 rounded-full p-0.5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        <IconInfoCircle className="h-3.5 w-3.5" />
      </button>

      {open && (
        <span className="border-border bg-background text-text-muted absolute top-7 left-0 z-20 w-64 rounded-lg border p-3 text-xs leading-5 shadow-lg">
          {children}
        </span>
      )}
    </span>
  )
}
