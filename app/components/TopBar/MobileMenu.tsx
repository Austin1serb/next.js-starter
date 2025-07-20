"use client"

import Link from "next/link"
import { HamburgerIcon } from "./HamburgerIcon"
import clsx from "clsx"
import { SITE_SLUGS } from "@/config/siteConfig"
import { useUI } from "@react-zero-ui/core"

export const MobileMenu: React.FC = () => {
  const [, setMobileMenuOpen] = useUI<"closed" | "open">("mobile-menu", "closed")

  return (
    <div className="relative lg:hidden">
      {/* ✅ Hamburger Icon */}
      <HamburgerIcon setIsOpen={setMobileMenuOpen} />

      {/* ✅ Overlay Backdrop */}
      <div
        className={clsx(
          "scrolled750-true:top-14 fixed inset-0 top-17 bg-white/25 backdrop-blur-md transition-opacity",
          "mobile-menu-open:pointer-events-auto mobile-menu-closed:pointer-events-none",
          "mobile-menu-open:opacity-100 mobile-menu-closed:opacity-0"
        )}
        onClick={() => setMobileMenuOpen("closed")} // ✅ Close when clicking outside
      />

      {/* ✅ Slide-In Menu */}
      <div
        className={clsx(
          "bg-secondary fixed inset-0 top-16 right-0 h-full transform transition-transform",
          "mobile-menu-open:translate-x-0 mobile-menu-closed:translate-x-full"
        )}
      >
        {/* ✅ Navigation Links */}
        <nav className="mt-12 flex flex-col items-center justify-around space-y-4 text-lg font-semibold md:text-xl">
          <Link href={SITE_SLUGS.about} className="p-5" onClick={() => setMobileMenuOpen("closed")}>
            About Us
          </Link>
          <Link href={SITE_SLUGS.services} className="p-5" onClick={() => setMobileMenuOpen("closed")}>
            Services
          </Link>
          <div className="mx-auto p-5">
            <button className="bg-blue-500 p-2" onClick={() => setMobileMenuOpen("closed")}>
              Start Your Quote
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}
