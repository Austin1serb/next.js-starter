"use client"

import { IconInfoCircle } from "@react-zero-ui/icon-sprite"
import { type ReactNode, useEffect, useRef, useState } from "react"
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
    if (!open) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Node) || !rootRef.current?.contains(event.target)) {
        setOpen(false)
      }
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
        className="rounded-full p-0.5 text-text-soft transition-colors hover:bg-surface-muted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
      >
        <IconInfoCircle className="h-3.5 w-3.5" />
      </button>

      {open && (
        <span className="absolute top-7 left-0 z-20 w-64 rounded-lg border border-border bg-background p-3 text-text-muted text-xs leading-5 shadow-lg">
          {children}
        </span>
      )}
    </span>
  )
}
