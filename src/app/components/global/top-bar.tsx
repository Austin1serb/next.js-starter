import Link from "next/link"
import { SITE_NAP, SITE_SLUGS } from "@/config/site-config"

const navItems = [
  { name: "About", href: SITE_SLUGS.about },
  { name: "Services", href: SITE_SLUGS.allServices },
  // { name: "Pricing", href: SITE_SLUGS.pricing },
]

export function TopBar() {
  return (
    <header className="border-border border-b bg-surface">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href={SITE_SLUGS.home} className="font-display text-foreground text-subtitle">
            {SITE_NAP.name}
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-body-sm text-muted-foreground transition hover:text-foreground hover:underline"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <a
            // biome-ignore lint/a11y/useValidAnchor: Starter sign-in destination must be set for each website.
            href="#"
            className="hidden text-body-sm text-primary underline-offset-4 hover:text-primary/90 hover:underline sm:inline"
          >
            Sign in
          </a>
          <button type="button" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Get started
          </button>
        </div>
      </div>
    </header>
  )
}
