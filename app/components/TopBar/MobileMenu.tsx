"use client"

import Link from "next/link"
import { useState } from "react"
import { HamburgerIcon } from "./HamburgerIcon"
import clsx from "clsx"
import { SITE_NAP, SITE_SLUGS } from "@/config/siteConfig"

export const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative lg:hidden">
      {/* ✅ Hamburger Icon */}
      <HamburgerIcon isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)} />

      {/* ✅ Overlay Backdrop */}
      <div
        className={clsx(
          "bg-background-alt/50 fixed inset-0 top-18 backdrop-blur-md transition-opacity",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setIsOpen(false)} // ✅ Close when clicking outside
      />

      {/* ✅ Slide-In Menu */}
      <div
        className={clsx("bg-secondary fixed inset-0 top-16 right-0 h-full transform transition-transform", isOpen ? "translate-x-0" : "translate-x-full")}
        aria-hidden={!isOpen}
      >
        {/* ✅ Navigation Links */}
        <nav className="mt-12 flex flex-col items-center justify-around space-y-4">
          <Link href="/" className="link block p-5" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href={SITE_SLUGS.services} className="p-5" onClick={() => setIsOpen(false)}>
            Services
          </Link>
          <Link href={SITE_SLUGS.contact} className="p-5" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
          <div className="mx-auto p-5">
            <Link className="bg-blue-500 p-2" href={`tel:${SITE_NAP.phone}`}>
              Schedule Now
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}
