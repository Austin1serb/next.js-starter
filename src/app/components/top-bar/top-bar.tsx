import Link from "next/link"
import { MobileMenuButton } from "./mobile-menu-button"
import { MobileMenu } from "./mobile-menu"
import { Logo } from "../ogo"
import { SITE_SLUGS } from "@/config/site-config"
import { LinkButton } from "@/app/components/ui/LinkButton"

const navItems = [
  { name: "About", href: SITE_SLUGS.about },
  { name: "Services", href: SITE_SLUGS.services },
  // { name: "Pricing", href: SITE_SLUGS.pricing },
]

export const TopBarV2: React.FC = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 z-10 flex w-full min-w-56 justify-center text-base sm:text-sm">
      {/* Wrapper that grows/shrinks on mobile */}
      <div className="bg-background/40 flex min-h-12 w-full items-center justify-center overflow-hidden backdrop-blur-xs">
        <div className="relative flex w-full flex-col">
          {/* Top Row (always visible) */}
          <div className="flex w-full items-center gap-4 px-4 py-2.5 sm:gap-8">
            {/* Logo */}
            <div className="flex w-full items-center justify-between gap-4">
              <Logo />
              {/* Mobile Dots Menu */}
              <MobileMenuButton />
            </div>

            {/* Desktop Navigation */}
            <ul className="body-lg hidden items-center gap-4 transition-all duration-300 ease-in-out sm:flex lg:gap-5">
              {navItems.map((item) => (
                <li key={item.name} className="flex">
                  <Link href={item.href} className="rounded-full p-1 px-2 transition-colors duration-300 hover:text-gray-400">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="flex">
                <LinkButton href={SITE_SLUGS.contact}>Contact</LinkButton>
              </li>
            </ul>
          </div>

          {/* Mobile Menu (renders always but hidden via overflow on wrapper) */}
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </nav>
  )
}
