"use client"

import type React from "react"

interface JsLinkProps extends React.ComponentProps<"button"> {
  children: React.ReactNode
  href?: string
}

export const JsLink: React.FC<JsLinkProps> = ({ href, children, type = "button", onClick, ...props }) => {
  return (
    <button
      type={type}
      onClick={(event) => {
        if (href) {
          window.open(href, "_blank", "noopener,noreferrer")
        }

        onClick?.(event)
      }}
      {...props}
    >
      {children}
    </button>
  )
}
