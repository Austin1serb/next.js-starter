import { SITE_NAP, SITE_SLUGS } from "@/config/site-config"
import Link from "next/link"

const navItems = [
  { name: "About", href: SITE_SLUGS.about },
  { name: "Services", href: SITE_SLUGS.allServices },
  // { name: "Pricing", href: SITE_SLUGS.pricing },
]

export function TopBar() {
  return (
    <header className="border-border bg-surface border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href={SITE_SLUGS.home} className="font-display text-foreground text-subtitle">
            {SITE_NAP.name}
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-foreground-muted hover:text-foreground text-body-sm transition hover:underline">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="text-link hover:text-link-hover text-body-sm hidden underline-offset-4 hover:underline sm:inline">
            Sign in
          </a>
          <button
            type="button"
            className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-ring focus-visible:ring-offset-ring-offset text-body-sm rounded-md px-4 py-2 font-medium transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  )
}
