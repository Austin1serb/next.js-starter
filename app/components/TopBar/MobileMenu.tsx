"use client"

import Link from "next/link"
import { useState } from "react"
import { HamburgerIcon } from "./HamburgerIcon"
import clsx from "clsx"

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
        role="menu"
        aria-hidden={!isOpen}
      >
        {/* ✅ Navigation Links */}
        <nav className="mt-12 flex flex-col items-center justify-around space-y-4" role="menu">
          <Link href="/" className="link block p-5" onClick={() => setIsOpen(false)} role="menuitem">
            Home
          </Link>
          <Link href="/car-repair-services-kirkland" className="p-5" onClick={() => setIsOpen(false)} role="menuitem">
            Services
          </Link>
          <Link href="/contact-auto-care-kirkland" className="p-5" onClick={() => setIsOpen(false)} role="menuitem">
            Contact
          </Link>
          <div className="mx-auto p-5">
            <Link className="bg-blue-500 p-2" href="tel:+14258231881">
              Schedule Now
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}
