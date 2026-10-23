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
        className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-accent/30 rounded-full p-0.5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        <IconInfoCircle className="size-3.5" />
      </button>

      {open && (
        <span className="border-border bg-background text-muted-foreground absolute top-7 left-0 z-20 w-64 rounded-lg border p-3 text-xs leading-5 shadow-lg">
          {children}
        </span>
      )}
    </span>
  )
}
