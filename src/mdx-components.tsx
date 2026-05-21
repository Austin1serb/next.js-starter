// src/mdx-components.tsx

import type { MDXComponents } from "mdx/types"
import type { ComponentPropsWithoutRef } from "react"

function isExternalHref(href?: string) {
  if (!href) return false

  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//")
}

function MdxLink({ href, rel, target, ...props }: ComponentPropsWithoutRef<"a">) {
  if (!isExternalHref(href)) return <a href={href} rel={rel} target={target} {...props} />

  return <a data-plain href={href} target={target ?? "_blank"} rel={rel ?? "nofollow noopener noreferrer"} {...props} />
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: MdxLink,
    ...components,
  }
}
