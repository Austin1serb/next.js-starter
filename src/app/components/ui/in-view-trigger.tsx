"use client"

import * as React from "react"
import { useCenterActive } from "@/hooks/use-center-active"
import { useIsMobile } from "@/hooks/use-media-query"

type InViewTriggerOwnProps<C extends React.ElementType> = {
  as?: C
}

type InViewTriggerProps<C extends React.ElementType> = InViewTriggerOwnProps<C> & Omit<React.ComponentPropsWithoutRef<C>, keyof InViewTriggerOwnProps<C>>

export function InViewTrigger<C extends React.ElementType = "div">({ as, children, ...props }: InViewTriggerProps<C>) {
  const ref = useCenterActive({ bandPx: 2 })
  const isMobile = useIsMobile()
  // TODO: Decide to use touch or isMobile
  // const isTouch = useMediaQuery("(any-hover: none) and (any-pointer: coarse)")

  const Tag = as || "div"

  if (!isMobile) return <Tag {...props}>{children}</Tag>

  return (
    <Tag ref={ref} {...props}>
      {children}
    </Tag>
  )
}
