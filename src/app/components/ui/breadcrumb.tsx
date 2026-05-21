import Link from "next/link"
import { ChevronRight, House } from "@react-zero-ui/icon-sprite"
import type { BreadcrumbList, WithContext } from "schema-dts"
import { DOMAIN_URL, SITE_SLUGS } from "@/config/site-config"
import { cn } from "@/lib/utils"

type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
  children?: React.ReactNode
  className?: string
}

const toAbsoluteUrl = (href: string) => new URL(href, DOMAIN_URL).toString()

const buildBreadcrumbJsonLd = (items: BreadcrumbItem[]): WithContext<BreadcrumbList> => {
  const trail: BreadcrumbItem[] = [{ label: "Home", href: SITE_SLUGS.home }, ...items]

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: toAbsoluteUrl(item.href) } : {}),
    })),
  }
}

/**
 * Reusable breadcrumb trail with BreadcrumbList JSON-LD.
 *
 * Renders a Home icon followed by the provided items. The last item (or any
 * item without an href) is treated as the current page. Optional `children`
 * render on the trailing edge of the bar (e.g. a back link or action).
 */
export function Breadcrumb({ items, children, className }: BreadcrumbProps) {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(items)

  return (
    <div className={cn("w-full py-2", className)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }} />

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-section-x ">
        <nav aria-label="Breadcrumbs">
          <ol className="text-caption flex flex-wrap items-center gap-1">
            <li className="flex items-center">
              <Link
                href={SITE_SLUGS.home}
                title="Home"
                className="text-foreground-muted hover:text-primary flex items-center transition-colors"
                aria-label="Home"
              >
                Home
              </Link>
            </li>

            {items.map((item, index) => {
              const isLast = index === items.length - 1

              return (
                <li key={`${item.href ?? item.label}-${index}`} className="flex items-center gap-1">
                  <ChevronRight size={16} className="text-foreground-subtle" aria-hidden="true" strokeWidth={1} />

                  {isLast || !item.href ? (
                    <span aria-current="page" className="text-foreground font-medium">
                      {item.label}
                    </span>
                  ) : (
                    <Link href={item.href} className="text-foreground-muted hover:text-primary transition-colors" aria-label={item.label}>
                      {item.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>

        {children ? <div>{children}</div> : null}
      </div>
    </div>
  )
}
